import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export enum Orientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
}

const useOrientationListener = () => {
  const [orientation, setOrientation] = useState(Orientation.PORTRAIT);

  const handleOrientation = () => {
    if (Dimensions.get("window").width < Dimensions.get("window").height) {
      setOrientation(Orientation.PORTRAIT);
    } else {
      setOrientation(Orientation.LANDSCAPE);
    }
  };

  useEffect(() => {
    handleOrientation();
    const listener = Dimensions.addEventListener("change", handleOrientation);

    return () => {
      listener.remove();
    };
  }, []);

  return orientation;
};

export default useOrientationListener;
