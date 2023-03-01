import React from "react";
import postAction from "./redux/actions/post.actions";
import {connect} from "react-redux";
import Router from "./router/Router";
import {CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {SearchPanel} from "./components/searchPanel/SearchPanel";
import {AlertInfo} from "./components/alert/AlertInfo";

function Main() {
    return(
        <div>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Box sx={{ bgcolor: '#e5e6e7', height: 'calc(100vh - 100px)', padding: '30px 30px 0', display: 'flex', flexDirection: 'column' }} >
                    <SearchPanel />
                    <Router />
                </Box>
                <AlertInfo />
            </Container>

        </div>
    )
}

function mapState(state) {
    const { posts } = state
    const { fetchedMyPosts, totalLengthMyPosts } = posts
    return { fetchedMyPosts, totalLengthMyPosts }
}

const actionCreators = {
    getMyPosts: postAction.getMyPosts
}

const MainConnected = connect(mapState, actionCreators)(Main)
export { MainConnected as Main }