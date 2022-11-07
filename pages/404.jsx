import Link from "next/link";
import style from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <section className={style.notFound}>
      <div className='contenedor'>
        <h1 className={style.titulo}>¡Esa página no fue encontrada!</h1>
        <p className={style.parrafo}>
          <span className=''>4</span>
          <span className=''>0</span>
          <span className=''>4</span>
        </p>
        <Link href='/' className='btn btn-primario'>
          Volver
        </Link>
      </div>
    </section>
  );
};
export default NotFound;
