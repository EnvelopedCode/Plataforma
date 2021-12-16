import React from 'react'
import { Link } from 'react-router-dom'


export default function NavbarAdmin() {
    
    return (      
        <React.Fragment>
                <nav className="navbar navbar-light navbar-expand-lg navigation-clean-button" style={{color: "#424B5A",background: "#F2F5F7",marginBottom: "36px"}}>
                    <div className="container"><a className="navbar-brand" style={{color: "#424B5A"}}>GASES DEL CARIBE</a>
                        <div>
                            <div className="collapse navbar-collapse" id="navcol-1">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item dropdown">
                                        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" style={{fontSize: "12PX"}}>SERVICIOS</a>
                                        <div className="dropdown-menu shadow-none" style={{fontSize: "12PX"}}>
                                            <Link to='/ServiciosRegistro' className="dropdown-item" style={{fontSize: "12PX"}}>Registro</Link>
                                            <Link to='/ServiciosGestion' className="dropdown-item" style={{fontSize: "12PX"}}>Gestión</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/Facturacion' className="nav-link" style={{fontSize: "12PX"}}>FACTURACIÓN</Link>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/GeneracionInspeccion' className="nav-link" style={{fontSize: "12PX"}}>INSPECCIÓN</Link>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/GestionMedidas' className="nav-link" style={{fontSize: "12PX"}}>MEDICIÓN</Link>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/RegistroAnomalias' className="nav-link" style={{fontSize: "12PX"}}>ANOMALÍAS</Link>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/Parametrizacion' className="nav-link" style={{fontSize: "12PX"}}>PARAMETRIZACIÓN</Link>
                                    </li>
                                    <li className="nav-item" style={{fontSize: "12PX"}}>
                                        <Link to='/UsuariosGestion' className="nav-link" style={{fontSize: "12PX"}}>USUARIOS</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" style={{fontSize: "12PX"}}>PERFIL</a>
                                        <div className="dropdown-menu shadow-none" style={{fontSize: "12PX"}}>
                                            <Link to='/PerfilGestion' className="dropdown-item" style={{fontSize: "12PX"}}>Administración</Link>
                                            <Link to='/Validacion' className="dropdown-item" style={{fontSize: "12PX"}}>Cerrar sesión</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button data-bs-target="#navcol-1" data-bs-toggle="collapse" className="navbar-toggler">
                            <span className="visually-hidden">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
        </React.Fragment>               
        
    )
}
