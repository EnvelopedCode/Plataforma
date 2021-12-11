import React from 'react'
import Titulo from '../../components/Titulo';
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';

export default function GestionMedidas() {

    const servicioRef = useRef("");
    const medicionRef = useRef("");
    const fechaMedicionRef = useRef("");
    const unidadesRef = useRef("");
    const anomaliasRef = useRef("");

    let flag = false;

    const registrar = () => {
        
        flag = false;

        let servicio = servicioRef.current.value;
        let medicion = medicionRef.current.value;
        let fechaMedicion = fechaMedicionRef.current.value;
        let unidades = unidadesRef.current.value;
        let anomalia = anomaliasRef.current.value;

        const errorServicio = document.getElementById("errorServicio");
        const errorMedicion = document.getElementById("errorMedicion");
        const errorFecha = document.getElementById("errorFecha");

        let errorS = "";
        let errorM = "";
        let errorF = "";

        function validarTexto(parametro) {

            const reg = new RegExp('^[0-9]+$');
            if (parametro.search(reg)) {
                return false;
            } else {
                return true;
            }
        }

        function validarServicio(parametro) {
            console.warn("VALIDAR SERVICIO")
            let partes = parametro.split("-")
            console.log(partes)
            if(parseInt(partes[0]) === NaN){
                console.log("Nuemro es NaN")
            }
        }

        if(servicio === ""){
            errorS = "Digite un servicio";
            flag = true;
        } else if(validarServicio(servicio)===true){
            errorS="digite solo numeros"
            flag=true;
        } else if (!servicio.length === 11) {
            errorM = "Ingrese un servicio de longitud adecuada";
            flag = true;
        }

        if(medicion === ""){
            errorM= "Digite una medición";
            flag = true;
        } else if(validarTexto(medicion)===false){
            errorM="digite solo numeros"
            flag=true;
        } else if (!medicion === 11) {
            errorM = "Ingrese una medición de longitud adecuada";
            flag = true;
        }

        if(fechaMedicion === ""){
            errorF = "Ingrese una fecha";
            flag = true;
        }

        if (flag === true) {
            errorServicio.innerHTML = errorS;
            errorMedicion.innerHTML = errorM;
            errorFecha.innerHTML = errorF;
        }else{
            console.warn("FLAG === FALSE");
            errorS = "";
            errorM = "";
            errorF = "";
            errorServicio.innerHTML = errorS;
            errorMedicion.innerHTML = errorM;
            errorFecha.inner = errorF;

            servicioRef.current.value = "";
            medicionRef.current.value = "";
            fechaMedicionRef.current.value = "";

            let medida = {
                "servicio": servicio,
                "medicion": medicion,
                "unidad": unidades,
                "fecha": fechaMedicion,
                "anomalia": anomalia
              }

              medida = JSON.stringify(medida)
              console.log(medida)
              //HACER POST A LA RUTA
        }

    }
    
    return (
      <React.Fragment>
        <NavbarAnalista />
        <div className="container" style={{ color: "#424B5A" }}>
          <Titulo
            titulo="GESTIÓN DE MEDIDAS"
            subTitulo1="A continuación, podrás consultar y registrar tanto de forma manual como masiva las mediciones de los servicios."
          />
          <RegistroMasivo
            subtitulo="Adjunta el archivo .xlsx con la información de las mediciones a registrar."
            subtitulo2="Descarga histórico anual de consumo de servicios."
            descarga={true}
          />

            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center"
                style={{marginBottom: "36px" }}>
                <div style={{background: "#FFFFFF" ,width: "386px" ,borderTopLeftRadius: "8px" ,borderTopRightRadius: "8px"
                    ,borderBottomRightRadius: "8px" ,borderBottomLeftRadius: "8px" }}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px"
                        ,textAlign: "center" ,fontWeight: "bold" ,marginBottom: "12px" ,marginTop: "32px" }}>Registro individual
                    </h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center"
                        ,fontSize: "12px" ,color: "#A1AEB7" ,marginBottom: "0px" ,paddingRight: "32px" ,paddingLeft: "32px" }}>
                        Ingresa la información de la medición a registrar del servicio.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px"
                        ,marginBottom: "24px" }}>
                        <form method="post" style={{width: "260px" }}>
                            <div className="mb-3" style={{fontSize: "12px" }}>
                                <p style={{color: "#A1AEB7" ,marginBottom: "0px" ,paddingBottom: "4px" }}>Número del servicio
                                </p>
                                <input ref={servicioRef} className="form-control form-control-sm" type="text" name="Servicio"
                                    placeholder="No. Servicio" style={{fontSize: "14px" ,marginBottom: "4px" }} required="" />
                                <p id="errorServicio" value="" style={{color: 'var(--bs-red)' }}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px" }}>
                                <p style={{color: "#A1AEB7" ,marginBottom: "0px" ,paddingBottom: "4px" }}>Medición</p>
                                <input ref={medicionRef} className="form-control form-control-sm" type="text" name="Medicion" placeholder="Medición" style={{fontSize: "14px" ,marginBottom: "4px" }} required="" />
                                <p id="errorMedicion" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px" }}>
                                <p style={{color: "#A1AEB7" ,marginBottom: "0px" ,paddingBottom: "4px" }}>Unidades</p>
                                <select
                                    ref={unidadesRef} className="form-select form-select-sm" style={{fontSize: "14px" ,color: 'rgba(33,37,41,0.7)'
                                    ,marginBottom: "4px" }} required="" name="Unidad">
                                    <optgroup label="Unidad">
                                        <option value="mc" selected="">mc</option>
                                        <option value="cc">cc</option>
                                    </optgroup>
                                </select>
                                <p id="errorUnidad"  value="" style={{color: 'var(--bs-red)' }}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px" }}>
                                <p style={{color: "#A1AEB7" ,marginBottom: "0px" ,paddingBottom: "4px" }}>Fecha de la medición
                                </p>
                                <input ref={fechaMedicionRef} className="form-control form-control-sm" name="Fecha" placeholder="Fecha inicio" style={{fontSize: "14px" ,marginBottom: "4px" ,color: 'rgba(33,37,41,0.7)' }} type="date" required="" />
                                <p id="errorFecha" value="" style={{color: 'var(--bs-red)' }}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px" }}>
                                <p style={{color: "#A1AEB7" ,marginBottom: "0px" ,paddingBottom: "4px" }}>Anomalía</p>
                                <select ref={anomaliasRef} className="form-select form-select-sm" style={{fontSize: "14px", color: 'rgba(33,37,41,0.7)',marginBottom: "4px" }} required="" name="Anomalia">
                                    <optgroup label="Anomalías">
                                        <option value="Medidor dañado" selected="">Medidor dañado</option>
                                        <option value="Medidor directo">Medidor directo</option>
                                        <option value="Medidor desprogramado">Medidor desprogramado</option>
                                    </optgroup>
                                </select>
                                <p id="errorAnomalia" value="" style={{color: 'var(--bs-red)' }}></p>
                            </div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%" ,marginLeft: "30%"
                                ,fontSize: "14px" }}><button onClick={registrar}className="btn btn-primary d-block w-100" type="button"
                                    style={{background: "#424B5A" ,borderColor: "#424B5A" ,fontSize: "14px"
                                    }}>Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
      </React.Fragment>
    );
}
