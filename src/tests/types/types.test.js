import {types} from "../../types/types"

describe('Prueba en Types', () => {

    test('los types deben de ser igual', () => {
        
        expect(types).toEqual({
            uiOpenModal:'[UI] Open Modal',
            uiCloseModal:'[UI] Close Modal',
            eventSetActive:'[Event] Set New',
            eventLogout:'[Event] Logout',
            eventStartAddNew:'[event] Start Add New',
            eventAddNew:'[Event] Add New',
            eventClearActiveEvent:'[Event] Clear Active Event',
            eventUpdated:'[Event] Event Updated',
            eventDeleted:'[Event] Event Deleted',
            eventLoaded:'[event] Event Loaded',
            authCheckingFinish:'[Auth] Finish Checking Login State',
            authStartLogin:'[Auth] Start Login',
            authLogin:'[Auth]  Login',
            authStartRegister:'[Auth] Start Register',
            authStartTokenRenew:'[auth] Start Token Renew',
            authLogout:'[Auth]  Logout',
        })

    })
})
