export enum MainScreens {
  LIST = "List",
  DETAILS = "Details",
}

export type MainStackParamList = {
  [MainScreens.LIST]: undefined;
  [MainScreens.DETAILS]: { id: string };
};
