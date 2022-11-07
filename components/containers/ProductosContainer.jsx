import DetalleProducto from "../../components/productos/DetalleProducto";
import useGetProductos from "../../hooks/useGetProductos";
import LoaderProducto from "../loaders/LoaderProducto";
import style from "../../styles/ProductosContainer.module.css";

function ProductosContainer({ orden }) {
  // useGetProductos
  const [productos, loadingProductos, errorProductos] = useGetProductos({
    orden,
  });

  return (
    <section className={style.home}>
      {loadingProductos ? (
        <>
          <LoaderProducto />
          <LoaderProducto />
          <LoaderProducto />
          <LoaderProducto />
          <LoaderProducto />
          <LoaderProducto />
        </>
      ) : errorProductos ? (
        <p className='vacio'>
          No se pudo cargar los productos, por favor intente nuevamente más
        </p>
      ) : (
        <section>
          <h2 className={style.titulo}>Productos mas recientes</h2>
          <div>
            {productos.length > 0 ? (
              productos.map((producto, i) => (
                <DetalleProducto
                  key={producto.id}
                  producto={producto}
                  indice={i}
                  id={i === productos.length - 1 ? "ultimo-producto" : ""}
                />
              ))
            ) : (
              <p className='vacio'>No hay productos</p>
            )}
          </div>
        </section>
      )}
    </section>
  );
}
export default ProductosContainer;
