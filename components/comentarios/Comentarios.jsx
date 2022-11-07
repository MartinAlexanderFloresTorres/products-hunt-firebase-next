import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Comentario from "./Comentario";
import useAuth from "../../hooks/useAuth";
import useProductos from "../../hooks/useProductos";
import generarId from "../../helpers/generarId";
import defaultUser from "../../constants/defaultUser";
import style from "../../styles/Comentarios.module.css";

const Comentarios = ({ producto }) => {
  // Estados
  const [comentario, setComentario] = useState("");

  // useAuth
  const { usuario } = useAuth();

  // useProductos
  const { addComentario } = useProductos();

  // useRouter
  const { push } = useRouter();

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Si el usuario no esta autenticado
    if (!usuario) {
      return push("/auth/login");
    }

    // si el comentario esta vacio
    if (comentario.trim() === "") return;

    // Crear el comentario
    const newComentario = {
      mensaje: comentario,
      id: generarId(),
      usuario: {
        id: usuario.uid,
        nombre: usuario.displayName,
        photoURL: usuario.photoURL || defaultUser(),
      },
      publicado: Date.now(),
    };

    // Guardar el al base de datos
    addComentario(producto.id, producto.comentarios, newComentario);

    // limpiar el estado
    setComentario("");
  };

  return (
    <section>
      <form className={style.formulario} id='comentar' onSubmit={handleSubmit}>
        {usuario ? (
          <Image
            src={usuario.photoURL || defaultUser}
            width={50}
            height={50}
            alt={usuario.displayName || "Usuario"}
            priority
          />
        ) : (
          <Image
            src={defaultUser}
            width={50}
            height={50}
            alt='Usuario por defecto'
            priority
          />
        )}
        <label htmlFor='comentario'>
          <input
            id='comentario'
            placeholder='¿Qué opinas de este producto?'
            name='comentario'
            value={comentario}
            onChange={(e) => setComentario(e.target.value.trimStart())}
          />
        </label>
        {usuario ? (
          <button type='submit' className='btn btn-primario'>
            Comentar
          </button>
        ) : (
          <Link href={"/auth/login"} className='btn btn-white'>
            Inicia sesión para comentar
          </Link>
        )}
      </form>
      <div className={style.comentarios}>
        <h2 className={style.titulo}>
          <svg
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
          <span>Comentarios ({producto.comentarios.length})</span>
        </h2>
        <ul>
          {producto.comentarios.length > 0 ? (
            producto.comentarios.map((comentario) => (
              <Comentario
                key={comentario.id}
                comentario={comentario}
                creador={producto.creador.id}
              />
            ))
          ) : (
            <li className={style.vacio}>
              No hay comentarios aun
              <label htmlFor='comentario' className='btn btn-primario'>
                Se el primero en comentar
              </label>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Comentarios;
