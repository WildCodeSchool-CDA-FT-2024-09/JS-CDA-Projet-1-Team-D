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
import { UPDATE_CAT_PROFILE } from "../../schemas/mutation";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../context/AuthContext";

const EditProfileForm = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    id: user?.id ?? 0,
    surname: "",
    profile_picture: "",
    description: "",
    birthday: "",
    sexe: "",
    hair_color: "",
    city: "",
    available: "",
    breed: "",
    interests: [] as string[],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (value: string[]) => {
    setProfile((prev) => ({ ...prev, interests: value }));
  };

  const [updateCatProfile] = useMutation(UPDATE_CAT_PROFILE);

  const handleSave = async () => {
    try {
      const { data } = await updateCatProfile({
        variables: {
          updateCatProfileId: profile.id,
          data: {
            ...profile,
            interests: profile.interests.map((interest) => ({
              name: interest,
            })),
          },
        },
      });
      console.info("Profil mis à jour :", data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <Box sx={{ paddingLeft: 4, position: "fixed" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography component="h2" sx={{ flexGrow: 1, color: "black" }}>
          Éditer mon profil
        </Typography>
        <IconButton onClick={handleSave} color="primary" variant="soft">
          Enregistrer
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
          name="surname"
          value={profile.surname}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Photo</FormLabel>
        <Input
          name="profile_picture"
          value={profile.profile_picture}
          onChange={handleInputChange}
          placeholder="Url de la photo"
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={profile.description}
          onChange={handleInputChange}
          minRows={3}
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Date de naissance</FormLabel>
        <Input
          name="birthday"
          type="date"
          value={profile.birthday}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Sexe</FormLabel>
        <Select
          value={profile.sexe}
          onChange={(e, value) =>
            setProfile((prev) => ({ ...prev, sexe: value || "" }))
          }
        >
          <Option value="male">Mâle</Option>
          <Option value="female">Femelle</Option>
          <Option value="other">Autre</Option>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Couleur du poil</FormLabel>
        <Input
          name="hair_color"
          value={profile.hair_color}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Ville</FormLabel>
        <Input
          name="city"
          value={profile.city}
          onChange={handleInputChange}
          placeholder="Où ch'habite"
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Heure de disponibilité</FormLabel>
        <Input
          name="available"
          type="time"
          value={profile.available}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Espèce</FormLabel>
        <Input
          name="breed"
          value={profile.breed}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      <FormControl>
        <FormLabel>Intérêts</FormLabel>
        <Select
          multiple
          value={profile.interests}
          onChange={(e, value) => handleInterestsChange(value)}
          sx={{ mb: 4 }}
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
