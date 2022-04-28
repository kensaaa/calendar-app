import {types} from "../types/types"

const initalState = {
    //cuando el checking esta en true, significa que no se el estado actual de user
    checking: true,
    // uid:null,
    // name:null
}


export const authReducer = ( state = initalState, action ) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                //lo coloco en false porque ya lo autentique
                checking:false,
                ...action.payload,
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking:false,
            }

        case types.authLogout:
            return{
                checking:false
            }

        default:
            return state
    }
}
