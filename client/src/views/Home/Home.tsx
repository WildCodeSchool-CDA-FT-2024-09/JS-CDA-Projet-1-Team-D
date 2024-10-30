import Logo from "/Logo.svg";
import "./Home.css";
import Button from "@mui/joy/Button";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={Logo} className="logo" alt="Perfect Match logo" />
      </div>
      <div className="home-content">
        <h1>Hello, ici le client de Purrfect Match!</h1>
        <p>Il y a encore tout à construire, bon courage 🐱</p>
        <Button
          size="lg"
          color="primary"
          onClick={() => alert("JoyUI Fonctionne!")}
          variant="solid"
          className="connexion-button"
        >
          Connexion
        </Button>
      </div>
    </div>
  );
};
