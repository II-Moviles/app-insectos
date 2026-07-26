import { supabase } from "./supabaseClient";

export async function guardarPuntaje(
  usuario: string,
  puntaje: number,
  capturas: number,
) {
  const { data, error } = await supabase
    .from("puntajes")
    .insert([
      {
        usuario: usuario,
        puntaje: puntaje,
        capturas: capturas,
        partidas: 1,
        fecha: new Date(),
      },
    ])
    .select();

  if (error) {
    console.log("ERROR SUPABASE:", error);

    return false;
  }

  console.log("GUARDADO CORRECTAMENTE:", data);

  return true;
}

export const obtenerPuntajes = async () => {
  const { data, error } = await supabase
    .from("puntajes")
    .select("*")
    .order("puntaje", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.log("ERROR OBTENIENDO PUNTAJES:", error);

    return [];
  }

  return data || [];
};

export const obtenerEstadisticasJugador = async (usuario: string) => {
  const { data, error } = await supabase
    .from("puntajes")
    .select("*")
    .eq("usuario", usuario);

  if (error) {
    console.log("ERROR ESTADISTICAS:", error);

    return {
      partidas: 0,

      mejorPuntaje: 0,
    };
  }

  if (!data || data.length === 0) {
    return {
      partidas: 0,

      mejorPuntaje: 0,
    };
  }

  const mejor = Math.max(...data.map((item) => item.puntaje));

  return {
    partidas: data.length,

    mejorPuntaje: mejor,
  };
};
