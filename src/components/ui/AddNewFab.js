import React from 'react'
import {useDispatch} from 'react-redux'
import {uiOpenModal} from '../../actions/ui'

const AddNewFab = () => {

    const dispatch = useDispatch()

    return (
        <button
            className='btn btn-primary fab'
            onClick={ () => dispatch( uiOpenModal() ) }
        >
            <i className='fas fa-plus' />
        </button>
    )
}

export default AddNewFab
