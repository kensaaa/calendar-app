import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { uid } = useSelector(state => state.auth)

    const logged = !!uid

    return logged
        ? children
        : <Navigate to='/login' />

}

export default PrivateRoute
