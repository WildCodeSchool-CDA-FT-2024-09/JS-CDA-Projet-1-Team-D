import Favorite from "@mui/icons-material/Favorite";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/joy/IconButton";
import "./Swipe.css";
import { SwipeCard } from "../../components/SwipeCard/SwipeCard";

const mockedInterests = [
  "Caresses",
  "Dormir",
  "Marcher sur le clavier de mon maître",
];

import { useSpring, useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { CSSProperties, useEffect, useState } from "react";
import {
  Cat,
  // useLikedCatsQuery,
  useSendDislikeMutation,
  useSendLikeMutation,
  useSwipeListQuery,
} from "../../generated/graphql-types";

const stackLength = 5;
const connectedCatId = 25;

export const Swipe = () => {
  // Cursor pour savoir où on en est dans la liste entière des chats
  const [catsListCursor, setCatsListCursor] = useState(stackLength);

  // Partie de la liste entière des chats (egale à stacklength), pour ne pas tous les afficher d'un coup
  const [currentCatsList, setCurrentCatsList] = useState<Cat[]>([]);

  // Index de la carte (entre 0 et stacklength) sur laquelle on est
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // State pour les like et dislike, pour le style uniquement
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  // Mutations et queries
  const [sendLikeMutation] = useSendLikeMutation();
  const [sendDislikeMutation] = useSendDislikeMutation();

  const { data, loading, error, refetch } = useSwipeListQuery({
    variables: {
      catId: connectedCatId,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
  }, []);

  // Remplissage de la liste de chats à afficher,
  // se met à jour à chaque fois que le cursor change ou data se remplit
  useEffect(() => {
    const updatedCatsList: Cat[] = data?.swipeList?.slice(
      catsListCursor - stackLength,
      catsListCursor
    );
    if (updatedCatsList) setCurrentCatsList(updatedCatsList);
  }, [data, catsListCursor]);

  // Fonction appellée à chaque fois qu'il n'y a plus de carte à swipe
  // pour augmenter le curseur et donc trigger le useEffect qui remplira la liste des chats à afficher
  // avec les profils suivants
  const nextPagination = () => {
    // On rajoute 'stacklength' au cursor car c'est le nombre de carte
    // qu'on veut afficher à chaque fois (à determiner)
    setCatsListCursor((prev) => prev + stackLength);

    // On remet l'index de la carte courante à zero, car on a redistribué des cartes
    setCurrentCardIndex(0);
  };

  // Tout ici est relatif à Springs, et donc aux animations des cartes
  // et des icones like et dislike

  const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });

  const [props, springApi] = useSprings(
    stackLength,
    (i) => ({
      ...to(i),
      from: from(),
    }),
    [currentCatsList]
  );

  const [{ likeVsblt, iconScale, trans, op }, likeIconApi] = useSpring(() => ({
    likeVsblt: "hidden",
    iconScale: "1",
    trans: "0s",
    op: "50%",
  }));

  const [{ dislikeVsblt }, dislikeIconApi] = useSpring(() => ({
    dislikeVsblt: "hidden",
  }));

  useEffect(() => {
    likeIconApi.start(() => {
      return { likeVsblt: isLike ? "visible" : "hidden", trans: "0.1s" };
    });
    dislikeIconApi.start(() => {
      return { dislikeVsblt: isDislike ? "visible" : "hidden" };
    });
  }, [isLike, isDislike]);

  // fonction qui appelle la mutation sendLike
  const likeCat = async (catIndex: number) => {
    if (!currentCatsList || !currentCatsList[catIndex]) return;
    const catToLikeId = currentCatsList[catIndex].id;

    try {
      await sendLikeMutation({
        variables: {
          catId1: connectedCatId,
          catId2: catToLikeId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // fonction qui appelle la mutation sendDislike
  const dislikeCat = async (catIndex: number) => {
    if (!currentCatsList || !currentCatsList[catIndex]) return;
    const catToDislikeId = currentCatsList[catIndex].id;

    try {
      await sendDislikeMutation({
        variables: {
          catId1: connectedCatId,
          catId2: catToDislikeId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Fonction qui se declenche au clique du bouton like
  const handleLikeClick = () => {
    if (currentCardIndex >= stackLength) {
      nextPagination();
      return;
    }
    setIsLike(true);
    likeCat(currentCardIndex);
    springApi.start((i) => {
      if (i === currentCardIndex) {
        setCurrentCardIndex(currentCardIndex + 1);
        return { x: 1000, y: 0 };
      }
      return {};
    });
    setTimeout(() => setIsLike(false), 300);
  };

  // Fonction qui se declenche au clique du bouton dislike
  const handleDislikeClick = () => {
    if (currentCardIndex >= stackLength) {
      nextPagination();
      return;
    }
    setIsDislike(true);
    dislikeCat(currentCardIndex);
    springApi.start((i) => {
      if (i === currentCardIndex) {
        setCurrentCardIndex(currentCardIndex + 1);
        return { x: -1000, y: 0 };
      }
      return {};
    });
    setTimeout(() => setIsDislike(false), 300);
  };

  // Hook useDrag de la librairie react-use-gesture nous permettant d'utiliser
  // l'évenement 'drag' (glisser) sur des divs selectionnées
  // On assigne cette fonction 'bind' aux divs pour lesquelles on aimerait utiliser
  // l'evenement drag et toutes les conditions qu'on y ajoute
  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    // Ici on va mapper parmi tous les "springs"
    // aka toutes les animations (ici une par carte)
    springApi.start((i) => {
      // Si on est pas sur la carte courante on ne fait rien
      if (index !== i) return;

      // Si la carte (à l'évenement drag, glisser) se situe
      // à 150px du centre de la page ou superieur
      if (mx >= 150) {
        // On passe le state de like à true
        if (!isLike) setIsLike(true);

        // Si on a relaché le clic (ça veut dire on a liké)
        if (!down) {
          // On like le cat
          likeCat(index);
          // On passe à l'index du cat suivant
          setCurrentCardIndex(index + 1);
        }
        // On envoie la carte courante voler à droite bien loin
        // Comme ça on la voit plus
        return { x: down ? mx : 1000, y: down ? my : 0 };
      }

      // Si la carte (à l'évenement drag, glisser) se situe
      // à -150px du centre de la page ou inferieur
      if (mx <= -150) {
        // Meme logique mais inverse que pour le like au dessus
        if (!isDislike) setIsDislike(true);

        if (!down) {
          dislikeCat(index);
          setCurrentCardIndex(index + 1);
        }
        return { x: down ? mx : -1000, y: down ? my : 0 };
      }

      // Si la carte se trouve au centre entre les
      // deux breakpoint
      if ((mx > -150 && mx < 180) || !down) {
        // On annule les states de like/dislike
        // (pour retirer le coeur ou la croix)
        if (isLike) setIsLike(false);
        if (isDislike) setIsDislike(false);
      }

      // Dans tous les autres cas si la souris est en clic (down)
      // on retourne la position actuelle: la carte restera sous la souris donc
      // SINON (si on a laché le clic) on la remet au centre de l'écran
      return {
        x: down ? mx : 0,
        y: down ? my : 0,
        rot: down ? mx / 50 : 0,
        scale: down ? 1.1 : 1,
      };
    });

    // Ici on est en dehors du spring mais toujours dans le hook drag
    // Pour detecter si on lache le clic de souris
    if (!down) {
      // si c'est le cas, comme au dessus on annule les states de like/dislike
      // (pour retirer le coeur ou la croix) mais apres un petit temps pour
      // montrer à l'user le like ou non like qu'il a fait
      setTimeout(() => {
        if (isLike) setIsLike(false);
        if (isDislike) setIsDislike(false);
      }, 300);
    }

    // Ici on est sur le spring uniquement relié aux icones like et dislike
    likeIconApi.start(() => {
      // On joue avec l'opacité des icones en fonction de si on est
      // dans la zone de breakpoint ou pas
      if (mx >= 150) {
        return { op: `${50 + mx / 5}%`, iconScale: `${0.5 + mx / 4}%` };
      }
      if (mx <= -150) {
        return { op: `${50 + -mx / 5}%`, iconScale: `${0.5 + -mx / 4}%` };
      }
    });
  });

  const getCatAge = (birthDate: Date) => {
    const toto = new Date(birthDate);
    const ageDifMs = Date.now() - toto.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Erreur</p>;
  if (data && data.swipeList)
    return (
      <section className="swipe-container">
        <h2 className="swipe-title">Trouve le matou de tes rêves</h2>
        <animated.div
          style={{
            visibility: likeVsblt as unknown as CSSProperties["visibility"],
            scale: iconScale,
            transition: trans,
            zIndex: 50,
            opacity: op,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1
            className="swipe-right-icon"
            style={{
              position: "absolute",
              top: "40%",
              fontSize: "200px",
              zIndex: 1,
            }}
          >
            <Favorite style={{ color: "var(--color-secondary)" }} />
          </h1>
        </animated.div>
        <animated.div
          style={{
            visibility: dislikeVsblt as unknown as CSSProperties["visibility"],
            scale: iconScale,
            transition: trans,
            zIndex: stackLength + 10,
            opacity: op,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1
            className="swipe-left-icon"
            style={{
              position: "absolute",
              top: "40%",
              fontSize: "200px",
              zIndex: 1,
            }}
          >
            <Close style={{ color: "var(--color-red)" }} />
          </h1>
        </animated.div>

        <section className="swipe-content">
          {props.map(({ x, y, rot, scale }, i) => (
            <animated.div
              key={i}
              {...bind(i)}
              style={{
                x,
                y,
                rotate: rot,
                cursor: "pointer",
                scale,
                position: "absolute",
                zIndex: -i + stackLength + 1,
                userSelect: "none",
                touchAction: "none",
              }}
            >
              {currentCatsList && currentCatsList[i] && (
                <SwipeCard
                  {...currentCatsList[i]}
                  age={getCatAge(currentCatsList[i].birthday)}
                  interests={mockedInterests}
                />
              )}
            </animated.div>
          ))}
          <section className="swipe-action-buttons">
            <IconButton
              size="lg"
              variant="solid"
              onClick={handleDislikeClick}
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                backgroundColor: "var(--color-red)",
              }}
            >
              <Close sx={{ fontSize: 40, fontWeight: "bold" }} />
            </IconButton>
            <IconButton
              size="lg"
              variant="solid"
              onClick={handleLikeClick}
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              <Favorite sx={{ fontSize: 35 }} />
            </IconButton>
          </section>
        </section>
      </section>
    );
};
