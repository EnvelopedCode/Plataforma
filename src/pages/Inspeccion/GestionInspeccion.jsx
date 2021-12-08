import React from "react";
import NavbarTecnico from "../../components/NavbarTecnico";
import Titulo from "../../components/Titulo";

export default function GestionInspeccion() {
    
    return (
        <React.Fragment>
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
                                        <tr className="text-nowrap">
                                            <td>1140123567-1</td>
                                            <td>1140123567</td>
                                            <td>Carlos Sierra</td>
                                            <td>Cra. 52 # 84-120</td>
                                            <td>4/12/2021</td>
                                        </tr>
                                        <tr className="text-nowrap">
                                            <td>1140123567-2</td>
                                            <td>1140123567</td>
                                            <td>Carlos Sierra</td>
                                            <td>Calle 110 # 58-45<br /></td>
                                            <td>5/12/2021<br /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}