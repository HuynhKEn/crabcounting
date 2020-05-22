import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Camera from "./../screens/camera";
import Home from "./../screens/home";
import Setting from "./../screens/setting";
import HostProvider from "../context";

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <HostProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="scanner" component={Camera} />
          <Stack.Screen name="setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </HostProvider>
  );
};
export default Navigation;
