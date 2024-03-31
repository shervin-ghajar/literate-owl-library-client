// ----------------------------------------------------------------
import {
    GET_PROFILE_DEFAULT,
    GET_PROFILE_STARTED,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE_NETWORK,
    GET_PROFILE_FAILURE_VALIDATION,
    CHARGE_BALANCE_DEFAULT,
    CHARGE_BALANCE_STARTED,
    CHARGE_BALANCE_SUCCESS,
    CHARGE_BALANCE_FAILURE_NETWORK,
    CHARGE_BALANCE_FAILURE_VALIDATION,
    PURCHASE_DEFAULT,
    PURCHASE_STARTED,
    PURCHASE_SUCCESS,
    PURCHASE_FAILURE_NETWORK,
    PURCHASE_FAILURE_VALIDATION,
    HANDLE_WISHLIST_DEFAULT,
    HANDLE_WISHLIST_STARTED,
    HANDLE_WISHLIST_SUCCESS,
    HANDLE_WISHLIST_FAILURE_NETWORK,
    HANDLE_WISHLIST_FAILURE_VALIDATION,
} from '../actions/types';
// ----------------------------------------------------------------
const initialState = {
    rtype: GET_PROFILE_DEFAULT,
    email: null,
    username: null,
    balance: 0,
    wishlist: [],
    purchased: [],
    tabName: "Book Store",
    error: null
};
export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_STARTED:
            return {
                ...state,
                rtype: GET_PROFILE_STARTED,
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
                error: action.payload.error
            };
        case GET_PROFILE_FAILURE_NETWORK:
            return {
                ...state,
                rtype: GET_PROFILE_FAILURE_NETWORK,
                error: action.payload.error
            };
        //----------------------------------------------------------------------
        case CHARGE_BALANCE_STARTED:
            return {
                ...state,
                rtype: CHARGE_BALANCE_STARTED,
                error: null
            };
        case CHARGE_BALANCE_SUCCESS:
            return {
                ...state,
                rtype: CHARGE_BALANCE_SUCCESS,
                balance: action.payload.balance,
                error: null
            };
        case CHARGE_BALANCE_FAILURE_VALIDATION:
            return {
                ...state,
                rtype: CHARGE_BALANCE_FAILURE_VALIDATION,
                error: action.payload.error
            };
        case CHARGE_BALANCE_FAILURE_NETWORK:
            return {
                ...state,
                rtype: CHARGE_BALANCE_FAILURE_NETWORK,
                error: action.payload.error
            };
        //----------------------------------------------------------------------
        case PURCHASE_STARTED:
            return {
                ...state,
                rtype: PURCHASE_STARTED,
                error: null
            };
        case PURCHASE_SUCCESS:
            return {
                ...state,
                rtype: PURCHASE_SUCCESS,
                purchased: action.payload.purchased,
                balance: action.payload.balance,
                error: null
            };
        case PURCHASE_FAILURE_VALIDATION:
            return {
                ...state,
                rtype: PURCHASE_FAILURE_VALIDATION,
                error: action.payload.error
            };
        case PURCHASE_FAILURE_NETWORK:
            return {
                ...state,
                rtype: PURCHASE_FAILURE_NETWORK,
                error: action.payload.error
            };
        //----------------------------------------------------------------------
        case HANDLE_WISHLIST_STARTED:
            return {
                ...state,
                rtype: HANDLE_WISHLIST_STARTED,
                error: null
            };
        case HANDLE_WISHLIST_SUCCESS:
            let tmp = state.wishlist
            let newWishList = tmp
            if (tmp && tmp.length > 0) {
                let isWishlisted = tmp.includes(action.payload)
                newWishList = isWishlisted ? tmp.filter(el => el != action.payload) : [action.payload, ...tmp]
            }
            return {
                ...state,
                rtype: HANDLE_WISHLIST_SUCCESS,
                wishlist: newWishList,
                error: null
            };
        case HANDLE_WISHLIST_FAILURE_VALIDATION:
            return {
                ...state,
                rtype: HANDLE_WISHLIST_FAILURE_VALIDATION,
                error: action.payload.error
            };
        case HANDLE_WISHLIST_FAILURE_NETWORK:
            return {
                ...state,
                rtype: HANDLE_WISHLIST_FAILURE_NETWORK,
                error: action.payload.error
            };
        default:
            return state;
    }
}
  // ----------------------------------------------------------------