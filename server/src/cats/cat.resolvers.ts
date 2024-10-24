import { Cat } from "../cats/cat.entities";
import { Query, Resolver } from "type-graphql";

@Resolver(Cat)
export default class CatResolver {
  @Query(() => [Cat])
  async getCatResolvers() {
    return [];
  }
}
