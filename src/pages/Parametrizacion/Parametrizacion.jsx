import React from 'react'
import Titulo from "../../components/Titulo";
import { useRef } from 'react';
import NavbarAnalista from '../../components/NavbarAnalista';

export default function Parametrizacion() {

    let flag = false;
    var host = "http://localhost:8080";

    const valorUnidadRef = useRef("");
    const impuestoRef = useRef("");
    const subsidioRef = useRef("");
    const estratoRef = useRef("");

    const actualizar = () => {

        flag = false;

        let estrato = estratoRef.current.value;
        let valorUnidad = valorUnidadRef.current.value;
        let impuesto = impuestoRef.current.value;
        let subsidio = subsidioRef.current.value;
        
        const errorValor = document.getElementById("errorValor");
        const errorImpuesto = document.getElementById("errorImpuesto");
        const errorSubsidio = document.getElementById("errorSubsidio");

        let errorV = "";
        let errorI= "";
        let errorS = "";

        //VALOR UNIDAD
        if (valorUnidad === "") {
            console.log("valor unidad medidad está vacio");
            errorV = "Ingrese un valor";
            flag = true;
        } else if (isNaN(valorUnidad)) {
            errorV = "Ingrese un valor de unidad valido";
            flag = true;
        }

        //IMPUESTO
        if (impuesto === "") {
            console.log("valor impuesto está vacio");
            errorI = "Ingrese un valor";
            flag = true;
        } else if (isNaN(impuesto)) {
            errorI = "Ingrese un valor de impuesto valido";
            flag = true;
        }

        //SUBSIDIO
        if (subsidio === "") {
            console.log("valor subsidio está vacio");
            errorS = "Ingrese un valor";
            flag = true;
        } else if (isNaN(subsidio)) {
            errorS = "Ingrese un valor de subsidio valido";
            flag = true;
        }

        if (flag === true) {
            console.warn("FLAG === TRUE");
            errorValor.innerHTML = errorV;
            errorImpuesto.innerHTML = errorI;
            errorSubsidio.innerHTML = errorS;
        }else if(flag === false){
            console.warn("FLAG === FALSE");
            errorV = "";
            errorI = "";
            errorS = "";
            errorValor.innerHTML = errorV;
            errorImpuesto.innerHTML = errorI;
            errorSubsidio.innerHTML = errorS;

            valorUnidadRef.current.value = "";
            impuestoRef.current.value = "";
            subsidioRef.current.value = "";

            let estratoP = {
                "estrato": estrato,
                "valorUnidad": valorUnidad,
                "impuesto": impuesto,
                "subsidio": subsidio
            }

            //HACER POST A LA RUTA
            console.log(estratoP)
            fetch(`${host}/parametrizacion`,{
                headers: { "content-type":"application/json" },
                method: "POST",
                body: JSON.stringify(estratoP)
            })
            .then((data)=> data.json())
            .then((data) =>{
                if(data.estado === "ok"){
                    alert(data.msg)
                } else if(data.estado==="error"){
                    alert(data.msg)

                }
            })
            .catch((error)=>{
                console.log("error del servidor")
                console.log(error)
                alert(error)
            })
        }

    }


    return (
      <React.Fragment>
        <NavbarAnalista />
        <div classNameNameName="container" style={{ color: "#424B5A;" }}>
          <Titulo
            titulo="PARAMETRIZACIÓN"
            subTitulo1="A continuación, podrás registrar tanto de forma manual como masiva las mediciones de los servicios."
          />

            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBotton: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBotton: "12px",marginTop: "32px"}}>Estratos</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBotton: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Ingresa los valores de configuración de los estratos socioeconómicos.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBotton: "24px"}}>
                        <form method="post" style={{width: "260px"}}>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBotton: "0px",paddingBottom: "4px"}}>Estrato</p>
                                <select ref={estratoRef} className="form-select form-select-sm" style={{fontSize: "14px",color: 'rgba(33,37,41,0.7)',marginBotton: "4px"}} required="" name="Estrato">
                                    <optgroup label="Estrato">
                                        <option value="1" selected="">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </optgroup>
                                </select>
                                <p id="errorEstrato" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: '12px'}}>
                                <p style={{color: "#A1AEB7",marginBotton: "0px",paddingBottom: "4px"}}>Valor por unidad de medida en COP</p>
                                <input ref={valorUnidadRef}  className="form-control form-control-sm" type="text" name="Valor" placeholder="500" style={{fontSize: "14px",marginBotton: "4px"}} required="" />
                                <p id="errorValor" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Impuesto en %</p>
                                <input  ref={impuestoRef} className="form-control form-control-sm"  type="text" name="Impuesto" placeholder="10" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                <p id="errorImpuesto" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBotton: "0px",paddingBottom: "4px"}}>Subsidios en %</p>
                                <input ref={subsidioRef} className="form-control form-control-sm" type="text" name="Subsidio" placeholder="15" style={{fontSize: "14px",marginBotton: "4px"}} required="" />
                                <p id="errorSubsidio" value="" style={{color: 'var(--bs-red)'}}></p>
                            </div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                <button onClick={actualizar} className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>          
        </div>
      </React.Fragment>
    );
}
