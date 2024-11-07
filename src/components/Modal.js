import React from 'react';
import MovieDetail from './MovieDetail';
import '../styles/Modal.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <MovieDetail movie={movie} />
      </div>
    </div>
  );
};

export default Modal;