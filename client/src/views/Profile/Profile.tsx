import { NavLink } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import Input from "@mui/joy/Input";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Box, Chip } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import PetsIcon from "@mui/icons-material/Pets";
import DescriptionIcon from "@mui/icons-material/Description";
import CakeIcon from "@mui/icons-material/Cake";

import TransgenderIcon from "@mui/icons-material/Transgender";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InterestsIcon from "@mui/icons-material/Interests";
import "./Profile.css";

export const Profile = () => {
  return (
    <div>
      {/* Header ajouté en provisoire en attendant l'outlet */}
      <Header />
      <section className="profile-container">
        <section className="top-profile-container">
          <NavLink to="/options">
            <img
              src="/arrow-return.svg"
              alt="Icone de retour à la page précédente"
            />
          </NavLink>
          <div className="profile-title-page">
            <img src="/searchfilled.svg" alt="Icone de l'édition de profil" />
            <h2>Editer mon profil</h2>
          </div>
          <img
            src="/save-icone.png"
            className="save-icone"
            alt="Icone de sauvegarde"
          />
        </section>
        <form className="profile-input-container">
          <Input
            placeholder="Nom"
            color="primary"
            startDecorator={<PetsIcon color="primary" />}
          />
          <Textarea
            color="primary"
            startDecorator={<DescriptionIcon color="primary" />}
            placeholder="Description"
            minRows={1}
            sx={{
              width: "20.5rem",
            }}
          />
          <Input
            type="date"
            placeholder="Date de naissance"
            color="primary"
            startDecorator={<CakeIcon color="primary" />}
          />
          <Select
            startDecorator={<TransgenderIcon color="primary" />}
            color="primary"
            placeholder="Sexe"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: "20.5rem",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="male">Mâle</Option>
            <Option value="female">Femelle</Option>
            <Option value="other">Autre</Option>
          </Select>
          <Input
            placeholder="Couleur du poil"
            color="primary"
            startDecorator={<ColorLensIcon color="primary" />}
          />
          <Input
            placeholder="Location"
            color="primary"
            startDecorator={<LocationCityIcon color="primary" />}
          />
          <Select
            startDecorator={<InterestsIcon color="primary" />}
            color="primary"
            multiple
            defaultValue={["dog", "cat"]}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                {selected.map((selectedOption) => (
                  <Chip variant="soft" color="primary">
                    {selectedOption.label}
                  </Chip>
                ))}
              </Box>
            )}
            sx={{ width: "20.5rem" }}
            slotProps={{
              listbox: {
                sx: {
                  width: "100%",
                },
              },
            }}
          >
            <Option value="dog">Faire dodo</Option>
            <Option value="cat">Manger</Option>
            <Option value="fish">Dormir</Option>
            <Option value="bird">Un truc bizarre (je suis un chat)</Option>
          </Select>
        </form>
      </section>
    </div>
  );
};
