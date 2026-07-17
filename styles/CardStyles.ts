import { StyleSheet } from "react-native";
import Colors from "./colors";

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 180,
  },

  info: {
    padding: 15,
  },

  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  species: {
    color: Colors.gray,
    marginTop: 5,
    fontSize: 15,
  },

  difficulty: {
    color: Colors.secondary,
    marginTop: 8,
    fontWeight: "600",
    fontSize: 16,
  },

  points: {
    color: Colors.primary,
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },

  button: {
    marginTop: 15,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});