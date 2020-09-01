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
export const loginAPI = (agent, email, password) => {
    let { timeout, source } = createTimeout();
    let body = {
        "email": email,
        "password": password
    }
    return theAxios
        .post(
            `${serverBaseDomain}/user/authentication/login`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent
                }
            }
        )
        .then(res => {
            clearTimeout(timeout);
            return res.data
        })
        .catch(err => {
            console.log("loginAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Authentication:Login:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const signupAPI = (agent, email, username, password) => {
    let { timeout, source } = createTimeout();
    let body = {
        "username": username,
        "email": email,
        "password": password
    }
    return theAxios
        .post(`${serverBaseDomain}/user/authentication/signup`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent
                }
            })
        .then(res => {
            clearTimeout(timeout);
            return res.data
        })
        .catch(err => {
            console.log("signupAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Authentication:Signup:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const logoutAPI = (agent, userToken) => {
    let { timeout, source } = createTimeout();
    return theAxios
        .post(
            `${serverBaseDomain}/user/authentication/logout`,
            {},
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
            console.log("logoutAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Authentication:Logout:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------