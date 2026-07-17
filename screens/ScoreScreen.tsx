import React, { useEffect, useState } from "react";

import { View, Text, FlatList } from "react-native";

import { StyleSheet } from "react-native";

import { obtenerPuntajes } from "../supabase/puntajes";

interface Puntaje {
  id: number;

  usuario: string;

  puntaje: number;

  fecha: string;
}

export default function ScoreScreen() {
  const [datos, setDatos] = useState<Puntaje[]>([]);

  useEffect(() => {
    cargarPuntajes();
  }, []);

  const cargarPuntajes = async () => {
    const respuesta = await obtenerPuntajes();

    setDatos(respuesta || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejores Puntajes</Text>

      {datos.length === 0 ? (
        <Text style={styles.empty}>No existen puntajes registrados</Text>
      ) : (
        <FlatList
          data={datos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.position}>#{index + 1}</Text>

              <Text style={styles.usuario}>Jugador: {item.usuario}</Text>

              <Text style={styles.score}>Puntaje: {item.puntaje}</Text>

              <Text style={styles.fecha}>{item.fecha}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#101820",

    padding: 20,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,
  },

  empty: {
    color: "#FFFFFF",

    textAlign: "center",

    fontSize: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",

    padding: 15,

    borderRadius: 10,

    marginBottom: 10,
  },

  position: {
    fontSize: 22,

    fontWeight: "bold",

    color: "#27AE60",
  },

  usuario: {
    fontSize: 18,

    fontWeight: "bold",
  },

  score: {
    fontSize: 17,

    marginTop: 5,
  },

  fecha: {
    fontSize: 14,

    color: "#666",

    marginTop: 5,
  },
});
