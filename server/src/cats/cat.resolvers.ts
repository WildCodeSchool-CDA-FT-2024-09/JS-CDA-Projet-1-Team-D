import { Cat } from "../cats/cat.entities";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Cat)
export default class CatResolver {
  @Query(() => [Cat])
  async getCatResolvers() {
    return [];
  }

  @Query(() => Cat, { nullable: true })
  async getCatById(@Arg("id", () => Number) id: number) {
    return await Cat.findOne({ where: { id }, relations: { interests: true } });
  }
}
