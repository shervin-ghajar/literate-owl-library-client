import {
    AUTHENTICATION_RESET,
    GET_PROFILE_DEFAULT,
    GET_PROFILE_STARTED,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE_NETWORK,
    GET_PROFILE_FAILURE_VALIDATION,
} from "./types";
import NavigationService from '../services/navigators';
import DeviceInfo from 'react-native-device-info';
import { getProfileAPI, updateProfileAPI } from "../services/apis/user/profile";
//-------------------------------------------------------------------------------------------------
export const getProfile = (userToken) => {
    return dispatch => {
        dispatch(getProfileStarted());
        const agent = DeviceInfo.getUniqueId();
        getProfileAPI(agent, userToken)
            .then(res => {
                if (res && 'error' in res && !res.error) {
                    dispatch(getProfileSuccess(res.result))
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(getProfileFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(getProfileFailure(err.ecode));
            });
    };
};
//--------------------------------------------------------------------------------------------------
export const updateProfile = (userToken, username, password) => {
    return dispatch => {
        dispatch(updateProfileStarted());
        const agent = DeviceInfo.getUniqueId();
        updateProfileAPI(agent, userToken, username, password)
            .then(res => {
                if (res.result && 'error' in res.result && !res.result.error) {
                    dispatch(authenticationReset())
                    return;
                }
                console.warn("BAD_RESPONSE")
                dispatch(updateProfileFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                console.warn(err.ecode, err.errorCode)
                if (err.errorCode == 401) {
                    dispatch(authenticationReset())
                    return;
                }
                dispatch(updateProfileFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------

const getProfileStarted = () => ({
    type: GET_PROFILE_STARTED
});

const getProfileSuccess = data => ({
    type: GET_PROFILE_SUCCESS,
    payload: {
        ...data
    }
});

const getProfileFailure = error => ({
    type: GET_PROFILE_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const authenticationReset = () => ({
    type: AUTHENTICATION_RESET
});
// ----------------------------------------------------------------
