import { supabase } from "./supabaseClient";


export async function guardarPuntaje(
  usuario: string,
  puntaje: number
) {

  const { data, error } = await supabase
    .from("puntajes")
    .insert([
      {
        usuario: usuario,
        puntaje: puntaje,
        fecha: new Date()
      }
    ])
    .select();


  if (error) {

    console.log(
      "ERROR SUPABASE:",
      error
    );

    return false;
  }


  console.log(
    "GUARDADO CORRECTAMENTE:",
    data
  );


  return true;
}

export const obtenerPuntajes = async()=>{

 const {data,error}=await supabase

 .from("puntajes")

 .select("*")

 .order(
  "puntaje",
  {
   ascending:false
  }
 )

 .limit(10);



 if(error){

  console.log(
   "ERROR OBTENIENDO PUNTAJES:",
   error
  );

  return [];

 }


 return data || [];

};