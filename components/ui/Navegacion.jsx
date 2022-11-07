import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import style from "../../styles/Navegacion.module.css";

const Navegacion = () => {
  // useAuth
  const { usuario } = useAuth();

  return (
    <nav className={style.navegacion}>
      <Link href='/'>Inicio</Link>
      <Link href='/productos/populares'>Populares</Link>
      {usuario && <Link href='/productos/nuevo'>Nuevo Producto</Link>}
    </nav>
  );
};

export default Navegacion;
