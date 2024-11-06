import { Box, Typography } from "@mui/joy";

const PrivacyPolicyContent = () => (
  <>
    <Typography component="h2" sx={{ marginLeft: "8px", color: "black" }}>
      Règles de Confidentialité
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Introduction :
    </Typography>
    <Typography>
      Chez Purrfect Match, nous respectons votre vie privée et nous nous
      engageons à protéger vos informations personnelles. Cette politique de
      confidentialité décrit comment nous recueillons, utilisons et protégeons
      vos données lorsque vous utilisez notre service.
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Collecte d'Informations :
    </Typography>
    <Typography>
      Nous collectons des informations personnelles lorsque vous vous inscrivez
      sur notre site, créez un profil ou interagissez avec d'autres
      utilisateurs. Les types d'informations que nous pouvons recueillir
      incluent :
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
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Utilisation des Informations :
    </Typography>
    <Typography>
      Les informations que nous collectons peuvent être utilisées pour :
      Améliorer notre service et personnaliser votre expérience Vous permettre
      de communiquer avec d'autres utilisateurs Vous envoyer des notifications
      importantes concernant votre compte Analyser l'utilisation du site pour en
      améliorer les fonctionnalités
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Protection des Informations :
    </Typography>
    <Typography>
      Nous mettons en œuvre des mesures de sécurité appropriées pour protéger
      vos informations personnelles contre toute perte, utilisation abusive ou
      accès non autorisé. Toutefois, aucun moyen de transmission sur Internet ou
      méthode de stockage électronique n'est 100 % sécurisé.
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Partage des Informations :
    </Typography>
    <Typography>
      Nous ne vendons ni ne louons vos informations personnelles à des tiers.
      Nous pouvons partager vos informations avec des prestataires de services
      de confiance qui nous aident à gérer notre site ou à vous fournir nos
      services, sous réserve qu'ils acceptent de maintenir la confidentialité de
      vos informations.
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Droits des Utilisateurs :
    </Typography>
    <Typography>
      Vous avez le droit d'accéder à vos informations personnelles, de demander
      leur correction ou leur suppression. Pour exercer ces droits, veuillez
      nous contacter à purrfectmatch@cmail.com.
    </Typography>
    <Typography component="h3" sx={{ marginLeft: "8px", color: "black" }}>
      Modifications de cette Politique :
    </Typography>
    <Typography>
      Nous nous réservons le droit de modifier cette politique de
      confidentialité à tout moment. Nous vous informerons des modifications en
      publiant la nouvelle politique sur notre site.
    </Typography>
  </>
);

export default PrivacyPolicyContent;
