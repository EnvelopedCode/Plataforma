// import logo from './("You can use a .svg here")';
// Here we import all final components and merge them into the parent component, so then it gets sent to index.js
import React from 'react';
import ServiciosRegistro from './pages/ServiciosRegistro/ServiciosRegistro';
import ServiciosGestion from './pages/ServiciosGestion/ServiciosGestion';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/RegistroServicios" element={<ServiciosRegistro />}/>
          <Route path="/GestionServicios" element={<ServiciosGestion />}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>  
  );
}

export default App;
