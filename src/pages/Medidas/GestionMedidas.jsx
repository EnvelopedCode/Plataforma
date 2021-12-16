import React from 'react'
import Titulo from '../../components/Titulo';
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';
import NavbarAdmin from '../../components/NavbarAdmin';
import { authAnalista } from '../../auth/authAnalista';
import { authAdmin } from '../../auth/authAdmin';

export default function GestionMedidas() {

    var host = "http://localhost:8080";

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


        if(servicio === ""){
            errorS = "Digite un servicio";
            flag = true;
        } else if (servicio.length < 12 || servicio.length > 12) {
            errorS = "Ingrese un servicio de longitud adecuada";
            flag = true;
        }

        if(medicion === ""){
            errorM= "Digite una medición";
            flag = true;
        } else if(isNaN(medicion) === true){
            errorM="digite solo numeros"
            flag=true;
        } else if (parseInt(medicion) > 10000) {
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

            var flag2 = false;
            var errorConsultaM = "";
            var errorConsultaS = "";

            let servicioEnviar = {
                "servicio": servicio,
            }

            fetch(`${host}/validarMedida`, { //Validar que la medicion no sea anomala
                headers: { "content-type": "application/json" },
                method: "POST",
                body: JSON.stringify(servicioEnviar)
              })
                .then((data) => data.json())
                .then((data) => {
                    if(data.busqueda){ //Encontro mediciones anteriores

                        for(let indice in data.busqueda){

                            if(parseInt(data.busqueda[indice].lectura) > parseInt(medicion)){ //Busca si alguna de las viejas es mayor que la nueva
                                flag2 = true
                                errorConsultaM = "Medicion ingresada anomala, se detectaron mediciones anteriores mayores a la ingresada"
                            }
                        }

                    } else { //No encontro mediciones anteriores (No hubo registro de servicio)
                        errorConsultaS = "Servicio no registrado"
                        errorServicio.innerHTML = errorConsultaS
                        flag2 = true
                    }

                    if(flag2 === false){ // El servicio existe y la medicion no es anomala

                        //FETCH ENVIO
                        alert("Insercion exitosa")

                        let medida = {
                            "servicio": servicio,
                            "lectura": medicion,
                            "fechaLectura": fechaMedicion,
                            "consumo": medicion,
                            "unidad": unidades,
                            "anomalia": anomalia
                        }

                        fetch(`${host}/medidasServicio`, { //Insercion de  medida
                            headers: { "content-type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(medida)
                          })
                            .then((data) => data.json())
                            .then((data) => {
                                alert("Data recibida")
                            })

                        //FETCH ENVIO

                    } else if(flag2 === true){
                        errorMedicion.innerHTML = errorConsultaM;
                    }

                })
                .catch((error) => {
                  alert(error);
                });

        }

    }
    
    return (
      <React.Fragment>
        {authAnalista() || authAdmin() ? (
          <div>
            {authAdmin() && <NavbarAdmin />}
            {authAnalista() && <NavbarAnalista />}
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
                    Registro individual
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
                    Ingresa la información de la medición a registrar del
                    servicio.
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
                          Número del servicio
                        </p>
                        <input
                          ref={servicioRef}
                          className="form-control form-control-sm"
                          type="text"
                          name="Servicio"
                          placeholder="No. Servicio"
                          style={{ fontSize: "14px", marginBottom: "4px" }}
                          required=""
                        />
                        <p
                          id="errorServicio"
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
                          Medición
                        </p>
                        <input
                          ref={medicionRef}
                          className="form-control form-control-sm"
                          type="text"
                          name="Medicion"
                          placeholder="Medición"
                          style={{ fontSize: "14px", marginBottom: "4px" }}
                          required=""
                        />
                        <p
                          id="errorMedicion"
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
                          Unidades
                        </p>
                        <select
                          ref={unidadesRef}
                          className="form-select form-select-sm"
                          style={{
                            fontSize: "14px",
                            color: "rgba(33,37,41,0.7)",
                            marginBottom: "4px",
                          }}
                          required=""
                          name="Unidad"
                        >
                          <optgroup label="Unidad">
                            <option value="mc" selected="">
                              mc
                            </option>
                            <option value="cc">cc</option>
                          </optgroup>
                        </select>
                        <p
                          id="errorUnidad"
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
                          Fecha de la medición
                        </p>
                        <input
                          ref={fechaMedicionRef}
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
                          id="errorFecha"
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
                          Anomalía
                        </p>
                        <select
                          ref={anomaliasRef}
                          className="form-select form-select-sm"
                          style={{
                            fontSize: "14px",
                            color: "rgba(33,37,41,0.7)",
                            marginBottom: "4px",
                          }}
                          name="Anomalia"
                        >
                          <optgroup label="Anomalías">
                            <option value="Sin anomalias">Sin anomalias</option>
                            <option value="Medidor dañado">
                              Medidor dañado
                            </option>
                            <option value="Medidor directo">
                              Medidor directo
                            </option>
                            <option value="Medidor desprogramado">
                              Medidor desprogramado
                            </option>
                          </optgroup>
                        </select>
                        <p
                          id="errorAnomalia"
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
                          onClick={registrar}
                          className="btn btn-primary d-block w-100"
                          type="button"
                          style={{
                            background: "#424B5A",
                            borderColor: "#424B5A",
                            fontSize: "14px",
                          }}
                        >
                          Registrar
                        </button>
                      </div>
                    </form>
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
