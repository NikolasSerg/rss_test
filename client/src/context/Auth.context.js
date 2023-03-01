import React, {createContext, useCallback, useEffect, useState} from 'react'
import {connect} from "react-redux";
import {isEmpty, debounce} from "lodash";
import authAction from "../redux/actions/auth.actions";
import modalTypeConstants from "../constants/modalType.constants";
import PropTypes from "prop-types";
export const AuthContext = createContext()

const AuthContextHOC = ({ children, user, registering, refresh }) => {

    const [loginModal, setLoginModal] = useState(false)
    const [typeModal, setTypeModal] = useState()

    const openModal = () => {
        setLoginModal(true)
    }

    const closeModal = () => {
        setLoginModal(false)
    }

    const delayRefreshToken = useCallback(
        debounce(() => { refresh() }, 400)
        , [])

    const handleChooseModalType = (type) => {
        if (type === 'SIGN_UP') {
            setTypeModal(modalTypeConstants.SIGN_UP)
        }
        if (type === 'SIGN_IN') {
            setTypeModal(modalTypeConstants.SIGN_IN)
        }
    }

    useEffect(() => {
        if (!!localStorage.getItem('user')) {
            delayRefreshToken()
        }
    }, [])

    useEffect(() => {
        if (loginModal && !registering && !isEmpty(user)) {
            closeModal()
        }
    }, [loginModal, registering, user])

    return (
        <AuthContext.Provider
            value={{
                loginModal,
                setLoginModal,
                openModal,
                closeModal,
                handleChooseModalType,
                typeModal
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

AuthContextHOC.propTypes = {
    children: PropTypes.any,
    user: PropTypes.object,
    registering: PropTypes.bool,
    refresh: PropTypes.func
}

function mapState (state) {
    const { authentication } = state
    const { user, registering } = authentication
    return { user, registering }
}

const actionCreators = {
    refresh: authAction.refresh
}

const AuthContextHOCConnected = connect(mapState, actionCreators)(AuthContextHOC)
export { AuthContextHOCConnected as AuthContextHOC }