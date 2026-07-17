import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet } from "react-native";

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState("");

  const ingresar = async () => {
    if (usuario.trim() === "") {
      Alert.alert("Error", "Ingrese un nombre de jugador");

      return;
    }

    await AsyncStorage.setItem("jugador", usuario);

    navigation.replace("Principal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caza Insectos</Text>

      <Text style={styles.subtitle}>Ingrese su nombre</Text>

      <TextInput
        style={styles.input}
        placeholder="Jugador"
        placeholderTextColor="#999"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TouchableOpacity style={styles.button} onPress={ingresar}>
        <Text style={styles.buttonText}>Jugar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#101820",

    justifyContent: "center",

    padding: 30,
  },

  title: {
    fontSize: 35,

    fontWeight: "bold",

    color: "#FFFFFF",

    textAlign: "center",

    marginBottom: 20,
  },

  subtitle: {
    color: "#FFFFFF",

    fontSize: 20,

    textAlign: "center",

    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFFFFF",

    padding: 15,

    borderRadius: 10,

    fontSize: 18,

    marginBottom: 20,
  },

  button: {
    backgroundColor: "#27AE60",

    padding: 15,

    borderRadius: 10,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "bold",
  },
});
