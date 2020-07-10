// ----------------------------------------------------------------
import { AUTHENTICATION_DEFAULT, AUTHENTICATION_STARTED, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE_NETWORK, AUTHENTICATION_FAILURE_VALIDATION } from '../actions/types';
// ----------------------------------------------------------------
const initialState = {
    rtype: AUTHENTICATION_DEFAULT,
    agent: null,
    userToken: null,
    error: null
};
export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION_STARTED:
            return { ...state, rtype: AUTHENTICATION_STARTED, agent: null, userToken: null, error: null };
        case AUTHENTICATION_SUCCESS:
            return { ...state, rtype: AUTHENTICATION_SUCCESS, ...action.payload, error: null };
        case AUTHENTICATION_FAILURE_VALIDATION:
            return { ...state, rtype: AUTHENTICATION_FAILURE_VALIDATION, agent: null, userToken: null, error: action.payload.error };
        case AUTHENTICATION_FAILURE_NETWORK:
            return { ...state, rtype: AUTHENTICATION_FAILURE_NETWORK, agent: null, userToken: null, error: action.payload.error };
        default:
            return state;
    }
}
  // ----------------------------------------------------------------