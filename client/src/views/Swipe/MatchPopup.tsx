import Close from "@mui/icons-material/Close";
import { Modal, Sheet, IconButton, Button, Card } from "@mui/joy";

type MatchPopupProps = {
  open: boolean;
  mobile: boolean;
  setOpen: (o: boolean) => void;
  catName: string;
  gif: string;
  handleMatchClick: () => void;
};

const Content = ({
  setOpen,
  catName,
  gif,
  handleMatchClick,
  mobile,
}: MatchPopupProps) => (
  <Sheet
    variant="outlined"
    sx={{
      maxWidth: 500,
      p: 3,
      boxShadow: "lg",
      display: "flex",
      flexDirection: "column",
      borderRadius: "30px",
      backgroundColor: "var(--color-white)",
      height: mobile ? "100%" : "initial",
    }}
  >
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <h1 className="swipe-match-popup-h1">C'est un match!</h1>
      <IconButton
        size="sm"
        variant="solid"
        onClick={() => setOpen(false)}
        sx={{
          width: mobile ? "30px" : "40px",
          height: mobile ? "30px" : "40px",
          borderRadius: "100%",
          backgroundColor: "var(--color-red)",
          color: "var(--color-white)",
        }}
      >
        <Close sx={{ fontSize: mobile ? 30 : 65, fontWeight: "bold" }} />
      </IconButton>
    </header>
    <section
      style={{
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          textAlign: "left",
          marginBottom: "10px",
          color: "var(--color-grey)",
        }}
      >
        Bravo! <span style={{ color: "var(--color-primary)" }}>{catName}</span>{" "}
        t'aime en retour!
        <br />
        Fonce voir tes matchs pour voir votre rendez-vous
      </h3>
      <img style={{ width: "300px", height: "300px" }} src={gif} />
      <Button
        onClick={handleMatchClick}
        style={{ marginTop: "20px", width: "60%" }}
      >
        Y aller!
      </Button>
    </section>
  </Sheet>
);

export const MatchPopup = ({
  open,
  setOpen,
  catName,
  gif,
  handleMatchClick,
  mobile,
}: MatchPopupProps) => {
  return mobile ? (
    <Card
      size="lg"
      sx={{
        position: "absolute",
        zIndex: 1000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
        height: "100vh",
      }}
    >
      <Content {...{ open, mobile, setOpen, handleMatchClick, gif, catName }} />
    </Card>
  ) : (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Content {...{ open, mobile, setOpen, handleMatchClick, gif, catName }} />
    </Modal>
  );
};
