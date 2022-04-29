import moment from 'moment'
import {types} from '../types/types'

// const initialState = {
//     events:[
//         {
//             id: 'ntaoehuntohe',
//             title: 'Cumpleanos del jefe',
//             start: moment().toDate(),
//             end: moment().add(2,'hours').toDate(),
//             user: {
//                 _id:'123',
//                 name:'Mario'
//             }
//         }
//     ],
//     activeEvent: null
//
// }

const initialState = {
    events: [],
    activeEvent:null
}

export const calendarReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent:null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id )? action.payload : e
                )
            }
        case types.eventDeleted:
            return {
                //auque estoy modificando todas la propiedades recomendable hacer el spread igual
                ...state,
                //eliminamos la nota el id lo sacamos de  la nota activa
                events: state.events.filter(e => e.id !== state.activeEvent.id),
                //limpiamos la nota activa
                activeEvent:null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            console.log('me ejecute')
            return{
                ...initialState
            }

        default:
            return state
    }
}
