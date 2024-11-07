import { MatchMessage } from "../MatchMessage/MatchMessage";
import { MatchedCat } from "../../types/CatTypes";
import "./ListMatchesMessages.css";

interface ListMatchesMessagesProps {
  matchedCats: MatchedCat[];
}

export const ListMatchesMessages = ({
  matchedCats,
}: ListMatchesMessagesProps) => {
  return (
    <ul className="list-messages-style">
      {matchedCats.map((cat) => (
        <MatchMessage
          key={cat.id}
          name={cat.name}
          profile_picture={cat.profile_picture}
        />
      ))}
    </ul>
  );
};
