import {
    AUTHENTICATION_DEFAULT,
    AUTHENTICATION_STARTED,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE_NETWORK,
    AUTHENTICATION_FAILURE_VALIDATION,
    AUTHENTICATION_RESET,
    GET_PROFILE_SUCCESS,
    LOGOUT_STARTED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE_NETWORK,
    LOGOUT_FAILURE_VALIDATION,
} from "./types";
import NavigationService from '../services/navigators';
import DeviceInfo from 'react-native-device-info';
import { loginAPI, signupAPI, logoutAPI } from "../services/apis/user/authentication";
import { greyBlueBackground, whiteColor, errorColor, dullOrangeColor } from "../assets/colors";
import { showMessage, hideMessage } from "react-native-flash-message";
// ----------------------------------------------------------------
export const login = (email, password) => {
    return dispatch => {
        dispatch(authenticationReset())
        dispatch(authenticationStarted());
        const agent = DeviceInfo.getUniqueId();
        loginAPI(agent, email, password)
            .then(res => {
                if (res.result
                    && 'token' in res.result
                    && 'profile' in res.result
                    && res.result.token
                    && res.result.profile) {
                    dispatch(authenticationSuccess({ userToken: res.result.token, agent }));
                    dispatch(getProfileSuccess(res.result.profile))
                    let { username } = res.result.profile
                    showMessage({
                        message: `Welcome back ${username}`,
                        type: 'none',
                        duration: 4000,
                        backgroundColor: greyBlueBackground,
                        textStyle: {
                            fontFamily: "Roboto-Regular",
                            fontSize: 15
                        },
                        color: whiteColor
                    });
                    return;
                }
                console.log("BAD_RESPONSE")
                dispatch(authenticationFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                // console.log(err.ecode, err.errorCode)
                // console.log("err.errorCode", err.errorCode)
                switch (err.errorCode) {
                    case 404:
                        showMessage({
                            message: 'User not found!',
                            type: 'none',
                            duration: 5000,
                            backgroundColor: dullOrangeColor,
                            textStyle: {
                                fontFamily: "Roboto-Bold",
                                fontSize: 15
                            },
                            color: whiteColor
                        });
                        break;
                }
                dispatch(authenticationFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
export const signup = (email, username, password) => {
    return dispatch => {
        dispatch(authenticationReset())
        dispatch(authenticationStarted());
        const agent = DeviceInfo.getUniqueId();
        signupAPI(agent, email, username, password)
            .then(res => {
                if (res.result && 'token' in res.result && res.result.token) {
                    dispatch(authenticationSuccess({ userToken: res.result.token, agent }));
                    let profile = {
                        email,
                        username,
                        balance: 0,
                        wishlist: [],
                        purchased: [],
                    }
                    dispatch(getProfileSuccess(profile))
                    showMessage({
                        message: `Welcome ${username}`,
                        type: 'none',
                        duration: 4000,
                        backgroundColor: greyBlueBackground,
                        textStyle: {
                            fontFamily: "Roboto-Regular",
                            fontSize: 15
                        },
                        color: whiteColor
                    });
                    return;
                }
                console.log("BAD_RESPONSE")
                dispatch(authenticationFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                // console.log(err.ecode, err.errorCode)
                if (err.errorCode == 409) {
                    showMessage({
                        message: 'User already exist!',
                        type: 'none',
                        duration: 5000,
                        backgroundColor: dullOrangeColor,
                        textStyle: {
                            fontFamily: "Roboto-Bold",
                            fontSize: 15
                        },
                        color: whiteColor
                    });
                }
                dispatch(authenticationFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
export const logout = (userToken) => {
    return dispatch => {
        dispatch(logoutStarted());
        const agent = DeviceInfo.getUniqueId();
        logoutAPI(agent, userToken)
            .then(res => {
                if (res && 'error' in res && !res.error) {
                    dispatch(authenticationReset())
                    return;
                }
                console.log("BAD_RESPONSE")
                dispatch(logoutFailure("BAD_RESPONSE"));
            })
            .catch(err => {
                // console.log(err.ecode, err.errorCode)
                dispatch(logoutFailure(err.ecode));
            });
    };
};
// ----------------------------------------------------------------
const authenticationReset = () => ({
    type: AUTHENTICATION_RESET
});

const authenticationStarted = () => ({
    type: AUTHENTICATION_STARTED
});

const authenticationSuccess = data => ({
    type: AUTHENTICATION_SUCCESS,
    payload: {
        ...data
    }
});

const authenticationFailure = error => ({
    type: AUTHENTICATION_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const logoutStarted = () => ({
    type: LOGOUT_STARTED
});

const logoutSuccess = data => ({
    type: LOGOUT_SUCCESS,
    payload: {
        ...data
    }
});

const logoutFailure = error => ({
    type: LOGOUT_FAILURE_NETWORK,
    payload: {
        error
    }
});
// ----------------------------------------------------------------
const getProfileSuccess = data => ({
    type: GET_PROFILE_SUCCESS,
    payload: {
        ...data
    }
});