import EditIcon from "/edit.svg";
import SearchIcon from "/search.svg";
import SettingsIcon from "/settings.svg";
import PrivacyIcon from "/privacy.svg";
import LogoutIcon from "/logout.svg";
import rightArrow from "/rightArrow.svg";
import leftArrow from "/leftArrow.svg";
import { Box, Typography, Drawer, IconButton, Button } from "@mui/joy";
import { useState } from "react";
import EditProfileForm from "../../components/EditProfilForm";

interface MenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    padding="8px"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <Box display="flex" alignItems="center">
      <img src={icon} alt={text} style={{ marginRight: "8px" }} />
      <Typography>{text}</Typography>
    </Box>
    <img src={rightArrow} alt="ouvrir" style={{ marginLeft: "8px" }} />
  </Box>
);

export const PersonalSettings = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    icon: string;
    text: string;
  } | null>(null);

  const handleOpenDrawer = (item: { icon: string; text: string }) => {
    setSelectedItem(item);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => setOpenDrawer(false);

  const handleLogout = () => {
    // Logique de déconnexion à ajouter ici
    console.info("Déconnexion...");
    handleCloseDrawer();
  };

  return (
    <>
      <MenuItem
        icon={EditIcon}
        text="Editer mon profil"
        onClick={() =>
          handleOpenDrawer({ icon: EditIcon, text: "Editer mon profil" })
        }
      />
      <MenuItem
        icon={SearchIcon}
        text="Mes préférences de recherche"
        onClick={() =>
          handleOpenDrawer({
            icon: SearchIcon,
            text: "Mes préférences de recherche",
          })
        }
      />
      <MenuItem
        icon={SettingsIcon}
        text="Paramètre du compte"
        onClick={() =>
          handleOpenDrawer({ icon: SettingsIcon, text: "Paramètre du compte" })
        }
      />
      <MenuItem
        icon={PrivacyIcon}
        text="Confidentialité"
        onClick={() =>
          handleOpenDrawer({ icon: PrivacyIcon, text: "Confidentialité" })
        }
      />
      <MenuItem
        icon={LogoutIcon}
        text="Se déconnecter"
        onClick={() =>
          handleOpenDrawer({ icon: LogoutIcon, text: "Se déconnecter" })
        }
      />

      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        anchor="right"
        color="primary"
        size="lg"
        variant="soft"
      >
        <Box display="flex" alignItems="center" padding="16px">
          <IconButton onClick={handleCloseDrawer}>
            <img src={leftArrow} alt="fermer" />
          </IconButton>
          {selectedItem && (
            <>
              <img
                src={selectedItem.icon}
                alt={selectedItem.text}
                style={{ marginLeft: "16px" }}
              />
              <Typography style={{ marginLeft: "8px" }}>
                {selectedItem.text}
              </Typography>
            </>
          )}
        </Box>
        <Box padding="16px">
          {selectedItem?.text === "Confidentialité" && (
            <>
              <Typography
                component="h2"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Règles de Confidentialité
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Introduction :
              </Typography>
              <Typography>
                Chez Purrfect Match, nous respectons votre vie privée et nous
                nous engageons à protéger vos informations personnelles. Cette
                politique de confidentialité décrit comment nous recueillons,
                utilisons et protégeons vos données lorsque vous utilisez notre
                service.
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Collecte d'Informations :
              </Typography>
              <Typography>
                Nous collectons des informations personnelles lorsque vous vous
                inscrivez sur notre site, créez un profil ou interagissez avec
                d'autres utilisateurs. Les types d'informations que nous pouvons
                recueillir incluent :
              </Typography>
              <Typography
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "black",
                      width: "0.5em",
                      height: "0.5em",
                      borderRadius: "50%",
                    }}
                  />
                }
              >
                Nom
              </Typography>
              <Typography
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "black",
                      width: "0.5em",
                      height: "0.5em",
                      borderRadius: "50%",
                    }}
                  />
                }
              >
                Adresse e-mail
              </Typography>
              <Typography
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "black",
                      width: "0.5em",
                      height: "0.5em",
                      borderRadius: "50%",
                    }}
                  />
                }
              >
                Informations de profil (photos, description, préférences)
              </Typography>
              <Typography
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "black",
                      width: "0.5em",
                      height: "0.5em",
                      borderRadius: "50%",
                    }}
                  />
                }
              >
                Messages et communications entre utilisateurs
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Utilisation des Informations :
              </Typography>
              <Typography>
                Les informations que nous collectons peuvent être utilisées pour
                : Améliorer notre service et personnaliser votre expérience Vous
                permettre de communiquer avec d'autres utilisateurs Vous envoyer
                des notifications importantes concernant votre compte Analyser
                l'utilisation du site pour en améliorer les fonctionnalités
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Protection des Informations :
              </Typography>
              <Typography>
                Nous mettons en œuvre des mesures de sécurité appropriées pour
                protéger vos informations personnelles contre toute perte,
                utilisation abusive ou accès non autorisé. Toutefois, aucun
                moyen de transmission sur Internet ou méthode de stockage
                électronique n'est 100 % sécurisé.
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Partage des Informations :
              </Typography>
              <Typography>
                Nous ne vendons ni ne louons vos informations personnelles à des
                tiers. Nous pouvons partager vos informations avec des
                prestataires de services de confiance qui nous aident à gérer
                notre site ou à vous fournir nos services, sous réserve qu'ils
                acceptent de maintenir la confidentialité de vos informations.
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Droits des Utilisateurs :
              </Typography>
              <Typography>
                Vous avez le droit d'accéder à vos informations personnelles, de
                demander leur correction ou leur suppression. Pour exercer ces
                droits, veuillez nous contacter à purrfectmatch@cmail.com.
              </Typography>
              <Typography
                component="h3"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Modifications de cette Politique :
              </Typography>
              <Typography>
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Nous vous informerons des
                modifications en publiant la nouvelle politique sur notre site.
              </Typography>
            </>
          )}

          {selectedItem?.text === "Se déconnecter" && (
            <>
              <Typography
                component="h2"
                sx={{ marginLeft: "8px", color: "black" }}
              >
                Tu veux faire une pause de ronrons?
              </Typography>
              <Typography>
                Ce n'est qu'un au revoir... Nous serons toujours là quand tu
                seras prêt(e) à revenir ronronner avec nous. Mais si tu es
                sûr(e) de vouloir te déconnecter pour une petite sieste, il te
                suffit d'appuyer sur le bouton ci-dessous.
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
          )}

          {selectedItem?.text === "Editer mon profil" && <EditProfileForm />}
          {selectedItem?.text === "Mes préférences de recherche" && (
            <Typography>
              Contenu spécifique pour Mes préférences de recherche
            </Typography>
          )}
          {selectedItem?.text === "Paramètre du compte" && (
            <Typography>Contenu spécifique pour Paramètre du compte</Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};
