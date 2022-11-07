import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import BotonPrimario from "../../components/BotonPrimario";

const RecuperarPassword = () => {
  // Estados
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  // useAuth
  const { usuario, loading: loadingUser, restablecerPassword } = useAuth();

  // router
  const { push } = useRouter();

  // Redireccionar si el usuario esta autenticado
  useEffect(() => {
    if (usuario && !loadingUser) {
      push("/");
    }
  }, [usuario, loadingUser, push]);

  // Validar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.trim() === "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }
    if (!regex.test(email)) {
      setAlerta({
        msg: "El email no es válido",
        error: true,
      });
      return;
    }

    // Restablecer password
    try {
      setAlerta({
        msg: "",
        error: false,
      });
      setEmail("");
      setLoading(true);
      await restablecerPassword(email);
      setAlerta({
        msg: "Se ha enviado un email para restablecer el password",
        error: false,
      });
      setTimeout(() => {
        push("/auth/login");
      }, 3000);
    } catch (error) {
      const msg = error.message;
      console.log(msg);
      if (msg.includes("auth/user-not-found")) {
        setAlerta({
          msg: "El email no existe",
          error: true,
        });
      } else {
        setAlerta({
          msg: "Ha ocurrido un error",
          error: true,
        });
      }
    }
    setLoading(false);
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
        <span>Recuperar Password</span>
      </legend>

      <label htmlFor='email'>
        <input
          type='text'
          placeholder='Ingrese su email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </label>

      {alerta.msg && (
        <p className={alerta.error ? "error" : "success"}>{alerta.msg}</p>
      )}

      <BotonPrimario estado={loading}>Enviar instrucciones</BotonPrimario>

      <p className='parrafo-crear'>
        ¿No tienes una cuenta?{" "}
        <Link href='/auth/crear-cuenta'>Crear Cuenta</Link>
      </p>
    </form>
  );
};

RecuperarPassword.title = "Recuperar Password";
export default RecuperarPassword;
