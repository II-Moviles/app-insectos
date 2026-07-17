import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";


import { Insect } from "../types/Insect";

import { cardStyles } from "../styles/CardStyles";



interface Props {

  insect: Insect;

  onPress: () => void;

}



export default function InsectCard({
  insect,
  onPress
}: Props){



  const scale =
    useRef(
      new Animated.Value(0)
    ).current;



  useEffect(()=>{


    Animated.spring(
      scale,
      {
        toValue:1,
        useNativeDriver:true
      }

    ).start();



  },[]);





  return (


    <Animated.View

      style={{
        transform:[
          {
            scale:scale
          }
        ]
      }}

    >


    <TouchableOpacity

      style={cardStyles.card}

      onPress={onPress}

    >



      <Image

        source={{
          uri: insect.imagen
        }}

        style={cardStyles.image}

      />



      <View style={cardStyles.info}>


        <Text style={cardStyles.title}>
          {insect.nombre}
        </Text>



        <Text style={cardStyles.species}>
          {insect.especie}
        </Text>



        <Text style={cardStyles.difficulty}>
          Dificultad:
          {" "}
          {insect.dificultad}
        </Text>



        <Text style={cardStyles.points}>
          {insect.puntos} puntos
        </Text>



      </View>



    </TouchableOpacity>


    </Animated.View>


  );

}