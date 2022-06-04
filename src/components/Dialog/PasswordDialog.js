import { Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import './ViewEditDialog.css'

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(1),

    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center',
        cursor: 'pointer'
    }
}))
export default function PasswordDialog(props) {
    const { passwordDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={passwordDialog.isOpen} classes={{ paper: classes.dialog }} fullWidth={true} maxWidth='sm'>
                <DialogContent className={classes.dialogContent} >
                    {passwordDialog.title}
                    <Typography variant="subtitle2">
                        {passwordDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {passwordDialog.noButton}
                    {passwordDialog.yesButton}
                </DialogActions>
            </Dialog>
        </div>
    )
}
