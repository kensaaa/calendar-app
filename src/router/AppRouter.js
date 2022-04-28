import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {startChecking} from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {

    const dispatch = useDispatch()
    const { checking } = useSelector(state => state.auth)


    useEffect( () => {
        //no colocar como dependencia startChecking pues esta fuera del componente y nunca cambiara
        dispatch( startChecking() )
    },[dispatch])

    //si el checking esta en true significa que esta cargando
    if(checking){
        return <h5>espere ...</h5>
    }



    return (
        <BrowserRouter>

            <div className='router'>
                <Routes>

                    <Route path='/' element={
                            <PrivateRoute>
                                <CalendarScreen />
                            </PrivateRoute>
                    } />

                    <Route path='/login' element={
                            <PublicRoute>
                                <LoginScreen />
                            </PublicRoute>
                    } />


                    <Route path='/*' element={ <Navigate to='/login' /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter
