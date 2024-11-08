import { useState, useEffect } from "react";
import { LikedCat } from "../../types/CatTypes";
import { useLikedCatsQuery } from "../../generated/graphql-types";
import { ProfileLikeCard } from "../ProfileCard/ProfileLikeCard";

import "./ListLikesPages.css";

interface ListLikesPagesProps {
  catId: number;
  likeView: string;
  changeCount: (count: number) => void;
}
export const ListLikesPages = ({
  catId,
  likeView,
  changeCount,
}: ListLikesPagesProps) => {
  const { data, loading, error, refetch } = useLikedCatsQuery({
    variables: {
      catId: catId,
    },
  });

  const [catsListing, setCatsListing] = useState<LikedCat[]>([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (likeView === "likes" && data?.likedCats) {
      setCatsListing(data.likedCats);
    } else if (likeView === "matches" && data?.matchedCats) {
      setCatsListing(data.matchedCats);
    } else {
      setCatsListing([]);
    }
  }, [likeView, data]);

  useEffect(() => {
    changeCount(catsListing.length);
  }, [catsListing, changeCount]);

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
            catId={catId}
            refetch={refetch}
          />
        ))}
      </section>
    );
};
