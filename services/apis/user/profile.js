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
export const getProfileAPI = (agent, userToken) => {
    let { timeout, source } = createTimeout();
    return theAxios
        .get(
            `${serverBaseDomain}/user/profile`,
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
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log("getProfileAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
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
        .put(`${serverBaseDomain}/user/profile`,
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
            return res.data
        })
        .catch(err => {
            console.log("updateProfileAPI_catch", err.response.status);
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
// ----------------------------------------------------------------