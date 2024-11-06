import { useState } from "react";
import { LikedCat } from "../../types/CatTypes";
import { Link } from "react-router-dom";
import { calculateAge } from "../../utils/calculateAge";
import { useRemoveLikeMutation } from "../../generated/graphql-types";
import { ModalDeleteLike } from "../ModalDeleteLike/ModalDeleteLike";
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
// import DialogTitle from '@mui/joy/DialogTitle';
// import DialogContent from '@mui/joy/DialogContent';
// import DialogActions from '@mui/joy/DialogActions';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import "./ProfileLikeCard.css";

export const ProfileLikeCard = (
  { name, birthday, profile_picture, surname, id }: LikedCat,
  catId: number
) => {
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
    } catch (error) {
      console.error("Erreur lors de la suppression du like", error);
    }
  };

  console.info(handleRemoveLike);

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
          // await handleRemoveLike();
          alert("le like a été supprimé");
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
