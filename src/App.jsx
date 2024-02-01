import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Asegúrate de que tus estilos personalizados estén aquí

function App() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://104.248.12.189:1337/api/meventos?populate=imagen_evento')
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
      const fechaEvento = new Date(evento.attributes.fecha_evento);
      return fechaEvento >= fechaHoy;
    });
  }

  function ordenarEventosPorFecha(eventos) {
    return eventos.sort((a, b) => {
      const timestampA = new Date(a.attributes.fecha_evento).getTime();
      const timestampB = new Date(b.attributes.fecha_evento).getTime();
      return timestampA - timestampB;
    });
  }

  return (
    <Carousel>
      {eventos.map((evento, index) => {
        const fecha = new Date(evento.attributes.fecha_evento);
        const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        const imagen = evento.attributes.imagen_evento.data;
        const imageUrl = imagen ? `http://104.248.12.189:1337${imagen.attributes.url}` : 'imagen_por_defecto.jpg';

        return (
          <Carousel.Item key={evento.id}>
            <div className="card text-bg-dark">
              <img src={imageUrl} className="card-img" alt={evento.attributes.titulo_evento} />
              <div className="card-img-overlay d-flex flex-column justify-content-end">
                <div className="date-badge">
                  <span className="date-day">{fecha.getDate()}</span>
                  <span className="date-month-year">{fechaFormateada}</span>
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

export default App;