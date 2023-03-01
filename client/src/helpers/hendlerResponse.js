export function handleResponse (response) {
    return response
        .text()
        .then((text) => {
            const data = text && text !== 'Unauthorized' && JSON.parse(text)
            if (!response.ok) {
                const error = (data && (data.message || data.description)) || response.statusText
                return Promise.reject(error)
            }
            return data
        })
}