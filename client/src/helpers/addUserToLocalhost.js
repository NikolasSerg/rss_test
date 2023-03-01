import {isEmpty} from "lodash";

export function addUserToLocalhost(data) {
    if (!isEmpty(data.user)) {
        localStorage.setItem('user', JSON.stringify(data.user))
    }
}