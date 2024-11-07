import { useMessagesCatsQuery } from "../../generated/graphql-types";
import Autocomplete from "@mui/joy/Autocomplete";
import { ListMatchesMessages } from "../../components/ListMatchesMessages/ListMatchesMessages";
// import Input from '@mui/joy/Input';

import "./Matches.css";

export const Matches = () => {
  // TODO  ---- En attente de la feature de connexion -----
  const catId = 19;

  const { data, loading, error } = useMessagesCatsQuery({
    variables: {
      catId: catId,
    },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.matchedCats)
    return (
      <section className="matches-page-container">
        <Autocomplete
          options={data.matchedCats.map((cat) => cat.name)}
          sx={{ width: 300 }}
          color="primary"
        />
        <ListMatchesMessages />
      </section>
    );
};
