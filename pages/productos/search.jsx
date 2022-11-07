import { useEffect } from "react";
import { useRouter } from "next/router";
import DetalleProducto from "../../components/productos/DetalleProducto";
import useProductos from "../../hooks/useProductos";
import style from "../../styles/ProductosContainer.module.css";
import LoaderProducto from "../../components/loaders/LoaderProducto";

const Search = () => {
  // useProductos
  const { buscarProducto, loadingProductos, resultados } = useProductos();

  // useRouter
  const {
    query: { q },
  } = useRouter();

  useEffect(() => {
    if (q && !loadingProductos) {
      buscarProducto(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, loadingProductos]);

  return (
    <section className={style.home}>
      <section>
        <h2 className={style.titulo}>Resultados de tu busquedad</h2>
        <div>
          {loadingProductos ? (
            <>
              <LoaderProducto />
              <LoaderProducto />
              <LoaderProducto />
              <LoaderProducto />
              <LoaderProducto />
              <LoaderProducto />
            </>
          ) : resultados.length > 0 ? (
            resultados.map((producto, i) => (
              <DetalleProducto
                key={producto.id}
                indice={i}
                producto={producto}
                id='search'
              />
            ))
          ) : (
            <p className='vacio'>No hay productos</p>
          )}
        </div>
      </section>
    </section>
  );
};

Search.title = "Buscar Producto";
export default Search;
