import postConstants from "../../constants/post.constants";
import {isEmpty} from "lodash";
import {uniqBy} from "lodash/array";

const initialState = {
    fetchedPosts: null
}

export function posts (state = initialState, action) {
    switch (action.type) {
        case postConstants.POSTS_GET_ALL_REQUEST:
            return {
                ...state,
                loadingPosts: true
            }
        case postConstants.POSTS_GET_ALL_SUCCESS:
            return {
                ...state,
                loadingPosts: false,
                fetchedPosts: action.data || []
            }
        case postConstants.POSTS_GET_ALL_FAIL:
            return {
                ...state,
                loadingPosts: false,
                error: action.error
            }
        case postConstants.POSTS_GET_MY_REQUEST:
            return {
                ...state,
                loadingMyPosts: true
            }
        case postConstants.POSTS_GET_MY_SUCCESS:
            return {
                ...state,
                loadingMyPosts: false,
                fetchedMyPosts: action.data.posts || [],
                totalLengthMyPosts: action.data.totalLengthCollection || null
            }
        case postConstants.POSTS_GET_MY_FAIL:
            return {
                ...state,
                loadingMyPosts: false,
                error: action.error
            }
        case postConstants.POST_ADD_REQUEST:
            return {
                ...state,
                addingPost: true
            }
        case postConstants.POST_ADD_SUCCESS: {
            let fetchedMyPosts = state.fetchedMyPosts ? state.fetchedMyPosts : []
            if (!isEmpty(action.data)) {
                fetchedMyPosts = uniqBy([...fetchedMyPosts, action.data], 'id')
            }
            return {
                ...state,
                addingPost: false,
                fetchedMyPosts
            }
        }
        case postConstants.POST_ADD_FAIL:
            return {
                ...state,
                addingPost: false,
                error: action.error
            }
        case postConstants.POST_DELETE_REQUEST:
            return {
                ...state,
                deletingPost: true
            }
        case postConstants.POST_DELETE_SUCCESS: {
            let fetchedMyPosts = state.fetchedMyPosts ? state.fetchedMyPosts : []
            if (!isEmpty(fetchedMyPosts) && fetchedMyPosts.find(item => item._id === action.id)) {
                fetchedMyPosts = fetchedMyPosts.filter(item => item._id !== action.id)
            }
            return {
                ...state,
                deletingPost: false,
                fetchedMyPosts
            }
        }
        case postConstants.POST_DELETE_FAIL:
            return {
                ...state,
                deletingPost: false,
                error: action.error
            }
        case postConstants.POSTS_ADD_TO_STORE:
            return {
                ...state,
                searchFetchedPosts: action.posts
            }
        case postConstants.POSTS_CLEAR_FROM_STORE:
            return {
                ...state,
                searchFetchedPosts: null
            }
        case postConstants.POST_SEARCH_REQUEST:
            return {
                ...state,
                searchingMyPosts: true
            }
        case postConstants.POST_SEARCH_SUCCESS:
            return {
                ...state,
                searchingMyPosts: false,
                searchedMyPosts: action.data || []
            }
        case postConstants.POST_SEARCH_FAIL:
            return {
                ...state,
                searchingMyPosts: false,
                error: action.error
            }
        case postConstants.POSTS_CLEAR_MY_FROM_STORE:
            return {
                ...state,
                searchedMyPosts: null
            }

        default:
            return state
    }
}