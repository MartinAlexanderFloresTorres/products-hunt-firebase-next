import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import BotonPrimario from "../../components/BotonPrimario";

// Default state
const defaultState = {
  email: "",
  password: "",
};

const Login = () => {
  // Estados
  const [campos, setCampos] = useState(defaultState);
  const [errores, setErrores] = useState(defaultState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Destructuring de campos
  const { email, password } = campos;

  // useAuth
  const {
    usuario,
    loading: loadingUser,
    autenticarUsuario,
    autenticarGoogle,
    autenticarGithub,
    autenticarFacebook,
    errorAuth,
  } = useAuth();

  // router
  const { push } = useRouter();

  // Redireccionar si el usuario esta autenticado
  useEffect(() => {
    if (usuario && !loadingUser) {
      push("/");
    }
  }, [usuario, loadingUser, push]);

  // Crear cuenta
  const autenticar = async () => {
    try {
      setLoading(true);
      await autenticarUsuario(email, password);
      setCampos(defaultState);
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/wrong-password") {
        setError("El password no es correcto");
      } else if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
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
      if (prevState.email === "" && prevState.password === "") {
        autenticar();
      }
      return {
        ...prevState,
      };
    });
  };

  return (
    <form className='formulario' onSubmit={handleSubmit}>
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

      {errorAuth && <p className='error'>{errorAuth}</p>}

      {error && <p className='error'>{error}</p>}

      <label htmlFor='email'>
        <input
          type='text'
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

      <Link href='/auth/recuperar-password' className='link-azul'>
        ¿Olvidaste tu contraseña?
      </Link>

      <BotonPrimario estado={loading}>Iniciar sesión</BotonPrimario>

      <p className='parrafo-crear'>
        ¿No tienes una cuenta?{" "}
        <Link href='/auth/crear-cuenta'>Crear Cuenta</Link>
      </p>

      <div className='formulario-botones'>
        <button type='button' onClick={autenticarGoogle}>
          <svg
            height='100%'
            viewBox='0 0 20 20'
            width='100%'
            preserveAspectRatio='xMidYMid meet'
            focusable='false'
          >
            <path
              d='M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z'
              fill='#4285F4'
            ></path>
            <path
              d='M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z'
              fill='#34A853'
            ></path>
            <path
              d='M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z'
              fill='#FBBC05'
            ></path>
            <path
              d='M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z'
              fill='#EA4335'
            ></path>
          </svg>
        </button>

        <button type='button' onClick={autenticarGithub}>
          <svg
            height='100%'
            viewBox='0 0 20 20'
            width='100%'
            preserveAspectRatio='xMidYMid meet'
            focusable='false'
          >
            <path
              d='M10 0C4.476 0 0 4.477 0 10c0 4.418 2.865 8.166 6.84 9.49.5.09.68-.218.68-.483 0-.237-.007-.866-.012-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.464-1.11-1.464-.907-.62.07-.608.07-.608 1.003.07 1.53 1.03 1.53 1.03.893 1.53 2.342 1.087 2.912.83.09-.645.35-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.683-.105-.253-.448-1.27.096-2.647 0 0 .84-.268 2.75 1.026A9.555 9.555 0 0110 4.836a9.59 9.59 0 012.504.337c1.91-1.294 2.747-1.026 2.747-1.026.548 1.377.204 2.394.1 2.647.64.7 1.03 1.592 1.03 2.683 0 3.842-2.34 4.687-4.566 4.935.36.308.678.92.678 1.852 0 1.336-.01 2.415-.01 2.743 0 .267.18.578.687.48A10 10 0 0020 10c0-5.522-4.478-10-10-10'
              fill='var(--gris-4)'
              fillRule='evenodd'
            ></path>
          </svg>
        </button>

        <button type='button' onClick={autenticarFacebook}>
          <svg
            height='100%'
            viewBox='0 0 20 20'
            width='100%'
            preserveAspectRatio='xMidYMid meet'
            focusable='false'
          >
            <path
              d='M18.007 19c.55 0 .993-.444.993-.993V1.993A.992.992 0 0018.007 1H1.993A.992.992 0 001 1.993v16.014c0 .55.444.993.993.993h16.014zm-4.587 0v-6.97h2.34l.35-2.717h-2.69V7.578c0-.786.218-1.322 1.346-1.322h1.438v-2.43a18.915 18.915 0 00-2.096-.108c-2.073 0-3.494 1.267-3.494 3.59v2.005H8.268v2.717h2.346V19h2.806z'
              fill='#3B5998'
              fillRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

Login.title = "Login";
export default Login;
