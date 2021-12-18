import React from 'react'
import Titulo from '../../components/Titulo';
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef, useState } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';
import NavbarAdmin from '../../components/NavbarAdmin';
import { authAnalista } from '../../auth/authAnalista';
import { authAdmin } from '../../auth/authAdmin';

export default function GestionMedidas() {

    const [formulario, setFormulario] = useState(false)

    var host = "http://localhost:8080";

    const servicioRef = useRef("");
    const medicionRef = useRef("");
    const unidadesRef = useRef("");
    const anomaliasRef = useRef("");

    let flag = false;
    
    const validar = (event) => {

        let servicio = servicioRef.current.value
        let errorServicio = document.getElementById("errorServicio");
        errorServicio.innerHTML = "";
        setFormulario(false)
      
        if (event.key === 'Enter') {

          event.preventDefault()

          let fechaHoy = new Date()
          fechaHoy.setDate(fechaHoy.getDate()-1)
          fechaHoy = fechaHoy.toISOString();
          fechaHoy = fechaHoy.substring(0, 10);
          console.log(fechaHoy)

          let servicioEnviar = {
            "servicio": servicio,
            "fecha": fechaHoy
          }

          fetch(`${host}/busquedaServicio`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(servicioEnviar)
          })
            .then((data) => data.json())
            .then((data) => {
              if(data.servicio){
                //Desarmar fecha
                let fechaFactura = new Date(data.servicio.fecha) //Facturacion
                let fechaActual = new Date() //Hoy

                let diaFactura = fechaFactura.getDate()+1 //Dia facturacion
                let diaActual = fechaActual.getDate() //Dia hoy

                console.log(diaFactura) //16
                console.log(diaActual) //17

                if(diaFactura === diaActual){ //Las fechas coinciden
                  errorServicio.innerHTML = ""
                  console.warn(servicioEnviar)

                  //FETCH DOS VECES MISMO DIA

                  fetch(`${host}/fechaValidar`, {
                    headers: { "content-type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(servicioEnviar)
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      console.log(data.medida) //Nos trae las medidas de hoy
                      if(data.medida.length > 0){
                        //Ya se registro una medida hoy
                        errorServicio.innerHTML = "Ya se ha registrado una medida hoy"
                      } else {
                        setFormulario(true)
                        //No se registraron medidas hoy
                      }
                    })

                  //FETCH NO INGRESAR DOS VECES MISMO DIA

                }else{
                  errorServicio.innerHTML = `Este servicio solo puede facturarse los dias ${diaFactura}`
                }
              
              } else{
                errorServicio.innerHTML = "Servicio no encontrado"
              }
            })
        }
    }
    

    const registrar = () => {
        
        flag = false;

        let servicio = servicioRef.current.value;
        let medicion = medicionRef.current.value;
        let unidades = unidadesRef.current.value;
        let anomalia = anomaliasRef.current.value;

        const errorMedicion = document.getElementById("errorMedicion");

        let errorM = "";

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


        if (flag === true) {
            errorMedicion.innerHTML = errorM;
        }else{
            console.warn("FLAG === FALSE");
            errorM = "";
            errorMedicion.innerHTML = errorM;

            servicioRef.current.value = "";
            medicionRef.current.value = "";

            var flag2 = false;
            var errorConsultaM = "";

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

                        if(flag2 === true){
                          errorMedicion.innerHTML = errorConsultaM;
                        } else{
                          //FETCH ENVIO

                          let fechaHoy = new Date()
                          fechaHoy.setDate(fechaHoy.getDate()-1)
                          fechaHoy = fechaHoy.toISOString();
                          fechaHoy = fechaHoy.substring(0, 10);

                          let Medida = {
                            "servicio": servicio,
                            "lectura": medicion,
                            "fechaLectura": fechaHoy,
                            "consumo": medicion,
                            "unidad": unidades,
                            "anomalia": anomalia,
                          }
                          fetch(`${host}/medidasServicio`, { //Validar que la medicion no sea anomala
                            headers: { "content-type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(Medida)
                          })
                            .then((data) => data.json())
                            .then((data) => {
                              setFormulario(false)
                            })
                            .catch((data) => {
                              alert(data.estado)
                            })
                          //FETCH ENVIO
                        }

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
                  {/*DUPLICADO*/}
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
                        Número del servicio
                      </p>
                      <input
                        ref={servicioRef}
                        onKeyDown={validar}
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
                    </form>
                  </div>
                  {/*DUPLICADO*/}
                  <div
                    className="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                    style={{ marginTop: "24px", marginBottom: "24px" }}
                  >
                    <form method="post" style={{ width: "260px" }}>
                      {formulario && 
                      <div>
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
                      </div>
                      }
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
