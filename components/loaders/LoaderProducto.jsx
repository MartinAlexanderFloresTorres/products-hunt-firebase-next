import style from "../../styles/LoaderProducto.module.css";

const LoaderProducto = () => {
  return (
    <article className={style.loader}>
      <div className={style.imagen}></div>
      <div className={style.texto}></div>
      <div className={style.votar}></div>
    </article>
  );
};

export default LoaderProducto;
