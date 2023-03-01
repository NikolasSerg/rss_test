import React, {useEffect, useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import postAction from "../../redux/actions/post.actions";
import {authentication} from "../../redux/reducers/auth.reducer";
import {isEmpty} from "lodash";
import alertAction from "../../redux/actions/alert.action";
import alertConstants from "../../constants/alert.constants";
import PropTypes from "prop-types";

function Post({post, addPost, deletePost, user, sendAlert}) {
    const { pathname } = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddPost = () => {
        if (!isEmpty(user)) {
            addPost(post)
            handleCloseMenu()
        }
    }

    const handleDeletePost = () => {
        deletePost(post._id)
        handleCloseMenu()
    }

    useEffect(() => {
        if (open && isEmpty(user)) {
            sendAlert('You have to sign IN/UP first', alertConstants.ALERT_WARNING)
            setTimeout(() => { handleCloseMenu() }, 2000)
        }
    }, [open, user])

    return (
        <Card sx={{ width: 345, height: 300, margin: '15px' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.creator.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpenMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.title}
                subheader={post.pubDate}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.contentSnippet}
                </Typography>
            </CardContent>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    pathname !== '/mylib' && <MenuItem onClick={handleAddPost} disabled={!user}>Add to Library</MenuItem>
                }
                {
                    pathname === '/mylib' && <MenuItem onClick={handleDeletePost}>Delete from Library</MenuItem>
                }
            </Menu>
        </Card>
    );
}


Post.propTypes = {
    post: PropTypes.object,
    addPost: PropTypes.func,
    deletePost: PropTypes.func,
    user: PropTypes.object,
    sendAlert: PropTypes.func
}

function mapState(state) {
    const { authentication } = state
    const { user } = authentication
    return { user }
}

const actionCreators = {
    addPost: postAction.addPost,
    deletePost: postAction.deletePost,
    sendAlert: alertAction.sendAlert
}

const PostConnected = connect(mapState, actionCreators)(Post)
export { PostConnected as Post }





