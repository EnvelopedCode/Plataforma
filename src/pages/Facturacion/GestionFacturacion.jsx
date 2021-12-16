import React from 'react'
import NavbarUsuario from '../../components/NavbarUsuario';
import Titulo from '../../components/Titulo';
import { useState, useEffect } from 'react';
import existencias from '../../mocks/Facturacion/facturas';
import { authCliente } from '../../auth/authCliente';

export default function GestionFacturacion() {
  const facturas = [];

  for (let indice in existencias) {
    //PENDIENTE: Revisar parseo de abajo

    let servicio = [];

    servicio.push(existencias[indice].servicio);
    servicio.push(existencias[indice].cedula);
    servicio.push(existencias[indice].nombre);
    servicio.push(existencias[indice].apellido);
    servicio.push(existencias[indice].departamento);
    servicio.push(existencias[indice].municipio);
    servicio.push(existencias[indice].direccion);
    servicio.push(existencias[indice].barrio);
    servicio.push(existencias[indice].estrato);
    servicio.push(existencias[indice].fecha);

    facturas.push(servicio);
  }

  const [getFacturas, setGetFacturas] = useState(facturas); //Este estado representa los registros del usuario en cuanto se carga la pagina (se manda un GET)
  const [formulario, setFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [informacion, setInformacion] = useState([]);

  const Informacion = (servicio) => {
    for (let registro in facturas) {
      if (facturas[registro][0] === servicio) {
        setInformacion(facturas[registro]);
      }
    }
  };

  const buscarRegistro = (event) => {
    event.preventDefault();
    setTitulo(event.target.value);
    Informacion(event.target.value);
    setFormulario(true);
  };

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
                Jorge Pérez
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
                  {getFacturas.map((registro) => (
                    <div
                      className="d-xl-flex justify-content-xl-center mb-3"
                      style={{ width: "55%", marginLeft: "22%" }}
                    >
                      <button
                        className="btn btn-primary d-block w-100"
                        onClick={buscarRegistro}
                        value={registro[0]}
                        type="button"
                        style={{
                          background: "#424B5A",
                          borderColor: "#424B5A",
                          fontSize: "12px",
                        }}
                      >
                        {registro[0]}
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
                  {titulo}
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
                  1140123567-2.
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
                        value={informacion[1]}
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
                        value={informacion[2]}
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
                        value={informacion[3]}
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
                        value={informacion[4]}
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
                        value={informacion[5]}
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
                        value={informacion[6]}
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
                        value={informacion[7]}
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
                        value={informacion[8]}
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
                        value={informacion[9]}
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>23/11/2021</td>
                          <td>230</td>
                          <td>230</td>
                          <td>$45.000</td>
                        </tr>
                        <tr>
                          <td>23/10/2021</td>
                          <td>170</td>
                          <td>400</td>
                          <td>$40.000</td>
                        </tr>
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
