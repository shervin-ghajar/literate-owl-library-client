import {
    GET_ALL_BOOKS_DEFAULT,
    GET_ALL_BOOKS_STARTED,
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_BOOKS_FAILURE_NETWORK,
    GET_ALL_BOOKS_FAILURE_VALIDATION,
    GET_SCROLLABLE_BOOKS_DEFAULT,
    GET_SCROLLABLE_BOOKS_STARTED,
    GET_SCROLLABLE_BOOKS_SUCCESS,
    GET_SCROLLABLE_BOOKS_FAILURE_NETWORK,
    GET_SCROLLABLE_BOOKS_FAILURE_VALIDATION,
    GET_BOOKS_IDS_DEFAULT,
    GET_BOOKS_IDS_STARTED,
    GET_BOOKS_IDS_SUCCESS,
    GET_BOOKS_IDS_FAILURE_NETWORK,
    GET_BOOKS_IDS_FAILURE_VALIDATION,
    AUTHENTICATION_RESET,
} from "./types";
import NavigationService from '../services/navigators';
import DeviceInfo from 'react-native-device-info';
import { getAllBooksAPI, getScrollableBooksAPI, getBooksByIdsAPI } from "../services/apis/user/book";
//-------------------------------------------------------------------------------------------------
export const getAllBooks = (userToken) => {
    return dispatch => {
        dispatch(getAllBooksStarted());
        const agent = DeviceInfo.getUniqueId();
        getAllBooksAPI(agent, userToken)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(getAllBooksSuccess(res.result))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(getAllBooksFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("getAllBooks-action-catch", err.response)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(getAllBooksFailure(err.ecode));
            });
    };
};
//--------------------------------------------------------------------------------------------------
export const getScrollableBooks = (userToken, queryType, scrollId, genres) => {
    return dispatch => {
        dispatch(getScrollableBooksStarted());
        const agent = DeviceInfo.getUniqueId();
        getScrollableBooksAPI(agent, userToken, queryType, scrollId, genres)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(getScrollableBooksSuccess({ scrollId: res.result.scrollId, books: res.result.books, }))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(getScrollableBooksFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("getScrollableBooks-action-catch", err.response)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                } else if (err.errorCode == 400) {
                    dispatch(resetScrollIdSuccess());
                    return;
                }
                dispatch(getScrollableBooksFailure(err.ecode));
            });
    };
};
//--------------------------------------------------------------------------------------------------
export const resetScrollId = () => {
    return dispatch => {
        dispatch(resetScrollIdSuccess());
    };
};
//-------------------------------------------------------------------------------------------------
export const getBooksByIds = (userToken, ids, idsType) => {
    return dispatch => {
        dispatch(getBooksByIdsStarted());
        const agent = DeviceInfo.getUniqueId();
        getBooksByIdsAPI(agent, userToken, ids)
            .then(res => {
                if (res
                    && 'error' in res
                    && !res.error
                    && 'result' in res
                    && res.result) {
                    dispatch(getBooksByIdsSuccess({ books: res.result, idsType }))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(getBooksByIdsFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn("getBooksByIds-action-catch", err.response)
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(getBooksByIdsFailure(err.ecode));
            });
    };
};
//--------------------------------------------------------------------------------------------------

const getAllBooksStarted = () => ({
    type: GET_ALL_BOOKS_STARTED
});

const getAllBooksSuccess = data => ({
    type: GET_ALL_BOOKS_SUCCESS,
    payload: {
        ...data
    }
});

const getAllBooksFailure = error => ({
    type: GET_ALL_BOOKS_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const resetScrollIdSuccess = () => ({
    type: GET_SCROLLABLE_BOOKS_DEFAULT
})
const getScrollableBooksStarted = () => ({
    type: GET_SCROLLABLE_BOOKS_STARTED
});

const getScrollableBooksSuccess = data => ({
    type: GET_SCROLLABLE_BOOKS_SUCCESS,
    payload: {
        ...data
    }
});

const getScrollableBooksFailure = error => ({
    type: GET_SCROLLABLE_BOOKS_FAILURE_NETWORK,
    payload: {
        error
    }
});
//--------------------------------------------------------------------------------------------------

const getBooksByIdsStarted = () => ({
    type: GET_BOOKS_IDS_STARTED
});

const getBooksByIdsSuccess = data => ({
    type: GET_BOOKS_IDS_SUCCESS,
    payload: {
        ...data
    }
});

const getBooksByIdsFailure = error => ({
    type: GET_BOOKS_IDS_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const authenticationReset = () => ({
    type: AUTHENTICATION_RESET
});
// ----------------------------------------------------------------
