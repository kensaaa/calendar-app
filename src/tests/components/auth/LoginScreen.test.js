import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import LoginScreen from '../../../components/auth/LoginScreen'
import {startLogin, startRegister} from '../../../actions/auth'
import Swal from 'sweetalert2'

jest.mock('../../../actions/auth',() => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))


jest.mock('sweetalert2',() => ({
    fire: jest.fn()
}))


const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {}
const store = mockStore( initState )
store.dispatch = jest.fn()

//colocar solamente el wrapper a nivel global cuando el store no va a cambiar
const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
)
describe('Prueba en <LoginScreen />', () => {


    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    //vacio los inputs de LoginScreen
    test('debe de llamar el dispatch del login', () => {

        wrapper.find('input[name="lEmail"]').simulate('change',{
            target:{
                name:'lEmail',
                value:'samata@gmail.com'
            }
        })

        wrapper.find('input[name="lPassword"]').simulate('change',{
            target:{
                name:'lPassword',
                value:'123456'
            }
        })

        //Tenemos 2 login quiero la primera posicion
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })


        expect( startLogin ).toHaveBeenCalledWith('samata@gmail.com','123456')
    })

    // tambien vaciamos los inputs de register
    test('No hay registro si las contrasennas son diferentes ', () => {
        wrapper.find('input[name="rPassword"]').simulate('change',{
            target:{
                name:'rPassword',
                value:'123456'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change',{
            target:{
                name:'rPassword2',
                value:'1234567'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })


        expect( startRegister ).not.toHaveBeenCalled()
        expect( Swal.fire ).toHaveBeenCalledWith('Error','contrasennas deben ser iguales','error')

    })

    test('registro con contrasenal iguales', () => {
        wrapper.find('input[name="rPassword"]').simulate('change',{
            target:{
                name:'rPassword',
                value:'123456'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change',{
            target:{
                name:'rPassword2',
                value:'123456'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })


        //no con with porque no modifique los email,etc
        expect( startRegister ).toHaveBeenCalled()
        expect( Swal.fire ).not.toHaveBeenCalled()

    })


})
