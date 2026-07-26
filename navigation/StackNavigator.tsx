import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";
import DetailScreen from "../screens/DetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: "Registro",
          }}
        />

        <Stack.Screen
          name="Principal"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Detalle"
          component={DetailScreen}
          options={{
            title: "Detalle",
          }}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{
            title: "Favoritos",
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            title: "Perfil",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}