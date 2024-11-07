import { useGetCatByIdQuery } from "../../generated/graphql-types";
import { Link, Navigate, To, useParams } from "react-router-dom";
import { useEffect } from "react";
import { calculateAge } from "../../utils/calculateAge";
import "./Profile.css";
import { convertTo24HourFormat } from "../../utils/convertTo24H";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useGetCatByIdQuery({
    variables: { getCatByIdId: parseFloat(id!) },
  });

  useEffect(() => {
    const audio = new Audio("/meow-1.mp3");
    audio.play();
  }, []);

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
              {name}, {calculateAge(birthday)}
            </h2>
            <h3 className="profileSurname">{surname}</h3>
            <section className="profile-description">
              <h4>Description: </h4>
              <p className="description">{description}</p>
              <h4>Disponibilité: </h4>
              <p>{convertTo24HourFormat(available)}</p>
              <h4>Centres d'intérêts :</h4>
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
  return <Navigate to="*" />;
}
