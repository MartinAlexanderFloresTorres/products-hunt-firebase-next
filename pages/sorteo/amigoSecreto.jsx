import { useState } from 'react'
import Participantes from '../../components/amigoSecreto/Participantes'
import BotonPrimario from '../../components/BotonPrimario'
import Spinner from '../../components/loaders/Spinner'
import colorAleatorio from '../../helpers/colorAleatorio'
import useAuth from '../../hooks/useAuth'
import useProductos from '../../hooks/useProductos'

const AmigoSecreto = () => {
  // Estados
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [cargando, setCargando] = useState(false)

  // useProductos
  const { addParticipante } = useProductos()

  // useAuth
  const { usuario, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    if ([nombre.trim(), email.trim()].includes('')) {
      return
    }

    // Agregar participante
    setCargando(true)
    setNombre('')
    setEmail('')
    try {
      await addParticipante({
        creador: usuario.uid,
        nombre,
        email,
        ocupado: false,
        ocupadoPor: null,
        color: colorAleatorio()
      })
    } catch (error) {
      console.log(error.message)
    }
    setCargando(false)
  }

  // Si esta cargando, mostrar mensaje
  if (loading) {
    return <Spinner />
  }

  // Si no hay usuario, mostrar mensaje
  if (!usuario && !loading) {
    return (
      <section className='container p-20'>
        <p className='vacio'>Debes iniciar sesión para descubrir tu amigo secreto</p>
      </section>
    )
  }

  return (
    <section>
      <form className='formulario' onSubmit={handleSubmit}>
        <legend>
          <b>Amigo Secreto</b>
          Registra a los participantes
        </legend>
        <label htmlFor='nombre'>
          <input
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            id='nombre'
            name='nombre'
            placeholder='Nombre'
          />
        </label>

        <label htmlFor='email'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            name='email'
            placeholder='Email'
          />
        </label>

        <BotonPrimario disabled={[nombre, email].includes('')} estado={cargando}>
          Agregar Participante
        </BotonPrimario>
      </form>

      <Participantes />
    </section>
  )
}

AmigoSecreto.title = 'Amigo Secreto'

export default AmigoSecreto
