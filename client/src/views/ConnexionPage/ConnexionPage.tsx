import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import "./ConnexionPage.css";

function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    login(email, password);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-xxl">
      <div className="container-xl">
        <div className="connexion-container">
          <div className="connexion-text">
            <h1>Trouves ton matou purr-fait</h1>
            <p className="connexion-paragraph">
              Rejoins nous pour trouver une relation qui va te faire ronronner !
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <Input
                className="form-input"
                color="primary"
                placeholder="Email"
                variant="outlined"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="form-input"
                color="primary"
                placeholder="Mot de passe"
                variant="outlined"
                name="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error">{error?.message}</p>
            </div>
            <div className="btn-box">
              <Button className="connexion-btn" type="submit">
                Me connecter &rarr;
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConnexionPage;
