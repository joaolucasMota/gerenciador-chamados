
import {Routes, Route} from 'react-router-dom';
import Login from "../pages/Login"
import Dashboard from '../pages/Dashboard';
import Registro from "../pages/Registro"
import Private from './Private';
import NoPrivate from './NoPrivate'
import Setup from '../pages/Setup';
import Clientes from '../pages/Clientes';
import New from '../pages/New';


export default function RoutesApp(){


    return(
        <Routes>
                <Route path='/' element={<NoPrivate> <Login/> </NoPrivate>}/>
                <Route path='/register' element={<NoPrivate> <Registro/> </NoPrivate>}/>

                <Route path='/dashboard' element={<Private> <Dashboard/> </Private>}/>
                <Route path='/setup' element={<Private> <Setup/> </Private>}/>
                <Route path='/clientes' element={<Private> <Clientes/> </Private>}/>
                <Route path='/new' element={<Private> <New/> </Private>}/>
                <Route path='/new/:id' element={<Private> <New/> </Private>}/>
        </Routes>
    )
}