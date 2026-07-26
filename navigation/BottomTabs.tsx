import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";

import ScoreScreen from "../screens/ScoreScreen";

import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Juego"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Puntajes"
        component={ScoreScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
