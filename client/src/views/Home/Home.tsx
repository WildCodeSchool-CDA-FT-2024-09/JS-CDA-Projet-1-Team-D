import Logo from "/Logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="home-container">
      <section className="logo-container">
        <img src={Logo} className="logo" alt="Perfect Match logo" />
      </section>
      <h1>Hello, ici le client de Purrfect Match!</h1>
      <p>Il y a encore tout à construire, bon courage 🐱</p>
      <Link className="redirect-co-page" to="/login">
        Connexion
      </Link>
    </section>
  );
};
