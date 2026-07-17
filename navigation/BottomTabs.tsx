import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import ScoreScreen from "../screens/ScoreScreen";

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
    </Tab.Navigator>
  );
}

<Tab.Screen

name="Perfil"

component={ProfileScreen}

options={{
headerShown:false
}}

/>