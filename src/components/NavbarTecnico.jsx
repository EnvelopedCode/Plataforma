import React from 'react'

export default function NavbarTecnico() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean-button"
                style={{color: "#424B5A",background: "#F2F5F7",marginBottom: "36px"}}>
                <div className="container">
                    <a className="navbar-brand" href="#" style={{color: "#424B5A"}}>GASES DEL CARIBE</a>
                    <div>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item" style={{fontSize: "12PX"}}>
                                    <a className="nav-link" href="#" style={{fontSize: "12PX"}}>INSPECCIÓN</a>
                                </li>
                                <li className="nav-item" style={{fontSize: "12PX"}}><a className="nav-link" href="#"
                                        style={{fontSize: "12PX"}}>MEDICIÓN</a></li>
                                <li className="nav-item" style={{fontSize: "12PX"}}><a className="nav-link" href="#"
                                        style={{fontSize: "12PX"}}>ANOMALÍAS</a></li>
                                <li className="nav-item dropdown"><a className="dropdown-toggle nav-link" aria-expanded="false"
                                        data-bs-toggle="dropdown" href="#" style={{fontSize: "12PX"}}>PERFIL</a>
                                    <div className="dropdown-menu shadow-none" style={{fontSize: "12PX"}}><a className="dropdown-item"
                                            href="#" style={{fontSize: "12PX"}}>Administración</a><a className="dropdown-item"
                                            href="#" style={{fontSize: "12PX"}}>Cerrar sesión</a></div>
                                </li>
                            </ul>
                        </div>
                    </div><button data-bs-target="#navcol-1" data-bs-toggle="collapse" className="navbar-toggler"><span
                            className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                </div>
            </nav>
        </React.Fragment>
    )
}

