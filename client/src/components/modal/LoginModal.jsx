import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../../context";
import { connect } from 'react-redux'
import {authentication} from "../../redux/reducers/auth.reducer";
import authAction from "../../redux/actions/auth.actions";
import { isEmpty } from 'lodash'
import {Box, Button, Typography, Modal, ClickAwayListener, FormControl, TextField, IconButton} from "@mui/material";
import Close from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

function LoginModal({ registration, registering, login, logging }) {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [validPassword, setValidPassword] = useState()
    const [validEmail, setValidEmail] = useState()


    const { loginModal, openModal, closeModal, typeModal } = useContext(AuthContext)

    const validatorEmail = (email) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        setValidPassword(event.target.value.length > 3)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
        setValidEmail(validatorEmail(event.target.value))
    }

    const handlerSigning = () => {
        if (!isEmpty(password) && !isEmpty(email)) {
            if (typeModal === 'SIGN_UP') {
                registration(email, password)
            }
            if (typeModal === 'SIGN_IN') {
                login(email, password)
            }
        }
    }

    return (
        <div>
            { loginModal &&
                <ClickAwayListener onClickAway={closeModal}>
                    <Modal
                        open={!!loginModal}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box sx = {{
                                display: 'flex',
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                            }}>
                                <IconButton onClick={closeModal}>
                                    <Close />
                                </IconButton>
                            </Box>
                            <FormControl fullWidth>
                                <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                                    Please write your credentials <br/>
                                    for
                                    <br/>
                                    {typeModal.replace("_", " ")}
                                </Typography>

                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    autoComplete="current-email"
                                    onChange={handleEmail}
                                    fullWidth
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handlePassword}
                                    fullWidth
                                    margin="normal"
                                    sx={{ marginBottom: 5 }}
                                />
                                <Button variant="contained"
                                        size="large"
                                        onClick={handlerSigning}
                                        disabled={!(validEmail && validPassword)}
                                >
                                    { registering || logging
                                        ? 'Loading'
                                        : typeModal.replace("_", " ")
                                    }
                                </Button>
                            </FormControl>
                        </Box>
                    </Modal>
                </ClickAwayListener>
            }
        </div>
    );
}

LoginModal.propTypes = {
    registration: PropTypes.func,
    registering: PropTypes.bool,
    login: PropTypes.func,
    logging: PropTypes.bool
}

function mapState (state) {
    const { authentication } = state
    const { user, registering, logging } = authentication
    return { user, registering, logging }
}

const actionCreators = {
    registration: authAction.registration,
    login: authAction.login
}

const LoginModalConnected = connect(mapState, actionCreators)(LoginModal)
export { LoginModalConnected as LoginModal }