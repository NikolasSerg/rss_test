import React, {useCallback, useEffect, useState} from "react";
import {IconButton, InputAdornment, TextField, Box} from "@mui/material";
import {Search, Close} from "@mui/icons-material";
import {debounce} from "lodash";
import postAction from "../../redux/actions/post.actions";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function SearchPanel({ searchMyPosts, fetchedPosts, addToStoreSearchingPosts, clearSearchingPosts, clearSearchingMyPosts }) {
    const { pathname } = useLocation();
    const [searchText, setSearchText] = useState('')

    const handlerClearSearchText = () => {
        setSearchText('')
        if (pathname === '/mylib') {
            clearSearchingMyPosts()
        }
        if (pathname === '/') {
            clearSearchingPosts()
        }
    }

    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value)
    }

    const delayGetMyPosts = useCallback(
        debounce((searchText) => { searchMyPosts(searchText) }, 800)
        , [])

    const delayGetAllPosts = useCallback(
        debounce((searchText, fetchedPosts) => {
            const regex = new RegExp(searchText, "i");
            const result = fetchedPosts.filter(item => item.title.match(regex))
            addToStoreSearchingPosts(result)
        }, 800)
        , [])

    useEffect(() => {
        if (searchText.length > 2 ) {
            if (pathname === '/mylib') {
                delayGetMyPosts(searchText)
            }
            if (pathname === '/') {
                delayGetAllPosts(searchText, fetchedPosts)
            }
        }
        if (searchText.length === 0) {
            handlerClearSearchText()
        }
    }, [searchText, fetchedPosts])

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
                InputProps={{
                    value: searchText,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handlerClearSearchText}>
                                <Close />
                            </IconButton>
                        </InputAdornment>
                    )
            }}
                onChange={handleChangeSearchText}
                placeholder="Enter text for searching in titles"/>
        </Box>
    )
}

SearchPanel.propTypes = {
    searchMyPosts: PropTypes.func,
    fetchedPosts: PropTypes.array,
    addToStoreSearchingPosts: PropTypes.func,
    clearSearchingPosts: PropTypes.func,
    clearSearchingMyPosts: PropTypes.func
}

function mapState(state) {
    const { posts } = state
    const { fetchedPosts } = posts
    return { fetchedPosts }
}

const actionCreators = {
    searchMyPosts: postAction.searchMyPosts,
    addToStoreSearchingPosts: postAction.addToStoreSearchingPosts,
    clearSearchingPosts: postAction.clearSearchingPosts,
    clearSearchingMyPosts: postAction.clearSearchingMyPosts
}

const SearchPanelConnected = connect(mapState, actionCreators)(SearchPanel)
export { SearchPanelConnected as SearchPanel }




