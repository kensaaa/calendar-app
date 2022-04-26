//es la combinacion de todos mi reducer
import {combineReducers} from "redux";
import {calendarReducer} from "./calendarReducer";
import {uiReducer} from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    //todo: authReducer
})
