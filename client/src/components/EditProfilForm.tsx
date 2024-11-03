import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Textarea,
} from "@mui/joy";
import { SelectChangeEvent } from "@mui/material";
const EditProfileForm = () => {
  const [profile, setProfile] = useState({
    surname: "",
    description: "",
    birthDay: "",
    sexe: "",
    hair_color: "",
    address: "",
    available: "",
    breed: "",
    interests: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setProfile({
      ...profile,
      interests: event.target.value as string[],
    });
  };

  const handleSave = () => {
    console.info("Données sauvegardées :", profile);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography component="h2" sx={{ flexGrow: 1, color: "black" }}>
          Éditer mon profil
        </Typography>
        <IconButton onClick={handleSave} color="primary">
          <SaveIcon />
        </IconButton>
      </Box>

      <TextField
        label="Surnom"
        value={profile.surname}
        onChange={(e) => handleInputChange("surname", e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Textarea
        component="textarea"
        label="Description"
        value={profile.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        minRows={3}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Date de naissance"
        type="date"
        value={profile.birthDay}
        onChange={(e) => handleInputChange("birthDay", e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <Typography>Sexe</Typography>
      <Select
        value={profile.sexe}
        onChange={(e) => handleInputChange("sexe", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="male">Mâle</MenuItem>
        <MenuItem value="female">Femelle</MenuItem>
        <MenuItem value="other">Autre</MenuItem>
      </Select>

      <TextField
        label="Couleur du poil"
        value={profile.hair_color}
        onChange={(e) => handleInputChange("hair_color", e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Adresse"
        value={profile.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
        placeholder="Où ch'habite"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <img src="/geolocation.svg" alt="géolocalisation" />,
        }}
      />

      <TextField
        label="Heure de disponibilité"
        type="time"
        value={profile.available}
        onChange={(e) => handleInputChange("available", e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Espèce"
        value={profile.breed}
        onChange={(e) => handleInputChange("breed", e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography>Intérêts</Typography>
      <Select
        multiple
        value={profile.interests}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="Sieste">Sieste</MenuItem>
        <MenuItem value="Manger">Manger</MenuItem>
        <MenuItem value="Griffer le canapé">Griffer le canapé</MenuItem>
      </Select>
    </Box>
  );
};

export default EditProfileForm;
