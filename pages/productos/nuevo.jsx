import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import useProductos from "../../hooks/useProductos";
import uploadImage from "../../firebase/uploadImage";
import Spinner from "../../components/loaders/Spinner";

// Default State
const defaultState = {
  nombre: "",
  imagen: "",
  pagina: "",
  descripcion: "",
  empresa: "",
};

const Nuevo = () => {
  // Estados
  const [campos, setCampos] = useState(defaultState);
  const [errores, setErrores] = useState(defaultState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Destructuring de campos
  const { nombre, imagen, pagina, descripcion, empresa } = campos;

  // useAuth
  const { usuario, loading: loadingUser } = useAuth();

  // useProductos
  const { newProducto } = useProductos();

  // Router
  const { push } = useRouter();

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "imagen") {
      // Validar imagen
      setCampos({ ...campos, [name]: e.target.files[0] });
    } else {
      setCampos({ ...campos, [name]: value });
    }
  };

  // Crear producto
  const crearProducto = async () => {
    try {
      // Subir imagen
      setLoading(true);
      const urlImage = await uploadImage(imagen);

      // Objeto del producto
      const producto = {
        nombre,
        imagen: urlImage,
        pagina,
        descripcion,
        empresa,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
        creador: {
          id: usuario.uid,
          nombre: usuario.displayName,
        },
        votantes: [],
      };
      newProducto(producto);
      push("/");
    } catch (error) {
      console.log(error.message);
      setError("Hubo un error al crear el producto");
    }
    setLoading(false);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si no esta autenticado, redireccionar
    if (!usuario) {
      return push("/auth/login");
    }

    // Validar nombre
    if (nombre.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        nombre: "El nombre es obligatorio",
      }));
    } else {
      setErrores((prevState) => ({ ...prevState, nombre: "" }));
    }

    // Validar imagen
    if (imagen === "" || !imagen) {
      setErrores((prevState) => ({
        ...prevState,
        imagen: "La imagen es obligatoria",
      }));
    } else {
      setErrores((prevState) => ({ ...prevState, imagen: "" }));
    }

    // Validar url
    if (pagina.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        pagina: "La url es obligatoria",
      }));
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(pagina)) {
      setErrores((prevState) => ({
        ...prevState,
        pagina: "La url no es válida",
      }));
    } else {
      setErrores((prevState) => ({ ...prevState, pagina: "" }));
    }

    // Validar descripcion
    if (descripcion.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        descripcion: "La descripción es obligatoria",
      }));
    } else {
      setErrores((prevState) => ({ ...prevState, descripcion: "" }));
    }

    // Validar empresa
    if (empresa.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        empresa: "La empresa es obligatoria",
      }));
    } else {
      setErrores((prevState) => ({ ...prevState, empresa: "" }));
    }

    // Validar errores
    setErrores((prevState) => {
      if (
        prevState.nombre === "" &&
        prevState.imagen === "" &&
        prevState.pagina === "" &&
        prevState.descripcion === "" &&
        prevState.empresa === ""
      ) {
        crearProducto();
      }

      return {
        ...prevState,
      };
    });
  };

  // Si esta cargando el usuario, mostrar spinner
  if (loadingUser) return <Spinner />;

  // Si no esta autenticado, redireccionar
  if (!usuario) {
    push("/auth/login");
    return null;
  }

  return (
    <form className='formulario' onSubmit={handleSubmit} noValidate>
      <legend>
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
        <span>Crear tu Producto</span>
      </legend>

      {error && <p className='error'>{error}</p>}

      <label htmlFor='nombre'>
        <input
          type='text'
          placeholder='Nombre de tu producto'
          id='nombre'
          name='nombre'
          value={nombre}
          onChange={handleChange}
        />
      </label>

      {errores.nombre && <p className='error'>{errores.nombre}</p>}

      <label htmlFor='empresa'>
        <input
          type='text'
          placeholder='Nombre de la empresa'
          id='empresa'
          name='empresa'
          value={empresa}
          onChange={handleChange}
        />
      </label>

      {errores.empresa && <p className='error'>{errores.empresa}</p>}

      <label
        htmlFor='imagen'
        className='formulario-label-file'
        id={imagen ? "subido" : "no-subido"}
      >
        <input
          type='file'
          accept='image/webp,image/png,image/jpg,image/avif,image/jpeg'
          id='imagen'
          name='imagen'
          onChange={handleChange}
        />
        {imagen ? (
          <p>
            <span>{imagen.name}</span>
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
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </p>
        ) : (
          <p>
            <span>Sube tu imagen</span>
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
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </p>
        )}
      </label>

      {errores.imagen && <p className='error'>{errores.imagen}</p>}

      <label htmlFor='pagina'>
        <input
          type='url'
          placeholder='pagina de tu producto'
          id='pagina'
          name='pagina'
          value={pagina}
          onChange={handleChange}
        />
      </label>

      {errores.pagina && <p className='error'>{errores.pagina}</p>}

      <label htmlFor='descripcion'>
        <textarea
          placeholder='Descripcion de tu producto'
          id='descripcion'
          name='descripcion'
          value={descripcion}
          onChange={handleChange}
        />
      </label>

      {errores.descripcion && <p className='error'>{errores.descripcion}</p>}

      <button type='submit' className='btn btn-primario' disabled={loading}>
        {loading ? "Creando..." : "Crear Producto"}
      </button>
    </form>
  );
};

Nuevo.title = "Nuevo Producto";
export default Nuevo;
