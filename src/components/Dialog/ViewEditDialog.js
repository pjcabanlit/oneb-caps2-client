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
export default function ViewEditDialog(props) {
    const { viewEditDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={viewEditDialog.isOpen} classes={{ paper: classes.dialog }} fullWidth={true} maxWidth='lg'>
                <DialogContent className={classes.dialogContent} >
                    {viewEditDialog.title}
                    <Typography variant="subtitle2">
                        {viewEditDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {viewEditDialog.noButton}
                    {viewEditDialog.yesButton}
                </DialogActions>
            </Dialog>
        </div>
    )
}
