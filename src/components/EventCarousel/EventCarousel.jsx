// EventCarousel.jsx
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventCarousel.css'; // Asegúrate de que tus estilos específicos del carrusel están aquí

function EventCarousel() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://104.248.12.189:1337/api/teatro-eventos?populate=imagen_evento')
      .then(response => response.json())
      .then(data => {
        const eventosFiltrados = filtrarEventosHoyYAdelante(data.data);
        const eventosOrdenados = ordenarEventosPorFecha(eventosFiltrados);
        setEventos(eventosOrdenados);
      })
      .catch(error => console.error('Error al obtener los eventos:', error));
  }, []);

  function filtrarEventosHoyYAdelante(eventos) {
    const fechaHoy = new Date();
    return eventos.filter(evento => {
      const fechaInicio = new Date(evento.attributes.fecha_inicio);
      return fechaInicio >= fechaHoy;
    });
  }

  function ordenarEventosPorFecha(eventos) {
    return eventos.sort((a, b) => {
      const timestampA = new Date(a.attributes.fecha_inicio).getTime();
      const timestampB = new Date(b.attributes.fecha_inicio).getTime();
      return timestampA - timestampB;
    });
  }

  return (
    <Carousel>
      {eventos.map((evento, index) => {
        const fechaInicio = new Date(evento.attributes.fecha_inicio);
        const fechaFin = new Date(evento.attributes.fecha_fin);
        const fechaInicioFormateada = fechaInicio.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
        const fechaFinFormateada = fechaFin.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
        const imagen = evento.attributes.imagen_evento.data;
        const imageUrl = imagen ? `http://104.248.12.189:1337${imagen.attributes.url}` : 'imagen_por_defecto.jpg';

        return (
          <Carousel.Item key={evento.id}>
            <div className="card text-bg-dark">
              <img src={imageUrl} className="card-img" alt={evento.attributes.titulo_evento} />
              <div className="card-img-overlay d-flex flex-column justify-content-end">
                <div className="event-date-badge bg-primary text-white text-bold p-2 position-absolute top-0 start-0">
                  <div className="fw-bold">Inicio: {fechaInicioFormateada}</div>
                  <div className="fw-bold">Fin: {fechaFinFormateada}</div>
                </div>
                <h5 className="card-title">{evento.attributes.titulo_evento}</h5>
                <p className="card-text">{evento.attributes.descripcion_evento}</p>
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default EventCarousel;