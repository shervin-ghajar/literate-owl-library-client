// ----------------------------------------------------------------
import {
    GET_PROFILE_DEFAULT,
    GET_PROFILE_STARTED,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE_NETWORK,
    GET_PROFILE_FAILURE_VALIDATION,
} from '../actions/types';
// ----------------------------------------------------------------
const initialState = {
    rtype: GET_PROFILE_DEFAULT,
    email: null,
    username: null,
    balance: 0,
    wishlist: [],
    purchased: [],
    error: null
};
export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_STARTED:
            return {
                ...state,
                rtype: GET_PROFILE_STARTED,
                email: null,
                username: null,
                balance: 0,
                wishlist: [],
                purchased: [],
                error: null
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                rtype: GET_PROFILE_SUCCESS,
                ...action.payload,
                error: null
            };
        case GET_PROFILE_FAILURE_VALIDATION:
            return {
                ...state,
                rtype: GET_PROFILE_FAILURE_VALIDATION,
                email: null,
                username: null,
                balance: 0,
                wishlist: [],
                purchased: [],
                error: action.payload.error
            };
        case GET_PROFILE_FAILURE_NETWORK:
            return {
                ...state,
                rtype: GET_PROFILE_FAILURE_NETWORK,
                email: null,
                username: null,
                balance: 0,
                wishlist: [],
                purchased: [],
                error: action.payload.error
            };
        default:
            return state;
    }
}
  // ----------------------------------------------------------------