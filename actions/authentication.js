import {
    AUTHENTICATION_DEFAULT,
    AUTHENTICATION_STARTED,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE_NETWORK,
    AUTHENTICATION_FAILURE_VALIDATION
} from "./types";
// import NavigationService from '../services/navigator';
import DeviceInfo from 'react-native-device-info';
import { loginAPI } from "../services/apis/user/authentication";
// ----------------------------------------------------------------
export const login = (email, password) => {
    return dispatch => {
        dispatch(authenticationReset())
        dispatch(loginStarted());
        const agent = DeviceInfo.getUniqueId();
        console.warn("agent", agent)
        loginAPI(agent, email, password)
            .then(res => {
                if (res.result && 'token' in res.result && res.result.token) {
                    dispatch(loginSuccess({ userToken: res.result.token, agent }));
                    console.warn("token", res.result.token)
                    // NavigationService.navigate('Verify');
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(loginFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn(err.ecode, err.errorCode)
                dispatch(loginFailure(err.ecode));
            });
    };
};

const authenticationReset = () => ({
    type: AUTHENTICATION_DEFAULT
});

const loginStarted = () => ({
    type: AUTHENTICATION_STARTED
});

const loginSuccess = data => ({
    type: AUTHENTICATION_SUCCESS,
    payload: {
        ...data
    }
});

const loginFailure = error => ({
    type: AUTHENTICATION_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------