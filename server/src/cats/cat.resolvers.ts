import { Cat } from "../cats/cat.entities";
import { Like } from "../likes/like.entities";
import { Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { catCreationInput, LogginInfosInput } from "./cat.types";
import argon2 from "argon2";
import { validateOrReject, ValidationError } from "class-validator";

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
    const emailLowerCase = email.toLowerCase();

    const cat = await Cat.findOne({
      where: { email: emailLowerCase },
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

  @Mutation(() => Boolean)
  async catCreation(
    @Arg("data") signupInfos: catCreationInput
  ): Promise<boolean> {
    const { email, password } = signupInfos;
    const emailLowerCase = email.toLowerCase();
    try {
      await validateOrReject(signupInfos);
    } catch (err) {
      const errorMessages = (err as ValidationError[]).map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints).join(" ");
        }
        return "Input invalide";
      });

      throw new Error(errorMessages.join(" "));
    }
    try {
      const checkEmail = await Cat.findOne({
        where: { email: emailLowerCase },
      });

      if (checkEmail) {
        throw new Error("Email déjà enregistré");
      }

      const cat = new Cat();

      Object.assign(cat, signupInfos);

      cat.email = emailLowerCase;

      const hashedPassword = await argon2.hash(password);
      cat.password = hashedPassword;

      await cat.save();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
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

    // Récupère les IDs des chats déjà likés/disliké par le chat connecté
    const likedCatIds = connectedCat.likedCats.map((like) => like.cat_id2.id);

    // Récupère tous les chats sauf ceux déjà likés et avec isMatch non null
    const cats = await Cat.createQueryBuilder("cat")
      .leftJoinAndSelect(
        "cat.likedBy",
        "like",
        "like.cat_id2 = cat.id AND like.cat_id1 = :catId",
        { catId }
      )
      .leftJoinAndSelect("cat.interests", "interest")
      .where("cat.id != :catId", { catId }) // Exclure le chat actuel de la liste
      .andWhere("cat.id NOT IN (:...likedCatIds)", { likedCatIds }) // Exclure les chats déjà likés
      // .andWhere("like.isMatch IS NULL")
      // Inclure seulement ceux qui sont pas deja like, pas deja dislike
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

    // On prend le like de l'autre chat si il existe
    const otherCatLike = await Like.findOne({
      where: { cat_id1: likedCat, cat_id2: connectedCat },
    });

    // On crée le like du chat connecté
    const like = Like.create({
      cat_id1: connectedCat,
      cat_id2: likedCat,
      isLike: true,
      isMatch: null,
    });

    // Si like reciproque de l'autre chat, match à true
    if (otherCatLike && otherCatLike.isLike) {
      like.isMatch = true;
      otherCatLike.isMatch = true;
      await otherCatLike.save();
    }

    await like.save();
    return like;
  }

  // Disliker un chat
  @Mutation(() => Like)
  async sendDislike(
    @Arg("catId1", () => Int) catId1: number,
    @Arg("catId2", () => Int) catId2: number
  ): Promise<Like | null> {
    const connectedCat = await Cat.findOne({ where: { id: catId1 } });
    const dislikedCat = await Cat.findOne({ where: { id: catId2 } });

    // On vérifie que les deux chats existent
    if (!connectedCat || !dislikedCat) {
      console.error("Mutation like: L'un des chats n'existe pas");
      return null;
    }

    // Créez une nouvelle instance de Like
    // On lui mets isLike à false et
    // donc isMatch à false aussi
    const like = Like.create({
      cat_id1: connectedCat,
      cat_id2: dislikedCat,
      isLike: false,
      isMatch: false,
    });

    // Parallèlement, on met isMatch du chat en face à false (on garde son like tel qu'il est)
    const othercatLike = await Like.findOne({
      where: { cat_id1: dislikedCat, cat_id2: connectedCat },
    });
    if (othercatLike) {
      othercatLike.isMatch = false;
      await othercatLike.save();
    }

    await like.save();
    return like;
  }
}
