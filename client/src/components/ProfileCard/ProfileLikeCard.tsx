import { useState } from "react";
import { LikedCat } from "../../types/CatTypes";
import { Link } from "react-router-dom";
import { calculateAge } from "../../utils/calculateAge";
import { useRemoveLikeMutation } from "../../generated/graphql-types";
import { ModalDeleteLike } from "../ModalDeleteLike/ModalDeleteLike";
import "./ProfileLikeCard.css";

interface ProfileLikeCardProps extends LikedCat {
  catId: number; // TODO : Provisoire en attendant la feature d'inscription-connexion
  refetch: () => void;
}

export const ProfileLikeCard = ({
  name,
  birthday,
  profile_picture,
  surname,
  id,
  catId,
  refetch,
}: ProfileLikeCardProps) => {
  const [openModalDeleteLike, setOpenModalDeleteLike] =
    useState<boolean>(false);
  const [removeLikeMutation] = useRemoveLikeMutation();

  const handleRemoveLike = async () => {
    try {
      await removeLikeMutation({
        variables: {
          catId1: catId,
          catId2: id,
        },
      });

      await refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression du like", error);
    }
  };

  return (
    <div className="profile-card-global">
      <button
        type="button"
        className="profile-like-card-button"
        onClick={() => setOpenModalDeleteLike(true)}
      >
        <img src="/croix-delete.png" alt="bouton pour supprimer un like" />
      </button>
      <ModalDeleteLike
        open={openModalDeleteLike}
        onClose={() => setOpenModalDeleteLike(false)}
        onConfirm={async () => {
          await handleRemoveLike();
          setOpenModalDeleteLike(false);
        }}
      />
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
