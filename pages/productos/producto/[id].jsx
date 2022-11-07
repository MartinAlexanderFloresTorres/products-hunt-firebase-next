import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import useAuth from "../../../hooks/useAuth";
import formatearTiempo from "../../../helpers/formatearTiempo";
import Comentarios from "../../../components/comentarios/Comentarios";
import useProductos from "../../../hooks/useProductos";
import style from "../../../styles/VisualizarProducto.module.css";
import useModal from "../../../hooks/useModal";
import Spinner from "../../../components/loaders/Spinner";

const VisualizarProducto = () => {
  // Estados
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Modal, , mostrarModal, ocultarModal] = useModal();

  // useRouter
  const {
    query: { id },
    push,
  } = useRouter();

  // useAuth
  const { usuario } = useAuth();

  // useProductos
  const { votarProducto, quitarVoto, deleteProducto } = useProductos();

  // useEffect
  useEffect(() => {
    if (id) {
      const unsuscribe = onSnapshot(doc(db, "productos", id), (doc) => {
        if (doc.exists()) {
          setProducto({ ...doc.data(), id: doc.id });
        } else {
          console.error("Producto No encontrado");
          setProducto(null);
        }
        setLoading(false);
      });
      return () => unsuscribe();
    }
  }, [id]);

  // handleVotar
  const handleVotar = async () => {
    // Si el usuario no esta autenticado
    if (!usuario) {
      return push("/login");
    }

    // Si el usuario ya voto quitamos el voto
    if (producto.votantes.includes(usuario.uid)) {
      quitarVoto({
        id: producto.id,
        usuario: usuario.uid,
        votantes: producto.votantes,
        votos: producto.votos,
      });
    } else {
      // Si el usuario no voto
      votarProducto({
        id: producto.id,
        usuario: usuario.uid,
        votantes: producto.votantes,
        votos: producto.votos,
      });
    }
  };
  return (
    <section className={style.visualizarProducto}>
      {loading ? (
        <Spinner />
      ) : producto ? (
        <article>
          <Modal bg='var(--white-05)'>
            <div className='overlay-content'>
              <h2>¿Estas seguro de eliminar este producto?</h2>
              <p>
                Recueda que los cambios son inreversibles y ya no se podran
                recuperar. ¿Deseas continuar?, si es asi presiona el boton
                eliminar.
              </p>
            </div>
            <div className='overlay-botones-right'>
              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteProducto(producto.id);
                  ocultarModal();
                }}
              >
                Si, Eliminar
              </button>
              <button className='btn btn-white' onClick={ocultarModal}>
                No, Cancelar
              </button>
            </div>
          </Modal>

          <h1 className={style.titulo}>{producto.nombre}</h1>
          <div className={style.grid}>
            <div>
              <Image
                src={producto.imagen}
                width={400}
                height={400}
                alt={producto.nombre}
                priority
                className={style.imagen}
              />

              <div className={style.descripcion}>
                <span>Descripcion: </span>
                <p>{producto.descripcion}</p>
              </div>

              <Comentarios producto={producto} />
            </div>

            <aside className={style.aside}>
              <p>
                <span className={style.tags}>Publicado hace:</span>{" "}
                <span>{formatearTiempo(producto.creado)}</span>
              </p>
              <p>
                <span className={style.tags}>Por:</span>{" "}
                <span>{producto.creador.nombre}</span>
              </p>
              <p>
                <span className={style.tags}>Comentarios:</span>{" "}
                <span>{producto.comentarios.length}</span>
              </p>
              <p>
                <span className={style.tags}>Votos:</span>{" "}
                <span>{producto.votos}</span>
              </p>
              <div className={style.botones}>
                <a
                  href={producto.pagina}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-white'
                >
                  Visitar
                </a>
                {usuario ? (
                  <>
                    <button
                      type='button'
                      className='btn btn-primario'
                      onClick={handleVotar}
                    >
                      {producto.votantes.includes(usuario.uid)
                        ? "Quitar Voto"
                        : " Votar"}
                    </button>
                    {usuario.uid === producto.creador.id && (
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={mostrarModal}
                      >
                        Eliminar
                      </button>
                    )}
                  </>
                ) : (
                  <Link href={"/auth/login"} className='btn btn-primario'>
                    Inicia sesión para votar
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </article>
      ) : (
        <h1 className='vacio'>El producto no existe</h1>
      )}
    </section>
  );
};

VisualizarProducto.title = "Vista del producto";

export default VisualizarProducto;
