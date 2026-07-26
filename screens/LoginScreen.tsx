import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { iniciarSesion } from "../Services/auth";

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const ingresar = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Error",
        "Ingrese el correo y la contraseña."
      );

      return;
    }

    const respuesta = await iniciarSesion(
      email,
      password
    );

    if (!respuesta.success) {
      Alert.alert(
        "Inicio de sesión",
        respuesta.message
      );

      return;
    }

    navigation.replace("Principal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Caza Insectos
      </Text>

      <Text style={styles.subtitle}>
        Iniciar sesión
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={ingresar}
      >
        <Text style={styles.buttonText}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          navigation.navigate("Registro")
        }
      >
        <Text style={styles.registerText}>
          ¿No tienes cuenta? Registrarse
        </Text>
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
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  registerButton: {
    marginTop: 25,
    alignItems: "center",
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});