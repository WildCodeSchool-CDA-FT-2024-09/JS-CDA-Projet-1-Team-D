import { useMessagesCatsQuery } from "../../generated/graphql-types";
import { ListMatchesMessages } from "../../components/ListMatchesMessages/ListMatchesMessages";

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
        <ListMatchesMessages matchedCats={data.matchedCats} />
      </section>
    );
};
