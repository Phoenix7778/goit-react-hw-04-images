import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ url, alt, closeModalWindow }) => {
  useEffect(() => {
    const onEscPress = event => {
      if (event.code === 'Escape') {
        closeModalWindow();
      }
    };

    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeModalWindow]);

  const handleClose = event => {
    if (event.currentTarget === event.target) {
      closeModalWindow();
    }
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '1200',
      }}
    >
      <div
        style={{
          maxWidth: 'calc(100vw - 48px)',
          maxHeight: 'calc(100vh - 24px)',
        }}
      >
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};
