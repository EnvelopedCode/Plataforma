import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

export default function ServiciosGestion() {

    const [registros, setRegistros] = useState([])
    const [titulo, setTitulo] = useState("")
    const [cedula, setCedula] = useState("")

    const cedulas = ["1000403193", "1234567890"]
    const cedula_1 = ["1000403193-1", "1000403193-2", "1000403193-3"]
    const cedula_2 = ["1234567890-1", "1234567890-2", "1234567890-3", "1234567890-4"]
    
    

    let cedulaActual = cedula;

    const buscarCedula = (event) => {
        if (event.key === 'Enter') {

            event.preventDefault();
            console.warn("ENTRO A GUARDAR")
            let ced = document.getElementById("Cedula").value;
            setCedula(ced)

            function cedulaEncontrar(ced){
                for(let cedula in cedulas){

                    if(ced === cedulas[cedula]){
                 
                        return cedulas[cedula]
                        break;
                    }
                }
            }
            
            let resultado = cedulaEncontrar(ced)

            console.log("EVALUAR")
            console.warn(resultado)
            console.log("EVALUAR")

            if(resultado === "1000403193"){
                console.log("Entro a condicional")
                setRegistros(cedula_1)
            } else if (resultado === "1234567890"){
                setRegistros(cedula_2)
            }

            }
        
      }
    
    const buscarRegistro = (event) => {
        event.preventDefault();
        console.warn("RECIBIO CLICK DE UN REGISTRO");
        setTitulo(event.target.value);
        setCedula(cedulaActual);
    }
    
    const actualizar = (event) => {

        console.warn("ENTRO A ACTUALIZAR")
        let flag = false;

        let direccion = document.getElementById("direccion").value;
        let barrio = document.getElementById("barrio").value;
        let fechaIngreso = document.getElementById("fechaIngreso").value;

        const direccionError = document.getElementById("direccionError");
        const barrioError = document.getElementById("barrioError");
        const fechaIngresoError = document.getElementById("fechaIngresoError");

        let errorDir = "";
        let errorB = "";
        let errorF = "";

        /*DIRECCION*/
        if (direccion.length === 0 || direccion.length === null) {
            console.log("valida la direccion");
            errorDir = "Ingrese una direccion";
            flag = true;
          } else if (direccion.lenght < 5) {
            errorDir = "Ingrese una direccion valida";
            flag = true;
        }

        /*BARRIO*/
        if (barrio.length === 0 || barrio.length === null) {
            console.log("valida el barrio");
            errorB = "Ingrese un barrio";
            flag = true;
          } else if (barrio.lenght < 5) {
            errorB = "Ingrese un barrio valido";
            flag = true;
          }

        if(flag === true){
            direccionError.innerHTML = errorDir;
            barrioError.innerHTML = errorB;
            fechaIngresoError.innerHTML = errorF;
        }else{
            console.warn("FLAG === FALSE")
            errorDir = "";
            errorB = "";
            errorF = "";
            direccionError.innerHTML = errorDir;
            barrioError.innerHTML = errorB;
            fechaIngresoError.innerHTML = errorF;

        }

        
    }

    useEffect(()=>{
        console.log("USEFFECT")
        console.log(registros)
    }, [registros])

    useEffect(()=>{
        console.log("USEFFECT")
        console.log(titulo)
    }, [titulo])
    

    return (
      <React.Fragment>
        <NavbarAdmin />
        <div classNameName="container" style={{ color: "#424B5A;" }}>
            <Titulo
            titulo="GESTION DE SERVICIOS"
            subTitulo1="A continuación, podrás gestionar tanto de forma manual como masiva los servicios de clientes existentes."
            />
            <RegistroMasivo mensaje="Adjunta el archivo .xlsx con la información básica de los servicios a actualizar."/>
            {/*GESTION INDIVIDUAL*/}
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Gestión individual</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa la información básica del cliente responsable del servicio.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        <form style={{width: "260px"}}>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <input onKeyDown={buscarCedula} className="form-control form-control-sm" type="text" id="Cedula" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} />
                                <p id="cedulaError" name="cedulaError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Lista de los servicio asociados al cliente buscado.<br /></p>
                            {registros.map((registro) =>
                                 <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "55%",marginLeft: "22%"}}>
                                 <button onClick={buscarRegistro} value={registro} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "12px"}}>{registro}</button>
                             </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {/*GESTION INDIVIDUAL*/}
            {/*INFORMACION DEL REGISTRO*/}
    
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>{titulo}</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Información básica del cliente asociado al servicio número {titulo}.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        {/*FORMULARIO*/}
                        <form method="post" style={{width: "260px"}}>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" value={cedulaActual} style={{fontSize: "14px",marginBottom: "4px"}} readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "14px"}}>
                                <input className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{marginBottom: "4px"}} readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "14px"}}>
                                <input className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{marginBottom: "4px"}} readonly="" />
                            </div>
                            
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "50%",marginLeft: "25%",fontSize: "14px"}}>
                                <button className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Ver facturación</button>
                            </div>
                            {/*FORMULARIO A EVALUAR*/}
                            <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32pxb",orderColor: "#A1AEB7"}}>Información básica del servicio asociado al cliente.<br /></p>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <select id="departamento" className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                    <optgroup label="Departamento">
                                        <option value="Atlantico" selected="">Atlántico</option>
                                        <option value="Bolivar">Bolívar</option>
                                        <option value="Magdalena">Magdalena</option>
                                    </optgroup>
                                </select>
                                <p id="departamentoError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <select className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                    <optgroup label="Municipio">
                                        <option value="Barranquilla" selected="">Barranquilla</option>
                                        <option value="Colombia">Puerto Colombia</option>
                                        <option value="Soledad">Soledad</option>
                                    </optgroup>
                                </select>
                                <p id="municipioError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <input id="direccion" className="form-control form-control-sm" type="text" name="Dirección" placeholder="Carrera 52 # 98 - 120" style={{fontSize: "14px",marginBottom: "4px"}} />
                                <p id="direccionError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <input id="barrio" className="form-control form-control-sm" type="text" name="Barrio" placeholder="Buenavista" style={{fontSize: "14px",marginBottom: "4px"}} />
                                <p id="barrioError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <select  id="estrato" className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)'}}>
                                    <optgroup label="Estrato">
                                        <option value="1" selected="">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5" selected="">5</option>
                                    </optgroup>
                                </select>
                                <p id="estratoError" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p id="fechaIngreso" style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Próxima de facturación</p>
                                <input id="fechaIngreso" className="form-control form-control-sm" name="Fecha inicio" placeholder="Fecha inicio" style={{fontSize: "14px",marginBottom: "4px",color: 'rgba(33,37,41,0.7)'}} type="date" />
                                <p id="fechaIngresoError" value="" style={{color: "var(--bs-red)"}}></p>
                            </div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                <button onClick={actualizar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Actualizar</button></div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                <button className="btn btn-primary d-block w-100" type="button" style={{background: "#F2F5F7",fontSize: "14px",borderColor: "#F2F5F7",color: "#505D68"}}>Suspender</button></div>
                        </form>
                        {/*FORMULARIO*/}
                    </div>
                </div>
            </div>
            {/*INFORMACION DEL REGISTRO*/}
        </div>
      </React.Fragment>
    );
}
