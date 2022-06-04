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
export default function SuccessDialog(props) {
    const { successDialog } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog open={successDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={check} alt={check} className="alert_icon" />
                        </IconButton>
                    </center>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {successDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {successDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {successDialog.noButton}
                </DialogActions>
            </Dialog>
        </div>

    )
}