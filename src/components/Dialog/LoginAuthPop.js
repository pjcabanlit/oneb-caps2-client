import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import './ConfirmDialog.css';
import error_icon from './../../images/error_icon.png'
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
export default function LoginAuthPop(props) {
    const { errorDialog } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog open={errorDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={error_icon} alt={error_icon} className="alert_icon" />
                        </IconButton>
                    </center>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {errorDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {errorDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {errorDialog.noButton}
                </DialogActions>
            </Dialog>
        </div>

    )
}