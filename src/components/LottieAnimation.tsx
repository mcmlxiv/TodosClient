import React from "react";
import Lottie from "react-lottie";
import animationData from "../56438-man-with-task-list.json";
import { makeStyles, Container } from "@material-ui/core";

//// styling

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
//Lottie Animation in SideBar
const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Lottie options={defaultOptions} height={350} width={350} />
    </Container>
  );
};

export default LottieAnimation;
