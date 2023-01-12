import './modal.css';
import { Link } from 'react-router-dom';

export default function Modal({conteudo}){
    return(
        <div>
            <div className='modal fade' id='modal' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <span className="h3"> <strong>Cliente</strong>: {conteudo.cliente}</span>
                                <button className='btn-close' type='button' data-bs-dismiss="modal" arial-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <span className="h5"><strong>Assunto</strong>: {conteudo.assunto}</span>
                                <br/>
                                <span className="h5"><strong>Status</strong>: {conteudo.status === "Aberto" ? (<span className='badge bg-primary'>{conteudo.status}</span>) : (<span className='badge bg-danger'>{conteudo.status}</span>)}</span>
                                <br/>
                                <span className="h5"><strong>Criado em</strong>: {conteudo.createdFormated}</span>
                                <br/>
                                {conteudo.nota !== '' && (
                                    <>
                                    <span className="h5"><strong>Notas</strong>: </span>
                                    <br/>
                                    <p className='paragrafo'>{conteudo.nota}</p>
                                    </>
                                )}
                                <div className='modal-footer'>
                                <Link className='btn btn-modal' to={`/new/${conteudo.id}`}> <i className="bi bi-pencil-square text-dark"></i> </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}