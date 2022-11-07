import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useProductos from "../../hooks/useProductos";
import useAuth from "../../hooks/useAuth";
import Comentarios from "../comentarios/Comentarios";
import formatearTiempo from "../../helpers/formatearTiempo";
import style from "../../styles/DetalleProducto.module.css";
import overflowBody from "../../helpers/overflowBody";

const DetalleProducto = ({ producto, indice, ...props }) => {
  // Estados
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const {
    nombre,
    imagen,
    descripcion,
    votantes,
    votos,
    comentarios,
    creado,
    creador,
    id,
  } = producto;

  // useAuth
  const { usuario } = useAuth();

  // useProductos
  const { votarProducto, quitarVoto, mejorVotado, productos } = useProductos();

  // Efecto de comentarios
  useEffect(() => {
    overflowBody(mostrarComentarios);
  }, [mostrarComentarios]);

  return (
    <article
      className={`${style.detalleProducto} ${props?.id && style.search}`}
    >
      <Link href={`/productos/producto/${id}`}>
        <Image
          className={style.imagen_producto}
          src={imagen}
          width={120}
          height={100}
          priority={indice > 5}
          alt={nombre}
        />
      </Link>
      <div>
        <Link href={`/productos/producto/${id}`} className={style.titulo}>
          {nombre}
        </Link>
        <p className={style.descripcion}>{descripcion}</p>
        <div className={style.grid}>
          <p className={style.item}>
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
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{formatearTiempo(creado)}</span>
          </p>
          <p className={style.item}>
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
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            <span>{creador.nombre}</span>
          </p>
          <button
            className={style.item}
            onClick={() => setMostrarComentarios(!mostrarComentarios)}
          >
            <svg viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.5.75c-3.31 0-6 2.362-6 5.267 0 2.905 2.69 5.266 6 5.266a6.8 6.8 0 0 0 1.036-.08l2.725 1.486a.5.5 0 0 0 .74-.44V9.46a4.893 4.893 0 0 0 1.5-3.443C12.5 3.112 9.81.75 6.5.75z'
                fill='currentColor'
                fillRule='nonzero'
              ></path>
            </svg>
            {comentarios.length}
          </button>
        </div>

        {mejorVotado(productos).id === id && (
          <div className={style.mejorVotado}>
            <svg
              width='28'
              height='34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.464 34h.9c.144 0 .306-.072.342-.216l.954-3.618h2.052l-.936 3.528c-.054.198.036.306.234.306h.9c.144 0 .306-.072.342-.216l.954-3.618h1.638c.162 0 .234-.126.27-.288l.198-.882c.036-.162-.072-.288-.234-.288H7.584l.54-2.016h1.62c.162 0 .234-.126.27-.288l.216-.882c.036-.162-.072-.288-.234-.288H8.502l.936-3.528c.054-.198-.036-.306-.234-.306h-.9c-.144 0-.306.072-.342.216l-.954 3.618H4.956l.936-3.528c.054-.198-.036-.306-.234-.306h-.9c-.144 0-.306.072-.342.216l-.954 3.618h-1.62c-.162 0-.234.126-.27.288l-.216.882c-.036.162.072.288.234.288h1.494l-.54 2.016H.924c-.162 0-.234.126-.27.288l-.198.882c-.036.162.054.288.216.288h1.494l-.936 3.528c-.054.198.036.306.234.306Zm2.592-5.292.522-2.016H6.63l-.54 2.016H4.056ZM19.988 34h6.528a.758.758 0 0 0 .768-.768V1.168A.758.758 0 0 0 26.516.4H13.508c-.432 0-.816.336-.816.768v5.28c0 .432.384.768.816.768h5.712v26.016c0 .432.336.768.768.768Z'
                fill='#7D8AB0'
              ></path>
            </svg>
          </div>
        )}

        {mostrarComentarios && (
          <section className='overlay'>
            <div className='contenedor overlay-comentarios'>
              <div className='card'>
                <Link href={`/productos/producto/${id}`}>
                  <Image
                    className={style.imagen_producto}
                    src={imagen}
                    width={120}
                    height={100}
                    priority
                    alt={nombre}
                  />
                </Link>
                <div>
                  <Link
                    href={`/productos/producto/${id}`}
                    className={style.titulo}
                  >
                    {nombre}
                  </Link>
                  <p className={style.descripcion}>{descripcion}</p>
                  <button
                    className='overlay-close btn btn-primario btn-round'
                    onClick={() => setMostrarComentarios(false)}
                  >
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
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Comentarios producto={producto} />
            </div>
          </section>
        )}
      </div>

      {usuario ? (
        votantes.includes(usuario.uid) ? (
          <button
            type='button'
            className={style.quitar}
            onClick={() =>
              quitarVoto({
                id,
                usuario: usuario.uid,
                votantes: votantes,
                votos,
              })
            }
          >
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
                d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
              />
            </svg>
            <p>
              {votos} <span>Quitar</span>
            </p>
          </button>
        ) : (
          <button
            type='button'
            className={style.votar}
            onClick={() =>
              votarProducto({
                id,
                usuario: usuario.uid,
                votantes: votantes,
                votos,
              })
            }
          >
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
                d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
              />
            </svg>
            <p>
              {votos} <span>Votos</span>
            </p>
          </button>
        )
      ) : (
        <Link href={"/auth/login"} className={style.votar}>
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
              d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
            />
          </svg>
          <p>
            {votos} <span>Votos</span>
          </p>
        </Link>
      )}
    </article>
  );
};

export default DetalleProducto;
