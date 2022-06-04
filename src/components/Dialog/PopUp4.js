import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { FaWindowClose } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        margin: "10px"
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

export default function PopUp4(props) {

    const { title, children, openPopup4, setOpenPopup4, maxWidth } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup4} maxWidth={maxWidth} classes={{ paper: classes.dialogWrapper }} style={{ margin: 0 }} >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <button onClick={() => { setOpenPopup4(false) }} className={classes.newResidentCloseButton}> <FaWindowClose /> </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
