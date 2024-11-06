import { useState } from "react";
import { ListLikesPages } from "../../components/ListLikesPage/ListLikesPage";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "./Likes.css";

export const Likes = () => {
  // TODO  ---- En attente de la feature de connexion -----
  const catId = 5;

  const [likeView, setLikeView] = useState("likes");

  return (
    <section className="likes-container">
      <section className="likes-title-page">
        <h2>
          Mes coups de patte :
          {/* <span className="liked-cats-count"> {catsListing.length}</span> */}
        </h2>
        <Select
          className="select-likes"
          variant="soft"
          color="primary"
          value={likeView}
          onChange={(_, value) => setLikeView(value as string)}
        >
          <Option value="likes">Likes</Option>
          <Option value="matches">Matchs</Option>
        </Select>
      </section>
      <ListLikesPages catId={catId} likeView={likeView} />
    </section>
  );
};
