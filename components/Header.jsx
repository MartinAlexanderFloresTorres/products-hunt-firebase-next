import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Buscador from './ui/Buscador'
import Navegacion from './ui/Navegacion'
import useAuth from '../hooks/useAuth'
import Menu from './ui/Menu'
import overflowBody from '../helpers/overflowBody'
import defaultUser from '../constants/defaultUser'
import style from '../styles/Header.module.css'

const Header = () => {
  // Estados
  const [opciones, setOpciones] = useState(false)
  const [menu, setMenu] = useState(false)

  // useAuth
  const { usuario, loading, cerrarSesion } = useAuth()

  // Handle Opciones
  const handleOpciones = () => setOpciones(!opciones)

  // Handle Menu
  const handleMenu = () => setMenu(!menu)

  // Overflow Body
  useEffect(() => {
    overflowBody(menu)
  }, [menu])
  return (
    <header className={style.header}>
      <section className='contenedor'>
        <div className={style.flex}>
          <div className={style.flex}>
            <div className={style.flex_menu}>
              <button className={style.btnMenu} onClick={handleMenu}>
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
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              <Link href='/' className={style.logo}>
                <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
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
            <Buscador />
            <Navegacion />
            {menu && <Menu handle={handleMenu} />}
          </div>

          <div className={style.auth}>
            {usuario ? (
              <>
                <Link href='/sorteo/amigoSecreto' className='btn btn-primario'>
                  Amigo Secreto
                </Link>
                <div className={style.usuario}>
                  <p className={style.bienvenida}>
                    Hola <span>{usuario.displayName}</span>
                  </p>
                  <Image
                    onClick={handleOpciones}
                    src={usuario.photoURL || defaultUser}
                    alt={usuario.displayName || 'Usuario'}
                    width={40}
                    height={40}
                  />

                  {opciones && (
                    <div className={style.opciones}>
                      <div>
                        <p>{usuario?.displayName || 'Sin nombre'}</p>
                        <a
                          className={style.email}
                          href={`mailto:${usuario.email}`}
                          onClick={handleOpciones}
                        >
                          {usuario.email}
                        </a>
                      </div>
                      <div>
                        <Link href={`/auth/perfil/${usuario.displayName}`} onClick={handleOpciones}>
                          Mi perfil
                        </Link>
                        <Link href='/productos/creador' onClick={handleOpciones}>
                          Mis productos
                        </Link>
                        <Link href='/productos/nuevo' onClick={handleOpciones}>
                          Nuevo producto
                        </Link>
                      </div>
                      <button
                        type='button'
                        className='btn btn-primario'
                        onClick={() => {
                          cerrarSesion()
                          handleOpciones()
                        }}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : loading ? (
              <div className={style.loader}>
                <div className={style.loader_item}></div>
                <div className={style.loader_item}></div>
              </div>
            ) : (
              <>
                <Link className={style.link} href='/auth/login'>
                  Login
                </Link>
                <Link href='/auth/crear-cuenta' className='btn btn-primario'>
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
