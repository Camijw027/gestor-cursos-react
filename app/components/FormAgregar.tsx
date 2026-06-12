import { Curso } from "../types/curso";

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
    <div>
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
    </div>
  );
}
