import "./ProfileLikeCard.css";
import { LikedCat } from "../../types/CatTypes";

export const ProfileLikeCard = ({
  name,
  birthday,
  profile_picture,
  surname,
}: LikedCat) => {
  // * Age calculation
  const today = new Date();
  const birthdate = new Date(birthday);
  const age = today.getFullYear() - birthdate.getFullYear();

  return (
    <section className="profile-card-container">
      <img
        className="profile-picture-avatar"
        src={profile_picture}
        alt="photo de profil"
      />
      <section className="profile-card-text">
        <p className="profile-surname">{surname}</p>
        <h2 className="profile-texts">
          {name}, {age}
        </h2>
      </section>
    </section>
  );
};
