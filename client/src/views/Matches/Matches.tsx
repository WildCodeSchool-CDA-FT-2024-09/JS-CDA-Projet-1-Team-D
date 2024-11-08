import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMessagesCatsQuery } from "../../generated/graphql-types";
import { ListMatchesMessages } from "../../components/ListMatchesMessages/ListMatchesMessages";
import { useAuth } from "../../context/AuthContext";
export const Matches = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data, loading, error, refetch } = useMessagesCatsQuery({
    variables: {
      catId: user.id,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.matchedCats)
    return (
      <>
        <ListMatchesMessages matchedCats={data.matchedCats} />
      </>
    );
};
