import Swal from "sweetalert2"
import {fetchConToken, fetchSinToken} from "../helpers/fetch"
import {types} from "../types/types"

//si no es asincrono no hace falta el return
export const startLogin = (email,password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth',{email,password},'POST')
        const body = await resp.json()

        // si el usuario esta logea grabo el token
        if ( body.ok ){
            //esta informacion no es sencible,  pues si alguien manipula el token no va a funcionar
            localStorage.setItem('token',body.token)
            //se que el token dura 2 horas , tambien grabo la fecha 
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        } else {
            Swal.fire('error', body.msg,'error')
        }
    }	
}

export const startRegister = ( email,password,name ) => {

    return async(dispatch) => {

        const data = { email, password, name }

        const resp = await fetchSinToken('auth/new',data,'POST' )
        const body = await resp.json()

        if( body.ok ){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )


        } else {
            Swal.fire('error',body.msg,'error')
        }

    }

}

export const startChecking = () => {
    return async( dispatch ) => {

        const resp = await fetchConToken('auth/renew')
        const body = await resp.json()


        if( body.ok ){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )


        } else {
            //si el token no es correcto dispara esta accion
            dispatch( checkingFinish() )
        }


    }
}

const checkingFinish = () => ({
    type:types.authCheckingFinish,
})


const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    //esta tarea es sincrona pero tengo que usar el dispatch, para otros procesos
    return ( dispatch ) => {

        //esto borra todo el storage
        localStorage.clear()
        dispatch( logout() )

    }	
}


const logout = () => ({
    type:types.authLogout
})


