import { combineReducers } from 'redux';
// ----------------------------------------------------------------
import { authenticationReducer } from './authentication';
import { profileReducer } from './profile'
import { booksReducer } from './books';
// ----------------------------------------------------------------
const appReducer = combineReducers({
    authenticationReducer, profileReducer, booksReducer
});

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
    if (action.type === 'AUTHENTICATION_RESET') {
        state = initialState
    }
    return appReducer(state, action)
}

export default rootReducer;
// ----------------------------------------------------------------