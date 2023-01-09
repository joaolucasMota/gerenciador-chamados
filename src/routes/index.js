
import {Routes, Route} from 'react-router-dom';
import Login from "../pages/Login"
import Dashboard from '../pages/Dashboard';
import Registro from "../pages/Registro"
import Private from './Private';
import NoPrivate from './NoPrivate'


export default function RoutesApp(){


    return(
        <Routes>
                <Route path='/' element={<NoPrivate> <Login/> </NoPrivate>}/>
                <Route path='/register' element={<NoPrivate> <Registro/> </NoPrivate>} />
                <Route path='/dashboard' element={<Private> <Dashboard/> </Private>}/>
        </Routes>
    )
}