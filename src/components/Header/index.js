import "./header.css"
import avatar from '../../assets/avatar.svg'
import { useContext } from "react"
import { AuthContext } from '../../contexts/auth'
import { Link } from "react-router-dom"

export default function Header(){
    

    const {user} = useContext(AuthContext);


    return(
        <div>
        
        <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid align-items-center justify-content-center">
                        <button className="navbar-toggler no-border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} id='header-foto'/>
                            <ul className="navbar-nav">
                                <Link to='/dashboard'>
                                    <li className="nav-item">
                                        <span className="nav-link text-dark" aria-current="page"><i className="bi bi-house-fill"></i> Chamados</span>
                                    </li>
                                </Link>
                                <Link to='/clientes'>
                                    <li className="nav-item">
                                        <span className="nav-link text-dark" aria-current="page"><i className="bi bi-people-fill"></i> Clientes</span>
                                    </li>
                                </Link>
                                <Link to='/setup'>
                                    <li className="nav-item">
                                        <span className="nav-link text-dark" aria-current="page"><i className="bi bi-gear-fill"></i> Configurações</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                </div>
            </nav>

        </div>
    )
}