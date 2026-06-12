type FiltrosProps = {
  filtro: string;
  setFiltro: (valor: string) => void;
};

export default function Filtros({ filtro, setFiltro }: FiltrosProps) {
  return (
    <div>
      <button onClick={() => setFiltro("todos")}>Todos</button>
      <button onClick={() => setFiltro("completados")}>Completados</button>
      <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
    </div>
  );
}
