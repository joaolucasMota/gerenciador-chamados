import './setup.css';
import Header from "../../components/Header";
import Title from '../../components/Title';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatarfb.png';
import { db } from '../../services/firebaseConnection';
import{doc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {toast} from 'react-toastify';

export default function Setup(){

    const {user, deslog, setUser, storageUser} = useContext(AuthContext);

    const[nome, setNome] = useState(user && user.nome);
    const[email, setEmail] = useState(user && user.email);
    const [loading, setLoading] = useState(false)

    const[avatarUrl, setavatarUrl] = useState(user && user.avatarUrl);
    const[imageAvatar, setImageAvatar] = useState(null);


    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0]

            if(image.type ==="image/jpeg" || image.type ==="image/png"){
                setImageAvatar(image);
                setavatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                toast.warn("Permitido apenas JPEG ou PNG");
                setImageAvatar(null);
                return null;
            }
        }
    }


    async function handleUpload(){
        setLoading(true)
        const uid = user.uid

        const storage = getStorage();
        const metadata = {contentType: 'image/jpeg/png'}
        const storageRef = ref(storage,`images/${uid}/${imageAvatar.name}` );
        const uploadTask = uploadBytesResumable(storageRef, imageAvatar, metadata)
        .then(async()=>{

            await getDownloadURL(ref(storage, `images/${uid}/${imageAvatar.name}`))
            .then(async(url)=>{
                let urlFoto = url;
                setLoading(false)


            const docRef= doc(db, "users", user.uid)
            await updateDoc(docRef,{
                avatarUrl: urlFoto,
                nome:nome
            })
            .then(()=>{
                let data ={
                    ...user,
                    avatarUrl:urlFoto,
                    nome:nome
                };
                setUser(data);
                storageUser(data);
                toast.success('Imagem atualizada!')
            })
        })
        })
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && nome !==''){
            const docRef= doc(db, "users", user.uid)
            await updateDoc(docRef,{
                nome: nome
            })
            .then(()=>{
                let data= {
                    ...user,
                    nome:nome
                };
                setUser(data);
                storageUser(data);
                toast.success('Nome atualizado!')
            })
        }

        if(nome!=='' && imageAvatar !== null){
            handleUpload();
        }
    }


    return(
        
        <div>
            <Header/>

            <div>
                <Title name='Meu Perfil'>
                <i className="bi bi-gear-fill"></i>
                </Title>
            </div>
            
            <div className='content'>
                <div className='container-fluid container-perfil'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <i className="bi bi-upload"></i>
                            </span>
                            <input className='input-foto' type="file" id="foto" onChange={handleFile}/>
                            {avatarUrl === null ?
                            <img src={avatar} width="250" height="250" alt='foto de perfil do sistema'/>
                            :
                            <img src={avatarUrl} width="250" height="250" alt='foto de perfil do sistema'/>}
                        </label>
                    
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><i className="bi bi-filetype-aac"></i></span>
                            <input 
                            type="text" 
                            className="form-control border-0" 
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input 
                            type="text" 
                            disabled="disabled"
                            className="form-control" 
                            placeholder="Digite seu e-mail" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input className='btn btn-dark' type='submit' value={loading?"Carregando...":"Atualizar"}/>
                    </form>
                </div>
            </div>
            <div className='content'>
                <div className='container-fluid container-sair'><button onClick={ () => deslog() } className='btn-sm btn-dark btn-home' id="btn-sair" >Sair</button></div>
            </div>
            
        </div>
    )
}