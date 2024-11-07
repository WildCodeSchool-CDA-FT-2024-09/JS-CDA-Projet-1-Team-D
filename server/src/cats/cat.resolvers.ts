import { Cat } from "../cats/cat.entities";
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
}
