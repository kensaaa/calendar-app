import {login} from "../../actions/auth"
import {authReducer} from "../../reducers/authReducer"

const initalState = {
    checking:true,
}
describe('Prueba en authReducer', () => {

    test('debe retornar el state por defecto', () => {

        const state = authReducer( initalState, {} )

        expect(state).toEqual(initalState)
        
    })

    test('debe de autenticar el usuario ', () => {
        //yo exporte el login, el profe lo hizo de manera manual 
        const action =  login({ uid:'132',name:'carlos' })
        const stateLogin = authReducer(initalState,action)

        expect(stateLogin).toEqual({
            checking:false,
            ... action.payload,
        })
    })

})
