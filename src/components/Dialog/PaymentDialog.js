import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography, Input } from '@material-ui/core'
import React from 'react'
import './ConfirmDialog.css';
import upload from './../../images/upload.png'

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
export default function PaymentDialog(props) {
    const { paymentDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={paymentDialog.isOpen} classes={{ paper: classes.dialog }}>
                <DialogTitle>
                    <center>
                        <IconButton disableRipple>
                            <img src={upload} alt={upload} className="alert_icon" />
                        </IconButton>
                    </center>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {paymentDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {paymentDialog.subtitle}
                    </Typography>

                </DialogContent>
                <Input type="file">

                </Input>
                <DialogActions className={classes.dialogActions}>

                    {paymentDialog.yesButton}
                    {paymentDialog.noButton}
                </DialogActions>


            </Dialog>
        </div>
    )
}
