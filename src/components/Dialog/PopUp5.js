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

export default function PopUp5(props) {

    const { title, children, openPopup5, setOpenPopup5, maxWidth } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup5} maxWidth={maxWidth} classes={{ paper: classes.dialogWrapper }} style={{ margin: 0 }} >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <button onClick={() => { setOpenPopup5(false) }} className={classes.newResidentCloseButton}> <FaWindowClose /> </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
