// import logo from './("You can use a .svg here")';
// Here we import all final components and merge them into the parent component, so then it gets sent to index.js
import React from 'react';
import ServiciosRegistro from './pages/ServiciosRegistro/ServiciosRegistro';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/RegistroServicios" element={<ServiciosRegistro />}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>  
  );
}

export default App;
