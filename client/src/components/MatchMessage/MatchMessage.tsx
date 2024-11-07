import Avatar from "@mui/joy/Avatar";
import "./MatcheMessage.css";

interface MatchMessageProps {
  name: string;
  profile_picture: string;
}

export const MatchMessage = ({ name, profile_picture }: MatchMessageProps) => {
  return (
    <article className="match-message-container">
      <Avatar
        alt={`photo de profil de ${name}`}
        src={profile_picture}
        color="primary"
        variant="outlined"
        size="lg"
      />
      <div>
        <h5>{name}</h5>
        <p className="notif-message">Tu as un match! Viens faire des ron...</p>
      </div>
    </article>
  );
};
