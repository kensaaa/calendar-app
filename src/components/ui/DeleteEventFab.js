import React from 'react'
import {useDispatch} from 'react-redux'
import {enventStartDelete } from '../../actions/events'

const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch( enventStartDelete() )
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick = { handleDelete }
        >
            <i className='fas fa-trash' />
            <span>Borrar Evento</span>
        </button>
    )
}

export default DeleteEventFab
