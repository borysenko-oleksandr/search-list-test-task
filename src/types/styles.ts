export type Colors = {
  text: string;
  gray: string;
  black: string;
  white: string;
  skeleton: string;
  whiteTransparent: string;
};

export type FontSize = {
  title: number;
  big: number;
  medium: number;
  regular: number;
};

type Theme = {
  fontSize: FontSize;
  colors: Colors;
};

export default Theme;
