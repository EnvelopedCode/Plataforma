import React from 'react'
import NavbarTecnico from '../../components/NavbarUsuario';
import Titulo from '../../components/Titulo';
import { useState } from 'react';

export default function GestionFacturacion() {

    const [getFacturas, setGetFacturas] = useState([ //Este estado representa los registros del usuario en cuanto se carga la pagina (se manda un GET)
        ["1000403193-1"],
        ["1000403193-2"],
        ["1000403193-3"]
    ])

    const [formulario, setFormulario] = useState(false)

    const buscarRegistro = (event) => {
        event.preventDefault();
        console.log("CLICK")
        setFormulario(true);
    }

    //POR HACER: Imprimir titulo en la generacion de la informacion

    return (
      <React.Fragment>
        <div className="container" style={{ color: "#424B5A;" }}>
          <NavbarTecnico />
          <Titulo
            titulo="FACTURACION"
            subTitulo1="A continuación, podrás gestionar tanto de forma manual como masiva los servicios de clientes existentes."
          />
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Jorge Pérez</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Listado de servicios asociados a tu cédula.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        <form method="post" style={{width: "260px"}}>
                            {getFacturas.map((factura) =>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "55%",marginLeft: "22%"}}>
                                <button className="btn btn-primary d-block w-100" onClick={buscarRegistro} value={factura} type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "12px"}}>{factura}</button>
                            </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {formulario &&
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>1140123456-2</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>Información básica del cliente asociado al servicio número 1140123567-2.<br /></p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        <form method="post" style={{width: "260px"}}>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p><input className="form-control form-control-sm" type="text" name="Cedula" placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} readonly=""/>
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Nombre</p><input className="form-control form-control-sm" type="text" name="Nombre" placeholder="Nombre" style={{marginBottom: "4px"}} readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Apellido</p><input className="form-control form-control-sm" type="text" name="Apellido" placeholder="Apellido" style={{marginBottom: "4px"}} readonly="" />
                            </div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "50%",marginLeft: "25%",fontSize: "14px"}}><button className="btn btn-primary d-block w-100" type="button" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}} data-bs-target="#modal-1" data-bs-toggle="modal">Ver facturación</button></div>
                            <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>Información básica del servicio asociado al cliente.<br /></p>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Departamento</p><input className="form-control form-control-sm" type="text" name="Departamento" placeholder="Atlántico" style={{fontSize: "14px",marginBottom: "4px"}} required="" readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Municipio</p><input className="form-control form-control-sm" type="text" name="Municipio" placeholder="Barranquilla" style={{fontSize: "14px",marginBottom: "4px"}} required="" readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Dirección</p><input className="form-control form-control-sm" type="text" name="Direccion" placeholder="Carrera 52 # 98 - 120" style={{fontSize: "14px",marginBottom: "4px"}} required="" readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Barrio</p><input className="form-control form-control-sm" type="text" name="Barrio" placeholder="Buenavista" style={{fontSize: "14px",marginBottom: "4px"}} required="" readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Estrato</p><input className="form-control form-control-sm" type="text" name="Estrato" placeholder="5" style={{fontSize: "14px",marginBottom: "4px"}} required="" readonly="" />
                            </div>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Próxima de facturación</p><input className="form-control form-control-sm" name="Fecha" placeholder="Fecha inicio" style={{fontSize: "14px",marginBottom: "4px",color: 'rgba(33,37,41,0.7)'}} type="date" required="" readonly="" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
            <div className="modal fade" role="dialog" tabindex="-1" id="modal-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Facturación</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                        <tr>
                                            <td>23/10/2021</td>
                                            <td>170</td>
                                            <td>400</td>
                                            <td>$40.000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </React.Fragment>
    );
}
