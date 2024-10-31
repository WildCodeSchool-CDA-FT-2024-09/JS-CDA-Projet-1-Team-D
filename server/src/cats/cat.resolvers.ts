import { Cat } from "../cats/cat.entities";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LogginInfosInput } from "./cat.types";
import argon2 from "argon2";

@Resolver(Cat)
export default class CatResolver {
  @Query(() => [Cat])
  async getCatResolvers() {
    return [];
  }

  @Mutation(() => Cat)
  async login(@Arg("data") logginInfos: LogginInfosInput) {
    const { email, password } = logginInfos;

    const cat = await Cat.findOne({
      where: { email },
    });

    if (!cat) {
      throw new Error("L'utilisateur n'est pas enregistré.");
    }

    const passwordValidation = await argon2.verify(cat.password, password);

    if (!passwordValidation) {
      throw new Error("Le mot de passe est incorrect.");
    }

    return cat;
  }
}
