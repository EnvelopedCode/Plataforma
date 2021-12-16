import React from "react";
import NavbarTecnico from "../../components/NavbarTecnico";
import Titulo from "../../components/Titulo";
import tareas from "../../mocks/Inspeccion/tareas";
import { useState } from "react";
import { authTecnico } from "../../auth/authTecnico";

export default function GestionInspeccion() {

    const inspecciones = []

    for(let indice in tareas){

        let inspeccion = []
        inspeccion.push(tareas[indice].servicio)
        inspeccion.push(tareas[indice].cedula)
        inspeccion.push(tareas[indice].nombre)
        inspeccion.push(tareas[indice].direccion)
        inspeccion.push(tareas[indice].fecha)

        inspecciones.push(inspeccion);
      }
    
    const [inspeccionesTabla, setInspeccionesTabla] = useState(inspecciones)
    
    return (
        <React.Fragment>
            {authTecnico() ?
            <div>
                <NavbarTecnico />
                <div className="container" style={{ color: "#424B5A;" }}>
                    <Titulo
                    titulo="GESTIÓN INSPECCIÓN"
                    subTitulo1="A continuación, podrás consultar; las órdenes de servicio de inspección asignadas."
                    // subTitulo2="como masiva los nuevos servicios de clientes"
                    />
                    <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-lg-center justify-content-xl-center"
                        style={{marginBottom: "36px"}}>
                        <div
                            style={{background: "#FFFFFF",width: "700px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                            <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>
                                Inspecciones asignadas</h2>
                            <div className="d-xl-flex justify-content-xl-center" style={{marginTop: "16px"}}>
                                <div className="table-responsive table-wrapper-scroll-y"
                                    style={{maxHeight: "800px",marginBottom: "12px",width: "600px"}}>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Servicio</th>
                                                <th>Cédula</th>
                                                <th>Nombre</th>
                                                <th>Dirección</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inspeccionesTabla.map((inspeccion) =>
                                            <tr className="text-nowrap">
                                                <td>{inspeccion[0]}</td> {/*servicio*/}
                                                <td>{inspeccion[1]}</td> {/*cedula*/}
                                                <td>{inspeccion[2]}</td> {/*nombre*/}
                                                <td>{inspeccion[3]}</td> {/*direccion*/}
                                                <td>{inspeccion[4]}</td> {/*fecha*/}
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            window.location.href="/Validacion"
            }
        </React.Fragment>
    )
}