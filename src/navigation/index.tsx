import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./stacks";
import { MainScreens } from "./types";
import Details from "../screens/Details";
import List from "../screens/List";

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name={MainScreens.LIST}
          component={List}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name={MainScreens.DETAILS}
          component={Details}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
