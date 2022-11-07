import Image from "next/image";
import defaultUser from "../../constants/defaultUser";
import formatearTiempo from "../../helpers/formatearTiempo";
import style from "../../styles/Comentario.module.css";

const Comentario = ({ comentario, creador }) => {
  const {
    usuario: { nombre, id, photoURL },
    mensaje,
    publicado,
  } = comentario;

  return (
    <li className={style.comentario}>
      <Image
        src={photoURL || defaultUser}
        width={50}
        height={50}
        alt={nombre}
      />
      <div>
        <div className={style.usuario}>
          <p>{nombre}</p>
          {creador === id && <span>Creador</span>}
        </div>
        <p className={style.texto}>{mensaje}</p>
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
          <span>{formatearTiempo(publicado)}</span>
        </p>
      </div>
    </li>
  );
};

export default Comentario;
