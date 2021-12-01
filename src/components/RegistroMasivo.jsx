import React from 'react'

export default function RegistroMasivo({mensaje}) {
    return (
        <React.Fragment>
            <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center" style={{marginBottom: "36px"}}>
                <div style={{background: "#FFFFFF",width: "386px", borderTopLeftRadius: "8px",borderTopRightRadius: "8px",borderBottomRightRadius: "8px",borderBottomLeftRadius: "8px"}}>
                    <h2 className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{fontSize: "20px",textAlign: "center",fontWeight: "bold",marginBottom: "12px",marginTop: "32px"}}>Registro masivo</h2>
                    <p className="d-xl-flex justify-content-xl-center align-items-xl-center" style={{textAlign: "center",fontSize: "12px",color: "#A1AEB7",marginBottom: "0px",paddingRight: "32px",paddingLeft: "32px"}}>{mensaje}</p>
                    <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center" style={{marginTop: "24px",marginBottom: "24px"}}>
                        <form method="post" style={{width: "260px"}}>
                            <div className="mb-3" style={{fontSize: "12px"}}>
                                <input className="form-control form-control-sm" type="file" name="email" placeholder="Email" style={{fontSize: "12px"}}/>
                            </div>
                            <div className="d-xl-flex justify-content-xl-center mb-3" style={{width: "40%",marginLeft: "30%",fontSize: "14px"}}>
                                <button className="btn btn-primary d-block w-100" type="submit" style={{background: "#424B5A",borderColor: "#424B5A",fontSize: "12px"}}>Cargar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
