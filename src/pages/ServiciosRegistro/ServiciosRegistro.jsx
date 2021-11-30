import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';

export default function ServiciosRegistro() {

    return (
      <React.Fragment>
        <NavbarAdmin />
        <div className="container" style={{ color: "#424B5A;" }}>
          <Titulo
            titulo="REGISTRO DE SERVICIO"
            subTitulo1="A continuación, podrás registrar tanto de forma manual"
            subTitulo2="como masiva los nuevos servicios de clientes"
          />
          <RegistroMasivo mensaje="Adjunta el archivo .xlsx con la información de los nuevos servicios a registrar" />
    
        </div>
      </React.Fragment>
    );
}
