import React from "react";
import Lottie from "react-lottie";
import animationTick from "../18074-tick-bounce.json";

//Landing Lottie animation display after App name on first render
const LottieAnimation = () => {
  const defaultOptions = {
    loop: 2.5,
    autoplay: true,
    animationData: animationTick,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={90} width={90} />
    </div>
  );
};

export default LottieAnimation;
