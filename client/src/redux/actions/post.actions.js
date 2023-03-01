import postConstants from "../../constants/post.constants";
import alertConstants from "../../constants/alert.constants";
import postService from "../services/post.service";
import alertAction from "./alert.action";

const postAction = {
    getAllPost,
    getMyPosts,
    addPost,
    deletePost,
    searchMyPosts,
    addToStoreSearchingPosts,
    clearSearchingPosts,
    clearSearchingMyPosts
}

function getAllPost () {
    return async (dispatch) => {
        dispatch(request())
        postService.getAllPost()
            .then(({data}) => {
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request () { return { type: postConstants.POSTS_GET_ALL_REQUEST } }
    function success (data) { return { type: postConstants.POSTS_GET_ALL_SUCCESS, data } }
    function failure (error) { return { type: postConstants.POSTS_GET_ALL_FAIL, error } }
}
function getMyPosts (count) {
    return async (dispatch) => {
        dispatch(request())
        postService.getMyPosts(count)
            .then(({data}) => {
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_INFO))
                dispatch(failure(e))
            })
    }
    function request () { return { type: postConstants.POSTS_GET_MY_REQUEST } }
    function success (data) { return { type: postConstants.POSTS_GET_MY_SUCCESS, data } }
    function failure (error) { return { type: postConstants.POSTS_GET_MY_FAIL, error } }
}
function addPost(post) {
    return async (dispatch) => {
        dispatch(request())
        postService.addPost(post)
            .then(({data}) => {
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_INFO))
                dispatch(failure(e))
            })
    }
    function request () { return { type: postConstants.POST_ADD_REQUEST } }
    function success (data) { return { type: postConstants.POST_ADD_SUCCESS, data } }
    function failure (error) { return { type: postConstants.POST_ADD_FAIL, error } }
}

function deletePost(id) {
    return async (dispatch) => {
        dispatch(request(id))
        postService.deletePost(id)
            .then(() => {
                dispatch(success(id))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request () { return { type: postConstants.POST_DELETE_REQUEST } }
    function success (id) { return { type: postConstants.POST_DELETE_SUCCESS, id } }
    function failure (error) { return { type: postConstants.POST_DELETE_FAIL, error } }
}

function searchMyPosts(text) {
    return async (dispatch) => {
        dispatch(request(text))
        postService.searchMyPosts(text)
            .then(({data}) => {
                dispatch(success(data))
            })
            .catch((e) => {
                dispatch(alertAction.sendAlert(e, alertConstants.ALERT_ERROR))
                dispatch(failure(e))
            })
    }
    function request () { return { type: postConstants.POST_SEARCH_REQUEST } }
    function success (data) { return { type: postConstants.POST_SEARCH_SUCCESS, data } }
    function failure (error) { return { type: postConstants.POST_SEARCH_FAIL, error } }
}

function addToStoreSearchingPosts(posts) {
    return async (dispatch) => {
        dispatch(success(posts))
    }
    function success (posts) { return { type: postConstants.POSTS_ADD_TO_STORE, posts } }
}

function clearSearchingPosts() {
    return async (dispatch) => {
        dispatch(success())
    }
    function success () { return { type: postConstants.POSTS_CLEAR_FROM_STORE } }
}

function clearSearchingMyPosts() {
    return async (dispatch) => {
        dispatch(success())
    }
    function success () { return { type: postConstants.POSTS_CLEAR_MY_FROM_STORE } }
}


export default postAction







