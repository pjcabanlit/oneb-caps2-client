import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewEditDialog from '../../Dialog/ViewEditDialog';
import Axios from 'axios'
import ConfirmDialog from './../../Dialog/ConfirmDialog';
import SuccessDialog from './../../Dialog/SuccessDialog';
import Notification from './../../Dialog/Notification';
import LoginAuthPop from './../../Dialog/LoginAuthPop';
import PopUp from '../../Dialog/PopUp';
import { FaEdit } from 'react-icons/fa';
import Moment from "react-moment";
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, status: { fontWeight: 'bold', fontSize: '0.75rem', color: 'white', backgroundColor: 'grey', borderRadius: 5, padding: '3px 10px', display: 'inline-block', fontFamily: "Montserrat, sans-serif", }, pagination: { overflow: "hidden" } }))
export default function ReturnedTable({ data }) {
    Axios.defaults.withCredentials = true;
    const classes = useStyles(), history = useHistory(), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [full_name, setFullName] = useState(""), [address, setAddress] = useState(""), [contact, setContact] = useState(""), [item, setItem] = useState(""), [location, setLocation] = useState(""), [date_requested, setDateRequested] = useState(""), [date_returned, setDateReturned] = useState(""), [time_returned, setTimeReturned] = useState(""), [date_borrowed, setDateBorrowed] = useState(""), [remarks, setRemarks] = useState(""), [date_need, setDateNeed] = useState(""), [status, setStatus] = useState(""), [purpose, setPurpose] = useState(""), [quantity, setQuantity] = useState(""), [request_facilityId, setRequestFacilityId] = useState(""), handleChangePage = (e, t) => { setPage(t) }, handleChangeRowsPerPage = e => { setRowsPerPage(+e.target.value); setPage(0) }, refresh = () => { setSuccessDialog({ ...successDialog, isOpen: !1 }); history.push("/Reservations-&-Requests") }, [openPopup, setOpenPopup] = useState(false);
    const delete_facility_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.delete(`http://localhost:3001/deleteFacilityRequest/${request_facilityId}`).then((response) => { if (response.data.err) { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back </button>), }); } else if (response.data.success) { setSuccessDialog({ isOpen: true, title: "Delete Facility Request", subtitle: response.data.success, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back </button>), }); } }); }
    const delete_request = () => { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want delete this Request? This can't be undone.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={delete_facility_confirm} className="alert_yesBtn"> Yes </button> }) }
    const openInPopup = (remarks, date_borrowed, date_returned, time_returned, req_facility_id, address, contact, date_need, item, location, quantity, date_requested, status, purpose, suffix, first_name, middle_name, last_name) => { setOpenPopup(true); setRequestFacilityId(req_facility_id); setFullName(first_name + " " + (middle_name === null ? " " : middle_name) + " " + last_name + " " + (suffix === null ? " " : suffix)); setAddress(address); setContact(contact); setDateNeed(date_need); setItem(item); setQuantity(quantity); setDateRequested(date_requested); setStatus(status); setPurpose(purpose); setRemarks(remarks); setDateBorrowed(date_borrowed); setDateReturned(date_returned); setTimeReturned(time_returned); setLocation(location); }
    return (
        <div>
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <Notification notify={notify} setNotify={setNotify} />
            <PopUp title="Returned Request" openPopup={openPopup} setOpenPopup={setOpenPopup}> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields"> <label>Full Name:<span className="text-danger">*</span></label> <input type="text" className="inputs" autoComplete="off" disabled defaultValue={full_name} required /> </div><div className="input_fields"> <label>Address:<span className="text-danger">*</span></label> <textarea type="text" className="textarea" required autoComplete="off" disabled defaultValue={address} /> </div><div className="input_fields"> <label>Contact:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={contact} /> </div><div className="input_fields"> <label>Date Needed</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_need} /></p></div><div className="input_fields"> <label>Facility:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={item} /> </div>{location ? <div className="input_fields"> <label>Facility Location:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={location} onChange={(e) => setLocation(e.target.value)} /> </div> : ""}<div className="input_fields"> <label>Quantity:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={quantity} /> </div><div className="input_fields"> <label>Date Requested</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_requested} /></p></div><div className="input_fields"> <label>Date Borrowed</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_borrowed} /></p></div><div className="input_fields"> <label>Date Returned</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_returned} /></p></div><div className="input_fields"> <label>Status:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={status} /> </div><div className="input_fields"> <label>Purpose:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={purpose} /> </div><div className="input_fields"> <label>Remarks:<span className="text-danger">*</span></label> <textarea type="text" className="textarea" required autoComplete="off" disabled defaultValue={remarks} /> </div></div></div><div className="add_resident_container_footer"> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields" > <input type="submit" value="Delete Request" className="editProfile_btn" onClick={delete_request} /> </div></div></div></div></PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}> <Table className={classes.table} aria-label="simple table"> <TableHead> <TableRow> <TableCell className={classes.tableHeaderCell}>Last Name</TableCell> <TableCell className={classes.tableHeaderCell}>First Name</TableCell> <TableCell className={classes.tableHeaderCell}>Middle Name</TableCell> <TableCell className={classes.tableHeaderCell}>Date Returned</TableCell> <TableCell className={classes.tableHeaderCell}>Facility</TableCell> <TableCell className={classes.tableHeaderCell}>Status</TableCell> <TableCell className={classes.tableHeaderCell} id="mobile_hidden">Action</TableCell> </TableRow> </TableHead> <TableBody>{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { return (<TableRow > <TableCell style={{ cursor: 'pointer' }} id="last_name" onClick={() => openInPopup(row.remarks, row.date_borrowed, row.date_returned, row.time_returned, row.req_facility_id, row.address, row.contact, row.date_need, row.item, row.facility_location, row.quantity, row.date_requested, row.item_status, row.purpose, row.suffix, row.first_name, row.middle_name, row.last_name)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name} style={{ cursor: 'pointer' }}>{row.last_name}</Typography> </Grid> </Grid> </TableCell> <TableCell style={{ cursor: 'pointer' }} onClick={() => openInPopup(row.remarks, row.date_borrowed, row.date_returned, row.time_returned, row.req_facility_id, row.address, row.contact, row.date_need, row.item, row.facility_location, row.quantity, row.date_requested, row.item_status, row.purpose, row.suffix, row.first_name, row.middle_name, row.last_name)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name} style={{ cursor: 'pointer' }}>{row.first_name}</Typography> </Grid> </Grid> </TableCell> <TableCell style={{ cursor: 'pointer' }} onClick={() => openInPopup(row.remarks, row.date_borrowed, row.date_returned, row.time_returned, row.req_facility_id, row.address, row.contact, row.date_need, row.item, row.facility_location, row.quantity, row.date_requested, row.item_status, row.purpose, row.suffix, row.first_name, row.middle_name, row.last_name)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name} style={{ cursor: 'pointer' }}>{row.middle_name}</Typography> </Grid> </Grid> </TableCell> <TableCell style={{ cursor: 'pointer' }} onClick={() => openInPopup(row.remarks, row.date_borrowed, row.date_returned, row.time_returned, row.req_facility_id, row.address, row.contact, row.date_need, row.item, row.facility_location, row.quantity, row.date_requested, row.item_status, row.purpose, row.suffix, row.first_name, row.middle_name, row.last_name)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name} style={{ cursor: 'pointer' }}> <Moment format={"MMMM DD, YYYY"} date={row.date_returned} /> </Typography> </Grid> </Grid> </TableCell> <TableCell className={classes.tableCell}>{row.item}</TableCell> <TableCell> <Typography className={classes.status} style={{ backgroundColor: ((row.item_status === "Borrowed" && 'green') || (row.item_status === "Pending" && 'red') || (row.item_status === "Returned" && '#0061a8')) }}>{row.item_status}</Typography></TableCell> <TableCell id="mobile_hidden"> <button className="view_edit" onClick={() => openInPopup(row.remarks, row.date_borrowed, row.date_returned, row.time_returned, row.req_facility_id, row.address, row.contact, row.date_need, row.item, row.facility_location, row.quantity, row.date_requested, row.item_status, row.purpose, row.suffix, row.first_name, row.middle_name, row.last_name)}><FaEdit /></button> </TableCell> </TableRow>) })}</TableBody> <TableFooter> <TablePagination component="span" rowsPerPageOptions={[5, 10, 15]} count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} className={classes.pagination} /> </TableFooter> </Table> </TableContainer>
        </div>
    )
}