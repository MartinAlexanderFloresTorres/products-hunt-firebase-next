import { useContext } from "react";
import { ProductosContext } from "../provider/ProductosProvider";

const useProductos = () => {
  return useContext(ProductosContext);
};

export default useProductos;
