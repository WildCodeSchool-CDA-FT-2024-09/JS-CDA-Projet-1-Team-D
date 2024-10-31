import { Cat } from "../cats/cat.entities";
import { Query, Resolver, Arg, Int } from "type-graphql";

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
}
