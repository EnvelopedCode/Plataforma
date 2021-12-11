import React from 'react';
import Titulo from '../../components/Titulo'
import { useRef, useState, useEffect } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';

export default function GeneracionInspeccion() {

    const [servicioEncontrado, setServicioEncontrado] = useState(false);
    const [formInspeccion, setFormInspeccion] = useState(false);
    const [btnGenerar, setBtnGenerar] = useState(false);
    const [noServicio, setNoServicio] = useState("");
    
    let servicio = useRef("");
    let tecnicoInput = useRef("");
    let fechaInput = useRef("");
    let horaInput = useRef("");

    const buscarServicio = (event) => { //Usuario ingresa servicio

        if (event.key === 'Enter') {

            event.preventDefault();
            let ser = servicio.current.value;
            setBtnGenerar(true);

            if(ser === ""){
                let servicioError = document.getElementById("errorServicio");
                let errorS = "Ingrese un servicio";
                servicioError.innerHTML = errorS;
                setServicioEncontrado(false);
                setFormInspeccion(false);

            } else { //Se escribio un servicio correctamente

                //Buscamos el servicio
                if(ser === "1000403193"){ //Encontro el servicio
                    let servicioError = document.getElementById("errorServicio");
                    let errorS = "";
                    servicioError.innerHTML = errorS;
                    setServicioEncontrado(true);

                }else{ //No encontro el servicio
                    let servicioError = document.getElementById("errorServicio");
                    let errorS = "No se encontro el servicio."
                    servicioError.innerHTML = errorS;
                    setServicioEncontrado(false);
                    setFormInspeccion(false);
                }      
            }

        }
    }

    const generar = (event) => { //Usuario da click en boton generar

        //Aqui evaluamos si el servicio fue encontrado, en caso de hacerlo seteo para que aparezca el formulario y seteo la ID del servicio en el input de readOnly

        event.preventDefault();
        let ser = servicio.current.value;
        setBtnGenerar(false);

        if(servicioEncontrado === false){
            setFormInspeccion(false);
        } else if(servicioEncontrado === true){
            setFormInspeccion(true);
            setNoServicio(ser);
        }
    }
    
    const inspeccionar = (event) => { //Usuario genera inspeccion (envia formulario)

        event.preventDefault();
        setBtnGenerar(false);

        let tec = tecnicoInput.current.value;
        let fec = fechaInput.current.value;
        let hor = horaInput.current.value;

        let errorTecnico = document.getElementById("errorTecnico-1");
        let errorFecha = document.getElementById("errorFecha-1");
        let errorHora = document.getElementById("errorHora-1");

        let errorT = "";
        let errorF = "";
        let errorH = "";

        let flag = false;

        if(tec === ""){
            errorT = "Asigna un tecnico primero."
            flag = true;
        }
        if(fec === ""){
            errorF = "Asigna una fecha primero."
            flag = true;
        }
        if(hor === ""){
            errorH = "Asigna una hora primero."
            flag = true;
        }
        if(flag === true){
            errorTecnico.innerHTML = errorT;
            errorFecha.innerHTML = errorF;
            errorHora.innerHTML = errorH;
        } else {
            errorT = "";
            errorF = "";
            errorH = "";
            errorTecnico.innerHTML = errorT;
            errorFecha.innerHTML = errorF;
            errorHora.innerHTML = errorH;

            servicio.current.value = "";
            tecnicoInput.current.value = "";
            fechaInput.current.value = "";
            horaInput.current.value = "";

            let inspeccionG = {
                "servicio": noServicio,
                "tecnico": tec,
                "fecha": fec,
                "hora": hor
            }

            inspeccionG = JSON.stringify(inspeccionG)
            console.log(inspeccionG)
            //HACER POST A LA RUTA

        }

    }

    useEffect(()=>{

        if(servicioEncontrado === true && noServicio.length > 0 && formInspeccion === true){
                  
                let focusme = document.getElementById("focus");
                focusme.scrollIntoView();
          
        }
        
    }, [noServicio, formInspeccion, servicioEncontrado])

    return (
        <React.Fragment>
            <NavbarAnalista/>
            <div className="container" style={{ color: "#424B5A" }}>
                <Titulo
                    titulo="GESTIÓN INSPECCIÓN"
                    subTitulo1="A continuación, podrás consultar y generar las órdenes de servicio de inspección asociadas a los servicios."
                // subTitulo2="como masiva los nuevos servicios de clientes"
                />
                {/*CONSULTA*/}
                <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center" style={{ marginBottom: "36px" }}>
                    <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Inspección</h2>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "0px", paddingRight: "32px", paddingLeft: "32px" }}>Ingresa el servicio base al cual deseas consultar las inspecciones históricas o bien generar inspecciones.<br /></p>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
                            <form style={{ width: "260px" }}>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Número del servicio</p>
                                    <input ref={servicio} onKeyDown={buscarServicio} className="form-control form-control-sm" type="text" name="Servicio" placeholder="No. Servicio" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorServicio" style={{ color: 'var(--bs-red)' }}></p>
                                    {servicioEncontrado && 
                                    <div>
                                        <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                            <button className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }} data-bs-target="#modal-1" data-bs-toggle="modal">Consultar</button>
                                        </div>
                                        {btnGenerar && <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                            <button onClick={generar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Generar</button>
                                        </div>
                                        }
                                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "24px", paddingRight: "32px", paddingLeft: "32px", borderColor: "#A1AEB7" }}>Descarga histórico anual de inspección de servicios.<br /></p>
                                        <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                            <button className="btn btn-primary d-block w-100" type="button" style={{ background: "#F2F5F7", fontSize: "14px", borderColor: "#F2F5F7", color: "#505D68" }}>Descargar</button>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*CONSULTA*/}
                {/*INFORMACION*/}
                {formInspeccion && <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center" style={{ marginBottom: "36px" }}>
                    <div style={{ background: "#FFFFFF", width: "386px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "12px", marginTop: "32px" }}>Generar inspección</h2>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{ textAlign: "center", fontSize: "12px", color: "#A1AEB7", marginBottom: "0px", paddingRight: "32px", paddingLeft: "32px" }}>Ingresa la información básica requerida para generar inspección.<br /></p>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
                            <form method="post" style={{ width: "260px" }}>
                                <div id="focus" className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Número del servicio</p>
                                    <input value={noServicio} id="servicio" className="form-control form-control-sm" type="text" name="Servicio" placeholder="No. Servicio" style={{ fontSize: "14px", marginBottom: "4px" }} required="" readonly="" />
                                </div>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>ID Técnico</p>
                                    <input ref={tecnicoInput} id="tecnico" className="form-control form-control-sm" type="text" name="Tecnico" placeholder="ID Técnico" style={{ fontSize: "14px", marginBottom: "4px" }} required="" />
                                    <p id="errorTecnico-1" value="" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="mb-3" style={{ fontSize: "12px" }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Fecha de inspección</p>
                                    <input ref={fechaInput} id="fecha" className="form-control form-control-sm" name="Fecha" placeholder="Fecha inicio" style={{ fontSize: "14px", marginBottom: "4px", color: 'rgba(33,37,41,0.7)' }} type="date" required="" />
                                    <p id="errorFecha-1" value="" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="mb-3" style={{ fontSize: '12px' }}>
                                    <p style={{ color: "#A1AEB7", marginBottom: "0px", paddingBottom: "4px" }}>Hora de inspección</p>
                                    <input ref={horaInput} id="hora" className="form-control form-control-sm" name="Hora" placeholder="Hora" style={{ fontSize: "14px", marginBottom: "4px", color: 'rgba(33,37,41,0.7)' }} type="time" required="" />
                                    <p id="errorHora-1" value="" style={{ color: 'var(--bs-red)' }}></p>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{ width: "40%", marginLeft: "30%", fontSize: "14px" }}>
                                    <button onClick={inspeccionar} className="btn btn-primary d-block w-100" type="button" style={{ background: "#424B5A", borderColor: "#424B5A", fontSize: "14px" }}>Generar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                }
                {/*INFORMACION*/}
                {/*MODAL*/}
                <div className="modal fade" role="dialog" tabIndex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" style={{ fontSize: "16px" }}>Inspecciones históricas</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive" style={{ fontSize: "14px" }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Técnico</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>01/11/2021 08:00 a.m.</td>
                                                <td>Juan Pérez</td>
                                            </tr>
                                            <tr>
                                                <td>17/10/2021 10:00 a.m.</td>
                                                <td>Jorge López</td>
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
        </React.Fragment>

    )
}