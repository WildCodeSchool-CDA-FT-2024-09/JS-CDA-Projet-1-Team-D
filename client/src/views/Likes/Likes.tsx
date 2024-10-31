import { useState } from "react";
import { ProfileLikeCard } from "../../components/ProfileCard/ProfileLikeCard";
import {
  useLikedCatsQuery,
  useMatchedCatsQuery,
} from "../../generated/graphql-types";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "./Likes.css";

export const Likes = () => {
  // TODO  ---- En attente de la feature de connexion -----
  const catId = 49;

  const [likeView, setLikeView] = useState("likes");

  const {
    data: dataLikes,
    loading: loadingLikes,
    error: errorLikes,
  } = useLikedCatsQuery({
    variables: {
      catId: catId,
    },
  });

  const {
    data: dataMatches,
    loading: loadingMatches,
    error: errorMatches,
  } = useMatchedCatsQuery({
    variables: {
      catId: catId,
    },
  });

  console.info("Je suis les matches: ", dataMatches);

  if (loadingLikes || loadingMatches) return <h1>Loading ...</h1>;
  if (errorLikes || errorMatches) return <p>Erreur</p>;
  if (dataLikes && dataLikes.likedCats)
    return (
      <section className="likes-container">
        <section className="likes-title-page">
          <h2>
            Mes coups de patte :
            <span className="liked-cats-count">
              {" "}
              {dataLikes.likedCats.length}
            </span>
          </h2>
          <Select
            className="select-likes"
            variant="soft"
            color="primary"
            value={likeView}
            onChange={(_, value) => setLikeView(value as string)}
          >
            <Option value="likes">Likes</Option>
            <Option value="matches">Matchs</Option>
          </Select>
        </section>
        <section className="likes-cards">
          {dataLikes.likedCats.map((cat) => (
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
      </section>
    );
};
