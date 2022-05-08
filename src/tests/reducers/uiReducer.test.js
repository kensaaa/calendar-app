import {uiCloseModal, uiOpenModal} from "../../actions/ui"
import {uiReducer} from "../../reducers/uiReducer"

const initalState = {
    modalOpen:false
}


describe('Prueba en uiReducer', () => {

    test('debe de retornar el estado por defecto', () => {

        const state = uiReducer(initalState,{})
        expect(state).toEqual(initalState)

    })

    test('debe abrir y cerrar el modal', () => {

        const modalOpen = uiOpenModal()
        const state = uiReducer( initalState,modalOpen )
        expect(state).toEqual({ modalOpen:true })


        const modalClose = uiCloseModal()
        const state1 = uiReducer( state,modalClose )
        expect(state1).toEqual({ modalOpen:false })

        
    })
})
