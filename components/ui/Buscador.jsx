import { useState } from "react";
import { useRouter } from "next/router";
import useProductos from "../../hooks/useProductos";
import DetalleProducto from "../productos/DetalleProducto";
import style from "../../styles/Buscador.module.css";

const Buscador = () => {
  // Estados
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState([]);
  const [modal, setModal] = useState(false);

  // useRouter
  const { push } = useRouter();

  // useProductos
  const { buscarProducto, resultados } = useProductos();

  // Funciones
  const mostrarModal = () => setModal(true);
  const ocultarModal = () => setModal(false);

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

    // Cerrar modal
    ocultarModal();

    // Limpiar busqueda
    setBusqueda("");
  };

  // Handle Change
  const handleChange = (e) => {
    const { value } = e.target;
    setBusqueda(value.trimStart());
    buscarProducto(value.trim());
    setResultado(resultados);
  };

  return (
    <>
      <label
        htmlFor='busquedad'
        className={style.buscadorNoVisible}
        onClick={mostrarModal}
      >
        <p className={style.inputNoVisible}>Buscar productos</p>
        <button className={style.buttonNoVisible} title='Buscar'>
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
      </label>

      {modal && (
        <section className='overlay' style={{ background: "var(--white-05)" }}>
          <div className='overlay-top contenedor'>
            <div className='overlay-item'>
              <div className='overlay-content'>
                <form className={style.buscador} onSubmit={handleSubmit}>
                  <input
                    className={style.input}
                    type='text'
                    placeholder='Buscar productos'
                    value={busqueda}
                    onChange={handleChange}
                    name='busquedad'
                    id='busquedad'
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

                {busqueda && (
                  <div className={style.resultados}>
                    {resultado.length > 0 ? (
                      resultado.map((producto, i) => (
                        <DetalleProducto
                          key={producto.id}
                          producto={producto}
                          indice={i}
                          onClick={ocultarModal}
                          id='search'
                        />
                      ))
                    ) : (
                      <p className='vacio'>No hay resultados</p>
                    )}
                  </div>
                )}
              </div>
              <button
                className='overlay-close-x btn btn-danger'
                onClick={ocultarModal}
                title='Close'
              >
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Buscador;
