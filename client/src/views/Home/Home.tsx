import Logo from "/Logo.svg";
import "./Home.css";
import Button from "@mui/joy/Button";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={Logo} className="logo" alt="Purrfect Match logo" />
      </div>
      <div className="home-content">
        <h1>Trouve ton matou purr-fait</h1>
        <p>
          Rejoins nous pour trouver une relation qui va te faire ronronner ! 🐱
        </p>
        <Button
          size="lg"
          color="primary"
          variant="solid"
          className="connexion-button"
          onClick={() => {
            alert("redirect vers la page de connexion");
          }}
        >
          Connexion
        </Button>
        <p>
          Je n'ai pas de compte <a>M'inscrire</a>
        </p>
        <NavLink to="/swipe">Clique pour revenir sur la page Swipe</NavLink>
      </div>
    </div>
  );
};
