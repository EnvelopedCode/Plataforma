import React from 'react'
import NavbarUsuario from '../../components/NavbarUsuario';
import Titulo from '../../components/Titulo';
import { useState, useEffect } from 'react';
import { authCliente } from '../../auth/authCliente';
import jwt_decode from "jwt-decode";

export default function GestionFacturacion() {

  var host = "http://localhost:8080";
  const [usuario, setUsuario] = useState("");
  const [facturas, setFacturas] = useState([]); //Este estado representa los registros del usuario en cuanto se carga la pagina (se manda un GET)
  const [informacion, setInformacion] = useState("");
  const [formulario, setFormulario] = useState(false); //Una vez se encuentra el registro despliega el formulario
  const [lecturas, setLecturas] = useState([]);
  const [servicioE, setServicioE] = useState("");

  const buscarRegistro = (event) => {
    //Aqui hago setInformacion true
    //Aqui hago setFormulario = formulario seleccionado
    //Aqui hago titulo = Titulo del servicio seleccionado
    event.preventDefault();
    console.log(event.target.outerText)

    let servicioEnviar = {
      "servicio": event.target.outerText
    }

    fetch(`${host}/facInfo`, { //Me traigo nombre
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(servicioEnviar)
    })//Traer informacion del servicio
      .then((data) => data.json())
      .then((data) => {
        setFormulario(true);
        setInformacion(data.servicio);
        setServicioE(data.servicio.servicio);
      })

  };

  const verFacturacion = (event) => {

    console.warn("ENTRO A MODAL")
    console.log(servicioE)
    const servicioEnviar = {
      "servicio": servicioE
    }

    console.log(servicioEnviar)

    fetch(`${host}/facLecturas`, { //Me traigo las lecturas
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(servicioEnviar)
    }) 
      .then((data) => data.json())
      .then((data) => {
        //Lecturas es una matriz
        console.log(data.lectura)
        setLecturas(data.lectura)
      })
  };

  useEffect(() => {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    console.log(decoded.cedula)
    console.log(typeof decoded.cedula)
    const cedula = {
      "cedula": decoded.cedula
    }
  
    console.log(cedula)
  
    fetch(`${host}/facData`, { //Me traigo nombre
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(cedula)
    })
      .then((data) => data.json())
      .then((data) => {

        setUsuario(data.nombre + " " + data.apellido)
        fetch(`${host}/facServicios`, { //Me traigo los servicios asociados
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(cedula)
        })
          .then((data) => data.json())
          .then((data) => {
            console.log(data.servicios)
            setFacturas(data.servicios)
          })
      })
  
  }, [])

  useEffect(() => {
    console.log(lecturas)
  }, [lecturas])

  return (
    <React.Fragment>
      {authCliente() ? 
      <div>
        <div className="container" style={{ color: "#424B5A;" }}>
          <NavbarUsuario />
          <Titulo
            titulo="FACTURACION"
            subTitulo1="A continuación, podrás gestionar tanto de forma manual como masiva los servicios de clientes existentes."
          />
          <div
            className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
            style={{ marginBottom: "36px" }}
          >
            <div
              style={{
                background: "#FFFFFF",
                width: "386px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              <h2
                className="d-xl-flex justify-content-xl-center align-items-xl-center"
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  marginTop: "32px",
                }}
              >
                {usuario}
              </h2>
              <p
                className="d-xl-flex justify-content-xl-center align-items-xl-center"
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#A1AEB7",
                  marginBottom: "0px",
                  paddingRight: "32px",
                  paddingLeft: "32px",
                }}
              >
                Listado de servicios asociados a tu cédula.
                <br />
              </p>
              <div
                className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                style={{ marginTop: "24px", marginBottom: "24px" }}
              >
                <form method="post" style={{ width: "260px" }}>
                  {facturas.map((registro) => (
                    <div
                      className="d-xl-flex justify-content-xl-center mb-3"
                      style={{ width: "55%", marginLeft: "22%" }}
                    >
                      <button
                        className="btn btn-primary d-block w-100"
                        onClick={buscarRegistro}
                        value={registro.servicio}
                        type="button"
                        style={{
                          background: "#424B5A",
                          borderColor: "#424B5A",
                          fontSize: "12px",
                        }}
                      >
                        {registro.servicio}
                      </button>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
          {formulario && (
            <div
              className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
              style={{ marginBottom: "36px" }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  width: "386px",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
              >
                <h2
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    marginTop: "32px",
                  }}
                >
                  {informacion.servicio}
                </h2>
                <p
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#A1AEB7",
                    marginBottom: "0px",
                    paddingRight: "32px",
                    paddingLeft: "32px",
                  }}
                >
                  Información básica del cliente asociado al servicio número
                  {informacion.servicio}
                  <br />
                </p>
                <div
                  className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                  style={{ marginTop: "24px", marginBottom: "24px" }}
                >
                  <form method="post" style={{ width: "260px" }}>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Cédula
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Cedula"
                        value={informacion.cedula}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Nombre
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Nombre"
                        value={informacion.nombre}
                        style={{ marginBottom: "4px" }}
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Apellido
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Apellido"
                        value={informacion.apellido}
                        style={{ marginBottom: "4px" }}
                        readonly=""
                      />
                    </div>
                    <div
                      className="d-xl-flex justify-content-xl-center mb-3"
                      style={{
                        width: "50%",
                        marginLeft: "25%",
                        fontSize: "14px",
                      }}
                    >
                      <button
                        className="btn btn-primary d-block w-100"
                        type="button"
                        onClick={verFacturacion}
                        style={{
                          background: "#424B5A",
                          borderColor: "#424B5A",
                          fontSize: "14px",
                        }}
                        data-bs-target="#modal-1"
                        data-bs-toggle="modal"
                      >
                        Ver facturación
                      </button>
                    </div>
                    <p
                      className="d-xl-flex justify-content-xl-center align-items-xl-center"
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#A1AEB7",
                        marginBottom: "24px",
                        paddingRight: "32px",
                        paddingLeft: "32px",
                        borderColor: "#A1AEB7",
                      }}
                    >
                      Información básica del servicio asociado al cliente.
                      <br />
                    </p>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Departamento
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Departamento"
                        value={informacion.departamento}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        required=""
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Municipio
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Municipio"
                        value={informacion.municipio}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        required=""
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Dirección
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Direccion"
                        value={informacion.direccion}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        required=""
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Barrio
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Barrio"
                        value={informacion.barrio}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        required=""
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Estrato
                      </p>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="Estrato"
                        value={informacion.estrato}
                        style={{ fontSize: "14px", marginBottom: "4px" }}
                        required=""
                        readonly=""
                      />
                    </div>
                    <div className="mb-3" style={{ fontSize: "12px" }}>
                      <p
                        style={{
                          color: "#A1AEB7",
                          marginBottom: "0px",
                          paddingBottom: "4px",
                        }}
                      >
                        Próxima de facturación
                      </p>
                      <input
                        className="form-control form-control-sm"
                        name="Fecha"
                        value={informacion.fecha}
                        style={{
                          fontSize: "14px",
                          marginBottom: "4px",
                          color: "rgba(33,37,41,0.7)",
                        }}
                        type="text"
                        required=""
                        readonly=""
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="modal fade" role="dialog" tabindex="-1" id="modal-1">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Facturación</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive" style={{ fontSize: "14px" }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Consumo</th>
                          <th>Lectura</th>
                          <th>Valor</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lecturas.map((lectura) =>
                        <tr>
                          <td>{lectura[2]}</td>
                          <td>{lectura[3]}</td>
                          <td>{lectura[1]}</td>
                          <td>{lectura[7]}</td>
                          <td>{lectura[6]}</td>
                        </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      window.location.href = "/Validacion"
      }
    </React.Fragment>
  );
}
