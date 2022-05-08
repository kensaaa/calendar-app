import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import CalendarScreen from '../../../components/calendar/CalendarScreen'
import {messages} from '../../../helpers/calendar-messages-spanish'
import {types} from '../../../types/types'
import {eventSetActive} from '../../../actions/events'
import {act} from 'react-dom/test-utils'

//con esto hago un mock completo a la libreria,
//pero el componente usa eventStartLoading por eso lo agrego o me da error
jest.mock('../../../actions/events',() =>( {
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
} ))

Storage.prototype.setItem = jest.fn()

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {
    auth:{
        uid:'123',
        name:'juan'
    },
    calendar:{
        events:[]
    },
    ui:{
        openModal:false,
    }
}
const store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)

describe('Prueba en <CalendarScreen />', () => {

    test('debe de mostrarse correctamente', () => {
        //esto es volatin el calendario cambia cada mes , actualizar cada mes
        expect( wrapper ).toMatchSnapshot()
    })

    //interacciones calendario
    test('debe con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar')
        
        //obtenemos una propiedad del calendario 
        const calendarMessages = calendar.prop('messages')
        expect( calendarMessages ).toEqual( messages )

        //trabajar con doble click
        calendar.prop('onDoubleClickEvent')()
        //como es sincrono puedo esperar ser llamado, con la ejecucion del procedimiento openModal()
        expect( store.dispatch ).toHaveBeenCalledWith( { type: types.uiOpenModal } )
        
        
        calendar.prop('onSelectEvent')({ start:'hola' })
        expect( eventSetActive ).toHaveBeenCalledWith( { start:'hola' } )

        //cuando camibe el view , se guarde en localStorage
        //
        //
        //porque el act sea instruccion hace una modificacion con el state
        //el act del profesor testing/act no me funicona uso el act del domm
        act(() =>{
            calendar.prop('onView')( 'week' )
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView','week')
        })

    })
})
