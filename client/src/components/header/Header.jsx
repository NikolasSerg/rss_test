import React, {useContext, useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
import {AuthContext} from "../../context";
import authAction from "../../redux/actions/auth.actions";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import modalTypeConstants from "../../constants/modalType.constants";
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'



function Header({ user, logout }) {
    const history = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [pages, setPages] = useState([
        {title: 'RSS news', method: () => {history('/')}, authAllow: true},
        {title: 'My Library', method: () => {history('/mylib')}, authAllow: false}
    ]);

    const { openModal, handleChooseModalType } = useContext(AuthContext)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlerGoToProfile = () => {
        handleCloseUserMenu()
    };

    const handlerLogOut = () => {
        logout()
        handleCloseUserMenu()
    };

    const handlerOpenSignModal = (type) => {
        openModal()
        handleChooseModalType(type)
    }

    useEffect(() => {
        if (!isEmpty(user)) {
            setPages(prevState => {
                const foundPageIndex = prevState.findIndex(item => item.title === 'My Library')
                prevState[foundPageIndex].authAllow = true
                return prevState
            })
        } else {
            setPages(prevState => {
                const foundPageIndex = prevState.findIndex(item => item.title === 'My Library')
                prevState[foundPageIndex].authAllow = false
                return prevState
            })
        }
    }, [user])

    const settings = [
        { title: 'Profile', method: handlerGoToProfile },
        { title: 'Logout', method: handlerLogOut }
    ];

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            cursor: 'pointer'
                        }}>
                        <img src={require('../../images/rss.svg')} alt="rss_logo"/>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={page.method} disabled={!page.authAllow}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            cursor: 'pointer'
                        }}>
                        <img src={require('../../images/rss.svg')} alt="rss"/>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={page.method}
                                disabled={!page.authAllow}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            { isEmpty(user)
                                ?
                                <div style={{ display: 'flex' }}>
                                    <Button
                                        variant="text"
                                        sx={{color: '#fff', border: '1px solid #fff', marginRight: '20px'}}
                                        onClick={() => {handlerOpenSignModal(modalTypeConstants.SIGN_IN)}}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant="text"
                                        sx={{color: '#fff', border: '1px solid #fff'}}
                                        onClick={() => {handlerOpenSignModal(modalTypeConstants.SIGN_UP)}}
                                    >
                                        Sign Up
                                    </Button>
                                </div>

                                :
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Admin" src={user.profilePicture || ''} />
                                </IconButton>
                            }
                        </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting.title} onClick={setting.method}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

Header.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
}
function mapState (state) {
    const { authentication } = state
    const { user } = authentication
    return { user }
}

const actionCreators = {
    logout: authAction.logout
}

const HeaderConnected = connect(mapState, actionCreators)(Header)
export { HeaderConnected as Header }


