import appConstants from "../../constants/app.constants";
import {handleResponse} from "../../helpers/hendlerResponse";
import {getAuthToken} from "../../helpers/getAuthToken";

const postService = {
    getAllPost,
    getMyPosts,
    addPost,
    deletePost,
    searchMyPosts
}

async function getAllPost() {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: getAuthToken(), 'Content-Type': 'application/json' },
        credentials: 'include'
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/rss_posts', requestOptions)
    return handleResponse(response)
}

async function getMyPosts(count) {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: getAuthToken(), 'Content-Type': 'application/json' }
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + `/posts/${count}`, requestOptions)
    return handleResponse(response)
}

async function addPost(post) {
    const requestOptions = {
        method: 'POST',
        headers: { Authorization: getAuthToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify({post})
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + '/add_post', requestOptions)
    return handleResponse(response)
}

async function deletePost(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { Authorization: getAuthToken(), 'Content-Type': 'application/json' }
    }
    const response = await fetch(appConstants.SERVER_BASE_URL + `/delete_post/${id}`, requestOptions)
    return handleResponse(response)
}

async function searchMyPosts(text) {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: getAuthToken(), 'Content-Type': 'application/json' }
    }
    const queryParams = `?text=${text}`
    const response = await fetch(appConstants.SERVER_BASE_URL + '/search' + queryParams, requestOptions)
    return handleResponse(response)
}

export default postService









