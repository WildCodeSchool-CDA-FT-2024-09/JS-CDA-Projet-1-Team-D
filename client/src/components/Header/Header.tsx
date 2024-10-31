import Logo from "/Logo.svg";
import Avatar from "@mui/joy/Avatar";
import "./Header.css";
import { Link } from "react-router-dom";
import { ConnectedUser } from "../../types/User";

export const Header = ({ username, avatarUrl }: ConnectedUser) => {
  return (
    <nav className="header-container">
      <Link to="/settings" className="link-component">
        <div className="header-avatar">
          <Avatar
            alt={`${username}'s avatar`}
            src={avatarUrl}
            color="primary"
            variant="outlined"
            size="lg"
          />
          <p>Bonjour {username}</p>
        </div>
      </Link>
      <Link to="/">
        <img src={Logo} className="header-logo" alt="Purrfect Match logo" />
      </Link>
    </nav>
  );
};
