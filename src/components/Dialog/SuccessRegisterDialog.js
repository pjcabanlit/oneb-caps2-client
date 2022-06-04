import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import './ConfirmDialog.css';
import check from './../../images/check.png'
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
export default function SuccessRegisterDialog(props) {
    const { successRegisterDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={successRegisterDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={check} alt={check} className="alert_icon" />
                        </IconButton>
                    </center>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {successRegisterDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {successRegisterDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>

                    {successRegisterDialog.yesButton}
                    {successRegisterDialog.noButton}
                </DialogActions>
            </Dialog>
        </div>
    )
}
