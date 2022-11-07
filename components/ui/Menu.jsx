import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import style from "../../styles/Menu.module.css";

const Menu = ({ handle }) => {
  // useAuth
  const { usuario } = useAuth();

  const Arrow = () => (
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
        d='M9 5l7 7-7 7'
      />
    </svg>
  );

  return (
    <section className={style.menu}>
      <div className={style.contenido}>
        <button
          className='btn btn-primario btn-round'
          onClick={handle}
          id={style.cerrar}
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

        <div className={style.flex}>
          <button onClick={handle}>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
          </button>
          <Link onClick={handle} href='/' className={style.logo}>
            <svg
              width='40'
              height='40'
              viewBox='0 0 40 40'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  d='M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20'
                  fill='#DA552F'
                ></path>
                <path
                  d='M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14'
                  fill='#FFF'
                ></path>
              </g>
            </svg>
          </Link>
        </div>

        <section className={style.center}>
          <div className={style.item}>
            <p>Paginas</p>
            <nav className={style.navegacion}>
              <Link onClick={handle} href='/'>
                Inicio
                <Arrow />
              </Link>
              <Link onClick={handle} href='/productos/populares'>
                Populares
                <Arrow />
              </Link>
              {usuario && (
                <>
                  <Link onClick={handle} href='/productos/nuevo'>
                    Nuevo Producto
                    <Arrow />
                  </Link>

                  <Link onClick={handle} href='/productos/creador'>
                    Mis Productos
                    <Arrow />
                  </Link>
                </>
              )}
            </nav>
          </div>

          {usuario && (
            <div className={style.item}>
              <p>Auth</p>
              <nav className={style.navegacion}>
                <Link
                  onClick={handle}
                  href={`/auth/perfil/${usuario.displayName}`}
                >
                  Perfil
                  <Arrow />
                </Link>
              </nav>
            </div>
          )}
        </section>
      </div>
      <div className={style.handle} onClick={handle}></div>
    </section>
  );
};

export default Menu;
