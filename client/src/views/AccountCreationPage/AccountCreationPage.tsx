import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, To, useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { InputTime } from "../TimePicker/TimePicker";
import { useCatCreationMutation } from "../../generated/graphql-types";
import "./AccountCreationPage.css";

interface Cat {
  name: string;
  email: string;
  password: string;
  surname: string | null;
  description: string | null;
  birthday: string | null;
  sexe: string | null;
  hairColor: string | null;
  available: string | null;
  city: string | null;
  breed: string | null;
  urlPhoto: string | null;
}

function AccountCreationPage() {
  const [pwConfirmation, setPwConfirmation] = useState("");
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [cguBool, setCguBool] = useState(false);
  const { user } = useAuth();
  const [pwError, setPwError] = useState("");
  const [catCreation, { loading, error }] = useCatCreationMutation();
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();
  const [catData, setCatData] = useState({
    name: "",
    email: "",
    password: "",
    surname: "",
    description: "",
    birthday: null,
    sexe: "",
    hairColor: "",
    available: "",
    city: "",
    breed: "",
    urlPhoto: "",
  });

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setCatData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const setAvailable = (value: string) => {
    setCatData((prevData) => ({
      ...prevData,
      available: value,
    }));
  };

  const createCat = async (catData: Cat) => {
    const {
      name,
      email,
      password,
      surname,
      description,
      hairColor,
      sexe,
      city,
      breed,
      available,
      urlPhoto,
      birthday,
    } = catData;
    try {
      const { data } = await catCreation({
        variables: {
          data: {
            name,
            email,
            password,
            surname: surname || null,
            description: description || null,
            hair_color: hairColor || null,
            sexe: sexe || null,
            city: city || null,
            breed: breed || null,
            available: available || null,
            profile_picture: urlPhoto || null,
            birthday: birthday ? new Date(birthday) : null,
          },
        },
      });

      if (data?.catCreation) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!catData.email || !catData.password || !cguBool) return;
    if (catData.password !== pwConfirmation) {
      setPwError("Les mots de passe sont différents.");
      return;
    } else {
      setPwError("");
    }

    setAnimationClass("slide-out-left");
    setTimeout(() => {
      setShowOptionalFields(true);
      setAnimationClass("slide-in-right");
    }, 500);
  }

  async function completeSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!catData.email || !catData.password || !cguBool) return;

    try {
      const cat = await createCat(catData);

      if (cat?.catCreation === true) {
        setAnimationClass("fade-out");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        setCatData({
          name: "",
          email: "",
          password: "",
          surname: "",
          description: "",
          birthday: null,
          sexe: "",
          hairColor: "",
          available: "",
          city: "",
          breed: "",
          urlPhoto: "",
        });
        setPwConfirmation("");
        setCguBool(false);
        setShowOptionalFields(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const onSetDate = (e) => {
    const date = e.target.value;
    setCatData((prev) => ({
      ...prev,
      birthday: date,
    }));
  };

  const handleBacktoInitialForm = () => {
    setAnimationClass("slide-out-left");
    setTimeout(() => {
      setShowOptionalFields(false);
      setCguBool(false);
      setAnimationClass("slide-in-right");
    }, 500);
  };

  const handleIgnoreOptional = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCatData((prev) => ({
      ...prev,
      surname: "",
      description: "",
      birthday: null,
      sexe: "",
      hairColor: "",
      available: "",
      city: "",
      breed: "",
      urlPhoto: "",
    }));

    completeSubmit(e);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-co-ctn">
      <main className={`header-co-ctn ${animationClass}`}>
        <div className={`main-co-ctn ${animationClass}`}>
          <div>
            <div>
              {!showOptionalFields ? (
                <header className="co-ctn-txt">
                  <div className="arrow-ctn">
                    <Link to={-1 as To} className="return-link">
                      <img
                        src="/return-arrow.svg"
                        alt="Retour"
                        className="return-arrow"
                      />
                    </Link>
                  </div>
                  <h1>Trouves ton matou purr-fait</h1>
                  <p className="co-ctn-p">
                    Plus besoin de parcourir les rues pour trouver ta paire !
                  </p>
                </header>
              ) : (
                <div className="return-link">
                  <img
                    src="/return-arrow.svg"
                    alt="Retour"
                    className="return-arrow"
                    onClick={handleBacktoInitialForm}
                  />
                </div>
              )}
            </div>
          </div>

          {!showOptionalFields ? (
            <form onSubmit={handleInitialSubmit}>
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Name"
                variant="outlined"
                name="name"
                type="text"
                value={catData.name}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Email"
                variant="outlined"
                name="email"
                type="text"
                value={catData.email}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Mot de passe"
                variant="outlined"
                name="password"
                type="password"
                value={catData.password}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Confirmation mot de passe"
                variant="outlined"
                name="pwConfirmation"
                type="password"
                value={pwConfirmation}
                onChange={(e) => setPwConfirmation(e.target.value)}
              />
              <p className="co-ctn-error">
                {pwError ? pwError : error ? error.message : ""}
              </p>
              <div className="cgu-ctn">
                <Checkbox
                  label={
                    <div>
                      <div>J'ai lu et j'accepte les </div>
                    </div>
                  }
                  onClick={() => setCguBool(!cguBool)}
                />
                <Link className="cgu-ctn-link" to="#link">
                  CGU
                </Link>
              </div>
              <Button className="co-ctn-btn" type="submit">
                M'inscrire
              </Button>
            </form>
          ) : (
            <form onSubmit={completeSubmit}>
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="URL de ta photo de BG"
                variant="outlined"
                name="profile_photo_url"
                type="text"
                value={catData.urlPhoto}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Surnom"
                variant="outlined"
                name="surname"
                type="text"
                value={catData.surname}
                onChange={handleChange}
              />
              <Textarea
                className="co-ctn-form-input"
                color="primary"
                placeholder="Décris toi pour les faires rugi... ronronner !"
                minRows={5}
                maxRows={10}
                variant="outlined"
                name="description"
                value={catData.description}
                onChange={handleChange}
              />
              <Select
                className="co-ctn-form-input"
                color="primary"
                variant="outlined"
                value={catData.sexe}
                placeholder="Sexe"
                onChange={(_, value) =>
                  setCatData((prev) => ({
                    ...prev,
                    sexe: value as string,
                  }))
                }
              >
                <Option value="male">Mâle</Option>
                <Option value="female">Femelle</Option>
                <Option value="autre">Non-miaou</Option>
              </Select>
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Couleur du poil"
                variant="outlined"
                name="hairColor"
                type="text-area"
                value={catData.hairColor}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Ville"
                variant="outlined"
                name="city"
                type="text-area"
                value={catData.city}
                onChange={handleChange}
              />
              <Input
                className="co-ctn-form-input"
                color="primary"
                placeholder="Race"
                variant="outlined"
                name="breed"
                type="text-area"
                value={catData.breed}
                onChange={handleChange}
              />
              <div className="birthday-ctn">
                <label>Date de naissance</label>
                <Input
                  className="co-ctn-form-input"
                  type="date"
                  name="birthday"
                  onChange={(e) => onSetDate(e)}
                  slotProps={{
                    input: {
                      min: "2005-01-01",
                      max: "2023-12-31",
                    },
                  }}
                />
              </div>
              <InputTime
                available={catData.available}
                setAvailable={setAvailable}
              />
              <div className="complete-ctn">
                <button
                  className="ignore-ctn-btn"
                  onClick={(e) => handleIgnoreOptional(e)}
                >
                  Ignorer
                </button>
                <Button className="co-ctn-btn" type="submit">
                  Compléter
                </Button>
              </div>
            </form>
          )}
          <Link className="no-acc-ctn-link" to="/login">
            J'ai déjà un compte
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AccountCreationPage;
