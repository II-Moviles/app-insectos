import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

import LoginScreen from "../screens/LoginScreen";

import DetailScreen from "../screens/DetailScreen";

import FavoritesScreen from "../screens/FavoritesScreen";

import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Principal"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Detalle" component={DetailScreen} />

        <Stack.Screen name="Favoritos" component={FavoritesScreen} />

        <Stack.Screen name="Perfil" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
