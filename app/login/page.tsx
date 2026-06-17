"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Esta es la página de login. El usuario debe pasar por aquí
// antes de poder acceder al gestor de cursos.
export default function Login() {
  // Guardamos lo que el usuario escribe en cada input
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Este estado controla si mostramos o no el mensaje de error
  const [error, setError] = useState(false);

  // useRouter nos permite navegar entre páginas desde el código
  const router = useRouter();

  function manejarLogin() {
    // Verificamos si el usuario y contraseña son correctos
    if (usuario === "cristian" && contrasena === "1234") {
      // Si son correctos guardamos la sesión en localStorage y vamos al inicio
      localStorage.setItem("sesion", "activa");
      router.push("/");
    } else {
      // Si son incorrectos mostramos el mensaje de error
      setError(true);
    }
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      {/* Solo mostramos el error si el usuario intentó entrar con datos incorrectos */}
      {error && <p>Usuario o contraseña incorrectos</p>}

      <button onClick={manejarLogin}>Entrar</button>
    </div>
  );
}
