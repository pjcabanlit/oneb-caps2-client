import { Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

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
export default function FacilityDialog(props) {
    const { facilityDialog } = props;
    const classes = useStyles()
    return (
        <div>
            <Dialog open={facilityDialog.isOpen} classes={{ paper: classes.dialog }} fullWidth={true} maxWidth='md'>
                <DialogContent className={classes.dialogContent} >
                    {facilityDialog.title}
                    <Typography variant="subtitle2">
                        {facilityDialog.subtitle}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {facilityDialog.noButton}
                    {facilityDialog.yesButton}
                </DialogActions>
            </Dialog>
        </div>
    )
}
