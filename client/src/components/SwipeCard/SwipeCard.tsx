import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import "./SwipeCard.css";
import { Interest } from "../../generated/graphql-types";

type Cat = {
  name: string;
  surname: string;
  age: number;
  interests: Interest[];
  profile_picture: string;
};

const interestEmojis = ["💖", "🎉", "🌷"];

export const SwipeCard = ({
  name,
  surname,
  age,
  interests,
  profile_picture,
}: Cat) => {
  return (
    <Card
      sx={{
        height: 460,
        width: 380,
        borderRadius: "40px",
        boxShadow:
          "0 12.5px 50px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
      }}
    >
      <CardCover>
        <img
          src={profile_picture}
          loading="lazy"
          alt={`${name}'s profile picture`}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="title-lg" textColor="#fff">
          {name}, {age}
        </Typography>
        <Typography textColor="#fff">{surname}</Typography>
        <ul className="swipe-card-interests-list">
          {interests.map((interest, index) => {
            return (
              <li key={index}>
                <Chip
                  startDecorator={`${interestEmojis[index]} ${interest.name}`}
                  sx={{
                    backgroundColor: "#FBF7E5",
                    border: "1px solid #E65A0F",
                  }}
                ></Chip>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
