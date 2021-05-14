import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import LottieCheckMark from "./LottieCheckMark";
import { showLoading } from "../types.model";
import Typography from "@material-ui/core/Typography";

//Variants for controlling motion elements
const divVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};
const lottieVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.75,
      duration: 3,
    },
  },
};

const childVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Landing = ({ showLoading }: showLoading) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showLoading && ( //showLoading to show on Home
        <motion.div
          className="landing"
          //framer props variants
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { ease: "easeInOut" } }}
        >
          <motion.div
            variants={divVariants}
            initial={"hidden"}
            animate={"visible"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              variants={divVariants}
              initial={"hidden"}
              animate={"visible"}
            >
              <motion.div
                style={{ paddingRight: "0.3rem" }}
                variants={childVariant}
              >
                <Typography variant={"h5"}>Remember</Typography>
              </motion.div>
              <motion.div
                style={{ paddingRight: "0.3rem" }}
                variants={childVariant}
              >
                <Typography variant={"h5"}>To</Typography>
              </motion.div>
              <motion.div
                style={{ paddingRight: "0.3rem" }}
                variants={childVariant}
              >
                <Typography variant={"h5"}>Do!</Typography>
              </motion.div>
            </motion.div>
            <br />
            <motion.div
              //Lottie Tick animation
              //Appears after Text displays
              style={{
                paddingRight: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
              }}
              variants={lottieVariants}
            >
              <LottieCheckMark />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Landing;
