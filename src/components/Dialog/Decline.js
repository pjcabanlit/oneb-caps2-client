import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { FaWindowClose } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
    },
    dialogTitle: {
        paddingRight: '0px',
        fontFamily: "Montserrat, sans-serif",
    },
    newResidentCloseButton: {
        color: "black",
        fontSize: "25px",
        background: "transparent"
    }
}))

export default function Decline(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <button onClick={() => { setOpenPopup(false) }} className={classes.newResidentCloseButton}> <FaWindowClose /> </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
