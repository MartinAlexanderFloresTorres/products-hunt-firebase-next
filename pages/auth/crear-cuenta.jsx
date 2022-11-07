import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import BotonPrimario from "../../components/BotonPrimario";

// Default state
const defaultState = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  // Estados
  const [campos, setCampos] = useState(defaultState);
  const [errores, setErrores] = useState(defaultState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Destructuring de campos
  const { nombre, email, password } = campos;

  // useAuth
  const { usuario, loading: loadingUser, crearUsuario } = useAuth();

  // router
  const { push } = useRouter();

  // Redireccionar si el usuario esta autenticado
  useEffect(() => {
    if (usuario && !loadingUser) {
      push("/");
    }
  }, [usuario, loadingUser, push]);

  // Crear cuenta
  const crearCuenta = async () => {
    try {
      setLoading(true);
      await crearUsuario(nombre, email, password);
      setCampos(defaultState);
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya está registrado");
      } else if (error.code === "auth/invalid-email") {
        setError("El email no es válido");
      } else if (error.code === "auth/weak-password") {
        setError("El password debe tener al menos 6 caracteres");
      } else {
        setError("Hubo un error al crear la cuenta");
      }
    }
    setLoading(false);
  };

  // Llenar el state de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos({
      ...campos,
      [name]: value,
    });
  };

  // Validar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar nombre
    if (nombre.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        nombre: "El nombre es obligatorio",
      }));
    } else if (nombre.trim().length > 30) {
      setErrores((prevState) => ({
        ...prevState,
        nombre: "El nombre es muy largo",
      }));
    } else {
      setErrores((prevState) => ({
        ...prevState,
        nombre: "",
      }));
    }

    // Validar email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        email: "El email es obligatorio",
      }));
    } else if (!regex.test(email)) {
      setErrores((prevState) => ({
        ...prevState,
        email: "El email no es válido",
      }));
    } else {
      setErrores((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    // Validar password
    if (password.trim() === "") {
      setErrores((prevState) => ({
        ...prevState,
        password: "El password es obligatorio",
      }));
    } else if (password.trim().length < 6) {
      setErrores((prevState) => ({
        ...prevState,
        password: "El password debe tener al menos 6 caracteres",
      }));
    } else {
      setErrores((prevState) => ({
        ...prevState,
        password: "",
      }));
    }

    // Enviar formulario
    setErrores((prevState) => {
      if (
        prevState.nombre === "" &&
        prevState.email === "" &&
        prevState.password === ""
      ) {
        crearCuenta();
      }
      return {
        ...prevState,
      };
    });
  };
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
        <span>Login</span>
      </legend>

      {error && <p className='error'>{error}</p>}

      <label htmlFor='nombre'>
        <input
          type='text'
          placeholder='Ingrese su nombre'
          id='nombre'
          name='nombre'
          value={nombre}
          onChange={handleChange}
        />
      </label>

      {errores.nombre && <p className='error'>{errores.nombre}</p>}

      <label htmlFor='email'>
        <input
          type='email'
          placeholder='Ingrese su email'
          id='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
      </label>

      {errores.email && <p className='error'>{errores.email}</p>}

      <label htmlFor='password'>
        <input
          type='password'
          placeholder='Password'
          id='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </label>

      {errores.password && <p className='error'>{errores.password}</p>}

      <BotonPrimario estado={loading}>Crear cuenta</BotonPrimario>

      <p className='parrafo-crear'>
        ¿Ya tienes una cuenta? <Link href='/auth/login'>Inicia Sesión</Link>
      </p>
    </form>
  );
};

CrearCuenta.title = "Crear Cuenta";
export default CrearCuenta;
