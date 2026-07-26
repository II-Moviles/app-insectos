import { supabase } from "../supabase/supabaseClient";

import { subirImagen } from "./storage";

// ===============================
// REGISTRO DE USUARIO
// ===============================

export async function registrarUsuario(
  email: string,
  password: string,
  nick: string,
  edad: number,
  foto: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),

    password: password.trim(),

    options: {
      data: {
        nick: nick,

        edad: edad,
      },
    },
  });

  if (error) {
    console.log("ERROR REGISTRO AUTH:", error);

    return {
      success: false,

      message: error.message,
    };
  }

  if (!data.user) {
    return {
      success: false,

      message: "No se pudo crear el usuario.",
    };
  }

  // ===============================
  // SUBIR FOTO
  // ===============================

  let urlFoto = "";

  if (foto !== "") {
    const url = await subirImagen(foto, data.user.id);

    if (url) {
      urlFoto = url;
    }
  }

  // ===============================
  // GUARDAR PERFIL
  // ===============================

  const { error: perfilError } = await supabase.from("perfiles").insert([
    {
      id: data.user.id,

      nick: nick,

      edad: edad,

      foto: urlFoto,
    },
  ]);

  if (perfilError) {
    console.log("ERROR GUARDANDO PERFIL:", perfilError);

    return {
      success: false,

      message: perfilError.message,
    };
  }

  console.log("USUARIO REGISTRADO:", data.user.email);

  return {
    success: true,

    user: data.user,
  };
}

// ===============================
// LOGIN
// ===============================

export async function iniciarSesion(
  email: string,

  password: string,
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),

    password: password.trim(),
  });

  if (error) {
    console.log("ERROR LOGIN:", error);

    return {
      success: false,

      message: error.message,
    };
  }

  console.log("LOGIN CORRECTO:", data.user?.email);

  return {
    success: true,

    user: data.user,
  };
}

// ===============================
// OBTENER PERFIL DEL USUARIO
// ===============================

export async function obtenerPerfil() {
  const {
    data: userData,

    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log("ERROR USUARIO:", userError);

    return null;
  }

  const { data, error } = await supabase

    .from("perfiles")

    .select("*")

    .eq(
      "id",

      userData.user.id,
    )

    .single();

  if (error) {
    console.log("ERROR PERFIL:", error);

    return null;
  }

  return {
    ...data,

    email: userData.user.email,
  };
}

// ===============================
// CERRAR SESIÓN
// ===============================

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("ERROR CERRAR SESION:", error);
  }
}

// ===============================
// USUARIO ACTUAL
// ===============================

export async function obtenerUsuarioActual() {
  const {
    data,

    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error);

    return null;
  }

  return data.user;
}
