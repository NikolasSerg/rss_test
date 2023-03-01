import React from "react";
import {connect} from "react-redux";
import {Alert, Fade, Box} from "@mui/material";
import {isEmpty} from "lodash";
import PropTypes from 'prop-types'

function AlertInfo({alert}) {

    return(
        <>
            { !isEmpty(alert) &&
                <Box sx={{
                    position: 'absolute',
                    bottom: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Fade in={!!alert} timeout={500}>
                        <Alert severity={alert.kind} variant="filled">
                            {alert.message}
                        </Alert>
                    </Fade>
                </Box>
            }
        </>
    )
}

AlertInfo.propTypes = {
    alert: PropTypes.object
}

function mapState (state) {
    const { alertInfo } = state
    const { alert } = alertInfo
    return { alert }
}

const actionCreators = {
}

const AlertInfoConnected = connect(mapState, actionCreators)(AlertInfo)
export { AlertInfoConnected as AlertInfo }