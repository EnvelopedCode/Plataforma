import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServiciosGestion() {

    {/*PROVICIONAL*/}
    const [registros, setRegistros] = useState([])
    const [informacion, setInformacion] = useState(false)
    const [titulo, setTitulo] = useState("")
    const [cedula, setCedula] = useState("")

    const cedulas = ["1000403193", "1234567890"]
    const cedula_1 = ["1000403193-1", "1000403193-2", "1000403193-3"]
    const cedula_2 = ["1234567890-1", "1234567890-2", "1234567890-3", "1234567890-4"]
    
    let cedulaActual = cedula;

    const departamentoRef = useRef("");
    const municipioRef = useRef("");
    const direccionRef = useRef("");
    const barrioRef = useRef("");
    const estratoRef = useRef("");
    const fechaIngresoRef = useRef("");

    {/*PROVICIONAL*/}

    const buscarCedula = (event) => { //Valida la cedula y realiza la busqueda de servicios asociados

        if (event.key === 'Enter') {

            event.preventDefault();
            console.warn("ENTRO A GUARDAR")

            let ced = document.getElementById("Cedula").value;
            let cedulaError = document.getElementById("errorCedula");
            let errorC = "";
            let flag = false;

            {/*VALIDAR CEDULA*/}
            function validarCedula(parametro) {
                var patron = /^[a-zA-Z\s]*$/;
                if (parametro.search(patron)) {
                  return false;
                } else {
                  return true;
                }
              }

            if (ced.length < 10 || ced.lenght > 10){
                errorC = "Ingrese una cedula de longitud adecuada";
                setInformacion(false);
                flag = true;
            } else if(validarCedula(ced) === true){
                errorC = "No Ingrese caracteres en su cedula"
                flag = true;
            }

            if(flag === false){

                setCedula(ced)
                errorC = "";
                cedulaError.innerHTML = errorC;

                function cedulaEncontrar(ced){
                    for(let cedula in cedulas){
    
                        if(ced === cedulas[cedula]){
                     
                            return cedulas[cedula]
                            //break;
                        }
                    }
                }
                
                let resultado = cedulaEncontrar(ced) //Resultado de la busqueda de la cedula en base de datos
    
                console.log("EVALUAR")
                console.warn(resultado)
                console.log("EVALUAR")
    
                if(resultado === "1000403193"){
                    setRegistros(cedula_1)

                } else if (resultado === "1234567890"){
                    setRegistros(cedula_2)

                } else{ //No se encontro la cedula
                    setRegistros([])
                    setInformacion(false)
                    errorC = "No se encontro la cedula"
                    cedulaError.innerHTML = errorC;

                }

            } else { //Hubieron errores al ingresar la cedula
                cedulaError.innerHTML = errorC;
                setRegistros([]);
            }
            
        }
    }
    
    const buscarRegistro = (event) => { //Despliega la informacion individual de un servicio
        event.preventDefault();
        setTitulo(event.target.value);
        setCedula(cedulaActual);
        setInformacion(true);

    }
    
    const actualizar = (event) => { //Valida la actualizacion de la informacion de un servicio

        let flag = false;

        let departamento = departamentoRef.current.value;
        let municipio = municipioRef.current.value;
        let direccion = direccionRef.current.value;
        let barrio = barrioRef.current.value;
        let estrato = estratoRef.current.value;
        let fecha = fechaIngresoRef.current.value;

        console.log("EVALUAR")
        console.log(direccion)
        console.log("EVALUAR")

        const direccionError = document.getElementById("direccionError");
        const barrioError = document.getElementById("barrioError");
        const fechaIngresoError = document.getElementById("fechaIngresoError");

        let errorDir = "";
        let errorB = "";
        let errorF = "";

        /*DIRECCION*/
        if (direccion === "") {
            errorDir = "Ingrese una direccion";
            flag = true;
          } else if (direccion.length < 5) {
            errorDir = "Ingrese una direccion valida";
            flag = true;
        }

        /*BARRIO*/
        if (barrio === "") {
            errorB = "Ingrese un barrio";
            flag = true;
          } else if (barrio.length < 5) {
            errorB = "Ingrese un barrio valido";
            flag = true;
          }

        /*FECHA*/
        if (fecha === ""){
            errorF = "Ingrese una fecha";
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

            direccionRef.current.value = "";
            barrioRef.current.value = "";
            fechaIngresoRef.current.value = "";

            let servicioG = {
                "cedula": cedulaActual,
                "nombre": "Nilzon", //Traer de Base de datos
                "apellido": "Gomez", //Traer de Base de datos
                "departamento": departamento,
                "municipio": municipio,
                "direccion": direccion,
                "barrio": barrio,
                "estrato": estrato,
                "fecha": fecha
            }

            servicioG = JSON.stringify(servicioG)
            console.log(typeof servicioG)
            console.log(servicioG)
            //HACER POST A LA RUTA

        }

        
    }

    useEffect(()=>{
        
        if(registros.length > 0){

            let focusme = document.getElementById("focusCampo");
            focusme.scrollIntoView();

        }

    }, [registros])

    useEffect(()=>{
        
        console.log("USEFFECT")
        console.log(titulo)

        if(informacion === true){

            let focusme = document.getElementById("focusInformacion");
            console.warn(focusme)
            focusme.scrollIntoView();

            const direccionError = document.getElementById("direccionError");
            const barrioError = document.getElementById("barrioError");
    
            let errorDir = "";
            let errorB = "";
    
            direccionError.innerHTML = errorDir;
            barrioError.innerHTML = errorB;

        }

    }, [titulo, informacion])

    useEffect(() => {

        if(informacion === true){
            
            let focusme = document.getElementById("focusInformacion");
            focusme.scrollIntoView();

        } 

    }, [informacion])
    

    return (
        <React.Fragment>
            <NavbarAdmin />
            <div classNameName="container" style={{ color: "#424B5A;" }}>
                <Titulo
                titulo="GESTION DE SERVICIOS"
                subTitulo1="A continuación, podrás gestionar tanto de forma manual como masiva los servicios de clientes existentes."
                />
                <RegistroMasivo subtitulo="Adjunta el archivo .xlsx con la información básica de los servicios a actualizar." subtitulo2="Consulta masivamente todos los servicios históricos de un año." descarga={true}/>
                {/*GESTION INDIVIDUAL*/}
                <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                    <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Gestión individual</h2>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa la información básica del cliente responsable del servicio.<br /></p>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                            <form method="post" style={{width: "260px"}}>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p>
                                    <input onKeyDown={buscarCedula} className="form-control form-control-sm" type="text" id="Cedula" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                    <p id="errorCedula" name="errorCedula" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Lista de los servicio asociados al cliente buscado.<br /></p>
                                {registros.map((registro) =>
                                <div id="focusCampo" className="d-xl-flex justify-content-xl-center mb-3" style={{width: "55%",marginLeft: "22%"}}>
                                    <button className="btn btn-primary d-block w-100" onClick={buscarRegistro} value={registro} type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "12px"}}>{registro}</button>
                                </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                {/*GESTION INDIVIDUAL*/}
                {/*INFORMACION REGISTRO*/}
                {informacion && <div id="focusInformacion" className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                    <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                        <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>{titulo}</h2>
                        <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Información básica del cliente asociado al servicio número 1140123567-2.<br /></p>
                        <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        <form method="post" style={{width: "260px"}}>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cedula</p>
                                    <input className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" value={cedulaActual} style={{fontSize: "14px",marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Nombre</p>
                                    <input className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Apellido</p>
                                    <input className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "50%",marginLeft: "25%",fontSize: "14px"}}>
                                    <button className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}} data-bs-target="#modal-1" data-bs-toggle="modal">Ver facturación</button>
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Información básica del servicio asociado al cliente.<br /></p>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Departamento</p>
                                    <select ref={departamentoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}} required="" name="Departamento">
                                        <optgroup label="Departamento">
                                            <option value="12" selected="">Atlántico</option>
                                            <option value="13">Bolívar</option>
                                            <option value="14">Magdalena</option>
                                        </optgroup>
                                    </select>
                                    <p id="errorDepartamento" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Municipio</p>
                                    <select ref={municipioRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}} required="" name="Municipio">
                                        <optgroup label="Municipio">
                                            <option value="12" selected="">Barranquilla</option>
                                            <option value="13">Puerto Colombia</option>
                                            <option value="14">Soledad</option>
                                        </optgroup>
                                    </select>
                                    <p id="errorMunicipio" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Dirección</p>
                                    <input ref={direccionRef} className="form-control form-control-sm" type="text" id="direccion" name="Direccion" placeholder="Carrera 52 # 98 - 120" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                    <p id="direccionError" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Barrio</p>
                                    <input ref={barrioRef} className="form-control form-control-sm" type="text" id="barrio" name="Barrio" placeholder="Buenavista" style={{fontSize: "14px",marginBottom: "4px"}} required />
                                    <p id="barrioError" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Estrato</p>
                                    <select ref={estratoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}}required="" name="Estrato">
                                        <optgroup label="Estrato">
                                            <option value="1" selected="">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5" selected="">5</option>
                                        </optgroup>
                                    </select>
                                    <p id="errorEstrato" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Próxima de facturación</p>
                                    <input ref={fechaIngresoRef} className="form-control form-control-sm" id="fechaIngreso" name="Fecha" placeholder="Fecha inicio" style={{fontSize: "14px",marginBottom: "4px",color: "rgba(33,37,41,0.7)"}} type="date" required="" />
                                    <p id="fechaIngresoError" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                    <button onClick={actualizar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Actualizar</button>
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                    <button className="btn btn-primary d-block w-100" type="button" style={{background: "#F2F5F7",fontSize: "14px",borderColor: "#F2F5F7",color: "#505D68"}}>Suspender</button>
                                </div>
                            </form>
                        </div>          
                    </div>
                </div>}
                {/*INFORMACION REGISTRO*/}
                {/*MODULO FACTURAS*/}
                <div className="modal fade" role="dialog" tabindex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Facturación</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive" style={{fontSize: "14px"}}>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                {/*MODULO FACTURAS*/}   
            </div>
        </div>             
        </React.Fragment>
    );

}