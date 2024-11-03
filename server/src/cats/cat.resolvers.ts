import { Cat } from "../cats/cat.entities";
import { Like } from "../likes/like.entities";
import { Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { LogginInfosInput } from "./cat.types";
import argon2 from "argon2";
import { Like } from "../likes/like.entities";

@Resolver(Cat)
export default class CatResolver {
  @Query(() => [Cat], { nullable: true })
  async fullcats() {
    const cats = await Cat.find();
    console.info("Je suis les chats", cats);
    return cats;
  }

  @Query(() => [Cat], { nullable: true })
  async likedCats(@Arg("catId", () => Int) catId: number): Promise<Cat[]> {
    const cat = await Cat.findOne({
      where: { id: catId },
      relations: ["likedCats", "likedCats.cat_id2"],
    });

    if (!cat) {
      return [];
    }

    return cat.likedCats.map((like) => like.cat_id2);
  }

  @Query(() => [Cat], { nullable: true })
  async matchedCats(@Arg("catId", () => Int) catId: number): Promise<Cat[]> {
    const matches = await Like.find({
      where: { cat_id1: { id: catId }, isMatch: true },
      relations: ["cat_id2"],
    });

    if (!matches) {
      return [];
    }

    return matches.map((like) => like.cat_id2);
  }

  @Mutation(() => Cat)
  async login(@Arg("data") logginInfos: LogginInfosInput) {
    const { email, password } = logginInfos;

    const cat = await Cat.findOne({
      where: { email },
    });

    if (!cat) {
      throw new Error("Chat passe pas...");
    }

    const passwordValidation = await argon2.verify(cat.password, password);

    if (!passwordValidation) {
      throw new Error("Chat passe pas...");
    }

    return cat;
  }

  @Query(() => Cat, { nullable: true })
  async getCatById(@Arg("id", () => Number) id: number) {
    return await Cat.findOne({ where: { id }, relations: { interests: true } });
  }

  // Liste des chats à Swiper
  @Query(() => [Cat], { nullable: true })
  async swipeList(@Arg("catId", () => Int) catId: number): Promise<Cat[]> {
    // Récupère le chat connecté avec ses likes
    const connectedCat = await Cat.findOne({
      where: { id: catId },
      relations: ["likedCats", "likedCats.cat_id2"],
    });

    if (!connectedCat) {
      console.error("Le chat connecté n'existe pas.");
      return [];
    }

    // Récupère les IDs des chats déjà likés par le chat connecté
    const likedCatIds = connectedCat.likedCats.map((like) => like.cat_id2.id);

    // Récupère tous les chats sauf ceux déjà likés et avec isMatch non null
    const cats = await Cat.createQueryBuilder("cat")
      .leftJoinAndSelect(
        "cat.likedBy",
        "like",
        "like.cat_id2 = cat.id AND like.cat_id1 = :catId",
        { catId }
      )
      .where("cat.id != :catId", { catId }) // Exclure le chat actuel de la liste
      .andWhere("cat.id NOT IN (:...likedCatIds)", { likedCatIds }) // Exclure les chats déjà likés
      .andWhere("like.isMatch IS NULL") // Inclure seulement ceux dont isMatch est null (veut dire qu'ils sont deja soit like soit dislike)
      .getMany();

    return cats;
  }

  // Liker un chat
  @Mutation(() => Like)
  async sendLike(
    @Arg("catId1", () => Int) catId1: number,
    @Arg("catId2", () => Int) catId2: number
  ): Promise<Like | null> {
    const connectedCat = await Cat.findOne({ where: { id: catId1 } });
    const likedCat = await Cat.findOne({ where: { id: catId2 } });

    // On vérifie que les deux chats existent
    if (!connectedCat || !likedCat) {
      console.error("Mutation like: L'un des chats n'existe pas");
      return null;
    }

    // Check si le chat liké nous like en retour (match)
    const reciprocalLike = await Like.findOne({
      where: { cat_id1: likedCat, cat_id2: connectedCat },
    });

    // Créez une nouvelle instance de Like
    const like = Like.create({
      cat_id1: connectedCat,
      cat_id2: likedCat,
      isMatch: reciprocalLike ? true : null, // Si like reciproque match true, si pas réciproque le laisser à null
    });

    await like.save();
    return like;
  }
}
