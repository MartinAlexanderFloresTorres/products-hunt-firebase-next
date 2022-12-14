import { useEffect } from 'react'
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'
import useProductos from '../../hooks/useProductos'

const Participantes = () => {
  // useProductos
  const { getParticipantes, deleteParticipante, participantes, cargandoParticipantes } =
    useProductos()

  // useAuth
  const { usuario } = useAuth()

  // Obtener participantes
  useEffect(() => {
    if (usuario) {
      getParticipantes(usuario.uid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {cargandoParticipantes ? (
        <p className='vacio'>Cargando participantes...</p>
      ) : (
        participantes.length > 0 && (
          <section className='container participantes'>
            <h2>Tus Participantes</h2>
            <ul>
              {participantes.map((participante) => (
                <li key={participante.id}>
                  <div className='participantes__avatar' style={{ background: participante.color }}>
                    {participante?.nombre?.trim()?.slice(0, 1)}
                  </div>
                  <p>{participante.nombre}</p>
                  <p>{participante.email}</p>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => deleteParticipante(participante.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <Link className='btn btn-primario' href={`/sorteo/sorteo?id=${usuario.uid}`}>
              Comenzar sorteo
            </Link>
          </section>
        )
      )}
    </>
  )
}

export default Participantes
