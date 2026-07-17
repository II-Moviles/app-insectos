import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { detailStyles } from "../styles/ScreensStyles";
import Colors from "../styles/colors";

interface Props {
  route: any;
}

export default function DetailScreen({ route }: Props) {
  const { insect } = route.params;

  return (
    <ScrollView style={detailStyles.container}>
      <Image
        source={{ uri: insect.imagen }}
        style={detailStyles.image}
      />

      <View style={detailStyles.content}>
        <Text style={detailStyles.title}>
          {insect.nombre}
        </Text>

        <Text style={detailStyles.species}>
          Especie: {insect.especie}
        </Text>

        <Text style={detailStyles.level}>
          Dificultad: {insect.dificultad}
        </Text>

        <Text style={detailStyles.points}>
          Puntos: {insect.puntos}
        </Text>

        <Text style={detailStyles.description}>
          {insect.descripcion}
        </Text>

        <TouchableOpacity style={detailStyles.button}>
          <Text style={detailStyles.buttonText}>
            Atrapar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            detailStyles.button,
            { backgroundColor: Colors.secondary },
          ]}
        >
          <Text style={detailStyles.buttonText}>
            Agregar a Favoritos
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}