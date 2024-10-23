import Logo from "/Logo.svg";
import Avatar from "@mui/joy/Avatar";
import "./Header.css";

export const Header = () => {
  return (
    <section className="header-container">
      <div className="header-avatar">
        <Avatar
          alt="Minouche"
          src="/minouche.webp"
          color="danger"
          variant="outlined"
          size="lg"
        />
        <p>Bonjour Minouche</p>
      </div>
      <img src={Logo} className="header-logo" alt="Purrfect Match logo" />
    </section>
  );
};
