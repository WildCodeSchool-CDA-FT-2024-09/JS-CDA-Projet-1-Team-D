import { Like } from "../likes/like.entities";
import { Resolver, Mutation, Arg, Int } from "type-graphql";

@Resolver(Like)
export default class LikeResolver {
  @Mutation(() => Like)
  async removeLike(
    @Arg("catId1", () => Int) catId1: number,
    @Arg("catId2", () => Int) catId2: number
  ): Promise<Like> {
    const like_cat1 = await Like.findOne({
      where: { cat_id1: { id: catId1 }, cat_id2: { id: catId2 } },
    });

    const like_cat2 = await Like.findOne({
      where: { cat_id1: { id: catId2 }, cat_id2: { id: catId1 } },
    });

    if (!like_cat1 && !like_cat2) {
      throw new Error("Meow, ce like n'existe pas");
    }

    if (like_cat1) {
      like_cat1.isMatch = false;
      await like_cat1.remove();
    }

    if (like_cat2) {
      like_cat2.isMatch = false;
      await like_cat2.save();
    }

    return like_cat1;
  }
}
