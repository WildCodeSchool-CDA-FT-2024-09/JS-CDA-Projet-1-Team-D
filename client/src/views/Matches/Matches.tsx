import { useMessagesCatsQuery } from "../../generated/graphql-types";
import { ListMatchesMessages } from "../../components/ListMatchesMessages/ListMatchesMessages";
import Autocomplete from "@mui/joy/Autocomplete";
// import Input from '@mui/joy/Input';

import "./Matches.css";

export const Matches = () => {
  // TODO  ---- En attente de la feature de connexion -----
  const catId = 9;

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
        <ListMatchesMessages matchedCats={data.matchedCats} />
      </section>
    );
};
