import save from "/Save.svg";
import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Select,
  Option,
  IconButton,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";

const EditProfileForm = () => {
  const [profile, setProfile] = useState({
    surname: "",
    description: "",
    birthDay: "",
    sexe: "",
    hair_color: "",
    city: "",
    available: "",
    breed: "",
    interests: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestsChange = (value: string[]) => {
    setProfile((prev) => ({ ...prev, interests: value }));
  };

  const handleSave = () => {
    console.info("Données sauvegardées :", profile);
  };

  return (
    <Box sx={{ paddingLeft: 4, position: "fixed" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography component="h2" sx={{ flexGrow: 1, color: "black" }}>
          Éditer mon profil
        </Typography>
        <IconButton onClick={handleSave} color="primary" variant="soft">
          Enregister
          <img
            src={save}
            alt="enregistrer"
            style={{ width: "24px", marginLeft: "8px" }}
          />
        </IconButton>
      </Box>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Surnom</FormLabel>
        <Input
          value={profile.surname}
          onChange={(e) => handleInputChange("surname", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={profile.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("description", e.target.value)
          }
          minRows={3}
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Date de naissance</FormLabel>
        <Input
          type="date"
          value={profile.birthDay}
          onChange={(e) => handleInputChange("birthDay", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Sexe</FormLabel>
        <Select
          value={profile.sexe}
          onChange={(e, value) => handleInputChange("sexe", value || "")}
        >
          <Option value="male">Mâle</Option>
          <Option value="female">Femelle</Option>
          <Option value="other">Autre</Option>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Couleur du poil</FormLabel>
        <Input
          value={profile.hair_color}
          onChange={(e) => handleInputChange("hair_color", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Ville</FormLabel>
        <Input
          value={profile.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          placeholder="Où ch'habite"
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Heure de disponibilité</FormLabel>
        <Input
          type="time"
          value={profile.available}
          onChange={(e) => handleInputChange("available", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Espèce</FormLabel>
        <Input
          value={profile.breed}
          onChange={(e) => handleInputChange("breed", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl>
        <FormLabel>Intérêts</FormLabel>
        <Select
          multiple
          value={profile.interests}
          onChange={(e, value) => handleInterestsChange(value)}
        >
          <Option value="Sieste">Sieste</Option>
          <Option value="Manger">Manger</Option>
          <Option value="Griffer le canapé">Griffer le canapé</Option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default EditProfileForm;
