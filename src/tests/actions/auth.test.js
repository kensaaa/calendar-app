import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'
import '@testing-library/jest-dom'
import {startChecking, startLogin, startRegister} from '../../actions/auth'
import {types} from '../../types/types'

jest.mock('sweetalert2',()=>({
    fire: jest.fn()
}))

import * as fetchModule from '../../helpers/fetch'


const middlewares = [thunk]
const mockStore = configureStore( middlewares )
const initState = {}
let store = mockStore( initState )

Storage.prototype.setItem = jest.fn()

describe('Prueba en las acciones en Auth', () => {

    beforeEach(()=>{
        store = mockStore(initState)
        jest.clearAllMocks()
    })

    test('startLogin correcto', async() => {
        await store.dispatch( startLogin('samata@gmail.com','123456') )
        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type:types.authLogin,
            payload:{
                uid:expect.any(String),
                name:expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token',expect.any(String))
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date',expect.any(Number))
        
    })

    test('startLogin incorrecto', async() => {
        await store.dispatch( startLogin('samata@gmail.com','1236545465465') )
        let actions = store.getActions()
        
        expect(actions.length).toBe(0)
        expect(Swal.fire).toHaveBeenCalledWith('error','Password incorrecto','error')


        await store.dispatch( startLogin('samata@gmail2.com','123456') )
        actions = store.getActions()

        expect(Swal.fire).toHaveBeenCalledWith('error','El usuari no existe con ese email','error')
    })

    test('startRegister correcto', async() => {
        fetchModule.fetchSinToken = jest.fn(() => ({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABCDFGH'
                }
            }
        }))
      
     
        await store.dispatch( startRegister('test@test.com','1234','test') )
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'carlos'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token','ABCDFGH')
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date',expect.any(Number))

    })

    test('startChecking correcto', async() => {
         fetchModule.fetchConToken = jest.fn(() => ({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABCDFGH'
                }
            }
        }))
        
        await store.dispatch( startChecking() )
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'carlos',
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token',expect.any(String))

    })


})

