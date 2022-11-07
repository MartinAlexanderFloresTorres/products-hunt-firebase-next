import { useState } from "react";
import { useRouter } from "next/router";
import useProductos from "../../hooks/useProductos";
import style from "../../styles/Buscador.module.css";

const Buscador = () => {
  // Estados
  const [busqueda, setBusqueda] = useState("");

  // useRouter
  const { push } = useRouter();

  // useProductos
  const { buscarProducto } = useProductos("creado");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar
    if (busqueda.trim() === "") return;

    // Redireccionar a /buscar
    push({
      pathname: "/productos/search",
      query: { q: busqueda },
    });

    // Buscar
    buscarProducto(busqueda);
  };

  return (
    <form className={style.buscador} onSubmit={handleSubmit}>
      <input
        className={style.input}
        type='text'
        placeholder='Buscar productos'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value.trimStart())}
      />
      <button className={style.button} title='Buscar'>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </button>
    </form>
  );
};

export default Buscador;
