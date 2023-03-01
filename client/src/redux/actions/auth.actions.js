import authConstants from "../../constants/auth.constants";
import authService from "../services/auth.service";
import {addAuthToken} from "../../helpers/addAuthToken";
import {addUserToLocalhost} from "../../helpers/addUserToLocalhost";
import alertAction from "./alert.action";
import alertConstants from "../../constants/alert.constants";

const authAction = {
    registration,
    login,
    logout,
    refresh
}

function registration (email, password) {
    return async (dispatch) => {
        dispatch(request(email, password))
        authService.registration(email, password)
            .then(({data}) => {
                addAuthToken(data)
                addUserToLocalhost(data)
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request (email, password) { return { type: authConstants.REGISTRATION_REQUEST, email, password } }
    function success (data) { return { type: authConstants.REGISTRATION_SUCCESS, data } }
    function failure (error) { return { type: authConstants.REGISTRATION_FAIL, error } }
}

function login(email, password)  {
    return async (dispatch) => {
        dispatch(request)
        const tokenId = localStorage.getItem('refreshToken')
        authService.login(email, password)
            .then(({data}) => {
                addAuthToken(data)
                addUserToLocalhost(data)
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request () { return { type: authConstants.LOGIN_REQUEST } }
    function success (data) { return { type: authConstants.LOGIN_SUCCESS, data } }
    function failure (error) { return { type: authConstants.LOGIN_FAIL, error } }
}

function logout()  {
    return async (dispatch) => {
        dispatch(request)
        authService.logout()
            .then(() => {
                dispatch(success())
                localStorage.clear()
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request () { return { type: authConstants.LOGOUT_REQUEST } }
    function success () { return { type: authConstants.LOGOUT_SUCCESS } }
    function failure (error) { return { type: authConstants.LOGOUT_FAIL, error } }
}

function refresh()  {
    return async (dispatch) => {
        dispatch(request)
        authService.refresh()
            .then(({data}) => {
                addAuthToken(data)
                addUserToLocalhost(data)
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })

    }

    function request () { return { type: authConstants.REFRESH_REQUEST } }
    function success (data) { return { type: authConstants.REFRESH_SUCCESS, data } }
    function failure (error) { return { type: authConstants.REFRESH_FAIL, error } }
}

export default authAction