import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const useGetProductos = ({ orden }) => {
  // Estados
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(false);

  // Efecto para obtener los productos
  useEffect(() => {
    // Manejar los snapshots
    const manjejarSnapshot = (snapshot) => {
      const productos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(productos);
      setLoadingProductos(false);
    };
    // Manejar el error
    const manjearError = (error) => {
      console.log(error.message);
      setLoadingProductos(false);
      setErrorProductos(true);
    };
    const productosRef = query(
      collection(db, "productos"),
      orderBy(orden, "desc")
    );

    const unsuscribe = onSnapshot(productosRef, manjejarSnapshot, manjearError);

    return () => unsuscribe();
  }, [orden]);

  return [productos, loadingProductos, errorProductos];
};

export default useGetProductos;
