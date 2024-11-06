import { Box, Typography, Button } from "@mui/joy";

const handleLogout = () => {
  // Logique de déconnexion à ajouter ici
  console.info("Déconnexion...");
};
const Logout = () => (
  <>
    <Typography component="h2" sx={{ marginLeft: "8px", color: "black" }}>
      Tu veux faire une pause de ronrons?
    </Typography>
    <Typography>
      Ce n'est qu'un au revoir... Nous serons toujours là quand tu seras prêt(e)
      à revenir ronronner avec nous. Mais si tu es sûr(e) de vouloir te
      déconnecter pour une petite sieste, il te suffit d'appuyer sur le bouton
      ci-dessous.
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          backgroundColor: "#F6A377",
          marginTop: "16px",
        }}
        onClick={handleLogout}
      >
        Se déconnecter
      </Button>
    </Box>
  </>
);

export default Logout;
