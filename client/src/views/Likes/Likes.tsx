import { ProfileLikeCard } from "../../components/ProfileCard/ProfileLikeCard";
import { useLikedCatsQuery } from "../../generated/graphql-types";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "./Likes.css";

export const Likes = () => {
  // TODO  ---- En attente de la feature de connexion -----
  const catId = 25;

  const { data, loading, error } = useLikedCatsQuery({
    variables: {
      catId: catId,
    },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.likedCats)
    return (
      <section className="likes-container">
        <section className="likes-title-page">
          <h3>
            Mes coups de patte :
            <span className="liked-cats-count"> {data.likedCats.length}</span>
          </h3>
          <Select
            className="select-likes"
            variant="soft"
            color="primary"
            defaultValue="likes"
          >
            <Option value="likes">Likes</Option>
            <Option value="matches">Matchs</Option>
          </Select>
        </section>
        <section className="likes-cards">
          {data.likedCats.map((cat) => (
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
