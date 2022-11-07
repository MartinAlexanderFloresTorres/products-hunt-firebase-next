/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../../../components/loaders/Spinner";
import defaultUser from "../../../constants/defaultUser";
import useAuth from "../../../hooks/useAuth";
import style from "../../../styles/PerfilUsuario.module.css";

const PerfilUsuario = () => {
  // useAuth
  const { usuario, loading } = useAuth();

  // useRouter
  const { push } = useRouter();

  // Si esta cargando el usuario, mostrar spinner
  if (loading) return <Spinner />;

  // Si no hay usuario, redireccionar a login
  if (!usuario) {
    push("/auth/login");
    return null;
  }

  return (
    <section className={style.perfil}>
      <Image
        src={usuario.photoURL || defaultUser}
        alt={usuario.displayName || "Usuario"}
        width={100}
        height={100}
        className={style.avatar}
      />

      <div className={style.informacion}>
        <h1>{usuario.displayName}</h1>
        <a href={`mailto:${usuario.email}`} className='btn btn-white'>
          {usuario.email}
        </a>
      </div>

      <div className={style.flex}>
        <div className={style.telefono}>
          Telefono: <span>{usuario.phoneNumber || "No tiene"}</span>
        </div>

        <div>
          {usuario.emailVerified ? (
            <div className={style.verificado}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-circle-check'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#009988'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <circle cx='12' cy='12' r='9' />
                <path d='M9 12l2 2l4 -4' />
              </svg>
              <p>Correo verificado</p>
            </div>
          ) : (
            <div className={style.verificado}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-circle-check'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ff4500'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <circle cx='12' cy='12' r='9' />
                <path d='M9 12l2 2l4 -4' />
              </svg>
              <p>Correo no verificado</p>
            </div>
          )}
        </div>
      </div>

      <div className={style.botones}>
        <Link href='/productos/nuevo' className='btn btn-primario'>
          Crear producto
        </Link>
        <Link href='/productos/creador' className='btn btn-white'>
          Mis productos
        </Link>
      </div>
    </section>
  );
};

export default PerfilUsuario;
