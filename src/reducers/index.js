import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import identity from './identity'
import profiles from './profiles'
import async from './async'


const appReducer = combineReducers({
    form: formReducer,
    router: routerReducer,
    identity,
    async,
    profiles
})

export default appReducer
