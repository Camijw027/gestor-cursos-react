import { Curso } from "../types/curso";

type CursoItemProps = {
  curso: Curso;
  cursos: Curso[];
  setCursos: (cursos: Curso[]) => void;
  editandoId: number | null;
  setEditandoId: (id: number | null) => void;
  nombreEditado: string;
  setNombreEditado: (nombre: string) => void;
};

export default function CursoItem({
  curso,
  cursos,
  setCursos,
  editandoId,
  setEditandoId,
  nombreEditado,
  setNombreEditado,
}: CursoItemProps) {
  return (
    <div>
      {editandoId === curso.id ? (
        <input
          type="text"
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
        {curso.completado ? "Marcar como pendiente" : "Marcar como completado"}
      </button>
      <button
        onClick={() => setCursos(cursos.filter((c) => c.id !== curso.id))}
      >
        Eliminar
      </button>
    </div>
  );
}
