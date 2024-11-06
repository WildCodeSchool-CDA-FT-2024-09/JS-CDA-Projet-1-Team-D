import { useState, useEffect } from "react";
import { useLikedCatsQuery } from "../../generated/graphql-types";
import { ProfileLikeCard } from "../ProfileCard/ProfileLikeCard";

interface ListLikesPagesProps {
  catId: number;
  likeView: string;
}
export const ListLikesPages = ({ catId, likeView }: ListLikesPagesProps) => {
  const { data, loading, error } = useLikedCatsQuery({
    variables: {
      catId: catId,
    },
  });

  const [catsListing, setCatsListing] = useState<Cat[]>([]);

  useEffect(() => {
    if (likeView === "likes" && data?.likedCats) {
      setCatsListing(data.likedCats);
    } else if (likeView === "matches" && data?.matchedCats) {
      setCatsListing(data.matchedCats);
    } else {
      setCatsListing([]);
    }
  }, [likeView, data]);

  // const catsListing =
  //   likeView === "likes" && data?.likedCats
  //     ? data.likedCats
  //     : likeView === "matches" && data?.matchedCats
  //       ? data.matchedCats
  //       : [];

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data)
    return (
      <section className="likes-cards">
        {catsListing.map((cat) => (
          <ProfileLikeCard
            key={cat.id}
            name={cat.name}
            birthday={cat.birthday}
            id={cat.id}
            profile_picture={cat.profile_picture}
            surname={cat.surname}
          />
        ))}
      </section>
    );
};
