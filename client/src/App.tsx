import Logo from "/Logo.svg";
import "./App.css";
import Button from "@mui/joy/Button";

function App() {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={Logo} className="logo" alt="Perfect Match logo" />
      </div>
      <div className="content">
        <h1>Hello, ici le client de Purrfect Match!</h1>
        <p>Il y a encore tout à construire, bon courage 🐱</p>
        <Button
          color="primary"
          size="lg"
          onClick={() => alert("JoyUI Fonctionne!")}
          variant="solid"
        >
          Bouton pour tester JoyUI
        </Button>
      </div>
    </div>
  );
}

export default App;
