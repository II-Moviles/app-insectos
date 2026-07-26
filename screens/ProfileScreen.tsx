import React, { useEffect, useState } from "react";

import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

import { StyleSheet } from "react-native";

import { obtenerPerfil, cerrarSesion } from "../Services/auth";

import { obtenerEstadisticasJugador } from "../supabase/puntajes";

interface Perfil {
  nick: string;

  edad: number;

  email: string;

  foto: string;
}

interface Estadisticas {
  partidas: number;

  mejorPuntaje: number;
}

export default function ProfileScreen({ navigation }: any) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    partidas: 0,

    mejorPuntaje: 0,
  });

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    const datos = await obtenerPerfil();

    if (datos) {
      setPerfil(datos);

      const stats = await obtenerEstadisticasJugador(datos.nick);

      setEstadisticas(stats);
    }
  };

  const salir = async () => {
    Alert.alert(
      "Cerrar sesión",

      "¿Desea salir de la cuenta?",

      [
        {
          text: "Cancelar",

          style: "cancel",
        },

        {
          text: "Salir",

          onPress: async () => {
            await cerrarSesion();

            navigation.replace("Login");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Jugador</Text>

      {perfil ? (
        <>
          {perfil.foto !== "" ? (
            <Image
              source={{
                uri: perfil.foto,
              }}
              style={styles.image}
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>Sin foto</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.text}>👤 Nick:</Text>

            <Text style={styles.value}>{perfil.nick}</Text>

            <Text style={styles.text}>🎂 Edad:</Text>

            <Text style={styles.value}>{perfil.edad} años</Text>

            <Text style={styles.text}>📧 Correo:</Text>

            <Text style={styles.value}>{perfil.email}</Text>

            <Text style={styles.separator}></Text>

            <Text style={styles.text}>🎮 Partidas jugadas:</Text>

            <Text style={styles.value}>{estadisticas.partidas}</Text>

            <Text style={styles.text}>🏆 Mejor puntaje:</Text>

            <Text style={styles.value}>{estadisticas.mejorPuntaje}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={salir}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loading}>Cargando perfil...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#101820",

    alignItems: "center",

    justifyContent: "center",

    padding: 30,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 30,
  },

  image: {
    width: 150,

    height: 150,

    borderRadius: 75,

    marginBottom: 20,
  },

  noImage: {
    width: 150,

    height: 150,

    borderRadius: 75,

    backgroundColor: "#555",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 20,
  },

  noImageText: {
    color: "#FFFFFF",

    fontSize: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",

    width: "100%",

    padding: 20,

    borderRadius: 15,
  },

  text: {
    fontSize: 17,

    fontWeight: "bold",

    marginTop: 10,
  },

  value: {
    fontSize: 18,

    marginBottom: 5,
  },

  separator: {
    height: 1,

    backgroundColor: "#CCCCCC",

    marginVertical: 15,
  },

  button: {
    backgroundColor: "#E74C3C",

    width: "100%",

    padding: 15,

    borderRadius: 10,

    alignItems: "center",

    marginTop: 30,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "bold",
  },

  loading: {
    color: "#FFFFFF",

    fontSize: 18,
  },
});
