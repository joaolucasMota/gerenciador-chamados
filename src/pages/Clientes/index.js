import './clientes.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useState } from 'react'

export default function Clientes(){

    const [nomeFantasia, setNomeFantasia] = useState();
    const [cnpj, setCnpj] = useState();
    const [endereco, setEndereco] = useState();


    function handleCadastro(){
        
    }


    return(
        <div>
            <Header/>

            <div>
                <Title name='Clientes'>
                <i className="bi bi-people-fill"></i>
                </Title>
            </div>
            <div className='content'>
                <div className='container-fluid container-perfil'>
                    <form className='form-profile' onSubmit={handleCadastro}>
                        <label class="h3 mb-4 label-clientes">Preencha os campos a baixo para cadastrar novo cliente</label>
                        <input 
                        type="email" 
                        class="form-control input-clientes" 
                        aria-describedby="emailHelp" 
                        placeholder="Insira o e-mail"
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value) }
                        />
                        <br/>
                        <input 
                        type="password" 
                        class="form-control input-clientes" 
                        placeholder="Insira o CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value) }
                        />
                        <br/>
                        <input 
                        type="password" 
                        class="form-control input-clientes" 
                        placeholder="Insira o endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value) }
                        />
                        <div id="emailHelp" class="form-text">Não compartilhamos os seus dados.</div>
                        <input className='btn btn-dark mt-4' type='submit' value='Cadastrar'/>
                    </form>
                </div>
            </div>

        </div>
    )
}