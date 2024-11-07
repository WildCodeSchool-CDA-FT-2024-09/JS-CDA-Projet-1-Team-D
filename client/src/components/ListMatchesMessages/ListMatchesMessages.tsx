import { MatchMessage } from "../MatchMessage/MatchMessage";
import { MatchedCat } from "../../types/CatTypes";

interface ListMatchesMessagesProps {
  matchedCats: MatchedCat[];
}

export const ListMatchesMessages = ({
  matchedCats,
}: ListMatchesMessagesProps) => {
  return (
    <>
      {matchedCats.map((cat) => (
        <MatchMessage
          key={cat.id}
          name={cat.name}
          profile_picture={cat.profile_picture}
        />
      ))}
    </>
  );
};
