import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import "./ModalDeleteLike.css";

interface ModalDeleteLikeProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ModalDeleteLike = ({
  open,
  onClose,
  onConfirm,
}: ModalDeleteLikeProps) => {
  return (
    <div>
      <Modal open={open}>
        <ModalDialog color="warning" variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent className="modal-color">
            Tu es sûr de vouloir retirer ce p'tit coup de griffe ? Ce chat ne
            pourra plus te faire les yeux doux après ! 😿
          </DialogContent>
          <DialogActions>
            <Button
              className="modal-color"
              variant="solid"
              color="warning"
              onClick={onConfirm}
            >
              Supprimer
            </Button>
            <Button
              className="modal-color"
              variant="plain"
              color="neutral"
              onClick={onClose}
            >
              Annuler
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};
