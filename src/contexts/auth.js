import { createContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    


    useEffect(()=>{


        function loadStorage(){
          const storageUser = localStorage.getItem('SistemaUser');
    
          if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
          }
      
          setLoading(false);
        }
        
        loadStorage();
    
      }, [])

      //Fazendo login do usuario
  async function login(email, password){
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then(async (value)=> {
      let uid = value.user.uid;

      const userProfile = await getDoc(doc(db, "users", uid))

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      alert('Bem vindo de volta!');
      
    })
    .catch((error)=>{
      console.log(error);
      alert('Ops algo deu errado!');
      setLoadingAuth(false);
    })

  }


      //cadastrando usuario
    async function registro(email, password, nome){
        setLoadingAuth(true);
    
        await createUserWithEmailAndPassword(auth,email, password)
        .then( async (value)=>{
          let uid = value.user.uid;
    
          await setDoc(doc(db, "users", uid),{
            nome: nome,
            avatarUrl: null,
          })
          .then( () => {
    
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
            };
    
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            alert('Bem vindo a plataforma!');
    
          })
    
        })
        .catch((error)=>{
          console.log(error);
          alert('Ops algo deu errado!');
          setLoadingAuth(false);
        })
    
      }


      //salvando dados no local storage
      function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
      }
      

      //fazendo logout de usuário
      async function deslog(){
        await signOut(auth);
        localStorage.removeItem('SistemaUser');
        setUser(null);  
      }

    return(
        <AuthContext.Provider value={{signed: !!user, user,registro, login, deslog}}>
            {children}
        </AuthContext.Provider>
    )
}