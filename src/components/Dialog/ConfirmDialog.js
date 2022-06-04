import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import './ConfirmDialog.css';
import alert_icon from './../../images/user_auth_icon.png'
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
export default function ConfirmDialog(props) {
    const { confirmDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={alert_icon} alt={alert_icon} className="alert_icon" />
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
