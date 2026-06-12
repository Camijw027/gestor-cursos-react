"use client";
import { useState } from "react";
import { Curso } from "./types/curso";
import Buscador from "./components/Buscador";

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
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del curso"
      />
      <button
        onClick={() => {
          if (!nombre) return;
          setCursos([...cursos, { id: Date.now(), nombre, completado: false }]);
          setNombre("");
        }}
      >
        Agregar Curso
      </button>

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      <button onClick={() => setFiltro("todos")}>Todos</button>
      <button onClick={() => setFiltro("completados")}>Completados</button>
      <button onClick={() => setFiltro("pendientes")}>Pendientes</button>

      {cursosFiltrados.map((curso) => (
        <div key={curso.id}>
          {editandoId === curso.id ? (
            <input
              value={nombreEditado}
              onChange={(e) => setNombreEditado(e.target.value)}
              placeholder="Editar nombre del curso"
            />
          ) : (
            <span className={curso.completado ? "completado" : ""}>
              {curso.nombre}
            </span>
          )}
          {editandoId === curso.id ? (
            <button
              onClick={() => {
                setCursos(
                  cursos.map((c) =>
                    c.id === curso.id ? { ...c, nombre: nombreEditado } : c,
                  ),
                );
                setEditandoId(null);
              }}
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={() => {
                setEditandoId(curso.id);
                setNombreEditado(curso.nombre);
              }}
            >
              Editar
            </button>
          )}

          <button
            onClick={() => {
              setCursos(
                cursos.map((c) =>
                  c.id === curso.id ? { ...c, completado: !c.completado } : c,
                ),
              );
            }}
          >
            {curso.completado
              ? "Marcar como pendiente"
              : "Marcar como completado"}
          </button>

          <button
            onClick={() => setCursos(cursos.filter((c) => c.id !== curso.id))}
          >
            Eliminar
          </button>
        </div>
      ))}
    </main>
  );
}
