import React from "react";
import Titulo from "../../components/Titulo";
import { useEffect, useState } from "react";
import NavbarAnalista from "../../components/NavbarAnalista";
import NavbarAdmin from "../../components/NavbarAdmin";
import { authAnalista } from "../../auth/authAnalista";
import { authAdmin } from "../../auth/authAdmin";

export default function Facturacion() {

  var host = "http://localhost:8080";

  {/*DATOS TABLAS*/}
  const [facturasItinerario, setFacturasItinerario] = useState([])
  const [facturasProximas, setFacturasProximas] = useState([])
  const [sinPagar, setSinPagar] = useState([])
  const [pagadas, setPagadas] = useState([])

  {/*DATOS TABLAS*/}

  {/*PAGAR*/}
  function getSelectedCheckboxValues1() { //SE TRAE LAS REFERENCIAS DE TODOS LOS CHECKBOX QUE ESTEN SELECCIONADOS
    console.log("ENTRO A LA FUNCION")
    const checkboxes = document.querySelectorAll(`input[name="tab-3"]:checked`); //crea arreglo con los input del nombre especificado que esten seleccionados
    let values = [];
    checkboxes.forEach((checkbox) => { //añade a una lista los value(referencia) de todos los input seleccionados

      if(sinPagar[checkbox.value][5] === ""){
        alert(`No se pudo facturar el servicio ${facturasItinerario[checkbox.value][0]}`)
      } else {    
        values.push(checkbox.value);
      }
    });

    return values;
}
  const confirmarPago = (event) =>{ //BUSCA LAS REFERENCIAS Y LAS AÑADE A UN ARREGLO DE FACTURAS SELECCIONADAS

    let facturarReferencias = []  //Aqui guardamos las facturas seleccionadas que se eliminaran del estado
    let referencias = []

    event.preventDefault()
    referencias = getSelectedCheckboxValues1(); //trae las referencias(indices) de los input seleccionados //Esto deberian ser indices

    for(let referencia in referencias){


      facturarReferencias.unshift(sinPagar[referencias[referencia]]); //añade a una lista las facturas referenciadas
    }

    console.log("FACTURAS SELECCIONADAS:")
    console.log(facturarReferencias) //Estas son las que mando para el backEND a cambiarles su estado

    let facturasNuevas = sinPagar;

    //BORRAR FACTURAS SELECCIONADAS
    for (var i = referencias.length -1; i >= 0; i--){

      facturasNuevas.splice(referencias[i], 1, "");

    }


    var filtered = facturasNuevas.filter(function (el) {
      return el != '';
    });

    setSinPagar(filtered) //Aqui actualiza la tabla de lecturas pagadas a las que falten por pagar
    alert(`Servicios cobrados con exito`)

    const cobrar = {
      "servicios": facturarReferencias
    }

    //Enviar a backend
    fetch(`${host}/facPagar`, { //Validar que la medicion no sea anomala
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(cobrar)
    })
      .then((data) => data.json())
      .then((data) => {       
        ///////////////////////////////////////////////////////////////////////////////

        console.log("GET 4")

        let test4 = {
          "test": "Testobject"
        }
        
        fetch(`${host}/facPagadas`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(test4)
        })
          .then((data) => data.json())
          .then((data) => {
            var conPagos = []
    
            for(let indice in data.pagadas){
              let servicio = []
              servicio.push(data.pagadas[indice].servicio)
              servicio.push(data.pagadas[indice].cedula) //Servicio
              servicio.push(data.pagadas[indice].nombre) //Servicio
              servicio.push(data.pagadas[indice].direccion) //Servicio
              servicio.push(data.pagadas[indice].fechaLectura)
              servicio.push(data.pagadas[indice].consumo)
              servicio.push(data.pagadas[indice].valor)
              conPagos.unshift(servicio);
            }
    
            setPagadas(conPagos)
          })
      })
    
  }
  {/*PAGAR*/}

  useEffect(() => { //Rellenar tablas

    console.log("GET 1")

    let test = {
      "test": "Testobject"
    }

    fetch(`${host}/facItinerario`, { //Validar que la medicion no sea anomala
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(test)
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.lecturas)
        var itinerarios = []

        for(let indice in data.lecturas){
          let servicio = []
          servicio.push(data.lecturas[indice].servicio)
          servicio.push(data.lecturas[indice].cedula) //Servicio
          servicio.push(data.lecturas[indice].nombre) //Servicio
          servicio.push(data.lecturas[indice].direccion) //Servicio
          // servicio.push(data.lecturas[indice].fechaLectura)
          // servicio.push(data.lecturas[indice].consumo)
          // servicio.push(data.lecturas[indice].valor)
          itinerarios.push(servicio);

        }

        setFacturasItinerario(itinerarios)

        ///////////////////////////////////////////////////////////////////////////////////////

        console.log("GET 2")

        let test2 = {
          "test": "Testobject"
        }

        fetch(`${host}/facProximos`, { //Validar que la medicion no sea anomala
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(test2)
        })
          .then((data) => data.json())
          .then((data) => {
            var proximas = []

            for(let indice in data.proximas){
              let servicio = []
              servicio.push(data.proximas[indice].servicio)
              servicio.push(data.proximas[indice].cedula) //Servicio
              servicio.push(data.proximas[indice].nombre) //Servicio
              servicio.push(data.proximas[indice].direccion) //Servicio
              // servicio.push(data.lecturas[indice].fechaLectura)
              // servicio.push(data.lecturas[indice].consumo)
              // servicio.push(data.lecturas[indice].valor)
              proximas.push(servicio);
            }

            setFacturasProximas(proximas)

            //////////////////////////////////////////////////////////////////////////////

            console.log("GET 3")

            let test3 = {
              "test": "Testobject"
            }
            
            fetch(`${host}/facSinPagar`, {
              headers: { "content-type": "application/json" },
              method: "POST",
              body: JSON.stringify(test3)
            })
              .then((data) => data.json())
              .then((data) => {
                console.log(data.sinPagar)
                var sinPagos = []
        
                for(let indice in data.sinPagar){
                  let servicio = []
                  servicio.push(data.sinPagar[indice].servicio)
                  servicio.push(data.sinPagar[indice].cedula) //Servicio
                  servicio.push(data.sinPagar[indice].nombre) //Servicio
                  servicio.push(data.sinPagar[indice].direccion) //Servicio
                  servicio.push(data.sinPagar[indice].fechaLectura)
                  servicio.push(data.sinPagar[indice].consumo)
                  servicio.push(data.sinPagar[indice].valor)
                  sinPagos.push(servicio);
                }
        
                setSinPagar(sinPagos)

                ///////////////////////////////////////////////////////////////////////////////

                console.log("GET 4")

                let test4 = {
                  "test": "Testobject"
                }
                
                fetch(`${host}/facPagadas`, {
                  headers: { "content-type": "application/json" },
                  method: "POST",
                  body: JSON.stringify(test4)
                })
                  .then((data) => data.json())
                  .then((data) => {
                    console.log(data.pagadas)
                    var conPagos = []
            
                    for(let indice in data.pagadas){
                      let servicio = []
                      servicio.push(data.pagadas[indice].servicio)
                      servicio.push(data.pagadas[indice].cedula) //Servicio
                      servicio.push(data.pagadas[indice].nombre) //Servicio
                      servicio.push(data.pagadas[indice].direccion) //Servicio
                      servicio.push(data.pagadas[indice].fechaLectura)
                      servicio.push(data.pagadas[indice].consumo)
                      servicio.push(data.pagadas[indice].valor)
                      conPagos.unshift(servicio);
                    }
            
                    setPagadas(conPagos)
                  })
                
              })

          })

      })

  }, [])

  // useEffect(() => {    
  //   console.log(facturasItinerario)
  // }, [facturasItinerario])

  // useEffect(() => {
  //   console.log(facturasProximas)
  // }, [facturasProximas])

  // useEffect(() => {
  //   console.log(sinPagar)
  // }, [sinPagar])


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
                          className="nav-link active"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-2"
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
                                  {/* <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th> */}
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
                                    {/* <td>{factura[4]}</td> fecha
                                    <td>{factura[5]}</td> consumo
                                    <td>{factura[6]}</td> coste */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
                                  {/* <th>Fecha</th>
                                  <th>Consumo</th>
                                  <th>Valor</th> */}
                                </tr>
                              </thead>
                              <tbody>
                              {facturasProximas.map((factura, index) => (
                                  <tr className="text-nowrap">
                                    <td>{factura[0]}</td> {/*servicio*/}
                                    <td>{factura[1]}</td> {/*cedula*/}
                                    <td>{factura[2]}</td> {/*nombre*/}
                                    <td>{factura[3]}</td>
                                    {/*direccion*/}
                                    {/* <td>{factura[4]}</td> fecha
                                    <td>{factura[5]}</td> consumo
                                    <td>{factura[6]}</td> coste */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*ESTADOS DE PAGO*/}
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
                  Estado de Pago
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
                  Listado de servicios en proceso o tránsito de pago.
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
                          href="#tab-3"
                        >
                          Servicios sin pago
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          role="tab"
                          data-bs-toggle="tab"
                          href="#tab-4"
                        >
                          Servicios pagados
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane" role="tabpanel" id="tab-3">
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
                                {sinPagar.map((factura, index) => (
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
                                        name="tab-3"
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
                            pagar. Los servicios no seleccionados o que no
                            superen las validaciones internas no serán
                            pagados.
                          </p>
                          <div
                            className="d-xl-flex justify-content-xl-center mb-3"
                            style={{ width: "20%", fontSize: "14px" }}
                          >
                            <button
                              onClick={confirmarPago}
                              className="btn btn-primary d-block w-100"
                              type="button"
                              style={{
                                background: "#424B5A",
                                borderColor: "#424B5A",
                                fontSize: "12px",
                              }}
                            >
                              Confirmar Pago
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane active"
                        role="tabpanel"
                        id="tab-4"
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
                              {pagadas.map((factura) => (
                                  <tr className="text-nowrap">
                                    <td>{factura[0]}</td> {/*servicio*/}
                                    <td>{factura[1]}</td> {/*cedula*/}
                                    <td>{factura[2]}</td> {/*nombre*/}
                                    <td>{factura[3]}</td>
                                    {/*direccion*/}
                                    <td>{factura[4]}</td> {/*fecha*/}
                                    <td>{factura[5]}</td> {/*consumo*/}
                                    <td>{factura[6]}</td> {/*coste*/}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
