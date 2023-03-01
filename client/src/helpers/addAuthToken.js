export function addAuthToken(data) {
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken)
    }
}