import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import moment from 'moment'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import CalendarModal from '../../../components/calendar/CalendarModal'
import {eventClearActiveEvent, eventStartUpadate, eventStartAddNew} from '../../../actions/events'
import {act} from 'react-dom/test-utils'
import Swal from 'sweetalert2'


jest.mock('../../../actions/events',() =>( {
    eventStartUpadate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
} ))

jest.mock('sweetalert2',() =>( {
    fire: jest.fn()
} ))

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )


 // consideracion creo un evento el activeEvent esta en null, si tiene contenido estoy modificando
const now = moment().minutes(0).seconds(0).add(1,'hours')
const finish = now.clone().add(1,'hours')

const initState = {
    auth:{
        uid:'123',
        name:'juan'
    },
    calendar:{
        events:[],
        activeEvent:{
            title:'hola mundo',
            notes:'algunas notes',
            start: now.toDate(),
            end: finish.toDate()
        }
    },
    ui:{
        modalOpen:true,
    }
}
const store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
)
describe('Prueba en <CalendarModal', () => {

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('debe de mostrar el modal', () => {
        //esta prueba no es tan buena porque el modal existe pero esta oculto ( no pueda hacer snapshot por que tiene elementos cambiantes   )
        // expect(wrapper.find('.modal').exists()).toBe(true)
        // esta otra prueba es mas precisa
        // pero me da un error , porque necesito agregar algo en CalendarModal que solo corra en test
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true)
    })

    test('debe de llamar la accion de actualizar y cerrar el modal', () => {

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        expect( eventStartUpadate ).toHaveBeenCalledWith({ ...initState.calendar.activeEvent })
        expect( eventClearActiveEvent ).toHaveBeenCalled()
        
    })


    test('debe de mostrar error  si falta el titulo', () => {
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        //input esta vacio porque se limpio en la prueba anterior
        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true)

    })

    test('debe de crear un nuevo evento ', () => {
        
        const initState = {
            auth:{
                uid:'123',
                name:'juan'
            },
            calendar:{
                events:[],
                activeEvent:null
            },
            ui:{
                modalOpen:true,
            }
        }
        const store = mockStore( initState )
        store.dispatch = jest.fn()

        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'hola pruebas'
            }
        })



        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(), //espera cualquiercosa
            start: expect.anything(),
            title: 'hola pruebas',
            notes: ''
        })

        expect( eventClearActiveEvent ).toHaveBeenCalled()
    })

    test('debe de validar las fechas ', () => {

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'hola pruebas'
            }
        })

        const hoy = new Date()

        act(()=>{
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        })

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Fecha fin  debe ser mayor a la Fecha inicio", "error")


    })

})
