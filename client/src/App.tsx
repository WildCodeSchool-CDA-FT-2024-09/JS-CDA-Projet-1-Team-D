import Logo from "/Logo.svg";
import "./App.css";
import Button from "@mui/joy/Button";

function App() {
  return (
    <>
      <img src={Logo} className="logo" alt="Perfect Match logo" />
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
    </>
  );
}

export default App;
