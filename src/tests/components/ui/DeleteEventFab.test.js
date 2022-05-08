import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import DeleteEventFab from '../../../components/ui/DeleteEventFab'
import {enventStartDelete} from '../../../actions/events'

jest.mock('../../../actions/events',() =>( {
    enventStartDelete: jest.fn()
} ))

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {}
const store = mockStore( initState )
//para saber si el dispatch fue llamado y con que argumentos
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
)

describe('Prueba en <DeleteEventFab />', () => {

    test('debe de mostrarse correctamente ', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('debe de llamar el eventStartDelete al hacer click ', () => {
        
        wrapper.find('button').simulate('click')

        //esta prueba es mas precisa
        expect( enventStartDelete ).toHaveBeenCalled()

    })
})
