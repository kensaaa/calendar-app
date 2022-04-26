import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

const AppRouter = () => {

    return (
        <BrowserRouter>

            <div className='router'>
                <Routes>
                    <Route path='/' element={ <CalendarScreen /> } />
                    <Route path='/login' element={ <LoginScreen /> } />
                    <Route path='/*' element={ <Navigate to='/login' /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter
