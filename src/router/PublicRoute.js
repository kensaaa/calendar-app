import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

const PublicRoute = ({ children }) => {
    const { uid } = useSelector(state => state.auth)

    //pasando a boleano , si hay valor true , si no false
    const logged = !!uid

    return logged
        ? <Navigate to='/' />
        : children

}

export default PublicRoute
