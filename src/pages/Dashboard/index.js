import './dashboard.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { format } from 'date-fns';
import Modal from '../../components/Modal';



export default function Dashboard(){


    const {user,deslog} = useContext(AuthContext);

    const[chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);

    const[detail, setDetail] = useState([]);

    useEffect(()=>{
        loadChamados();
        return () =>{

        }
    },[])

    async function loadChamados(){
        const chamadoRef = collection(db, "chamados")
        const q = query(chamadoRef, orderBy("created", "desc"), where("userId", "==", user.uid))

        const unsub = onSnapshot(q, (snapshot)=>{
            updateState(snapshot)
        })
        
    }

    async function updateState(snapshot){
        const colecaoVazia = snapshot.size ===0;
        setLoading(false)
        if(!colecaoVazia){
            let lista = [];
            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    nota: doc.data().nota
                })
            })
            setChamados(lista) 
        }
    }

    function modalEdit(item){
        setDetail(item)
    }


    if(loading){
        return(
            <div>
                <Header/>
                <Title name='Chamados'>
                <i className="bi bi-house-fill"></i>
                </Title>
                <div className='content'>
                    <div className='container-fluid container-perfil container-centro shadow-lg'>
                        <span className='h2'>Carregando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header/>
            <Title name='Chamados'>
            <i className="bi bi-house-fill"></i>
            </Title>
            {chamados.length ===0 ? (
            <div className='content'>
                <div className='container-fluid container-perfil container-centro shadow-lg'> 
                        <span className="h4 mb-4">Nenhum chamado registrado.</span>
                        <Link to="/new"><button className="btn btn-lg btn-semchamado">Novo chamado</button></Link>
                </div>
            </div>
            ):(
            <div className='content'>
                <div className='container-fluid container-perfil container-centro shadow-lg'>
                    <div className="container-tabela table-responsive">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">Assunto</th>
                            <th scope="col">Status</th>
                            <th scope="col">Data</th>
                            <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                    <th scope='row'>{item.cliente}</th>
                                    <td>{item.assunto}</td>
                                    <td>{item.status === "Aberto" ? (<span className='badge bg-primary'>{item.status}</span>) : (<span className='badge bg-danger'>{item.status}</span>)}</td>
                                    <td>{item.createdFormated}</td>
                                    <td>
                                        <button 
                                        className='btn btn-tabela' 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modal" 
                                        onClick={()=> modalEdit(item)}> <i className="bi bi-search"></i></button>

                                        <Link className='btn btn-tabela tabela-link' to={`/new/${item.id}`}> <i className="bi bi-pencil-square"></i> </Link>
                                    </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </table>
                    </div>
                    <Link to='/new'><button className="btn btn-lg btn-semchamado">Novo chamado</button></Link>
                </div>
                <Modal conteudo={detail}/>
                
            </div>
            )}           
        </div>
    )
}