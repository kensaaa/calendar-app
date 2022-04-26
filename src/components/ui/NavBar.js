import React from 'react'

const NavBar = () => {

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className="navbar-brand">
                Mario
            </span>

            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt' />
                <span> Salir</span>
            </button>

        </div>
    )
}

export default NavBar
