"use client";
import { useState } from "react";
import { Curso } from "./types/curso";
import Buscador from "./components/Buscador";
import Filtros from "./components/Filtros";
import CursoItem from "./components/CursoItem";
import FormAgregar from "./components/FormAgregar";

export default function Inicio() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nombre, setNombre] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const cursosFiltrados = cursos
    .filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((c) => {
      if (filtro === "completados") return c.completado;
      if (filtro === "pendientes") return !c.completado;
      return true;
    });

  return (
    <main>
      <h1>Gestor de Cursos</h1>

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
