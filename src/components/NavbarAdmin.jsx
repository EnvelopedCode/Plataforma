import React from 'react'

export default function NavbarAdmin() {
    
    return (
        <React.Fragment>
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean-button" style={{color: "#424B5A",background: "#F2F5F7"}}>
                <div className="container">
                    <a className="navbar-brand" href="#" style={{color: "#424B5A"}}>GASES DEL CARIBE</a>
                    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style={{fontSize: "12PX"}}>SERVICIOS</a>
                                <div className="dropdown-menu shadow-none" style={{fontSize: "12PX"}}>
                                    <a className="dropdown-item" href="#" style={{fontSize: "12PX"}}>Registro</a><a className="dropdown-item" href="#" style={{fontSize: "12PX"}}>Gestión</a>
                                </div>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>FACTURACIÓN</a>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>INSPECCIÓN</a>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>MEDICIÓN</a>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>ANOMALÍAS</a>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>PARAMETRIZACIÓN</a>
                            </li>
                            <li className="nav-item" style={{fontSize: "12PX"}}>
                                <a className="nav-link" href="#" style={{fontSize: "12PX"}}>USUARIOS</a>
                            </li>
                        </ul>
                        <span className="navbar-text actions">
                            <div className="btn-group dropdown">
                                <button className="btn btn-primary" type="button" style={{fontSize: "12px",background: "transparent",fontWeight: "bold",color: "#424B5A",borderWidth: "1.2px",borderColor: "#424B5A",borderTopLeftRadius: "8px",borderBottomLeftRadius: "8px"}}>Perfil</button>
                                <button className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" type="button" style={{background: "transparent",borderColor: "#424B5A",color: "#424B5A"}}></button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#" style={{fontSize: "12PX"}}>Cerrar sesión</a>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        </React.Fragment>               
        
    )
}
