import Logo from "/Logo.svg";
import "./Home.css";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home-container">
      <section className="logo-container">
        <img src={Logo} className="logo" alt="Perfect Match logo" />
      </section>
      <h1>Hello, ici le client de Purrfect Match!</h1>
      <p>Il y a encore tout à construire, bon courage 🐱</p>
      <Button
        size="lg"
        color="primary"
        onClick={() => navigate("/login")}
        variant="solid"
        className="connexion-button"
      >
        Connexion
      </Button>
    </section>
  );
};
