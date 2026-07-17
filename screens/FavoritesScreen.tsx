import React from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";

import { favoritesStyles } from "../styles/ScreensStyles";
import { insects } from "../data/insects";
import InsectCard from "../components/InsectCard";

interface Props {
  navigation: any;
}

export default function FavoritesScreen({ navigation }: Props) {
  return (
    <View style={favoritesStyles.container}>
      <Text style={favoritesStyles.title}>
        Mis Favoritos
      </Text>

      <FlatList
        data={insects}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <InsectCard
            insect={item}
            onPress={() =>
              navigation.navigate("Detalle", {
                insect: item,
              })
            }
          />
        )}
      />
    </View>
  );
}