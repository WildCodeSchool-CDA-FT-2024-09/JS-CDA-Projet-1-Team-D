import { Cat } from "../cats/cat.entities";
import { Like } from "../likes/like.entities";
import { Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { LogginInfosInput } from "./cat.types";
import argon2 from "argon2";

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
}
