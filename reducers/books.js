// ----------------------------------------------------------------
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
} from '../actions/types';
// ----------------------------------------------------------------
const initialState = {
    rtype: GET_ALL_BOOKS_DEFAULT,
    scrlType: GET_SCROLLABLE_BOOKS_DEFAULT,
    new_books: [],
    free_books: [],
    popular_books: [],
    scrollableBooks: [],
    scrollId: null,
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
        //------------------------------------------------------------
        case GET_SCROLLABLE_BOOKS_DEFAULT:
            return {
                ...state,
                scrlType: GET_SCROLLABLE_BOOKS_DEFAULT,
                scrollableBooks: [],
                scrollId: null,
                error: null
            }
        case GET_SCROLLABLE_BOOKS_STARTED:
            return {
                ...state,
                scrlType: GET_SCROLLABLE_BOOKS_STARTED,
                error: null
            };
        case GET_SCROLLABLE_BOOKS_SUCCESS:
            let scrlBooks = state.scrollableBooks
            let newScrlBooks = action.payload.books
            let scrollableBooks = [...scrlBooks, ...newScrlBooks]
            return {
                ...state,
                scrlType: GET_SCROLLABLE_BOOKS_SUCCESS,
                scrollableBooks,
                scrollId: action.payload.scrollId,
                error: null
            };
        case GET_SCROLLABLE_BOOKS_FAILURE_VALIDATION:
            return {
                ...state,
                scrlType: GET_SCROLLABLE_BOOKS_FAILURE_VALIDATION,
                scrollableBooks: [],
                scrollId: null,
                error: action.payload.error
            };
        case GET_SCROLLABLE_BOOKS_FAILURE_NETWORK:
            return {
                ...state,
                scrlType: GET_SCROLLABLE_BOOKS_FAILURE_NETWORK,
                scrollableBooks: [],
                scrollId: null,
                error: action.payload.error
            };
        default:
            return state;
    }
}
  // ----------------------------------------------------------------