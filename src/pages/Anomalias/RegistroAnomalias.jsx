import React from 'react'
import Titulo from '../../components/Titulo';
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';

export default function RegistroAnomalias() {

    const servicioRef = useRef("");
    const fechaRef = useRef("");
    const anomaliaRef = useRef("");
    
    const registrar = (event) =>{

        event.preventDefault();

        let servicio = servicioRef.current.value;
        let fecha = fechaRef.current.value;
        let anomalia = anomaliaRef.current.value;

        let errorServicio = document.getElementById("errorServicio");
        let errorFecha = document.getElementById("errorFecha");
        let errorAnomalia = document.getElementById("errorAnomalia");

        let errorS = "";
        let errorF = "";
        let errorA = "";

        function validarTexto(parametro) {

            const reg = new RegExp('^[0-9]+$');
            if (parametro.search(reg)) {
                return false;
            } else {
                return true;
            }
        }

        let flag = false;


        if(servicio === ""){
            errorS = "Ingrese un servicio";
            flag = true;
        } else if(validarTexto(servicio) === false){
            errorS = "Ingrese caracteres numericos unicamente";
            flag = true;
        }

        if(fecha === ""){
            errorF = "Ingrese una fecha";
            flag = true;
        }

        if(flag === true){
            errorServicio.innerHTML = errorS;
            errorFecha.innerHTML = errorF;
            errorAnomalia.innerHTML = errorA;
        } else {
            errorS = "";
            errorF = "";
            errorA = "";
            errorServicio.innerHTML = errorS;
            errorFecha.innerHTML = errorF;
            errorAnomalia.innerHTML = errorA;

            servicioRef.current.value = "";
            fechaRef.current.value = "";
            anomaliaRef.current.value = "";

            let anomaliaR = {
                "servicio": servicio,
                "fecha": fecha,
                "anomalia": anomalia
            }

            anomaliaR = JSON.stringify(anomaliaR)
            console.log(anomaliaR)
            //HACER POST A LA RUTA
        }

    }

    return (
      <React.Fragment>
        <NavbarAnalista/>
        <div className="container" style={{ color: "#424B5A;" }}>
            <Titulo
            titulo="GESTIÓN DE ANOMALÍAS"
            subTitulo1="A continuación, podrás registrar tanto de forma manual como masiva las anomalías de los servicios."
            />
            <RegistroMasivo subtitulo="Adjunta el archivo .xlsx con la información básica de los servicios a actualizar." subtitulo2="Descarga el historico anual de anomalia de servicios." descarga={true} />

            <div className="container" style={{color: "#424B5A"}}>
                <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                    <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Registro individual</h2>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa la información de la anomalía a registrar del servicio.<br /></p>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                            <form method="post" style={{width: "260px"}}>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Número del servicio</p>
                                    <input ref={servicioRef} className="form-control form-control-sm" type="text" name="Servicio" placeholder="No. Servicio" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                    <p id="errorServicio" style={{color: 'var(--bs-red)'}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Fecha de la anomalía</p>
                                    <input ref={fechaRef} className="form-control form-control-sm" name="Fecha" placeholder="Fecha inicio" style={{fontSize: "14px",marginBottom: "4px",color: 'rgba(33,37,41,0.7)'}} type="date" required="" />
                                    <p id="errorFecha" style={{color: 'var(--bs-red)'}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Anomalía</p>
                                    <select ref={anomaliaRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBottom: "4px"}} required="" name="Anomalia">
                                        <optgroup label="Anomalías">
                                            <option value="Medidor dañado" selected="">Medidor dañado</option>
                                            <option value="Medidor directo">Medidor directo</option>
                                            <option value="Medidor desprogramado">Medidor desprogramado</option>
                                        </optgroup>
                                    </select>
                                    <p id="errorAnomalia" style={{color: 'var(--bs-red)'}}></p>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                    <button onClick={registrar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    

        </div>
      </React.Fragment>
    );
}