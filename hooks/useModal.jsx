import { useState, useEffect } from "react";
import overflowBody from "../helpers/overflowBody";

const useModal = () => {
  // Estados
  const [modal, setModal] = useState(false);

  // Efectos
  useEffect(() => {
    overflowBody(modal);
  }, [modal]);

  // Funciones
  const mostrarModal = () => setModal(true);
  const ocultarModal = () => setModal(false);

  const Modal = ({ bg, children }) => {
    return (
      <section>
        {modal && (
          <section className='overlay' style={{ background: bg }}>
            <div className='overlay-center contenedor'>
              <div className='overlay-item'>
                {children}
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
      </section>
    );
  };

  Modal.defaultProps = {
    bg: "var(--white)",
  };

  return [Modal, modal, mostrarModal, ocultarModal];
};

export default useModal;
