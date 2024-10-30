import "../../index.css";
import "./Profil.css";

import { useGetCatByIdQuery } from "../../generated/graphql-types";
import { Navigate, useParams } from "react-router-dom";

export default function Profil() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useGetCatByIdQuery({
    variables: { getCatByIdId: parseFloat(id!) },
  });

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
    const birthDate = new Date(birthday);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference = new Date().getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && new Date().getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return (
      <>
        <section className="profil-section">
          <img
            className="profil-picture"
            src={profile_picture}
            alt={`Photo de ${name}`}
          />
          <section className="profil-content">
            <h2 className="profil-title">
              {name}, {age}
            </h2>
            <h3 className="profil-surname">{surname}</h3>
            <footer className="profil-description">
              <h3>Description: </h3>
              <p>{description}</p>
              <h3>Disponibilité: </h3>
              <p>{available}</p>
              <h3>Centres d'intérêts :</h3>
              <ul className="interest-list">
                {interests?.map((interest) => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </footer>
          </section>
        </section>
      </>
    );
  }
  return <Navigate to="/404" />;
}
