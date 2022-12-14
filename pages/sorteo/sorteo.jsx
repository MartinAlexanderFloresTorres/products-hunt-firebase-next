import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useProductos from '../../hooks/useProductos'
import Spinner from '../../components/loaders/Spinner'
import useAuth from '../../hooks/useAuth'
import styles from '../../styles/Sorteo.module.css'

const Sorteo = () => {
  // Estados
  const [copy, setCopy] = useState(false)

  // usePracticipantes
  const {
    getParticipantes,
    participantes,
    ocuparParticipante,
    cargandoParticipantes,
    reiniciarParticipantes
  } = useProductos()

  // useAuth
  const { usuario, loading } = useAuth()

  // useParams
  const { query } = useRouter()

  useEffect(() => {
    getParticipantes(query.id ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // copiar Enlace
  const copiarEnlace = () => {
    if (copy) return

    setCopy(true)
    navigator.clipboard.writeText(window.location.href)

    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  // Si no hay usuario, mostrar mensaje
  if (!usuario && !loading) {
    return (
      <section className='container p-20'>
        <p className='vacio'>Debes iniciar sesión para ver esta página</p>
      </section>
    )
  }
  // Verificar si el usuario ya selecciono un participante
  const selecciono =
    participantes.length > 0 &&
    participantes.some((participante) => participante.ocupadoPor === usuario.uid)

  return (
    <section className={`container ${styles.sorteo}`}>
      <h1 className={styles.titulo}>Sorteo</h1>

      {cargandoParticipantes ? (
        <Spinner />
      ) : participantes.length > 0 ? (
        <>
          <div className={styles.items}>
            {participantes.map((participante) => (
              <button
                type='button'
                className={`${styles.item} ${participante.ocupado ? styles.ocupado : ''}`}
                key={participante.id}
                disabled={participante.ocupado || selecciono}
                onClick={() => {
                  if (!selecciono && !participante.ocupado) {
                    ocuparParticipante(participante, usuario)
                  }
                }}
              >
                {!participante.ocupado ? (
                  <Image src='/interrogante.png' alt='interrogante' width={100} height={100} />
                ) : participante.ocupadoPor === usuario.uid ? (
                  <>
                    <p className={styles.tu}>Te toco</p>
                    <div
                      className='participantes__avatar'
                      style={{ background: participante.color }}
                    >
                      {participante?.nombre?.trim()?.slice(0, 1)}
                    </div>
                    <h3>{participante.nombre}</h3>
                    <p>{participante.email}</p>
                  </>
                ) : (
                  <Image src='/interrogante.png' alt='interrogante' width={100} height={100} />
                )}
              </button>
            ))}
          </div>

          <div className={styles.botones}>
            {usuario?.uid === participantes[0]?.creador && (
              <button
                type='button'
                className='btn btn-primario'
                onClick={() => reiniciarParticipantes(usuario.uid)}
              >
                Reiniciar sorteo
              </button>
            )}

            <button className='btn btn-blue' onClick={copiarEnlace}>
              {copy ? 'Copiado' : 'Copiar enlace'}
            </button>
          </div>
        </>
      ) : (
        <p className='vacio'>No hay participantes</p>
      )}
    </section>
  )
}

Sorteo.title = 'Sorteo'

export default Sorteo
