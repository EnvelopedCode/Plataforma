import React from 'react'
import Titulo from '../../components/Titulo'
import RegistroMasivo from '../../components/RegistroMasivo';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import NavbarAnalista from "../../components/NavbarAnalista";

export default function ServiciosGestion() {

    const [formularioListado, setFormularioListado] = useState([])
    const [date, setDate] = useState("01-01-1999")
    const [minimo, setMinimo] = useState("01-01-1999")
    const [maximo, setMaximo] = useState("01-01-2999")

    const [formulario, setFormulario] = useState([]) //Datos del formulario
    const [registros, setRegistros] = useState([]) //Servicios asociados a la cedula
    const [informacion, setInformacion] = useState(false) //Despliegue del formulario
    const [titulo, setTitulo] = useState("") //Titulo del formulario
    const [cedula, setCedula] = useState("") //Cedula a buscar

    //PLACEHOLDER FECHA
    var _onFocus = (e) => {
        console.log("DETECTO FOCUS")
        e.currentTarget.type = "date";
        }
    var _onBlur = (e) => {
        console.log("DETECTO BLUR")
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = date;
    }
    

    var host = "http://localhost:8080";

    const departamentoRef = useRef("");
    const municipioRef = useRef("");
    const direccionRef = useRef("");
    const barrioRef = useRef("");
    const estratoRef = useRef("");
    const fechaIngresoRef = useRef("");

    const depOptions = [{name: 'Atlantico'}, {name: 'Bolivar'}, {name: 'Magdalena'}]; //Set de opciones
    const [depOption, setDepOption] = useState("") //Opcion por default
    const depOptionHandle = (event) => {
        setDepOption(event.target.value)
    }

    const munOptions = [{name: 'Barranquilla'}, {name: 'Soledad'}, {name: 'Puerto Colombia'}];
    const [munOption, setMunOption] = useState("")
    const munOptionHandle = (event) => {
        console.warn("ENTRO A MUNOPTION HANDLE")
        setMunOption(event.target.value)
    }

    const estOptions = [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}];
    const [estOption, setEstOption] = useState("")
    const estOptionHandle = (event) => {
        console.warn("ENTRO A MUNOPTION HANDLE")
        setEstOption(event.target.value)
    }

    {/*PROVICIONAL*/}

    const buscarCedula = (event) => { //Valida la cedula y realiza la busqueda de servicios asociados
        setFormulario([])
        setRegistros([])
        setInformacion(false)
        setTitulo("")

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

            if(flag === false){ //Cedula consultada correctamente

                console.log("FLAG === FALSE")

                errorC = "";
                cedulaError.innerHTML = errorC;

                let cedula = {
                    "cedula": ced
                }

                fetch(`${host}/gestionCedula`, { 
                    headers: { "content-type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(cedula)
                  })
                    .then((data) => data.json()) // Obtener los datos
                    .then((data) => {
                        if(data.cedula){
                            setCedula(data.cedula);
                            setInformacion(false);
                            //Hacer fetch con la cedula encontrada a la base de datos de servicios

                            fetch(`${host}/gestionServicio`, {
                                headers: { "content-type": "application/json" },
                                method: "POST",
                                body: JSON.stringify(cedula)
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    if(data.servicios){ //Servicios encontrados

                                        console.warn(data.servicios) //Arreglo de JSOns
                                        var servicios = data.servicios
                                        console.warn(servicios)
                                        let serviciosFormateados = []
                                        let IDs = []


                                        //Parseo de servicios
                                        for(let indice in servicios){ //Sacamos unicamente los valores de cada llave de los servicios

                                            let servicio = []

                                            servicio.push(servicios[indice].servicio)
                                            servicio.push(servicios[indice].cedula)
                                            servicio.push(servicios[indice].nombre)
                                            servicio.push(servicios[indice].apellido)
                                            servicio.push(servicios[indice].departamento)
                                            servicio.push(servicios[indice].municipio)
                                            servicio.push(servicios[indice].direccion)
                                            servicio.push(servicios[indice].barrio)
                                            servicio.push(servicios[indice].estrato)
                                            servicio.push(servicios[indice].fecha)
                                            serviciosFormateados.push(servicio);
                                        }

                                        setFormularioListado(serviciosFormateados);
                                        //Parseo de servicios

                                        // setMinimo("")
                                        // setMaximo("")
                                
                                        for(let s in serviciosFormateados){
                                            IDs.push(serviciosFormateados[s][0])
                                        }

                                        setRegistros(IDs)

                                    } else {
                                        alert(data.msg)
                                    }

                                })
                                .catch((error) => {
                                    alert(error)
                                })

                        } else{
                            setRegistros([])
                            setInformacion(false)
                            errorC = data.msg
                            cedulaError.innerHTML = errorC;
                        }       
                        
                    })
          

            } else { //Hubieron errores al ingresar la cedula

                cedulaError.innerHTML = errorC;
                setRegistros([]);
            }
            
        }
    }
    
    const buscarRegistro = (event) => { //Despliega la informacion individual de un servicio al clickearlo
        console.log("Entro a buscarRegistro")
        event.preventDefault();
        setTitulo(event.target.value);
        setInformacion(true);

        for(let dato in formularioListado){

            if(formularioListado[dato][0] === event.target.value){

                if(titulo === event.target.value){

                    console.warn("EVALUAAAAAAAAR")

                    console.log(minimo)
                    console.log(maximo)
                    console.warn(date)
            
                    const newDate = new Date(date)
                    newDate.setMonth(newDate.getMonth() - 1);
                    newDate.setDate(newDate.getDate()+2);
            
                    const Min = newDate
                    let dia = Min.getDate()
                    if(dia < 10){
                        dia = "0" + dia
                    }
                    let mes = Min.getMonth()+1
                    if(mes < 10){
                        mes = "0" + mes
                    }
                    let year = Min.getFullYear()
            
                    let fechaMinima = year + "-" + mes + "-" + dia
            
                    ////////////////////////////////////////
            
                    const newDate2 = new Date(date)
                    newDate2.setMonth(newDate2.getMonth() + 1);
                    newDate2.setDate(newDate2.getDate())
            
                    const Max = newDate2
                    let dia2 = Max.getDate()
                    if(dia2 < 10){
                        dia2 = "0" + dia2
                    }
                    let mes2 = Max.getMonth()+1
                    
                    if(mes2 < 10){
                        mes2 = "0" + mes2
            
                    }
                    let year2 = Max.getFullYear()
            
                    let fechaMaxima = year2 + "-" + mes2 + "-" + dia2
                    console.log(fechaMinima)
                    console.log(fechaMaxima)
                    
                    //Mandar Min a estado
                    setMinimo(fechaMinima)
                    // setMaximo(fechaMaxima)
                    setMaximo(fechaMaxima)

                } else {

                    setFormulario(formularioListado[dato])
                    setDate(formularioListado[dato][9])
                    setDepOption(formularioListado[dato][4])
                    setMunOption(formularioListado[dato][5])
                    setEstOption(formularioListado[dato][8])
                    setMinimo("")
                    setMaximo("")

                }
            }
        }      

    }
    
    const actualizar = () => { //Valida la actualizacion de la informacion de un servicio

        let flag = false;

        let departamento = departamentoRef.current.value;
        let municipio = municipioRef.current.value;
        let direccion = direccionRef.current.value;
        let barrio = barrioRef.current.value;
        let estrato = estratoRef.current.value;
        let fecha = fechaIngresoRef.current.value;

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
                "cedula": cedula,
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
            console.log(servicioG)
            setInformacion(false)
            //HACER POST A LA RUTA

        }

        
    }

    useEffect(()=>{

    }, [estOption]);

    useEffect(()=>{
        
        if(registros.length > 0){

            let focusme = document.getElementById("focusCampo");
            focusme.scrollIntoView();

        }

    }, [registros])

    useEffect(()=>{

        if(informacion === true){

            let focusme = document.getElementById("focusInformacion");
            focusme.scrollIntoView();

            const direccionError = document.getElementById("direccionError");
            const barrioError = document.getElementById("barrioError");
    
            let errorDir = "";
            let errorB = "";
    
            direccionError.innerHTML = errorDir;
            barrioError.innerHTML = errorB;

        }

        console.warn("EVALUAAAAAAAAR")

        console.log(minimo)
        console.log(maximo)
        console.warn(date)

        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() - 1);
        newDate.setDate(newDate.getDate()+2);

        const Min = newDate
        let dia = Min.getDate()
        if(dia < 10){
            dia = "0" + dia
        }
        let mes = Min.getMonth()+1
        if(mes < 10){
            mes = "0" + mes
        }
        let year = Min.getFullYear()

        let fechaMinima = year + "-" + mes + "-" + dia

        ////////////////////////////////////////

        const newDate2 = new Date(date)
        newDate2.setMonth(newDate2.getMonth() + 1);
        newDate2.setDate(newDate2.getDate())

        const Max = newDate2
        let dia2 = Max.getDate()
        if(dia2 < 10){
            dia2 = "0" + dia2
        }
        let mes2 = Max.getMonth()+1
        
        if(mes2 < 10){
            mes2 = "0" + mes2

        }
        let year2 = Max.getFullYear()

        let fechaMaxima = year2 + "-" + mes2 + "-" + dia2
        console.log(fechaMinima)
        console.log(fechaMaxima)
        
        //Mandar Min a estado
        setMinimo(fechaMinima)
        // setMaximo(fechaMaxima)
        setMaximo(fechaMaxima)


    }, [titulo, informacion])

    useEffect(() => {

        if(informacion === true){
            
            let focusme = document.getElementById("focusInformacion");
            focusme.scrollIntoView();

        } 

    }, [informacion])

    useEffect(() => {
        console.log("Dummy")

    }, [cedula])

    useEffect(() => {
        console.warn("USEFFECT EN FORMULARIO")
        setDepOption(formulario[4])
        console.log(formulario[4])

        //////////////////////////////////

        console.warn("EVALUAAAAAAAAR")

        console.log(minimo)
        console.log(maximo)
        console.warn(date)

        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() - 1);
        newDate.setDate(newDate.getDate()+2);

        const Min = newDate
        let dia = Min.getDate()
        if(dia < 10){
            dia = "0" + dia
        }
        let mes = Min.getMonth()+1
        if(mes < 10){
            mes = "0" + mes
        }
        let year = Min.getFullYear()

        let fechaMinima = year + "-" + mes + "-" + dia

        ////////////////////////////////////////

        const newDate2 = new Date(date)
        newDate2.setMonth(newDate2.getMonth() + 1);
        newDate2.setDate(newDate2.getDate())

        const Max = newDate2
        let dia2 = Max.getDate()
        if(dia2 < 10){
            dia2 = "0" + dia2
        }
        let mes2 = Max.getMonth()+1
        
        if(mes2 < 10){
            mes2 = "0" + mes2

        }
        let year2 = Max.getFullYear()

        let fechaMaxima = year2 + "-" + mes2 + "-" + dia2
        console.log(fechaMinima)
        console.log(fechaMaxima)
        
        //Mandar Min a estado
        setMinimo(fechaMinima)
        // setMaximo(fechaMaxima)
        setMaximo(fechaMaxima)
        
    }, [formulario])
    
    useEffect(() => {
        console.warn("USEFFECT EN DEPOPTION")
        console.log(depOption)
    }, [depOption])

    return (
        <React.Fragment>
            <NavbarAnalista />
            <div className="container" style={{ color: "#424B5A;" }}>
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
                                    <input className="form-control form-control-sm" type="text" name="Cedula" placeholder={formulario[1]} style={{fontSize: "14px",marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Nombre</p>
                                    <input className="form-control form-control-sm" type="text" name="Nombre" placeholder={formulario[2]} style={{marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Apellido</p>
                                    <input className="form-control form-control-sm" type="text" name="Apellido" placeholder={formulario[3]} style={{marginBottom: "4px"}} readonly="" />
                                </div>
                                <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "50%",marginLeft: "25%",fontSize: "14px"}}>
                                    <button className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}} data-bs-target="#modal-1" data-bs-toggle="modal">Ver facturación</button>
                                </div>
                                <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Información básica del servicio asociado al cliente.<br /></p>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Departamento</p>
                                    <select defaultValue={depOption} value={depOption} onChange={depOptionHandle} ref={departamentoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}} required="" name="Departamento">
                                        <optgroup label="Departamento">
                                        {depOptions.map((valor, index) =>
                                        <option key={index} value={depOptions[index].name}>{depOptions[index].name}</option>
                                        )}
                                        </optgroup>
                                    </select>
                                    <p id="errorDepartamento" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Municipio</p>
                                    <select defaultValue={munOption} value={munOption} onChange={munOptionHandle} ref={municipioRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}} required="" name="Municipio">
                                        <optgroup label="Municipio">
                                        {munOptions.map((valor, index) =>
                                            <option key={index} value={munOptions[index].name}>{munOptions[index].name}</option>
                                        )}
                                        </optgroup>
                                    </select>
                                    <p id="errorMunicipio" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Dirección</p>
                                    <input ref={direccionRef} className="form-control form-control-sm" type="text" id="direccion" name="Direccion" placeholder={formulario[6]} style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                    <p id="direccionError" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Barrio</p>
                                    <input ref={barrioRef} className="form-control form-control-sm" type="text" id="barrio" name="Barrio" placeholder={formulario[7]} style={{fontSize: "14px",marginBottom: "4px"}} required />
                                    <p id="barrioError" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Estrato</p>
                                    <select defaultValue={estOption} value={estOption} onChange={estOptionHandle} ref={estratoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: "rgba(33,37,41,0.7)",marginBottom: "4px"}}required="" name="Estrato">
                                        <optgroup label="Estrato">
                                        {estOptions.map((valor, index) =>
                                            <option key={index} value={estOptions[index].name}>{estOptions[index].name}</option>
                                        )}
                                        </optgroup>
                                    </select>
                                    <p id="errorEstrato" value="" style={{color: "var(--bs-red)"}}></p>
                                </div>
                                <div className="mb-3" style={{fontSize: "12px"}}>
                                    <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Próxima de facturación</p>
                                    <input id="datePicker" min={minimo} max={maximo} placeholder={date} onFocus={_onFocus} onBlur={_onBlur} ref={fechaIngresoRef} className="form-control form-control-sm" name="Fecha" style={{fontSize: "14px",marginBottom: "4px",color: "rgba(33,37,41,0.7)"}} type="text" required="" />
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