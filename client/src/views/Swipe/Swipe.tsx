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
  useSendDislikeMutation,
  useSendLikeMutation,
  useSwipeListQuery,
} from "../../generated/graphql-types";

const stackLength = 20;

export const Swipe = () => {
  const connectedCatId = 25;

  const { data, loading, error } = useSwipeListQuery({
    variables: {
      catId: connectedCatId,
    },
  });

  const [sendLikeMutation] = useSendLikeMutation();
  const [sendDislikeMutation] = useSendDislikeMutation();

  const dataCats = data?.swipeList?.slice(0, stackLength);

  const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });

  const [props, springApi] = useSprings(stackLength, (i) => ({
    ...to(i),
    from: from(),
  }));

  const [{ likeVsblt, iconScale, trans, op }, likeIconApi] = useSpring(() => ({
    likeVsblt: "hidden",
    iconScale: "1",
    trans: "0s",
    op: "50%",
  }));

  const [{ dislikeVsblt }, dislikeIconApi] = useSpring(() => ({
    dislikeVsblt: "hidden",
  }));

  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    likeIconApi.start(() => {
      return { likeVsblt: isLike ? "visible" : "hidden", trans: "0.1s" };
    });
    dislikeIconApi.start(() => {
      return { dislikeVsblt: isDislike ? "visible" : "hidden" };
    });
  }, [isLike, isDislike]);

  const handleLikeClick = () => {
    if (currentCardIndex >= stackLength) {
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

  const handleDislikeClick = () => {
    if (currentCardIndex >= stackLength) {
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

  const likeCat = async (catIndex: number) => {
    if (!dataCats || !dataCats[catIndex]) return;
    const catToLikeId = dataCats[catIndex].id;

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

  const dislikeCat = async (catIndex: number) => {
    if (!dataCats || !dataCats[catIndex]) return;
    const catToDislikeId = dataCats[catIndex].id;

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

  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    springApi.start((i) => {
      if (index !== i) return;
      if (mx >= 150) {
        if (!isLike) setIsLike(true);

        if (!down) {
          likeCat(index);
          setCurrentCardIndex(index + 1);
        }
        return { x: down ? mx : 1000, y: down ? my : 0 };
      }
      if (mx <= -150) {
        if (!isDislike) setIsDislike(true);

        if (!down) {
          dislikeCat(index);
          setCurrentCardIndex(index + 1);
        }
        return { x: down ? mx : -1000, y: down ? my : 0 };
      }
      if ((mx > -150 && mx < 180) || !down) {
        if (isLike) setIsLike(false);
        if (isDislike) setIsDislike(false);
      }
      return {
        x: down ? mx : 0,
        y: down ? my : 0,
        rot: down ? mx / 50 : 0,
        scale: down ? 1.1 : 1,
      };
    });
    if (!down) {
      setTimeout(() => {
        if (isLike) setIsLike(false);
        if (isDislike) setIsDislike(false);
      }, 300);
    }
    likeIconApi.start(() => {
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
              {dataCats && dataCats[i] && (
                <SwipeCard
                  {...dataCats[i]}
                  age={getCatAge(dataCats[i].birthday)}
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
