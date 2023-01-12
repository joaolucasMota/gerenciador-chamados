import "./new.css";
import Title from "../../components/Title";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { collection, onSnapshot, addDoc, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';


export default function New(){

    const{id} = useParams();
    const {navigate} = useNavigate();

    const{user}=useContext(AuthContext);

    const[loadCliente, setLoadCliente] = useState(true);
    const[cliente, setCliente] = useState([]);
    const[clienteSelected, setClienteSelected] = useState(0);

    const [assunto, setAssunto] = useState('Selecione o assunto...');
    const [status, setStatus] = useState('Aberto');
    const [nota, setNota] = useState('');

    useEffect(()=>{
        async function loadCliente(){
            const clienteRef = collection(db, "clientes")
            const q = query(clienteRef, where("userUid", "==", user.uid))
            const unsub = onSnapshot(q, (snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                if(lista.length===0){
                    console.log('Nenhuma empresa encontrada');
                    setCliente([{id:'1', nomeFantasia:'Vazio (Adicione um cliente)'}]);
                    setLoadCliente(false);
                    return;
                }
                setCliente(lista)
                setLoadCliente(false);

                if(id){
                    loadId(lista);
                }
            })
            
        }
        loadCliente();
    },[])
    
    async function loadId(lista){
        
    }


    async function handleRegister(e){
        e.preventDefault();
        await addDoc(collection(db, "chamados"),{
            created: new Date(),
            cliente: cliente[clienteSelected].nomeFantasia,
            clienteId:cliente[clienteSelected].id,
            assunto: assunto,
            status: status,
            nota: nota,
            userId: user.uid
        })
        .then(()=>{
            toast.success("Chamado inserido a lista");
            setNota('');
            setClienteSelected(0);
        })
        .catch((error)=>{
            toast.error('Sistmas indisponivel')
            console.log(error)
        })


    }

    function handleChangeSelect(e){
        setAssunto(e.target.value)
        console.log(e)
    }

    function handleOptionChange(e){
        setStatus(e.target.value)
    }

    function handleChangeCliente(e){
        setClienteSelected(e.target.value)
    }

    return(
        <div>
            <Header/>              
            <Title name='Novo chamado'>
            <i className="bi bi-file-earmark-plus-fill"></i>
            </Title>
            <div className='content'>
                <div className='container-fluid container-new'>
                    <form className='form-profile' onSubmit={handleRegister} >
                        <label className="h4">Cliente</label>
                        {loadCliente ? (
                            <select className="form-select select-new" disabled>
                                <option defaultValue> Carregando...</option>
                            </select>

                        ):(
                        <select className="form-select select-new" value={clienteSelected} onChange={handleChangeCliente}>
                            {cliente.map((item,index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                        </select>
                        )}
                        <label className="h4 mt-1">Assunto</label>
                        <select className="form-select select-new" value={assunto} onChange={handleChangeSelect}>
                            <option defaultValue>Selecione o assunto...</option>
                            <option value="Reparo">Reparo</option>
                            <option value="Troca">Troca</option>
                            <option value="Compra">Compra</option>
                            <option value="Venda">Venda</option>
                        </select>
                        <label className="h4 mt-1">Status</label>
                        <div className="container-status">
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="radio" 
                                name="meu_radio" 
                                value='Em análise' 
                                onChange={handleOptionChange}
                                checked={status === 'Em análise'}
                                />
                                <label className="form-check-label">
                                    Em análise
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="radio" 
                                name="meu_radio" 
                                value='Encerrado' 
                                onChange={handleOptionChange}
                                checked={status === 'Encerrado'}
                                />
                                <label className="form-check-label">
                                    Encerrado
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="radio" 
                                name="meu_radio" 
                                value='Aberto'
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                                />
                                <label className="form-check-label">
                                    Aberto
                                </label>
                            </div>
                        </div>
                        <label className="h4 mt-1">Adicionar nota</label>
                        
                        <textarea 
                        name="content" 
                        placeholder="Iserir uma nota é opcional."
                        id="content" 
                        rows="5" 
                        className="form-control text-new"
                        value={nota}
                        onChange={(e)=> setNota(e.target.value)}
                        />
                        <br/>
                        <button className="btn btn-dark">Salvar</button>
                    </form>
                </div>
            </div>    
        </div>
    )
}