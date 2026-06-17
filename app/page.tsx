"use client";
import { useState } from "react";
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

      <FormAgregar
        nombre={nombre}
        setNombre={setNombre}
        cursos={cursos}
        setCursos={setCursos}
      />

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      <Filtros filtro={filtro} setFiltro={setFiltro} />

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
