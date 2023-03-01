import alertConstants from "../../constants/alert.constants";

const initialState = {
    alert: null
}

export function alertInfo (state = initialState, action) {
    switch (action.type) {
        case alertConstants.ALERT_SEND:
            return {
                alert: {message: action.message, kind: action.kind}
            }
        case alertConstants.ALERT_CLEAR:
            return {
                alert: null
            }

        default:
            return state
    }
}