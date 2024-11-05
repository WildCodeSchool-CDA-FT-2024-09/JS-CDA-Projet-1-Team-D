import "./Profile.css";

import { useGetCatByIdQuery } from "../../generated/graphql-types";
import { Link, Navigate, To, useParams } from "react-router-dom";
import { useEffect } from "react";
import { calculateAge } from "../../services/calculateAge";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useGetCatByIdQuery({
    variables: { getCatByIdId: parseFloat(id!) },
  });

  useEffect(() => {
    const audio = new Audio("/meow-1.mp3");
    audio.play();
  }, []);

  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);
    let adjustedHours = hours;
    if (modifier === "PM" && adjustedHours !== 12) {
      adjustedHours += 12; // Convertir PM en format 24h
    } else if (modifier === "AM" && adjustedHours === 12) {
      adjustedHours = 0; // Convertir 12 AM en 0 heures
    }
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error: {error.message}</p>;
  if (data && data.getCatById) {
    const {
      name,
      profile_picture,
      birthday,
      description,
      surname,
      available,
      interests,
    } = data.getCatById;
    const age = calculateAge(birthday);

    const availableIn24h = convertTo24HourFormat(available);

    return (
      <>
        <article className="profile-section">
          <Link to={-1 as To} className="return-link">
            <img
              src="/return-arrow.svg"
              alt="Retour"
              className="return-arrow"
            />
          </Link>
          <img
            className="profile-picture"
            src={profile_picture}
            alt={`Photo de ${name}`}
          />
          <section className="profile-content">
            <h2 className="profile-title">
              {name}, {age}
            </h2>
            <h3 className="profile-surname">{surname}</h3>
            <section className="profile-description">
              <h3>Description: </h3>
              <p className="description">{description}</p>
              <h3>Disponibilité: </h3>
              <p>{availableIn24h}</p>
              <h3>Centres d'intérêts :</h3>
              <ul className="interest-list">
                {interests?.map((interest) => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </section>
          </section>
        </article>
      </>
    );
  }
  return <Navigate to="/404" />;
}
