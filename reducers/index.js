import { combineReducers } from 'redux';
// ----------------------------------------------------------------
import { authenticationReducer } from './authentication';
// ----------------------------------------------------------------
const appReducer = combineReducers({
    authenticationReducer,
});

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = initialState
    }
    return appReducer(state, action)
}

export default rootReducer;
// ----------------------------------------------------------------