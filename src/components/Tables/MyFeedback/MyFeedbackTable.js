/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaEdit } from 'react-icons/fa';
import Axios from 'axios'
import Notification from '../../Dialog/Notification';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import ViewEditDialog from '../../Dialog/ViewEditDialog';
import SuccessDialog from '../../Dialog/SuccessDialog';
import LoginAuthPop from '../../Dialog/LoginAuthPop';
import SuccessRegisterDialog from '../../Dialog/SuccessRegisterDialog';
import PopUp from '../../Dialog/PopUp'
import Moment from 'react-moment'
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, border: "0.5px solid #d5dbd9" }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, status: { fontWeight: 'bold', fontSize: '0.75rem', color: 'white', backgroundColor: 'grey', borderRadius: 5, padding: '3px 10px', display: 'inline-block', fontFamily: "Montserrat, sans-serif", }, tablePagination: { overflow: "hidden" } }))
export default function MyFeedbackTable({ data }) {
    Axios.defaults.withCredentials = true;
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), classes = useStyles(), [openPopup, setOpenPopup] = useState(!1), [feedback, setFeedback] = useState(""), [date_submitted, setDateSubmitted] = useState(""), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), handleChangePage = (e, t) => { setPage(t) }, handleChangeRowsPerPage = e => { setRowsPerPage(+e.target.value); setPage(0) };
    function openInPopup(feedback, date_submitted) { setOpenPopup(true); setFeedback(feedback); setDateSubmitted(date_submitted); }
    return (
        <div>
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <SuccessRegisterDialog successRegisterDialog={successRegisterDialog} setSuccessRegisterDialog={setSuccessRegisterDialog} />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <PopUp title="My Reports" openPopup={openPopup} setOpenPopup={setOpenPopup}> <div className="generate-certificate-body"> <div className="generate-certificate-container"> <div className="wrapper" id="wrapper_profile"> <div className="forms"> <div className="input_fields"> <label>Feedback</label> <textarea type="text" className="textarea" style={{ height: "20rem" }} disabled defaultValue={feedback} /> </div><div className="input_fields"> <label>Date Submitted</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_submitted} /></p></div></div></div></div></div></PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}> <Table className={classes.table} aria-label="simple table"> <TableHead > <TableRow className={classes.tableRow}> <TableCell className={classes.tableHeaderCell}>Date Submitted</TableCell> <TableCell className={classes.tableHeaderCell} id="mobile_hidden">Action</TableCell> </TableRow> </TableHead> <TableBody>{data.map((row) => { return (<TableRow> <TableCell className={classes.tableCell} onClick={() => openInPopup(row.feedback, row.date_submitted)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name}> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={row.date_submitted} /></p></Typography> </Grid> </Grid> </TableCell> <TableCell id="mobile_hidden"> <button className="view_edit" onClick={() => openInPopup(row.feedback, row.date_submitted)}><FaEdit /></button> </TableCell> </TableRow>) })}</TableBody> <TableFooter> <TablePagination className={classes.tablePagination} rowsPerPageOptions={[5, 10, 15]} component="span" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} /> </TableFooter> </Table> </TableContainer>
        </div >
    )
}