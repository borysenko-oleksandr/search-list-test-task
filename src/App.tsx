/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeStore } from "./redux/store";
import { Provider } from "react-redux";
import Navigation from "./navigation";

function App(): JSX.Element {
  const store = useMemo(() => initializeStore(), []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
