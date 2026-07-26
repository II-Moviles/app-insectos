import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { registrarUsuario } from "../Services/auth";

interface Props {
  navigation: any;
}

export default function RegisterScreen({ navigation }: Props) {
  const [nick, setNick] = useState("");

  const [edad, setEdad] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmar, setConfirmar] = useState("");

  const [foto, setFoto] = useState("");

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Debe permitir el acceso a la galería.");

      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const registrar = async () => {
    if (!nick || !edad || !email || !password || !confirmar) {
      Alert.alert("Error", "Complete todos los campos.");
      return;
    }

    if (foto === "") {
      Alert.alert("Error", "Seleccione una foto.");
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      Alert.alert("Error", "Correo electrónico inválido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const respuesta = await registrarUsuario(
      email,
      password,
      nick,
      Number(edad),
      foto,
    );
    if (!respuesta.success) {
      Alert.alert("Registro", respuesta.message);
      return;
    }

    Alert.alert("Éxito", "Usuario registrado correctamente.", [
      {
        text: "Aceptar",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#101820",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Registro
      </Text>

      <TextInput
        placeholder="Nick"
        placeholderTextColor="#999"
        value={nick}
        onChangeText={setNick}
        style={estilo}
      />

      <TextInput
        placeholder="Edad"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
        style={estilo}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={estilo}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={estilo}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
        style={estilo}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#3498DB",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
        onPress={seleccionarImagen}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Seleccionar foto
        </Text>
      </TouchableOpacity>

      {foto !== "" && (
        <Image
          source={{ uri: foto }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#27AE60",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={registrar}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Registrarse
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilo = {
  backgroundColor: "#FFFFFF",
  padding: 15,
  borderRadius: 10,
  marginBottom: 15,
  fontSize: 16,
};
