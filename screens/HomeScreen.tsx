import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from "react-native";

import { insects } from "../data/insects";

import { homeStyles } from "../styles/ScreensStyles";

import { Insect } from "../types/Insect";

import { guardarPuntaje } from "../supabase/puntajes";

interface GameInsect extends Insect {
  x: number;

  y: number;
}

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const [gameInsects, setGameInsects] = useState<GameInsect[]>([]);

  const [score, setScore] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(60);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [capturas, setCapturas] = useState<number>(0);

  const [jugador, setJugador] = useState<string>("Jugador");

  const scale = useRef(new Animated.Value(0)).current;

  // Generar ID único

  const generarId = () => {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  };

  // Cargar jugador guardado

  useEffect(() => {
    cargarJugador();
  }, []);

  const cargarJugador = async () => {
    try {
      const nombre = await AsyncStorage.getItem("jugador");

      console.log("Jugador actual:", nombre);

      if (nombre) {
        setJugador(nombre);
      }
    } catch (error) {
      console.log("Error cargando jugador:", error);
    }
  };

  // Iniciar juego

  useEffect(() => {
    iniciarJuego();
  }, []);

  // Animación insectos

  useEffect(() => {
    Animated.spring(
      scale,

      {
        toValue: 1,

        useNativeDriver: true,
      },
    ).start();
  }, [gameInsects]);

  // Temporizador

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);

      guardarPuntaje(jugador, score);

      AsyncStorage.setItem("ultimoPuntaje", score.toString());

      Alert.alert(
        "Juego terminado",

        `Jugador: ${jugador}
Puntaje: ${score}
Capturas: ${capturas}`,
      );

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Crear insectos

  const crearInsectos = () => {
    return insects.map((item) => ({
      ...item,

      id: generarId(),

      x: Math.random() * 250,

      y: Math.random() * 400,
    }));
  };

  // Reiniciar juego

  const iniciarJuego = () => {
    const nuevos = crearInsectos();

    setGameInsects(nuevos);

    setScore(0);

    setCapturas(0);

    setTimeLeft(60);

    setGameOver(false);
  };

  // Agregar insecto nuevo

  const agregarNuevoInsecto = () => {
    const nuevo = {
      ...insects[Math.floor(Math.random() * insects.length)],

      id: generarId(),

      x: Math.random() * 250,

      y: Math.random() * 400,
    };

    setGameInsects((prev) => [...prev, nuevo]);
  };

  // Atrapar insecto

  const atraparInsecto = (insect: GameInsect) => {
    if (gameOver) return;

    setScore((prev) => prev + insect.puntos);

    setCapturas((prev) => {
      const nuevasCapturas = prev + 1;

      AsyncStorage.setItem("capturas", nuevasCapturas.toString());

      return nuevasCapturas;
    });

    setGameInsects((prev) => prev.filter((item) => item.id !== insect.id));

    setTimeout(() => {
      if (!gameOver) {
        agregarNuevoInsecto();
      }
    }, 500);
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Caza Insectos</Text>

      <Text style={homeStyles.score}>Jugador: {jugador}</Text>

      <View style={homeStyles.infoContainer}>
        <Text style={homeStyles.score}>Puntaje: {score}</Text>

        <Text style={homeStyles.time}>Tiempo: {timeLeft}</Text>
      </View>

      <View style={homeStyles.gameArea}>
        {gameInsects.map((item) => (
          <Animated.View
            key={item.id}
            style={[
              {
                position: "absolute",

                left: item.x,

                top: item.y,

                transform: [
                  {
                    scale: scale,
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => atraparInsecto(item)}
              style={homeStyles.insect}
            >
              <Image
                source={{
                  uri: item.imagen,
                }}
                style={homeStyles.insectImage}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {gameOver && (
        <TouchableOpacity
          style={homeStyles.restartButton}
          onPress={iniciarJuego}
        >
          <Text style={homeStyles.menuText}>Nuevo Juego</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
