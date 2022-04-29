import {types} from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import {prepareEvents} from "../helpers/prepareEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = (event) => {
    return async( dispatch,getState ) => {

        //obtengo al user
        const { uid,name } = getState().auth


        try{
            const resp = await fetchConToken('events',event,'POST' )
            const body = await resp.json()

            if( body.ok ){
                event.id = body.evento.id
                event.user = {
                    _id:uid,
                    name
                }

                //grabo el event que ingresa y no el de base porque se que funciona
                dispatch( eventAddNew(event))
            }

        } catch( err ){
            console.log(err)
        }


    }
}


//esta action es dispara unicamente el evento se graba en la base de 
//datos
const eventAddNew = (event) => ({
    type:types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type:types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
})

export const eventStartUpadate = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT')
            const body = await resp.json()

            if ( body.ok ) {
                dispatch( eventUpdated( event ) )
            } else {
                Swal.fire('Error', body.msg, 'error' )
            }


        } catch (err) {
            console.log(err)
        }
    }	
}


const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const enventStartDelete = () => {
    return async( dispatch,getState ) => {
        const {id} = getState().calendar.activeEvent

        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE')
            const body = await resp.json()

            if ( body.ok ) {
                dispatch( eventDeleted() )
            } else {
                Swal.fire('Error', body.msg, 'error' )
            }


        } catch (err) {
            console.log(err)
        }
    }	
}

export const eventLogout = () => ({ type:types.eventLogout })

const eventDeleted = () => ({
    type: types.eventDeleted,
})


export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events')
            const body = await resp.json()

            if (body.ok) {
                const events = prepareEvents(body.eventos)
                dispatch( eventLoaded( events ) )
            }
            
        } catch (err) {
            console.log(err)
        }

    }	
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})



