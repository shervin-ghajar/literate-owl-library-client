import { config } from "../../../config";
const serverIPAddress = config.serverIPAddress
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
export const getProfileAPI = (agent, userToken) => {
    let { timeout, source } = createTimeout();
    return theAxios
        .get(
            `${serverIPAddress}/user/profile`,
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
            console.warn(res)
            return res.data
        })
        .catch(err => {
            console.warn("getProfileAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                switch (err.response.status) {
                    case 400:
                        errorCode = 400;
                        break;
                    case 404:
                        errorCode = 404;
                        break;
                    default:
                        errorCode = 401;
                        break;
                }
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Profile:GetProfile:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------
export const updateProfileAPI = (agent, userToken, username, password) => {
    let { timeout, source } = createTimeout();
    let body = {
        "username": username,
        "password": password
    }
    return theAxios
        .put(`${serverIPAddress}/user/profile`,
            body,
            {
                cancelToken: source.token,
                headers: {
                    agent,
                    Authorization: `bearer ${userToken}`
                }
            })
        .then(res => {
            clearTimeout(timeout);
            console.warn("res", res)
            return res.data
        })
        .catch(err => {
            console.warn("updateProfileAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Profile:UpdateProfile:2",
                err, errorCode
            });
        });
};