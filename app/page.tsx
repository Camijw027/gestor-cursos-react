"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Curso } from "./types/curso";
import Buscador from "./components/Buscador";
import Filtros from "./components/Filtros";
import CursoItem from "./components/CursoItem";
import FormAgregar from "./components/FormAgregar";

// Este es el componente principal de la app. Aquí vive todo el estado
// que necesitan los demás componentes para funcionar.
export default function Inicio() {
  // Aquí guardamos la lista de todos los cursos que el usuario ha agregado
  const [cursos, setCursos] = useState<Curso[]>([]);

  // Esto guarda lo que el usuario está escribiendo en el input de agregar
  const [nombre, setNombre] = useState("");

  // Guarda cuál de los tres filtros está activo: "todos", "completados" o "pendientes"
  const [filtro, setFiltro] = useState("todos");

  // Guarda el texto que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Guarda el id del curso que está siendo editado en este momento.
  // Si no hay ninguno editándose, vale null
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Guarda el texto nuevo mientras el usuario edita un curso
  const [nombreEditado, setNombreEditado] = useState("");

  // Al cargar la página revisamos si hay sesión activa.
  // Si no hay, mandamos al usuario a la página de login.
  const router = useRouter();
  useEffect(() => {
    const sesion = localStorage.getItem("sesion");
    if (!sesion) {
      router.push("/login");
    }
  }, []);

  // Aquí aplicamos dos filtros seguidos sobre la lista de cursos:
  // primero filtramos por lo que el usuario escribe en el buscador,
  // y luego filtramos por el botón de filtro que tenga activo
  const cursosFiltrados = cursos
    .filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((c) => {
      if (filtro === "completados") return c.completado;
      if (filtro === "pendientes") return !c.completado;
      return true;
    });

  return (
    <main className="contenedor-principal">
      <h1 className="titulo-app">Gestor de Cursos</h1>

      {/* Este botón cierra la sesión actual y manda al usuario a login */}
      <button
        className="btn-cerrar-sesion"
        onClick={() => {
          localStorage.removeItem("sesion");
          router.push("/login");
        }}
      >
        Cerrar sesión
      </button>

      {/* Este componente es el formulario para agregar un nuevo curso. */}
      <FormAgregar
        nombre={nombre}
        setNombre={setNombre}
        cursos={cursos}
        setCursos={setCursos}
      />
      {/* Este componente es el buscador que filtra los cursos por nombre */}
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Este componente muestra los botones para filtrar los cursos */}
      <Filtros filtro={filtro} setFiltro={setFiltro} />

      {/* Aquí mostramos la lista de cursos, aplicando los filtros que el usuario
      haya seleccionado */}
      {cursosFiltrados.map((curso) => (
        <CursoItem
          key={curso.id}
          curso={curso}
          cursos={cursos}
          setCursos={setCursos}
          editandoId={editandoId}
          setEditandoId={setEditandoId}
          nombreEditado={nombreEditado}
          setNombreEditado={setNombreEditado}
        />
      ))}
    </main>
  );
}
