import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Camera from "./../screens/camera";
import Result from "./../screens/result";
import Home from "./../screens/home";
import Setting from "./../screens/setting";
import SignIn from "./../screens/signin";

import { Context } from "../context";

const Stack = createStackNavigator();
const Navigation = () => {
  const { config } = useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!config.token ? (
          <Stack.Screen name="sign" component={SignIn} />
        ) : (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="scanner" component={Camera} />
            <Stack.Screen name="result" component={Result} />
            <Stack.Screen name="setting" component={Setting} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
