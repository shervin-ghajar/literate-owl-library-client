// ----------------------------------------------------------------
import {
    GET_ALL_BOOKS_DEFAULT,
    GET_ALL_BOOKS_STARTED,
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_BOOKS_FAILURE_NETWORK,
    GET_ALL_BOOKS_FAILURE_VALIDATION,
} from '../actions/types';
// ----------------------------------------------------------------
const initialState = {
    rtype: GET_ALL_BOOKS_DEFAULT,
    new_books: [],
    free_books: [],
    popular_books: [],
    error: null
};
export function booksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS_STARTED:
            return {
                ...state,
                rtype: GET_ALL_BOOKS_STARTED,
                newBooks: [],
                freeBooks: [],
                popularBooks: [],
                error: null
            };
        case GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                rtype: GET_ALL_BOOKS_SUCCESS,
                newBooks: action.payload.new_books,
                freeBooks: action.payload.free_books,
                popularBooks: action.payload.popular_books,
                error: null
            };
        case GET_ALL_BOOKS_FAILURE_VALIDATION:
            return {
                ...state,
                rtype: GET_ALL_BOOKS_FAILURE_VALIDATION,
                newBooks: [],
                freeBooks: [],
                popularBooks: [],
                error: action.payload.error
            };
        case GET_ALL_BOOKS_FAILURE_NETWORK:
            return {
                ...state,
                rtype: GET_ALL_BOOKS_FAILURE_NETWORK,
                newBooks: [],
                freeBooks: [],
                popularBooks: [],
                error: action.payload.error
            };
        default:
            return state;
    }
}
  // ----------------------------------------------------------------