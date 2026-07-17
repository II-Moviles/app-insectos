import React, { useEffect, useState } from "react";

import { View, Text, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet } from "react-native";

export default function ProfileScreen() {
  const [nombre, setNombre] = useState("Jugador");

  const [puntaje, setPuntaje] = useState("0");

  const [capturas, setCapturas] = useState("0");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const usuario = await AsyncStorage.getItem("jugador");

    const puntos = await AsyncStorage.getItem("ultimoPuntaje");

    const totalCapturas = await AsyncStorage.getItem("capturas");

    if (usuario) {
      setNombre(usuario);
    }

    if (puntos) {
      setPuntaje(puntos);
    }

    if (totalCapturas) {
      setCapturas(totalCapturas);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/300",
        }}
        style={styles.avatar}
      />

      <Text style={styles.nombre}>{nombre}</Text>

      <View style={styles.card}>
        <Text style={styles.texto}>
          Puntaje máximo:
          {puntaje}
        </Text>

        <Text style={styles.texto}>
          Insectos capturados:
          {capturas}
        </Text>

        <Text style={styles.texto}>Nivel: Cazador Novato</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#101820",

    alignItems: "center",

    padding: 30,
  },

  avatar: {
    width: 150,

    height: 150,

    borderRadius: 75,

    marginTop: 40,

    marginBottom: 20,
  },

  nombre: {
    color: "#FFFFFF",

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 30,
  },

  card: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 20,
  },

  texto: {
    fontSize: 20,

    marginBottom: 15,

    color: "#333",

    fontWeight: "bold",
  },
});
