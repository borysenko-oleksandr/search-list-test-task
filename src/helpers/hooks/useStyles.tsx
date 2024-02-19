import React from "react";
import Theme from "../../types/styles";
import { colors, fontSize } from "../constants/styles";
import useOrientationListener, { Orientation } from "./useOrientationListener";

type Generator<T extends {}> = (theme: Theme, orientation: Orientation) => T;

const useStyles = <T extends {}>(fn: Generator<T>) => {
  const orientation = useOrientationListener();
  const theme = {
    colors,
    fontSize,
  };
  return React.useMemo(() => fn(theme, orientation), [fn, theme, orientation]);
};

export default useStyles;
