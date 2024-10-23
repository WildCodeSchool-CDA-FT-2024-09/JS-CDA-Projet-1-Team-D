import sampleUser from "./sample.entities";
import { Query, Resolver } from "type-graphql";

@Resolver(sampleUser)
export default class SampleResolver {
  @Query(() => [sampleUser])
  async getSampleUsers() {
    return [];
  }
}
