import { createContext, useState } from "react";
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useRouter } from "next/router";
import useGetProductos from "../hooks/useGetProductos";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  // Estados
  const [resultados, setResultados] = useState([]);

  // useRouter
  const { push } = useRouter();

  // useGetProductos
  const [productos, loadingProductos, errorProductos] = useGetProductos({
    orden: "creado",
  });

  // Realizar la búsqueda
  const buscarProducto = async (busqueda) => {
    const busquedaLower = busqueda.toLowerCase();
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busquedaLower) ||
        producto.descripcion.toLowerCase().includes(busquedaLower) ||
        producto.empresa.toLowerCase().includes(busquedaLower)
      );
    });
    setResultados(filtro);
  };

  // Crear producto
  const newProducto = async (producto) => {
    try {
      await addDoc(collection(db, "productos"), producto);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Eliminar producto
  const deleteProducto = async (id) => {
    try {
      push("/");
      const data = await doc(db, "productos", id);
      await deleteDoc(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Votar producto
  const votarProducto = async ({ id, usuario, votantes, votos }) => {
    try {
      // Actualizar el voto
      const data = await doc(db, "productos", id);
      await updateDoc(data, {
        votos: (votos += 1),
        votantes: [...votantes, usuario],
      });
    } catch (error) {
      console.error(error.message);
      push("/");
    }
  };

  // Quitar voto
  const quitarVoto = async ({ id, usuario, votantes, votos }) => {
    try {
      const votantesActualizados = votantes.filter(
        (votante) => votante !== usuario
      );
      // Actualizar el voto
      const data = await doc(db, "productos", id);
      await updateDoc(data, {
        votos: (votos -= 1),
        votantes: votantesActualizados,
      });
    } catch (error) {
      console.error(error.message);
      push("/");
    }
  };

  // Agregar comentario
  const addComentario = async (id, comentarios, newComentario) => {
    try {
      const data = await doc(db, "productos", id);
      await updateDoc(data, {
        comentarios: [newComentario, ...comentarios],
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Obtener producto mejor vatado
  const mejorVotado = (productos) => {
    const [mejorProducto] = productos.sort((a, b) => b.votos - a.votos);
    return mejorProducto;
  };

  return (
    <ProductosContext.Provider
      value={{
        newProducto,
        productos,
        loadingProductos,
        errorProductos,
        votarProducto,
        quitarVoto,
        addComentario,
        deleteProducto,
        buscarProducto,
        resultados,
        mejorVotado,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosContext };

export default ProductosProvider;
