import { ProfileLikeCard } from "../../components/ProfileCard/ProfileLikeCard";
import { useLikedCatsQuery } from "../../generated/graphql-types";
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
          <h2>
            Mes coups de patte :
            <span className="liked-cats-count"> {data.likedCats.length}</span>
          </h2>
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
          <audio id="audio" src="../../../public/meow-1.mp3"></audio>
        </section>
      </section>
    );
};
