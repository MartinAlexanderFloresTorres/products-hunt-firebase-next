import { createContext, useState } from 'react'
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useRouter } from 'next/router'
import useGetProductos from '../hooks/useGetProductos'

const ProductosContext = createContext()

const ProductosProvider = ({ children }) => {
  // Estados
  const [resultados, setResultados] = useState([])
  const [participantes, setParticipantes] = useState([])
  const [cargandoParticipantes, setCargandoParticipantes] = useState(true)

  // useRouter
  const { push } = useRouter()

  // useGetProductos
  const [productos, loadingProductos, errorProductos] = useGetProductos({
    orden: 'creado'
  })

  // Realizar la búsqueda
  const buscarProducto = async (busqueda) => {
    const busquedaLower = busqueda.toLowerCase()
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busquedaLower) ||
        producto.descripcion.toLowerCase().includes(busquedaLower) ||
        producto.empresa.toLowerCase().includes(busquedaLower)
      )
    })
    setResultados(filtro)
  }

  // Crear producto
  const newProducto = async (producto) => {
    try {
      await addDoc(collection(db, 'productos'), producto)
    } catch (error) {
      console.error(error.message)
    }
  }

  // Eliminar producto
  const deleteProducto = async (id) => {
    try {
      push('/')
      const data = await doc(db, 'productos', id)
      await deleteDoc(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  // Votar producto
  const votarProducto = async ({ id, usuario, votantes, votos }) => {
    try {
      // Actualizar el voto
      const data = await doc(db, 'productos', id)
      await updateDoc(data, {
        votos: (votos += 1),
        votantes: [...votantes, usuario]
      })
    } catch (error) {
      console.error(error.message)
      push('/')
    }
  }

  // Quitar voto
  const quitarVoto = async ({ id, usuario, votantes, votos }) => {
    try {
      const votantesActualizados = votantes.filter((votante) => votante !== usuario)
      // Actualizar el voto
      const data = await doc(db, 'productos', id)
      await updateDoc(data, {
        votos: (votos -= 1),
        votantes: votantesActualizados
      })
    } catch (error) {
      console.error(error.message)
      push('/')
    }
  }

  // Agregar comentario
  const addComentario = async (id, comentarios, newComentario) => {
    try {
      const data = await doc(db, 'productos', id)
      await updateDoc(data, {
        comentarios: [newComentario, ...comentarios]
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  // Obtener producto mejor vatado
  const mejorVotado = (productos) => {
    const [mejorProducto] = productos.sort((a, b) => b.votos - a.votos)
    return mejorProducto
  }

  // Amigos Secreto

  // Add participante
  const addParticipante = async (participante) => {
    try {
      // Si el participante ya existe, no se agrega
      const existe = participantes.find(
        (p) =>
          p.email === participante.email ||
          p.nombre.toLowerCase() === participante.nombre.toLowerCase()
      )
      if (!existe) {
        await addDoc(collection(db, 'participantes'), participante)
      } else {
        alert('El participante ya existe')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Delete participante
  const deleteParticipante = async (id) => {
    try {
      if (!confirm('¿Estas seguro de eliminar este participante?')) {
        return
      }
      const data = await doc(db, 'participantes', id)
      await deleteDoc(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  // Get participantes
  const getParticipantes = async (creador) => {
    try {
      setCargandoParticipantes(true)
      const manjejarSnapshot = (snapshot) => {
        let participantes = []
        snapshot.docs.map((doc) => {
          if (creador === doc.data().creador) {
            participantes.push({
              ...doc.data(),
              id: doc.id
            })
          }
        })
        setParticipantes(participantes)
        setCargandoParticipantes(false)
      }
      // Manejar el error
      const manjearError = (error) => {
        console.log(error.message)
        alert('Hubo un error al obtener los participantes')
      }

      onSnapshot(collection(db, 'participantes'), manjejarSnapshot, manjearError)
    } catch (error) {
      console.error(error.message)
    }
  }

  // Ocupar participante
  const ocuparParticipante = async (participante, usuario) => {
    try {
      // si el participante es igual al usuario, no se puede ocupar
      if (participante.email === usuario.email || participante.ocupado) {
        alert('No puedes ocuparte a ti mismo')
        return
      }

      const data = await doc(db, 'participantes', participante.id)
      await updateDoc(data, {
        ocupado: true,
        ocupadoPor: usuario.uid
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  // Reinicar participantes
  const reiniciarParticipantes = async (usuarioId) => {
    try {
      if (!confirm('¿Estas seguro de reiniciar los participantes?')) {
        return
      }
      participantes.map(async (participante) => {
        if (participante.creador === usuarioId) {
          const data = await doc(db, 'participantes', participante.id)
          await updateDoc(data, {
            ocupado: false,
            ocupadoPor: ''
          })
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <ProductosContext.Provider
      value={{
        newProducto,
        productos,
        loadingProductos,
        errorProductos,
        votarProducto,
        quitarVoto,
        addComentario,
        deleteProducto,
        buscarProducto,
        resultados,
        mejorVotado,

        // Amigos Secreto
        cargandoParticipantes,
        participantes,
        addParticipante,
        deleteParticipante,
        getParticipantes,
        ocuparParticipante,
        reiniciarParticipantes
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
}

export { ProductosContext }

export default ProductosProvider
