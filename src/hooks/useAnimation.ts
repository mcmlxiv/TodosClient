import { useState } from "react";

const useAnimation = () => {
  //loading animation title screen
  const [showLoading, setShowLoading] = useState(true);

  setTimeout(() => {
    setShowLoading(false); //hide modal di
    //setting background to prev state
  }, 4100);

  return { showLoading, setShowLoading };
};

export { useAnimation };
