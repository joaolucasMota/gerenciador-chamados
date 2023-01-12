import './clientes.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useState, useContext } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth';

export default function Clientes(){

    const {user} = useContext(AuthContext);

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');


    async function handleCadastro(e){
        e.preventDefault();

        
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
        await addDoc(collection(db,"clientes"),{
            nomeFantasia: nomeFantasia,
            cnpj: cnpj,
            endereco: endereco,
            userUid: user.uid
        })
        .then(()=>{
            setNomeFantasia('');
            setEndereco('');
            setCnpj('');
            toast.success('Cadastrado com sucesso.')
        })
        .catch((erro)=>{
            console.log(erro)
            toast.error('Erro ao cadastrar')
        })
        } else{
            toast.warn('Preencha todos os campos.')
        }   
    }


    return(
        <div>
            <Header/>
                <Title name='Clientes'>
                <i className="bi bi-people-fill"></i>
                </Title>
            <div className='content'>
                <div className='container-fluid container-perfil shadow-lg'>
                    <form className='form-profile' onSubmit={handleCadastro}>
                        <label className="h3 mb-4 label-clientes">Preencha os campos a baixo para cadastrar novo cliente</label>
                        <input 
                        type="text" 
                        className="form-control input-clientes" 
                        placeholder="Insira o nome fantasia"
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value) }
                        />
                        <br/>
                        <input 
                        type="text" 
                        className="form-control input-clientes" 
                        placeholder="Insira o CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value) }
                        />
                        <br/>
                        <input 
                        type="text" 
                        className="form-control input-clientes" 
                        placeholder="Insira o endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value) }
                        />
                        <label className="form-text">Não compartilhamos os seus dados.</label>
                        <input className='btn btn-dark mt-4' type='submit' value='Cadastrar'/>
                    </form>
                </div>
            </div>

        </div>
    )
}