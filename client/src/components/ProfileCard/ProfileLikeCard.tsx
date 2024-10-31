import "./ProfileLikeCard.css";
import { LikedCat } from "../../types/CatTypes";
import { Link } from "react-router-dom";

export const ProfileLikeCard = ({
  name,
  birthday,
  profile_picture,
  surname,
  id,
}: LikedCat) => {
  // * Age calculation
  const today = new Date();
  const birthdate = new Date(birthday);
  const age = today.getFullYear() - birthdate.getFullYear();

  return (
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
            {name}, {age}
          </h3>
        </div>
      </article>
    </Link>
  );
};
