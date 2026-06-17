type FiltrosProps = {
  filtro: string;
  setFiltro: (valor: string) => void;
};

// Cada botón compara su valor con el filtro activo.
// Si coinciden se aplican dos clases (base + activo), si no solo la base.
export default function Filtros({ filtro, setFiltro }: FiltrosProps) {
  return (
    <div className="contenedor-filtros">
      <button
        className={
          filtro === "todos" ? "btn-filtro btn-filtro-activo" : "btn-filtro"
        }
        onClick={() => setFiltro("todos")}
      >
        Todos
      </button>

      <button
        className={
          filtro === "completados"
            ? "btn-filtro btn-filtro-activo"
            : "btn-filtro"
        }
        onClick={() => setFiltro("completados")}
      >
        Completados
      </button>

      <button
        className={
          filtro === "pendientes"
            ? "btn-filtro btn-filtro-activo"
            : "btn-filtro"
        }
        onClick={() => setFiltro("pendientes")}
      >
        Pendientes
      </button>
    </div>
  );
}
