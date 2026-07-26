import { supabase } from "../supabase/supabaseClient";

export async function subirImagen(uri: string, nombre: string) {
  try {
    // Convertir imagen del celular

    const response = await fetch(uri);

    const arrayBuffer = await response.arrayBuffer();

    // Obtener extensión

    const extension = uri.split(".").pop()?.toLowerCase() || "jpg";

    const nombreArchivo = `${nombre}.${extension}`;

    console.log("SUBIENDO IMAGEN:", nombreArchivo);

    const { error } = await supabase.storage
      .from("avatars")
      .upload(nombreArchivo, arrayBuffer, {
        contentType: `image/${extension}`,
        upsert: true,
      });

    if (error) {
      console.log("ERROR STORAGE:", error);

      return null;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(nombreArchivo);

    console.log("URL GENERADA:", data.publicUrl);

    return data.publicUrl;
  } catch (error) {
    console.log("ERROR IMAGEN:", error);

    return null;
  }
}
