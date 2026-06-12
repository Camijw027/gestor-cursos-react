type BuscadorProps = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
};

export default function Buscador({ busqueda, setBusqueda }: BuscadorProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}
