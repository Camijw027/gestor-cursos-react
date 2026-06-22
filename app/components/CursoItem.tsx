import { Curso } from "../types/curso";

// Este componente representa una sola fila de curso en la lista.
// Se renderiza una vez por cada curso que exista en el estado.
type CursoItemProps = {
  curso: Curso;
  cursos: Curso[];
  setCursos: (cursos: Curso[]) => void;
  editandoId: number | null;
  setEditandoId: (id: number | null) => void;
  nombreEditado: string;
  setNombreEditado: (nombre: string) => void;
};
// Recibe el curso a mostrar, la lista completa de cursos y las funciones para modificar el estado de cursos y edición. Esto le permite modificar
// el curso actual sin necesidad de manejar estados locales dentro del componente.
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
    <div className="curso-card">
      {/* Si este curso está siendo editado mostramos un input,
          si no, mostramos el nombre como texto normal */}
      {editandoId === curso.id ? (
        <input
          className="input-editar"
          type="text"
          value={nombreEditado}
          onChange={(e) => setNombreEditado(e.target.value)}
          placeholder="Editar nombre del curso"
        />
      ) : (
        <span
          className={
            curso.completado ? "curso-nombre completado" : "curso-nombre"
          }
        >
          {curso.nombre}
        </span>
      )}
      {/* Agrupamos los tres botones de acción a la derecha de la card */}
      <div className="curso-botones">
        {/* En modo edición muestra "Guardar", en modo normal muestra "Editar" */}
        {editandoId === curso.id ? (
          <button
            className="btn-guardar"
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
            className="btn-editar"
            onClick={() => {
              setEditandoId(curso.id);
              setNombreEditado(curso.nombre);
            }}
          >
            Editar
          </button>
        )}

        {/* Alterna el estado del curso entre completado y pendiente */}
        <button
          className="btn-completar"
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
        {/* Elimina el curso filtrando todos los que NO sean este */}
        <button
          className="btn-eliminar"
          onClick={() => setCursos(cursos.filter((c) => c.id !== curso.id))}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
