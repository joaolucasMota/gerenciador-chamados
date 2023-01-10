import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";



export default function Dashboard(){

    const {deslog} = useContext(AuthContext);


    return(
        <div>
            <Header/>

            <div>
                <Title name='Dashboard'>
                <i className="bi bi-house-fill"></i>
                </Title>
            </div>











            <button onClick={ () => deslog() } className='btn-sm btn-dark btn-home' id="btn-sair" >Sair</button>
        </div>
    )
}