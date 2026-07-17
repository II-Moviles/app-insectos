import { StyleSheet } from "react-native";
import Colors from "./colors";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  infoContainer: {
    flexDirection: "row",

    justifyContent: "space-between",

    backgroundColor: Colors.card,

    padding: 15,

    borderRadius: 12,

    marginBottom: 10,
  },

  score: {
    color: Colors.primary,

    fontSize: 18,

    fontWeight: "bold",
  },

  time: {
    color: Colors.secondary,

    fontSize: 18,

    fontWeight: "bold",
  },

  // Área del juego

  gameArea: {
    flex: 1,

    position: "relative",

    marginTop: 10,

    backgroundColor: Colors.card,

    borderRadius: 15,

    overflow: "hidden",
  },

  // Botón invisible donde aparece el insecto

  insect: {
   position:"absolute",

width:90,

height:90,

borderRadius:45,

overflow:"hidden",

justifyContent:"center",

alignItems:"center", 
  },

  // Imagen del insecto

  insectImage:{

width:90,

height:90,

borderRadius:45,

resizeMode:"cover",

},

  restartButton: {
    backgroundColor: Colors.primary,

    padding: 15,

    borderRadius: 12,

    alignItems: "center",

    marginTop: 10,
  },

  menuText: {
    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16,
  },
});

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  image: {
    width: "100%",

    height: 280,
  },

  content: {
    padding: 20,
  },

  title: {
    color: Colors.text,

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 10,
  },

  species: {
    color: Colors.gray,

    fontSize: 18,

    marginBottom: 5,
  },

  level: {
    color: Colors.secondary,

    fontSize: 18,

    marginBottom: 5,
  },

  points: {
    color: Colors.primary,

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 20,
  },

  description: {
    color: Colors.text,

    fontSize: 16,

    lineHeight: 24,

    marginBottom: 30,
  },

  button: {
    backgroundColor: Colors.primary,

    padding: 15,

    borderRadius: 12,

    alignItems: "center",

    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 18,
  },
});

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,

    padding: 15,
  },

  title: {
    color: Colors.text,

    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,

    alignItems: "center",

    padding: 20,
  },

  avatar: {
    width: 160,

    height: 160,

    borderRadius: 80,

    marginTop: 20,

    marginBottom: 20,
  },

  name: {
    color: Colors.text,

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 25,
  },

  card: {
    width: "100%",

    backgroundColor: Colors.card,

    borderRadius: 15,

    padding: 20,

    marginBottom: 30,
  },

  item: {
    color: Colors.text,

    fontSize: 18,

    marginBottom: 15,
  },

  button: {
    width: "100%",

    backgroundColor: Colors.primary,

    padding: 15,

    borderRadius: 12,

    alignItems: "center",

    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "bold",
  },
});
