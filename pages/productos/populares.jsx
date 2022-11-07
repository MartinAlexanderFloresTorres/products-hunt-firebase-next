import ProductosContainer from "../../components/containers/ProductosContainer";

function Populares() {
  return <ProductosContainer orden={"votos"} />;
}

Populares.title = "Productos Populares";
export default Populares;
