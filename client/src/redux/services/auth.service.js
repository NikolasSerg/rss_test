import appConstants from "../../constants/app.constants";
import {handleResponse} from "../../helpers/hendlerResponse";

const authService = {
    registration,
    login,
    logout,
    refresh
}

async function registration(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
        credentials: 'include'
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/registration', requestOptions)
    return handleResponse(response)
}

async function login(email, password) {
    const idToken = localStorage.getItem('')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
        credentials: 'include'
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/login', requestOptions)
    return handleResponse(response)
}

async function logout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/logout', requestOptions)
    return handleResponse(response)
}

async function refresh() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/refresh', requestOptions)
    return handleResponse(response)
}

export default authService