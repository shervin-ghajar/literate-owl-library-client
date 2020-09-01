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
export const handleWishlistAPI = (agent, userToken, bookId) => {
    console.log(agent, userToken)
    let { timeout, source } = createTimeout();
    return theAxios
        .post(
            `${serverBaseDomain}/user/wishlist/${bookId}`,
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
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log("handleWishlistAPI_catch", err.response.status);
            let errorCode = 0;
            if ("response" in err
                && err.response
                && "status" in err.response
                && err.response.status) {
                errorCode = err.response.status
            }
            return Promise.reject({
                ecode: "Services:APIs:User:Profile:HandleWishlistAPI:2",
                err, errorCode
            });
        });
};
// ----------------------------------------------------------------