import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import useProductos from "../../hooks/useProductos";
import DetalleProducto from "../../components/productos/DetalleProducto";
import LoaderProducto from "../../components/loaders/LoaderProducto";
import Spinner from "../../components/loaders/Spinner";
import style from "../../styles/ProductosContainer.module.css";

const Creador = () => {
  // Estados
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);

  // useAuth
  const { usuario, loading } = useAuth();

  // useProductos
  const { productos: products, errorProductos } = useProductos();

  // router
  const { push } = useRouter();

  useEffect(() => {
    if (usuario && products.length > 0) {
      // Obtener los productos del creador
      const productosCreador = (id) => {
        const productosCreador = products.filter(
          (producto) => producto.creador.id == id
        );
        setProductos(productosCreador);
      };
      productosCreador(usuario.uid);
    }
    setLoadingProductos(false);
  }, [usuario, products]);

  // Si esta cargando el usuario, mostrar spinner
  if (loading) return <Spinner />;

  // Si no esta autenticado, redireccionar
  if (!usuario) {
    push("/auth/login");
    return null;
  }

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
          <h2 className={style.titulo}>Tus Productos Creados</h2>
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
};

export default Creador;
