import Logo from "/Logo.svg";
import Avatar from "@mui/joy/Avatar";
import { Link } from "react-router-dom";
import { useGetForHeaderQuery } from "../../generated/graphql-types";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export const Header = () => {
  const { user } = useAuth();

  const { data, loading, error } = useGetForHeaderQuery({
    variables: {
      getCatByIdId: user ? user.id : 0,
    },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.getCatById)
    return (
      <nav className="header-container">
        <Link to="/settings" className="link-component">
          <div className="header-avatar">
            {user ? (
              <>
                <Avatar
                  alt={`${data?.getCatById.name}'s avatar`}
                  src={data?.getCatById.profile_picture}
                  color="primary"
                  variant="outlined"
                  size="lg"
                />
                <p>Bonjour {data?.getCatById.name}</p>
              </>
            ) : (
              <p>Bonjour, visiteur!</p>
            )}
          </div>
        </Link>
        <Link to="/">
          <img src={Logo} className="header-logo" alt="Purrfect Match logo" />
        </Link>
      </nav>
    );
};
