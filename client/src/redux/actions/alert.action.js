import alertConstants from "../../constants/alert.constants";

const alertAction = {
    sendAlert,
    clearAlert
}

function sendAlert(message, kind) {
    return async (dispatch) => {
        dispatch(success(message, kind))
        setTimeout(() => {
            dispatch(alertAction.clearAlert())
        }, 4000)
    }
    function success(message, kind) { return {type: alertConstants.ALERT_SEND, message, kind} }
}
function clearAlert() {
    return async (dispatch) => {
        dispatch(success())
    }
    function success() { return {type: alertConstants.ALERT_CLEAR} }
}

export default alertAction

