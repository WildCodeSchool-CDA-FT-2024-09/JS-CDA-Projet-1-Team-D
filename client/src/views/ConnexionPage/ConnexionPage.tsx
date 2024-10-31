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
    <div className="bg-co-ctn">
      <main className="main-co-ctn">
        <div className="co-ctn-large">
          <section className="co-ctn-txt">
            <h1>Trouves ton matou purr-fait</h1>
            <p className="co-ctn-p">
              Rejoins nous pour trouver une relation qui va te faire ronronner !
            </p>
          </section>
          <form onSubmit={handleSubmit}>
            <Input
              className="co-ctn-form-input"
              color="primary"
              placeholder="Email"
              variant="outlined"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="co-ctn-form-input"
              color="primary"
              placeholder="Mot de passe"
              variant="outlined"
              name="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="co-ctn-error">{error?.message}</p>
            <Button className="co-ctn-btn" type="submit">
              Me connecter &rarr;
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ConnexionPage;
