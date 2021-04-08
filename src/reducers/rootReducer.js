
import {combineReducers} from 'redux'

import { authReducer } from './authReducer'
import { peopleReducer } from './peopleReducer'
import { reportsReducer } from './reportsReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    people: peopleReducer,
    reports: reportsReducer
})