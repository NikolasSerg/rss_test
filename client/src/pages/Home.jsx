import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {debounce, isEmpty} from "lodash";
import {Post} from "../components/post/Post";
import {Pagination, Stack, Box} from "@mui/material";
import postConstants from "../constants/post.constants";
import {isNull} from "lodash/lang";
import postAction from "../redux/actions/post.actions";
import PropTypes from "prop-types";

function Home({ fetchedPosts, searchFetchedPosts, getAllPost }) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [countPages, setCountPages] = useState(1);

    const delayGetAllPosts = useCallback(
        debounce((page) => { getAllPost() }, 500)
        , [])

    useEffect(() => {
        delayGetAllPosts()
    }, [])

    useEffect(() => {
        if (!isEmpty(fetchedPosts)) {
            if (page === 1) {
                setPosts(fetchedPosts.slice(0, postConstants.POST_DISPLAY_LIMIT * page))
            }
            if (page > 1) {
                setPosts(fetchedPosts.slice(postConstants.POST_DISPLAY_LIMIT * (page - 1), postConstants.POST_DISPLAY_LIMIT * page))
            }
            setCountPages(Math.ceil(fetchedPosts.length / postConstants.POST_DISPLAY_LIMIT))
        }
    }, [fetchedPosts, page])


    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if (!isEmpty(searchFetchedPosts)) {
            setPosts(searchFetchedPosts)
            setPage(null)
        }
        if (isNull(searchFetchedPosts)) {
            setPage(1)
        }
    }, [searchFetchedPosts])

    return(
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'start'}}>
                {
                    posts.map((post, index) => {
                        return <Post post={post} key={index}/>
                    })
                }
            </Box>
            { !isEmpty(posts) && isEmpty(searchFetchedPosts) &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack spacing={2}>
                        <Pagination count={countPages} page={page} color="primary" onChange={handleChange}/>
                    </Stack>
                </Box>
            }
        </Box>
    )
}

    Home.propTypes = {
        fetchedPosts: PropTypes.array,
        searchFetchedPosts: PropTypes.array,
        getAllPost: PropTypes.func
    }

    function mapState(state) {
        const { posts } = state
        const { fetchedPosts, searchFetchedPosts } = posts
        return { fetchedPosts, searchFetchedPosts }
    }

    const actionCreators = {
        getAllPost: postAction.getAllPost
    }

    const HomeConnected = connect(mapState, actionCreators)(Home)
    export { HomeConnected as Home }