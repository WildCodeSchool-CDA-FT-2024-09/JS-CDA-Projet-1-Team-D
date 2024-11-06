import "./ProfileLikeCard.css";
import { LikedCat } from "../../types/CatTypes";
import { Link } from "react-router-dom";
import { calculateAge } from "../../utils/calculateAge";

export const ProfileLikeCard = ({
  name,
  birthday,
  profile_picture,
  surname,
  id,
}: LikedCat) => {
  return (
    <div className="profile-card-global">
      <button
        type="button"
        className="profile-like-card-button"
        onClick={() => alert("Coucou")}
      >
        <img src="/croix-delete.png" alt="bouton pour supprimer un like" />
      </button>
      <Link to={`/profile/${id}`} className="profile-card-link">
        <article className="profile-card-container">
          <img
            className="profile-picture-avatar"
            src={profile_picture}
            alt={`photo de profil de ${name}`}
          />
          <div className="profile-card-text">
            <p className="profile-surname">{surname}</p>
            <h3 className="profile-texts">
              {name}, {calculateAge(birthday)}
            </h3>
          </div>
        </article>
      </Link>
    </div>
  );
};
