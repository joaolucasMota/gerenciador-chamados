import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { auth } from "../../services/firebaseConnection";



export default function Dashboard(){

    const {deslog} = useContext(AuthContext);


    return(
        <div>
            <h1>asfdsadsgsdhdsh</h1>
            <button onClick={ () => deslog() } className='btn-sm btn-dark btn-home' id="btn-sair" >Sair</button>
        </div>
    )
}