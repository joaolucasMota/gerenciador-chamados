import './registro.css'
import Imagen from "../../assets/registro.svg"
import { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from "../../components/Footer"
import { AuthContext } from '../../contexts/auth'





export default function Registro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { registro, loadingAuth } = useContext(AuthContext);
  
    function handleSubmit(e){
      e.preventDefault();
      
      if(nome !== '' && email !== '' && password !== ''){
        registro(email, password, nome)
      }
  
    }
    return(
        <div>
            <header className="container">
                <div className="row" id="header">
                    <div id="logo-container">                      
                        <h1 className='display-1'>Gerenciador de chamados</h1>
                    </div>
                </div>
            </header>
            <main className="container col-11 col-md-9" id='form-container'>
                    <div className="row align-items-center gx-5">
                        <div className='col-md-6 order-md-1 text-center'>
                            <h2>Registre-se</h2>
                            <form onSubmit={handleSubmit} >
                            <div className='form-floating mb-3'>
                                    
                                    <input 
                                    type='text'
                                    className='form-control' 
                                    id='nome' 
                                    name='nome' 
                                    placeholder='Digite seu nome'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value) }
                                    />

                                    <label type='password' className='form-label'>Digite seu nome</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input 
                                    type='email' 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    placeholder='Digite seu email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value) }
                                    
                                    />
                                    <label type='email' className='form-label'>Digite seu email</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    
                                    <input 
                                    type='password'
                                    className='form-control' 
                                    id='password' 
                                    name='password' 
                                    placeholder='Digite sua senha'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value) }
                                    />

                                    <label type='password' className='form-label'>Digite sua senha</label>
                                </div>
                                <input className='btn btn-dark' type='submit' value='Cadastrar' id='btn-register'/>
                            </form>
                            <div className='col-12' id='link-container'>
                                <Link to="/">Já possui cadastro? clique aqui</Link>
                            </div>
                        </div>
                        <div className='col-md-6 order-md-2'>
                            <div className='col-12'>
                                <img src={Imagen} className='img-fluid' alt='imagem de login' id='logo-login'/>
                            </div>
                        </div>
                    </div>
            </main>
            <Footer/>
        </div>

    
    )
}