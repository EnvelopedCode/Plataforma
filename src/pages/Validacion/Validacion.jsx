import React, { Fragment } from 'react'

export default function Validacion() {
    return (
        <Fragment>
            <div class="row" style={{marginTop: "120px"}}>
                <div class="col">
                    <div
                        class="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
                        <div
                            style={{background: "#FFFFFF",width: "386px",borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                            <h2 class="d-xl-flex justify-content-xl-center align-items-xl-center"
                                style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>
                                Validación de usuario</h2>
                            <p class="d-xl-flex justify-content-xl-center align-items-xl-center"
                                style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "24px",paddingRight: "32px",paddingLeft: "32px",borderColor: "#A1AEB7"}}>
                                BIenvenido al portal de usuarios. Para acceder, ingresa tu número de cédula para validar tu
                                perfil.<br /></p>
                            <div class="d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{marginTop: "24px",marginBottom: "24px"}}>
                                <form method="post" style={{width: "260px"}}>
                                    <div class="mb-3" style={{fontSize: "12px"}}>
                                        <p style={{color: "#A1AEB7",marginBottom: "0px",paddingBottom: "4px"}}>Cédula</p><input
                                            class="form-control form-control-sm" type="text" name="Cedula"
                                            placeholder="Cédula" style={{fontSize: "14px",marginBottom: "4px"}} required="" />
                                        <p id="errorCedula-1" style={{color: 'var(--bs-red)'}}>Error</p>
                                    </div>
                                    <div class="d-xl-flex justify-content-xl-center mb-3"
                                        style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}><button
                                            class="btn btn-primary d-block w-100" type="button"
                                            style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "14px"}}>Validar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
