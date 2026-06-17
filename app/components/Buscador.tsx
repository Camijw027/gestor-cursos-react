type BuscadorProps = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
};

// Este componente muestra el input de búsqueda.
// Cada letra que escribe el usuario actualiza el estado "busqueda" en page.tsx
// y eso hace que la lista se filtre en tiempo real automáticamente.
export default function Buscador({ busqueda, setBusqueda }: BuscadorProps) {
  return (
    <div className="contenedor-buscador">
      <input
        className="input-buscar"
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}
