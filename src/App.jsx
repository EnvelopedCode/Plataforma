// import logo from './("You can use a .svg here")';
// Here we import all final components and merge them into the parent component, so then it gets sent to index.js
import React from 'react';
import NavbarAdmin from './components/NavbarAdmin';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/navbaradmin" element={<NavbarAdmin />}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>  
  );
}

export default App;
