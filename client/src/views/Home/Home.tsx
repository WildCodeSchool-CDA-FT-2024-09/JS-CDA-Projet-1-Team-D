import Logo from "/Logo.svg";
import "./Home.css";
import Button from "@mui/joy/Button";
import CatsPhotos from "../../assets/Cats-Home-mobile.png";

export const Home = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={Logo} className="logo" alt="Perfect Match logo" />
      </div>
      <img src={CatsPhotos} alt="Photos of cats" />
      <div className="content">
        <h1>Trouve ton matou purr-fait</h1>
        <p>
          Rejoins nous pour trouver une relation qui va te faire ronronner ! 🐱
        </p>
        <Button
          size="lg"
          color="primary"
          onClick={() => alert("JoyUI Fonctionne!")}
          variant="solid"
          className="connexion-button"
        >
          Connexion
        </Button>
        <p>
          Je n'ai pas de compte <a>M'inscrire</a>
        </p>
      </div>
    </div>
  );
};
