import authConstants from "../../constants/auth.constants";

const initialState = {
    user: null,
    registering: false
}

export function authentication (state = initialState, action) {
    switch (action.type) {
        case authConstants.REGISTRATION_REQUEST:
            return {
                ...state,
                registering: true,
                user: action.user
            }
        case authConstants.REGISTRATION_SUCCESS:
            return {
                ...state,
                registering: false,
                user: action.data.user || null
            }
        case authConstants.REGISTRATION_FAIL:
            return {
                ...state,
                registering: false,
                error: action.error
            }
        case authConstants.REFRESH_REQUEST:
            return {
                ...state,
                refreshing: true
            }
        case authConstants.REFRESH_SUCCESS:
            return {
                ...state,
                refreshing: false,
                user: action.data.user || null
            }
        case authConstants.REFRESH_FAIL:
            return {
                ...state,
                refreshing: false,
                error: action.error
            }
        case authConstants.LOGOUT_REQUEST:
            return {
                ...state,
                logouting: true
            }
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                logouting: false,
                user: null
            }
        case authConstants.LOGOUT_FAIL:
            return {
                ...state,
                logouting: false,
                error: action.error
            }
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                logging: true
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                logging: false,
                user: action.data.user || null
            }
        case authConstants.LOGIN_FAIL:
            return {
                ...state,
                logging: false,
                error: action.error
            }


        default:
            return state
    }
}