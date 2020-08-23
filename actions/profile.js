import {
    AUTHENTICATION_RESET,
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
    HANDLE_WISHED_BOOKS
} from "./types";
import NavigationService from '../services/navigators';
import DeviceInfo from 'react-native-device-info';
import { getProfileAPI, updateProfileAPI } from "../services/apis/user/profile";
import { handleWishlistAPI } from "../services/apis/user/wishlist";
import { purchaseAPI } from "../services/apis/user/purchase";
import { chargeBalanceAPI } from "../services/apis/user/balance";
//-------------------------------------------------------------------------------------------------
export const getProfile = (userToken) => {
    return dispatch => {
        dispatch(getProfileStarted());
        const agent = DeviceInfo.getUniqueId();
        getProfileAPI(agent, userToken)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(getProfileSuccess(res.result))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(getProfileFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("getProfile-action-catch", err.errorCode)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(getProfileFailure(err.ecode));
            });
    };
};
//--------------------------------------------------------------------------------------------------
export const updateProfile = (userToken, username, password) => {
    return dispatch => {
        dispatch(updateProfileStarted());
        const agent = DeviceInfo.getUniqueId();
        updateProfileAPI(agent, userToken, username, password)
            .then(res => {
                if (res.result && 'error' in res.result && !res.result.error) {
                    dispatch(authenticationReset())
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(updateProfileFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(updateProfileFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
export const chargeBalance = (userToken, chargeAmount) => {
    return dispatch => {
        dispatch(chargeBalanceStarted());
        const agent = DeviceInfo.getUniqueId();
        chargeBalanceAPI(agent, userToken, chargeAmount)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(chargeBalanceSuccess(res.result))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(chargeBalanceFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("chargeBalance-action-catch", err.errorCode)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(chargeBalanceFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
export const purchase = (userToken, bookId) => {
    return dispatch => {
        dispatch(purchaseStarted());
        const agent = DeviceInfo.getUniqueId();
        purchaseAPI(agent, userToken, bookId)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(purchaseSuccess(res.result))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(purchaseFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("purchase-action-catch", err.errorCode)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(purchaseFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
export const handleWishlist = (userToken, bookData, bookId) => {
    return dispatch => {
        dispatch(handleWishlistStarted());
        const agent = DeviceInfo.getUniqueId();
        handleWishlistAPI(agent, userToken, bookId)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(handleWishlistSuccess(res.result))
                    dispatch(handleWishedBooks(bookData))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(handleWishlistFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("handleWishlist-action-catch", err.errorCode)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(handleWishlistFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------

const getProfileStarted = () => ({
    type: GET_PROFILE_STARTED
});

const getProfileSuccess = data => ({
    type: GET_PROFILE_SUCCESS,
    payload: {
        ...data
    }
});

const getProfileFailure = error => ({
    type: GET_PROFILE_FAILURE_NETWORK,
    payload: {
        error
    }
});

// ----------------------------------------------------------------
const authenticationReset = () => ({
    type: AUTHENTICATION_RESET
});
// ----------------------------------------------------------------
const chargeBalanceStarted = () => ({
    type: CHARGE_BALANCE_STARTED
});

const chargeBalanceSuccess = data => ({
    type: CHARGE_BALANCE_SUCCESS,
    payload: {
        ...data
    }
});

const chargeBalanceFailure = error => ({
    type: CHARGE_BALANCE_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const purchaseStarted = () => ({
    type: PURCHASE_STARTED
});

const purchaseSuccess = data => ({
    type: PURCHASE_SUCCESS,
    payload: {
        ...data
    }
});

const purchaseFailure = error => ({
    type: PURCHASE_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const handleWishlistStarted = () => ({
    type: HANDLE_WISHLIST_STARTED
});

const handleWishlistSuccess = data => ({
    type: HANDLE_WISHLIST_SUCCESS,
    payload: {
        ...data
    }
});

const handleWishlistFailure = error => ({
    type: HANDLE_WISHLIST_FAILURE_NETWORK,
    payload: {
        error
    }
});
//-----------------------------------------------------------------
const handleWishedBooks = data => ({
    type: HANDLE_WISHED_BOOKS,
    payload: data
});