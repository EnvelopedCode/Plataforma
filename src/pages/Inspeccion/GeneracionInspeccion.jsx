import React from 'react';
import Titulo from '../../components/Titulo'
import { useRef, useState, useEffect } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';
import NavbarAdmin from '../../components/NavbarAdmin';
import { authAnalista } from '../../auth/authAnalista'; 
import { authAdmin } from '../../auth/authAdmin';

export default function GeneracionInspeccion() {

    const [servicioEncontrado, setServicioEncontrado] = useState(false);
    const [formInspeccion, setFormInspeccion] = useState(false);
    const [btnGenerar, setBtnGenerar] = useState(false);
    const [noServicio, setNoServicio] = useState("");
    const [tecnicoEncontrado, setTecnicoEncontrado] = useState(false);
    
    const servicioRef = useRef("");
    let tecnicoInput = useRef("");
    let fechaInput = useRef("");
    let horaInput = useRef("");
    var host = "http://localhost:8080";

    const buscarServicio = (event) => { //Usuario ingresa servicio

        let servicioError = document.getElementById("errorServicio");
        
        if (event.key === 'Enter') {

            event.preventDefault();

            let servicio = servicioRef.current.value;
            let errorS = "";
            let flag = false; 

            setBtnGenerar(true);
            
            if(servicio === ""){         
                errorS = "Ingrese un servicio";
                flag = true;
                setServicioEncontrado(false);
                setFormInspeccion(false);
            } else if(servicio.length < 12 || servicio.length > 12){
                errorS = "Ingrese un servicio valido";
                flag = true;
                setServicioEncontrado(false);
                setFormInspeccion(false);
            }
            
            let generacion={
                "servicio" : servicio
            }

            if(flag === false){

                fetch(`${host}/validarServicio`, {
                  headers: { "content-type": "application/json" },
                  method: "POST",
                  body: JSON.stringify(generacion),
                })
                  .then((data) => data.json()) // Obtener los datos
                  .then((data) => {
                    if (data.estado === "ok") {
                      alert(data.msg);
                      //   servicioError.innerHTML = errorS;
                      setServicioEncontrado(true);
                    } else {
                      alert(data.msg);
                      //   servicioError.innerHTML = errorS;
                      setServicioEncontrado(false);
                      setFormInspeccion(false);
                    }
                  })
                  .catch((error) => alert(error));

            } else {
                servicioError.innerHTML = errorS;
            }

        }
    }

    const generar = (event) => { //Usuario da click en boton generar

        //Aqui evaluamos si el servicio fue encontrado, en caso de hacerlo seteo para que aparezca el formulario y seteo la ID del servicio en el input de readOnly

        event.preventDefault();
        let ser = servicioRef.current.value;
        setBtnGenerar(false);

        if(servicioEncontrado === false){
            setFormInspeccion(false);
        } else if(servicioEncontrado === true){
            setFormInspeccion(true);
            setNoServicio(ser);
        }
    }


    const validar = (event) =>{
      setBtnGenerar(false);
      setTecnicoEncontrado(false);

      if(event.key === 'Enter'){
        event.preventDefault();

        let tec = tecnicoInput.current.value;
        let errorTecnico = document.getElementById("errorTecnico-1");
        let errorT = "";

        let flag = false;

        if (tec === "") {
            errorT = "Asigna un tecnico primero.";
            flag = true;
        }

        if(flag === true){
          errorTecnico.innerHTML = errorT;
        } else{
          errorT = "";
          errorTecnico.innerHTML = errorT;
          // tecnicoInput.current.value = "";

          let validarT = {
            cedula: tec,
          };

          fetch(`${host}/validarTecnico`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ validarT }),
          })
            .then((data) => data.json())
            .then((data) => {
              if (data.estado === "ok") {
                alert(data.msg);
                setTecnicoEncontrado(true);
              } else if (data.estado === "error") {
                alert(data.msg);
              }
            })
            .catch((error) => {
              console.log("error en el servidor");
              alert(error);
            });

        }
      }
    }


    const inspeccionar = (event) => { //Usuario genera inspeccion (envia formulario)
       
      event.preventDefault();

      let tec = tecnicoInput.current.value;
      // let errorTecnico = document.getElementById("errorTecnico-1");
      // let errorT = "";

      let fec = fechaInput.current.value;
      let hor = horaInput.current.value;
      
      let errorFecha = document.getElementById("errorFecha-1");
      let errorHora = document.getElementById("errorHora-1");
      
      let errorF = "";
      let errorH = "";

      let flag = false;

      // if(tec === ""){
      //     errorT = "Asigna un tecnico primero."
      //     flag = true;
      // }
      if(fec === ""){
          errorF = "Asigna una fecha primero."
          flag = true;
      }
      if(hor === ""){
          errorH = "Asigna una hora primero."
          flag = true;
      }
      if(flag === true){
          // errorTecnico.innerHTML = errorT;
          errorFecha.innerHTML = errorF;
          errorHora.innerHTML = errorH;
      } else {
          // errorT = "";
          errorF = "";
          errorH = "";
          // errorTecnico.innerHTML = errorT;
          errorFecha.innerHTML = errorF;
          errorHora.innerHTML = errorH;

          servicioRef.current.value = "";
          // tecnicoInput.current.value = "";
          fechaInput.current.value = "";
          horaInput.current.value = "";

          let inspeccionG = {
              "servicio": noServicio,
              "tecnico": tec,
              "fecha": fec,
              "hora": hor
          }

          fetch(`${host}/generacionInspeccion`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(inspeccionG),
          })
            .then((data) => data.json())
            .then((data) => {
              if (data.estado === "ok") {
                alert(data.msg);         
              } else if (data.estado === "error") {
                alert(data.msg);
              }
            })
            .catch((error) => {
              console.log("error en el servidor");
              alert(error);
            });

      }
      
    }

    useEffect(()=>{ //Efectos visuales

        if(servicioEncontrado === true && noServicio.length > 0 && formInspeccion === true){
                  
                let focusme = document.getElementById("focus");
                focusme.scrollIntoView();
          
        }
        
    }, [noServicio, formInspeccion, servicioEncontrado])
  
    useEffect(() =>{
      
    }, [tecnicoEncontrado])

    return (
      <React.Fragment>
        {authAnalista() || authAdmin() ? (
          <div>
            {authAdmin() && <NavbarAdmin />}
            {authAnalista() && <NavbarAnalista />}
            <div className="container" style={{ color: "#424B5A" }}>
              <Titulo
                titulo="GESTI??N INSPECCI??N"
                subTitulo1="A continuaci??n, podr??s consultar y generar las ??rdenes de servicio de inspecci??n asociadas a los servicios."
                // subTitulo2="como masiva los nuevos servicios de clientes"
              />
              {/*CONSULTA*/}
              <div
                className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center"
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
                    Inspecci??n
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
                    Ingresa el servicio base al cual deseas consultar las
                    inspecciones hist??ricas o bien generar inspecciones.
                    <br />
                  </p>
                  <div
                    className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                    style={{ marginTop: "24px", marginBottom: "24px" }}
                  >
                    <form style={{ width: "260px" }}>
                      <div className="mb-3" style={{ fontSize: "12px" }}>
                        <p
                          style={{
                            color: "#A1AEB7",
                            marginBottom: "0px",
                            paddingBottom: "4px",
                          }}
                        >
                          N??mero del servicio
                        </p>
                        <input
                          autoComplete="off"
                          ref={servicioRef}
                          onKeyDown={buscarServicio}
                          className="form-control form-control-sm"
                          type="text"
                          name="Servicio"
                          placeholder="No. Servicio"
                          style={{ fontSize: "14px", marginBottom: "4px" }}
                          required=""
                        />
                        <p
                          id="errorServicio"
                          style={{ color: "var(--bs-red)" }}
                        ></p>
                        {servicioEncontrado && (
                          <div>
                            <div
                              className="d-xl-flex justify-content-xl-center mb-3"
                              style={{
                                width: "40%",
                                marginLeft: "30%",
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
                                Consultar
                              </button>
                            </div>
                            {btnGenerar && (
                              <div
                                className="d-xl-flex justify-content-xl-center mb-3"
                                style={{
                                  width: "40%",
                                  marginLeft: "30%",
                                  fontSize: "14px",
                                }}
                              >
                                <button
                                  onClick={generar}
                                  className="btn btn-primary d-block w-100"
                                  type="button"
                                  style={{
                                    background: "#424B5A",
                                    borderColor: "#424B5A",
                                    fontSize: "14px",
                                  }}
                                >
                                  Generar
                                </button>
                              </div>
                            )}
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
                              Descarga hist??rico anual de inspecci??n de
                              servicios.
                              <br />
                            </p>
                            <div
                              className="d-xl-flex justify-content-xl-center mb-3"
                              style={{
                                width: "40%",
                                marginLeft: "30%",
                                fontSize: "14px",
                              }}
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
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*CONSULTA*/}
              {/*INFORMACION*/}
              {formInspeccion && (
                <div
                  className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center"
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
                      Generar inspecci??n
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
                      Ingresa la informaci??n b??sica requerida para generar
                      inspecci??n.
                      <br />
                    </p>
                    <div
                      className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                      style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                      <form method="post" style={{ width: "260px" }}>
                        <div
                          id="focus"
                          className="mb-3"
                          style={{ fontSize: "12px" }}
                        >
                          <p
                            style={{
                              color: "#A1AEB7",
                              marginBottom: "0px",
                              paddingBottom: "4px",
                            }}
                          >
                            N??mero del servicio
                          </p>
                          <input
                            value={noServicio}
                            id="servicio"
                            className="form-control form-control-sm"
                            type="text"
                            name="Servicio"
                            placeholder="No. Servicio"
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
                            ID T??cnico
                          </p>
                          <input
                            ref={tecnicoInput}
                            id="tecnico"
                            onKeyDown={validar}
                            className="form-control form-control-sm"
                            type="text"
                            name="Tecnico"
                            placeholder="ID T??cnico"
                            style={{ fontSize: "14px", marginBottom: "4px" }}
                            required=""
                          />
                          <p
                            id="errorTecnico-1"
                            value=""
                            style={{ color: "var(--bs-red)" }}
                          ></p>
                        </div>
                        {tecnicoEncontrado &&
                          <div>
                            <div className="mb-3" style={{ fontSize: "12px" }}>
                              <p
                                style={{
                                  color: "#A1AEB7",
                                  marginBottom: "0px",
                                  paddingBottom: "4px",
                                }}
                              >
                                Fecha de inspecci??n
                              </p>
                              <input
                                ref={fechaInput}
                                id="fecha"
                                className="form-control form-control-sm"
                                name="Fecha"
                                placeholder="Fecha inicio"
                                style={{
                                  fontSize: "14px",
                                  marginBottom: "4px",
                                  color: "rgba(33,37,41,0.7)",
                                }}
                                type="date"
                                required=""
                              />
                              <p
                                id="errorFecha-1"
                                value=""
                                style={{ color: "var(--bs-red)" }}
                              ></p>
                            </div>
                            <div className="mb-3" style={{ fontSize: "12px" }}>
                              <p
                                style={{
                                  color: "#A1AEB7",
                                  marginBottom: "0px",
                                  paddingBottom: "4px",
                                }}
                              >
                                Hora de inspecci??n
                              </p>
                              <input
                                ref={horaInput}
                                id="hora"
                                className="form-control form-control-sm"
                                name="Hora"
                                placeholder="Hora"
                                style={{
                                  fontSize: "14px",
                                  marginBottom: "4px",
                                  color: "rgba(33,37,41,0.7)",
                                }}
                                type="time"
                                required=""
                              />
                              <p
                                id="errorHora-1"
                                value=""
                                style={{ color: "var(--bs-red)" }}
                              ></p>
                            </div>
                            <div
                              className="d-xl-flex justify-content-xl-center mb-3"
                              style={{
                                width: "40%",
                                marginLeft: "30%",
                                fontSize: "14px",
                              }}
                            >
                              <button
                                onClick={inspeccionar}
                                className="btn btn-primary d-block w-100"
                                type="button"
                                style={{
                                  background: "#424B5A",
                                  borderColor: "#424B5A",
                                  fontSize: "14px",
                                }}
                              >
                                Generar
                              </button>
                            </div>
                          </div>
                        }
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {/*INFORMACION*/}
              {/*MODAL*/}
              <div
                className="modal fade"
                role="dialog"
                tabIndex="-1"
                id="modal-1"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" style={{ fontSize: "16px" }}>
                        Inspecciones hist??ricas
                      </h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div
                        className="table-responsive"
                        style={{ fontSize: "14px" }}
                      >
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>T??cnico</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>01/11/2021 08:00 a.m.</td>
                              <td>Juan P??rez</td>
                            </tr>
                            <tr>
                              <td>17/10/2021 10:00 a.m.</td>
                              <td>Jorge L??pez</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*MODAL*/}
            </div>
          </div>
        ) : (
          (window.location.href = "/Validacion")
        )}
      </React.Fragment>
    );
}





// import React from 'react';
// import Titulo from '../../components/Titulo'
// import { useRef, useState, useEffect } from 'react';
// import NavbarAnalista from '../../components/NavbarAnalista';

// export default function GeneracionInspeccion() {

//     const [servicioEncontrado, setServicioEncontrado] = useState(false);
//     const [formInspeccion, setFormInspeccion] = useState(false);
//     const [btnGenerar, setBtnGenerar] = useState(false);
//     const [noServicio, setNoServicio] = useState("");
    
//     let servicio = useRef("");
//     let tecnicoInput = useRef("");
//     let fechaInput = useRef("");
//     let horaInput = useRef("");

//     const buscarServicio = (event) => { //Usuario ingresa servicio

//         if (event.key === 'Enter') {

//             event.preventDefault();
//             let ser = servicio.current.value;
//             setBtnGenerar(true);

//             if(ser === ""){
//                 let servicioError = document.getElementById("errorServicio");
//                 let errorS = "Ingrese un servicio";
//                 servicioError.innerHTML = errorS;
//                 setServicioEncontrado(false);
//                 setFormInspeccion(false);

//             } else { //Se escribio un servicio correctamente

//                 //Buscamos el servicio
//                 if(ser === "1000403193"){ //Encontro el servicio
//                     let servicioError = document.getElementById("errorServicio");
//                     let errorS = "";
//                     servicioError.innerHTML = errorS;
//                     setServicioEncontrado(true);

//                 }else{ //No encontro el servicio
//                     let servicioError = document.getElementById("errorServicio");
//                     let errorS = "No se encontro el servicio."
//                     servicioError.innerHTML = errorS;
//                     setServicioEncontrado(false);
//                     setFormInspeccion(false);
//                 }      
//             }

//         }
//     }

//     const generar = (event) => { //Usuario da click en boton generar

//         //Aqui evaluamos si el servicio fue encontrado, en caso de hacerlo seteo para que aparezca el formulario y seteo la ID del servicio en el input de readOnly

//         event.preventDefault();
//         let ser = servicio.current.value;
//         setBtnGenerar(false);

//         if(servicioEncontrado === false){
//             setFormInspeccion(false);
//         } else if(servicioEncontrado === true){
//             setFormInspeccion(true);
//             setNoServicio(ser);
//         }
//     }
    
//     const inspeccionar = (event) => { //Usuario genera inspeccion (envia formulario)

//         event.preventDefault();
//         setBtnGenerar(false);

//         let tec = tecnicoInput.current.value;
//         let fec = fechaInput.current.value;
//         let hor = horaInput.current.value;

//         let errorTecnico = document.getElementById("errorTecnico-1");
//         let errorFecha = document.getElementById("errorFecha-1");
//         let errorHora = document.getElementById("errorHora-1");

//         let errorT = "";
//         let errorF = "";
//         let errorH = "";

//         let flag = false;

//         if(tec === ""){
//             errorT = "Asigna un tecnico primero."
//             flag = true;
//         }
//         if(fec === ""){
//             errorF = "Asigna una fecha primero."
//             flag = true;
//         }
//         if(hor === ""){
//             errorH = "Asigna una hora primero."
//             flag = true;
//         }
//         if(flag === true){
//             errorTecnico.innerHTML = errorT;
//             errorFecha.innerHTML = errorF;
//             errorHora.innerHTML = errorH;
//         } else {
//             errorT = "";
//             errorF = "";
//             errorH = "";
//             errorTecnico.innerHTML = errorT;
//             errorFecha.innerHTML = errorF;
//             errorHora.innerHTML = errorH;

//             servicio.current.value = "";
//             tecnicoInput.current.value = "";
//             fechaInput.current.value = "";
//             horaInput.current.value = "";

//             let inspeccionG = {
//                 "servicio": noServicio,
//                 "tecnico": tec,
//                 "fecha": fec,
//                 "hora": hor
//             }

//             inspeccionG = JSON.stringify(inspeccionG)
//             console.log(inspeccionG)
//             //HACER POST A LA RUTA

//         }

//     }

//     useEffect(()=>{

//         if(servicioEncontrado === true && noServicio.length > 0 && formInspeccion === true){
                  
//                 let focusme = document.getElementById("focus");
//                 focusme.scrollIntoView();
          
//         }
        
//     }, [noServicio, formInspeccion, servicioEncontrado])

//     return (
//         <React.Fragment>
//             <NavbarAnalista/>
//             <div className="container" style={{ color: "#424B5A" }}>
//                 <Titulo
//                     titulo="GESTI??N INSPECCI??N"
//                     subTitulo1="A continuaci??n, podr??s consultar y generar las ??rdenes de servicio de inspecci??n asociadas a los servicios."
//                 // subTitulo2="como masiva los nuevos servicios de clientes"
//                 />
//                 {/*CONSULTA*/}
//                 <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center" style={{ marginBottom: "36px" }}>
//                     <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
//                         <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Inspecci??n</h2>
//                         <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "0px", paddingRight: "32px", paddingLeft: "32px" }}>Ingresa el servicio base al cual deseas consultar las inspecciones hist??ricas o bien generar inspecciones.<br /></p>
//                         <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
//                             <form style={{ width: "260px" }}>
//                                 <div className="mb-3" style={{ fontSize: "12px" }}>
//                                     <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>N??mero del servicio</p>
//                                     <input ref={servicio} onKeyDown={buscarServicio} className="form-control form-control-sm" type="text" name="Servicio" placeholder="No. Servicio" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
//                                     <p id="errorServicio" style={{ color: 'var(--bs-red)' }}></p>
//                                     {servicioEncontrado && 
//                                     <div>
//                                         <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
//                                             <button className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }} data-bs-target="#modal-1" data-bs-toggle="modal">Consultar</button>
//                                         </div>
//                                         {btnGenerar && <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
//                                             <button onClick={generar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Generar</button>
//                                         </div>
//                                         }
//                                         <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Descarga hist??rico anual de inspecci??n de servicios.<br /></p>
//                                         <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
//                                             <button className="btn btn-primary d-block w-100" type="button" style={{ background: "#F2F5F7", fontSize: "14px", borderColor: "#F2F5F7", color: "#505D68" }}>Descargar</button>
//                                         </div>
//                                     </div>
//                                     }
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 {/*CONSULTA*/}
//                 {/*INFORMACION*/}
//                 {formInspeccion && <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center" style={{ marginBottom: "36px" }}>
//                     <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
//                         <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Generar inspecci??n</h2>
//                         <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "0px", paddingRight: "32px", paddingLeft: "32px" }}>Ingresa la informaci??n b??sica requerida para generar inspecci??n.<br /></p>
//                         <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
//                             <form method="post" style={{ width: "260px" }}>
//                                 <div id="focus" className="mb-3" style={{ fontSize: "12px" }}>
//                                     <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>N??mero del servicio</p>
//                                     <input value={noServicio} id="servicio" className="form-control form-control-sm" type="text" name="Servicio" placeholder="No. Servicio" style={{ fontSize: "14px", marginBottom: "4px" }} required="" readonly="" />
//                                 </div>
//                                 <div className="mb-3" style={{ fontSize: "12px" }}>
//                                     <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>ID T??cnico</p>
//                                     <input ref={tecnicoInput} id="tecnico" className="form-control form-control-sm" type="text" name="Tecnico" placeholder="ID T??cnico" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
//                                     <p id="errorTecnico-1" value="" style={{ color: 'var(--bs-red)' }}></p>
//                                 </div>
//                                 <div className="mb-3" style={{ fontSize: "12px" }}>
//                                     <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Fecha de inspecci??n</p>
//                                     <input ref={fechaInput} id="fecha" className="form-control form-control-sm" name="Fecha" placeholder="Fecha inicio" style={{ fontSize: "14px", marginBottom: "4px", color: 'rgba(33,37,41,0.7)' }} type="date" required="" />
//                                     <p id="errorFecha-1" value="" style={{ color: 'var(--bs-red)' }}></p>
//                                 </div>
//                                 <div className="mb-3" style={{ fontSize: '12px' }}>
//                                     <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Hora de inspecci??n</p>
//                                     <input ref={horaInput} id="hora" className="form-control form-control-sm" name="Hora" placeholder="Hora" style={{ fontSize: "14px", marginBottom: "4px", color: 'rgba(33,37,41,0.7)' }} type="time" required="" />
//                                     <p id="errorHora-1" value="" style={{ color: 'var(--bs-red)' }}></p>
//                                 </div>
//                                 <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
//                                     <button onClick={inspeccionar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Generar</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 }
//                 {/*INFORMACION*/}
//                 {/*MODAL*/}
//                 <div className="modal fade" role="dialog" tabIndex="-1" id="modal-1">
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h4 className="modal-title" style={{ fontSize: "16px" }}>Inspecciones hist??ricas</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <div className="table-responsive" style={{ fontSize: "14px" }}>
//                                     <table className="table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Fecha</th>
//                                                 <th>T??cnico</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td>01/11/2021 08:00 a.m.</td>
//                                                 <td>Juan P??rez</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>17/10/2021 10:00 a.m.</td>
//                                                 <td>Jorge L??pez</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/*MODAL*/}
//             </div>
//         </React.Fragment>

//     )
// }