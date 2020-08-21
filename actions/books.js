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
    AUTHENTICATION_RESET,
} from "./types";
import NavigationService from '../services/navigators';
import DeviceInfo from 'react-native-device-info';
import { getAllBooksAPI, getScrollableBooksAPI } from "../services/apis/user/book";
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
//--------------------------------------------------------------------------------------------------
// export const getBooksByGenre = (userToken, username, password) => {
//     return dispatch => {
//         dispatch(updgetAllBooksStarted());
//         const agent = DeviceInfo.getUniqueId();
//         updgetAllBooksAPI(agent, userToken, username, password)
//             .then(res => {
//                 if (res.result && 'error' in res.result && !res.result.error) {
//                     dispatch(authenticationReset())
//                     return;
//                 }
//                 console.warn("BAD_RESPONSE")
//                 dispatch(updgetAllBooksFailure("BAD_RESPONSE"));
//             })
//             .catch(err => {
//                 console.warn(err.ecode, err.errorCode)
//                 if (err.errorCode == 401) {
//                     dispatch(authenticationReset())
//                     return;
//                 }
//                 dispatch(updgetAllBooksFailure(err.ecode));
//             });
//     };
// };
// ----------------------------------------------------------------

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
// ----------------------------------------------------------------
const authenticationReset = () => ({
    type: AUTHENTICATION_RESET
});
// ----------------------------------------------------------------
