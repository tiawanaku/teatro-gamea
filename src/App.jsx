import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Tus estilos globales pueden estar aquí

// Importa los componentes que representan cada página
import Inicio from './components/Inicio';
import Historia from './components/Historia';
import Eventos from './components/Eventos';
import Teatro from './components/Teatro';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/teatro" element={<Teatro />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
