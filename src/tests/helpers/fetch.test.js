import {fetchSinToken, fetchConToken} from "../../helpers/fetch"

describe('Prueba en el helper Fetch', () => {

    let token = ''
    test('debe ', () => {
        
    })

    // test('fetch sin token debe de funcionar', async() => {
    //
    //     const resp =  await fetchSinToken('auth',{ email:'samata@gmail.com',password:'123456' },'POST')
    //     const body = await resp.json()
    //
    //     expect( resp instanceof Response ).toBe(true)
    //     expect( body.ok ).toBe(true)
    //
    //     //este token lo vamos a usar en otra prueba, y se la asignamos a un token con mas
    //     //valor
    //     token = body.token
    //
    // })
    //
    // test('fetch con token debe de funcionar ', async() => {
    //     // grabamos el token en el local storage
    //     localStorage.setItem('token',token)
    //
    //     //voy tratar de eliminar un evento, no importa si el evento no existe 
    //     //solo quiero probar que el backend reciba mi token
    //     const resp = await fetchConToken('events/626bfbb0e16e9549e348f58f',{},'DELETE')
    //     const body = await resp.json()
    //     
    //     expect( body.msg ).toBe('evento no existe por ese id')
    //
    // })
    //
    //

})



