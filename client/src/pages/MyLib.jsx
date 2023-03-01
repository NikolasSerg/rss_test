import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {Pagination, Stack, Box} from "@mui/material";
import {Post} from "../components/post/Post";
import postAction from "../redux/actions/post.actions";
import {debounce, isEmpty} from "lodash";
import postConstants from "../constants/post.constants";
import {isNull} from "lodash/lang";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types'

function MyLib({getMyPosts, fetchedMyPosts, totalLengthMyPosts, searchedMyPosts, user}) {

    const [myPosts, setMyPost] = useState([])
    const [page, setPage] = useState(1);
    const [countPages, setCountPages] = useState(1);

    const history = useNavigate()
    const handleChange = (event, value) => {
        setPage(value);
    };

    const delayGetMyPosts = useCallback(
        debounce((page) => { getMyPosts(page) }, 400)
        , [])

    useEffect(() => {
        isEmpty(user) && history('/')
    }, [user])

    useEffect(() => {
        setMyPost(fetchedMyPosts)
    }, [fetchedMyPosts])

    useEffect(() => {
        !!page && delayGetMyPosts(page)
    }, [page])

    useEffect(() => {
        setCountPages(Math.ceil(totalLengthMyPosts / postConstants.POST_DISPLAY_LIMIT))
    }, [totalLengthMyPosts])

    useEffect(() => {
        if (!isEmpty(searchedMyPosts)) {
            setMyPost(searchedMyPosts)
            setPage(null)
        }
        if (isNull(searchedMyPosts)) {
            setPage(1)
        }
    }, [searchedMyPosts])

    return(
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'start'}}>
                {!isEmpty(myPosts)
                    ?
                    myPosts.map((post, index) => {
                        return <Post post={post} key={index}/>
                    })
                    : null
                }
            </Box>
            { !isEmpty(myPosts) && isEmpty(searchedMyPosts) &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack spacing={2}>
                        <Pagination count={countPages} page={page} color="primary" onChange={handleChange}/>
                    </Stack>
                </Box>
            }
        </Box>
    )
}

MyLib.propTypes = {
    getMyPosts: PropTypes.func,
    fetchedMyPosts: PropTypes.array,
    totalLengthMyPosts: PropTypes.number,
    searchedMyPosts: PropTypes.array,
    user: PropTypes.object
}

function mapState(state) {
    const { posts, authentication } = state
    const { user } = authentication
    const { fetchedMyPosts, totalLengthMyPosts, searchedMyPosts } = posts
    return { fetchedMyPosts, totalLengthMyPosts, searchedMyPosts, user }
}

const actionCreators = {
    getMyPosts: postAction.getMyPosts
}

const MyLibConnected = connect(mapState, actionCreators)(MyLib)
export { MyLibConnected as MyLib }







