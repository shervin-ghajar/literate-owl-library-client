import { serverBaseDomain } from "../../../config";
// ----------------------------------------------------------------
import axios from "axios";
// ----------------------------------------------------------------
const theAxios = axios.create({
    timeout: 5000
});
// ----------------------------------------------------------------
function createTimeout() {
    let source = axios.CancelToken.source();
    let timeout = setTimeout(() => {
        source.cancel();
    }, 5000);
    return { timeout, source };
};
// ----------------------------------------------------------------
export const getAllBooksAPI = (agent, userToken) => {
    let { timeout, source } = createTimeout();
    return theAxios
        .get(
            `${serverBaseDomain}/books`,
            {
                cancelToken: source.token,
                headers: {
                    agent,
                    Authorization: `bearer ${userToken}`
                }
            }
        )
        .then(res => {
            clearTimeout(timeout);
            return res.data
        })
        .catch(err => {
            console.warn(err)
            console.warn("getAllBooksAPI_catch", err.response);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Book:GetAllBooks:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const getScrollableBooksAPI = (agent, userToken, queryType, scrollId, genres) => {
    let { timeout, source } = createTimeout();
    let body = {
        "queryType": queryType,
        "scrollId": scrollId,
        "genres": genres
    }
    return theAxios
        .post(
            `${serverBaseDomain}/books/scroll`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent,
                    Authorization: `bearer ${userToken}`
                }
            }
        )
        .then(res => {
            clearTimeout(timeout);
            return res.data
        })
        .catch(err => {
            console.warn(err)
            console.warn("getScrollableBooksAPI_catch", err.response);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Book:GetScrollableBooks:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const getBooksByIdsAPI = (agent, userToken, ids) => {
    let { timeout, source } = createTimeout();
    let body = {
        "ids": ids
    }
    return theAxios
        .post(
            `${serverBaseDomain}/books/ids`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent,
                    Authorization: `bearer ${userToken}`
                }
            }
        )
        .then(res => {
            clearTimeout(timeout);
            console.warn(res.data)
            return res.data
        })
        .catch(err => {
            console.warn(err)
            console.warn("getBooksByIdsAPI_catch", err.response);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Book:GetBooksByIdsAPI:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const searchAPI = (agent, userToken, query) => {
    let { timeout, source } = createTimeout();
    let body = {
        "query": query
    }
    return theAxios
        .post(
            `${serverBaseDomain}/books/search`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent,
                    Authorization: `bearer ${userToken}`
                }
            }
        )
        .then(res => {
            clearTimeout(timeout);
            return res.data
        })
        .catch(err => {
            console.warn(err)
            console.warn("searchAPI_catch", err.response);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Book:SearchAPI:2",
                err, errorCode
            });
        });
};