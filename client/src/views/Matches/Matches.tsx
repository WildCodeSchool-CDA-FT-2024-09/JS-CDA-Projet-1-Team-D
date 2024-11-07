import { Navigate } from "react-router-dom";
import { useMessagesCatsQuery } from "../../generated/graphql-types";
import { ListMatchesMessages } from "../../components/ListMatchesMessages/ListMatchesMessages";
import { useAuth } from "../../context/AuthContext";
export const Matches = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data, loading, error } = useMessagesCatsQuery({
    variables: {
      catId: user.id,
    },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.matchedCats)
    return (
      <>
        <ListMatchesMessages matchedCats={data.matchedCats} />
      </>
    );
};
