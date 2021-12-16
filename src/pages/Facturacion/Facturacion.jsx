import React from "react";
import Titulo from "../../components/Titulo";
import { useEffect, useState } from "react";
import itinerario from "../../mocks/Facturacion/itinerarios"; //SIMULACION DATOS API
import sinFacturasJSON from "../../mocks/Facturacion/sinfactura";
import NavbarAnalista from "../../components/NavbarAnalista";
import NavbarAdmin from "../../components/NavbarAdmin";
import { authAnalista } from "../../auth/authAnalista";
import { authAdmin } from "../../auth/authAdmin";

export default function Facturacion() {
  
  {/*JSON*/}
  const itinerarios = [];
  const sinFacturas = [];

  for(let indice in itinerario){
    let servicio = []
    servicio.push(itinerario[indice].servicio)
    servicio.push(itinerario[indice].cedula)
    servicio.push(itinerario[indice].nombre)
    servicio.push(itinerario[indice].direccion)
    servicio.push(itinerario[indice].fecha)
    servicio.push(itinerario[indice].consumo)
    servicio.push(itinerario[indice].valor)
    itinerarios.push(servicio);
  }

  for(let indice in sinFacturasJSON ){
    let servicio = []
    servicio.push(sinFacturasJSON[indice].servicio)
    servicio.push(sinFacturasJSON[indice].cedula)
    servicio.push(sinFacturasJSON[indice].nombre)
    servicio.push(sinFacturasJSON[indice].direccion)
    servicio.push(sinFacturasJSON[indice].fecha)
    servicio.push(sinFacturasJSON[indice].consumo)
    servicio.push(sinFacturasJSON[indice].valor)
    servicio.push(sinFacturasJSON[indice].observaciones)
    sinFacturas.push(servicio);
  }
  {/*JSON*/}

  {/*DATOS TABLAS*/}
  const [facturasItinerario, setFacturasItinerario] = useState(itinerarios) //el estado representa las facturas que se veran

  const [sinFacturar, setSinFacturar] = useState(sinFacturas)
  {/*DATOS TABLAS*/}

  {/*FACTURAR*/}
  function getSelectedCheckboxValues1() { //SE TRAE LAS REFERENCIAS DE TODOS LOS CHECKBOX QUE ESTEN SELECCIONADOS
    console.log("ENTRO A LA FUNCION")
    const checkboxes = document.querySelectorAll(`input[name="tab-1"]:checked`); //crea arreglo con los input del nombre especificado que esten seleccionados
    let values = [];
    checkboxes.forEach((checkbox) => { //añade a una lista los value(referencia) de todos los input seleccionados

      if(facturasItinerario[checkbox.value][5] === ""){
        alert(`No se pudo facturar el servicio ${facturasItinerario[checkbox.value][0]}`)
      } else {      
        values.push(checkbox.value);
      }
    });

    return values;
}
  function getSelectedCheckboxValues2() { //SE TRAE LAS REFERENCIAS DE TODOS LOS CHECKBOX QUE ESTEN SELECCIONADOS
    const checkboxes = document.querySelectorAll(`input[name="tab-2"]:checked`); //crea arreglo con los input del nombre especificado que esten seleccionados
    let values = [];
    checkboxes.forEach((checkbox) => { //añade a una lista los value(referencia) de todos los input seleccionados

      if(sinFacturar[checkbox.value][5] === ""){
        alert(`No se pudo facturar el servicio ${sinFacturar[checkbox.value][0]}`)
      } else {      
        values.push(checkbox.value);
      }
    });

    return values;
  }

  const facturarItinerario = (event) =>{ //BUSCA LAS REFERENCIAS Y LAS AÑADE A UN ARREGLO DE FACTURAS SELECCIONADAS

    let facturarReferencias = []  //Aqui guardamos las facturas seleccionadas que se eliminaran del estado
    let referencias = []

    event.preventDefault()
    referencias = getSelectedCheckboxValues1(); //trae las referencias(indices) de los input seleccionados

    for(let referencia in referencias){
      
        facturarReferencias.push(facturasItinerario[referencias[parseInt(referencia)]]); //añade a una lista las facturas referenciadas
    
    }


    let facturasNuevas = facturasItinerario;

    //BORRAR FACTURAS SELECCIONADAS
    for (var i = referencias.length -1; i >= 0; i--)
      facturasNuevas.splice(referencias[i], 1, "");

    var filtered = facturasNuevas.filter(function (el) {
      return el != '';
    });
  

    setFacturasItinerario(filtered)

    

    //ENVIAR A BACKEND
    console.log("");
    console.log("DATOS PARA LA API")
    let serviciosFacturar = []

    for(let indice in facturarReferencias){

      let factura = {
        "servicio": facturarReferencias[indice][0],
        "cedula": facturarReferencias[indice][1],
        "nombre": facturarReferencias[indice][2],
        "direccion": facturarReferencias[indice][3],
        "fecha": facturarReferencias[indice][4],
        "consumo": facturarReferencias[indice][5],
        "valor": facturarReferencias[indice][6],
      }

      serviciosFacturar.push(factura);
      
    }

    console.log(serviciosFacturar);

  }

  const facturarSinFacturar= (event) =>{ //BUSCA LAS REFERENCIAS Y LAS AÑADE A UN ARREGLO DE FACTURAS SELECCIONADAS

    let facturarReferencias = []  //Aqui guardamos las facturas seleccionadas que se eliminaran del estado
    let referencias = []

    event.preventDefault()
    referencias = getSelectedCheckboxValues2(); //trae las referencias(indices) de los input seleccionados

    for(let referencia in referencias){
      
        facturarReferencias.push(sinFacturar[referencias[parseInt(referencia)]]); //añade a una lista las facturas referenciadas
    
    }

    console.log("EVALUAR:")

    let facturasNuevas = sinFacturar;

    //EVALUAR ESTO
    for (var i = referencias.length -1; i >= 0; i--)
      facturasNuevas.splice(referencias[i], 1, "");

    var filtered = facturasNuevas.filter(function (el) {
      return el != '';
    });
  
    console.log(facturarReferencias)
    console.log(filtered)

    setSinFacturar(filtered)

    //ENVIAR A BACKEND
    console.log("");
    console.log("BACKEND")
    let noServiciosFacturar = []

    for(let indice in facturarReferencias){

      let factura = {
        "servicio": facturarReferencias[indice][0],
        "cedula": facturarReferencias[indice][1],
        "nombre": facturarReferencias[indice][2],
        "direccion": facturarReferencias[indice][3],
        "fecha": facturarReferencias[indice][4],
        "consumo": facturarReferencias[indice][5],
        "valor": facturarReferencias[indice][6],
      }

      noServiciosFacturar.push(factura);
      
    }

    console.log(noServiciosFacturar);

  }
  {/*FACTURAR*/}

  return (
    <React.Fragment>
      {authAdmin() || authAnalista() ? (
        <div>
          {authAdmin() && <NavbarAdmin />}
          {authAnalista() && <NavbarAnalista />}
          <div className="container" style={{ color: "#424B5A;" }}>
            <Titulo
              titulo="FACTURACION"
              subTitulo1="A continuación, podrás gestionar tanto de forma manual como masiva las facturas de tus clientes"
            />
            <div
              className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
              style={{ marginBottom: "36px" }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  width: "700px",
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
                  Registros de facturación
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
                  Listado de servicios en proceso o tránsito de facturación.
                  <br />
                </p>

                <div
                  className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                  style={{ marginTop: "24px", marginBottom: "24px" }}
                >
                  <div style={{ width: "600px" }}>
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-1"
                        >
                          Itinerario del día
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-2"
                        >
                          Servicios sin facturar
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-3"
                        >
                          Próximos itinerarios
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane" role="tabpanel" id="tab-1">
                        <form style={{ marginTop: "12px" }}>
                          <div
                            className="table-responsive table-wrapper-scroll-y"
                            style={{ maxHeight: "800px", marginBottom: "12px" }}
                          >
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Servicio</th>
                                  <th>Cédula</th>
                                  <th>Nombre</th>
                                  <th>Dirección</th>
                                  <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                {facturasItinerario.map((factura, index) => (
                                  <tr className="text-nowrap">
                                    <td>{factura[0]}</td> {/*servicio*/}
                                    <td>{factura[1]}</td> {/*cedula*/}
                                    <td>{factura[2]}</td> {/*nombre*/}
                                    <td>{factura[3]}</td>
                                    {/*direccion*/}
                                    <td>{factura[4]}</td> {/*fecha*/}
                                    <td>{factura[5]}</td> {/*consumo*/}
                                    <td>{factura[6]}</td> {/*coste*/}
                                    <td>
                                      <input
                                        type="checkbox"
                                        name="tab-1"
                                        value={`${index}`} //Por cada iteracion se le asigna un indice unico
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Selecciona los servicios disponibles que deseas
                            facturar. Los servicios no seleccionados o que no
                            superen las validaciones internas no serán
                            facturados.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              onClick={facturarItinerario}
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#424B5A",
                                borderColor: "#424B5A",
                                fontSize: "12px",
                              }}
                            >
                              Facturar
                            </button>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Descarga el itinerario completo de facturación para
                            el día de hoy.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#F2F5F7",
                                fontSize: "14px",
                                borderColor: "#F2F5F7",
                                color: "#505D68",
                              }}
                            >
                              Descagar
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane" role="tabpanel" id="tab-2">
                        <form style={{ marginTop: "12px" }}>
                          <div
                            className="table-responsive table-wrapper-scroll-y"
                            style={{ maxHeight: "800px", marginBottom: "12px" }}
                          >
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Servicio</th>
                                  <th>Cédula</th>
                                  <th>Nombre</th>
                                  <th>Dirección</th>
                                  <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th>
                                  <th>Observación</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sinFacturar.map((factura, index) => (
                                  <tr className="text-nowrap">
                                    <td>{factura[0]}</td> {/*servicio*/}
                                    <td>{factura[1]}</td> {/*cedula*/}
                                    <td>{factura[2]}</td> {/*nombre*/}
                                    <td>{factura[3]}</td>
                                    {/*direccion*/}
                                    <td>{factura[4]}</td> {/*fecha*/}
                                    <td>{factura[5]}</td> {/*consumo*/}
                                    <td>{factura[6]}</td> {/*coste*/}
                                    <td>{factura[7]}</td> {/*observacion*/}
                                    <td>
                                      <input
                                        type="checkbox"
                                        name="tab-2"
                                        value={`${index}`} //Por cada iteracion se le asigna un indice unico
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Selecciona los servicios que deseas facturar.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              onClick={facturarSinFacturar}
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#424B5A",
                                borderColor: "#424B5A",
                                fontSize: "12px",
                              }}
                            >
                              Facturar
                            </button>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Descarga el registro completo de servicios sin
                            facturar.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#F2F5F7",
                                fontSize: "14px",
                                borderColor: "#F2F5F7",
                                color: "#505D68",
                              }}
                            >
                              Descagar
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane active"
                        role="tabpanel"
                        id="tab-3"
                      >
                        <form style={{ marginTop: "12px" }}>
                          <div
                            className="table-responsive table-wrapper-scroll-y"
                            style={{ maxHeight: "800px", marginBottom: "12px" }}
                          >
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Servicio</th>
                                  <th>Cédula</th>
                                  <th>Nombre</th>
                                  <th>Dirección</th>
                                  <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="text-nowrap">
                                  <td>1140123567-1</td>
                                  <td>1140123567</td>
                                  <td>Carlos Sierra</td>
                                  <td>Cra. 52 # 84-120</td>
                                  <td>4/12/2021</td>
                                  <td>310 m3</td>
                                  <td>$56.000</td>
                                </tr>
                                <tr className="text-nowrap">
                                  <td>1140123567-2</td>
                                  <td>1140123567</td>
                                  <td>Carlos Sierra</td>
                                  <td>
                                    Calle 110 # 58-45
                                    <br />
                                  </td>
                                  <td>
                                    5/12/2021
                                    <br />
                                  </td>
                                  <td>
                                    <br />
                                  </td>
                                  <td>
                                    <br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Descarga el registro del itinerio de facturación de
                            los próximos 5 días.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#F2F5F7",
                                fontSize: "14px",
                                borderColor: "#F2F5F7",
                                color: "#505D68",
                              }}
                            >
                              Descagar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
              style={{ marginBottom: "36px" }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  width: "700px",
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
                  Estado de pago
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
                  Listado del estado de pago de servicios facturados.
                  <br />
                </p>
                <div
                  className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                  style={{ marginTop: "24px", marginBottom: "24px" }}
                >
                  <div style={{ width: "600px" }}>
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-1"
                        >
                          Servicios sin pago
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-2"
                        >
                          Servicios pagados
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane" role="tabpanel" id="tab-1">
                        <form style={{ marginTop: "12px" }}>
                          <div
                            className="table-responsive table-wrapper-scroll-y"
                            style={{ maxHeight: "800px", marginBottom: "12px" }}
                          >
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Servicio</th>
                                  <th>Cédula</th>
                                  <th>Nombre</th>
                                  <th>Dirección</th>
                                  <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr classNameName="text-nowrap">
                                  <td>1140123567-1</td>
                                  <td>1140123567</td>
                                  <td>Jorge Pérez</td>
                                  <td>Cra. 52 # 84-120</td>
                                  <td>3/12/2021</td>
                                  <td>310 m3</td>
                                  <td>$56.000</td>
                                  <td>
                                    <input type="checkbox" />
                                  </td>
                                </tr>
                                <tr className="text-nowrap">
                                  <td>1140123567-2</td>
                                  <td>1140123567</td>
                                  <td>Jorge Pérez</td>
                                  <td>
                                    Calle 110 # 58-45
                                    <br />
                                  </td>
                                  <td>
                                    3/12/2021
                                    <br />
                                  </td>
                                  <td>
                                    <br />
                                  </td>
                                  <td>
                                    <br />
                                  </td>
                                  <td>
                                    <input type="checkbox" />
                                    <br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Selecciona los servicios facturados para actualizar
                            su estado a "pagado".
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#424B5A",
                                borderColor: "#424B5A",
                                fontSize: "12px",
                              }}
                            >
                              Actualizar
                            </button>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Descarga el listado completo de servicios facturados
                            sin pago.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#F2F5F7",
                                fontSize: "14px",
                                borderColor: "#F2F5F7",
                                color: "#505D68",
                              }}
                            >
                              Descagar
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane active"
                        role="tabpanel"
                        id="tab-2"
                      >
                        <form style={{ marginTop: "12px" }}>
                          <div
                            className="table-responsive table-wrapper-scroll-y"
                            style={{ maxHeight: "800px", marginBottom: "12px" }}
                          >
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Servicio</th>
                                  <th>Cédula</th>
                                  <th>Nombre</th>
                                  <th>Dirección</th>
                                  <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th>
                                  <th>Observación</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="text-nowrap">
                                  <td>1140123567-1</td>
                                  <td>1140123567</td>
                                  <td>Juan Ariza</td>
                                  <td>Cra. 52# 78-15</td>
                                  <td>3/11/2021</td>
                                  <td></td>
                                  <td></td>
                                  <td>Sin consumo para facturar.</td>
                                  <td>
                                    <input type="checkbox" />
                                  </td>
                                </tr>
                                <tr className="text-nowrap">
                                  <td>1140123567-2</td>
                                  <td>1140123567</td>
                                  <td>Juan Ariza</td>
                                  <td>
                                    Calle 68# 49-63
                                    <br />
                                  </td>
                                  <td>
                                    3/11/2021
                                    <br />
                                  </td>
                                  <td>
                                    398 m3
                                    <br />
                                  </td>
                                  <td>
                                    $67.000
                                    <br />
                                  </td>
                                  <td>
                                    Servicio no seleccionado.
                                    <br />
                                  </td>
                                  <td>
                                    <input type="checkbox" />
                                    <br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Servicios pagados durante la fecha actual.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#424B5A",
                                borderColor: "#424B5A",
                                fontSize: "12px",
                              }}
                            >
                              Confirmar pago
                            </button>
                          </div>
                          <p style={{ fontSize: "14px" }}>
                            Descarga el registro histórico de consumos y pagos
                            de los servicios.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#F2F5F7",
                                fontSize: "14px",
                                borderColor: "#F2F5F7",
                                color: "#505D68",
                              }}
                            >
                              Descargar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        (window.location.href = "/Validacion")
      )}
    </React.Fragment>
  );
}
