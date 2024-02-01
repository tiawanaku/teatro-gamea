
import React from 'react';
import teatroImage from '../assets/images/11.jpg';
import './Inicio.css';

function Inicio() {
  return (
    <div>
      <h2>Inicio</h2>
      {/* Contenido adicional del Inicio aquí */}
      <img src={teatroImage} alt="teatro_municipal" className="img-fluid"></img>
    </div>
  );
}

export default Inicio;
