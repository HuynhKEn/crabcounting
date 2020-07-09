import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import Navigation from "./src/navigation";

import HostProvider from "./src/context";
import { FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";
function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <HostProvider>
        <Navigation />
      </HostProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
