import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import './GuestAuth.css'
import Denied from './../../images/denied.jpg'

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center',
        cursor: 'pointer'
    }
}))

function GuestAuth(props) {
    const { confirmDialog } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={Denied} alt={Denied} className="alert_icon" />
                        </IconButton>
                    </center>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {confirmDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {confirmDialog.subtitle}
                    </Typography>

                </DialogContent>
                <DialogActions className={classes.dialogActions}>

                    {confirmDialog.yesButton}
                    {confirmDialog.noButton}
                </DialogActions>
            </Dialog>

        </div>

    )
}

export default GuestAuth