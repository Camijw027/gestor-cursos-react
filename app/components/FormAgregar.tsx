import { Curso } from "../types/curso";

// Este componente muestra el formulario para agregar un nuevo curso.
// Recibe el estado del nombre y la lista de cursos desde page.tsx
// porque es allá donde vive toda la información de la app.
type FormAgregarProps = {
  nombre: string;
  setNombre: (nombre: string) => void;
  cursos: Curso[];
  setCursos: (cursos: Curso[]) => void;
};

export default function FormAgregar({
  nombre,
  setNombre,
  cursos,
  setCursos,
}: FormAgregarProps) {
  return (
    <div className="form-agregar">
      {/* El valor de este input siempre refleja lo que está en el estado "nombre".
          Cada vez que el usuario escribe una letra, actualizamos ese estado */}
      <input
        className="input-agregar"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del curso"
      />
      {/* Cuando el usuario hace click, primero verificamos que el input no esté vacío,
          luego agregamos el nuevo curso a la lista y limpiamos el input */}
      <button
        className="btn-agregar"
        onClick={() => {
          if (!nombre) return;
          setCursos([...cursos, { id: Date.now(), nombre, completado: false }]);
          setNombre("");
        }}
      >
        Agregar Curso
      </button>
    </div>
  );
}
