import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewEditDialog from '../../../components/Dialog/ViewEditDialog';
import Axios from 'axios'
import ConfirmDialog from './../../Dialog/ConfirmDialog';
import SuccessDialog from './../../Dialog/SuccessDialog';
import Notification from './../../Dialog/Notification';
import LoginAuthPop from './../../Dialog/LoginAuthPop';
import PopUp from '../../../components/Dialog/PopUp';
import { FaEdit } from 'react-icons/fa';
import { Container, BoxUpload, ImagePreview } from "../../../components/Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
import Moment from "react-moment";
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, status: { fontWeight: 'bold', fontSize: '0.75rem', color: 'white', backgroundColor: 'grey', borderRadius: 5, padding: '3px 10px', display: 'inline-block', fontFamily: "Montserrat, sans-serif", }, tablePagination: { overflow: "hidden" } }))
export default function AnnouncementTable({ data }) {
    Axios.defaults.withCredentials = true;
    const classes = useStyles(), history = useHistory(), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [ann_id, setAnnId] = useState(""), [ann_title, setAnnTitle] = useState(""), [ann_desc, setAnnDesc] = useState(""), [date_created, setDateCreated] = useState(""), [, setImage] = useState(""), [date_updated, setDateUpdated] = useState(""), [ann_img, setAnnImg] = useState(""), [openPopup, setOpenPopup] = useState(!1), [click, setClick] = useState(!1), edit = () => { setClick(!0) }, back = () => { setClick(!1) }, handleChangePage = (e, t) => { setPage(t) }, handleChangeRowsPerPage = e => { setRowsPerPage(+e.target.value); setPage(0) }, refresh = () => { setSuccessDialog({ ...successDialog, isOpen: !1 }); history.push("/manage-programs-events") }, [isUploaded, setIsUploaded] = useState(true), [, setTypeFile] = useState(""), [postImage, setPostImage] = useState("");
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    const openInPopup = (announcement_id, announcement_title, announcement_desc, announcement_img, date_submitted, date_updated) => { setOpenPopup(!0); setAnnId(announcement_id); setAnnTitle(announcement_title); setAnnDesc(announcement_desc); setAnnImg(announcement_img); setDateCreated(date_submitted); setDateUpdated(date_updated) }
    const delete_progev_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.delete(`http://localhost:3001/deleteAnnouncement/${ann_id}`).then((response) => { if (response.data.err) { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.success) { setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Delete Announcement", subtitle: response.data.success, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const delete_announcement = () => { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to delete this Announcement?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => delete_progev_confirm()} className="alert_yesBtn"> Yes </button> }) }
    const update_announcement_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/updateAnnouncement", { upAnn_title: ann_title, upAnn_desc: ann_desc, upAnn_img: ann_img, upAnn_dateToday: displaytodaysdate, upAnn_id: ann_id }).then((response) => { if (response.data.err) { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.success) { setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Update Announcement", subtitle: response.data.success, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const edit_announcement = () => { if (!ann_title || !ann_desc) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All fields are required.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to update this Announcement?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_announcement_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); }, handleFileUpload = async (e) => { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); setIsUploaded(false); if (e.target.files && e.target.files[0]) { setTypeFile(e.target.files[0].type); let reader = new FileReader(); reader.onload = function (e) { setImage(e.target.result); setIsUploaded(true); }; reader.readAsDataURL(e.target.files[0]); } else { setImage(e.target.value); } };
    return (
        <div>
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <Notification notify={notify} setNotify={setNotify} />
            <PopUp title="View Cancelled Program/Event" openPopup={openPopup} setOpenPopup={setOpenPopup}> <Container> <BoxUpload> <div className="image-upload">{!isUploaded ? (<> <label htmlFor="upload-input"> <img src={FolderIcon} draggable={"false"} alt="placeholder" style={{ width: 100, height: 100 }} /> <p style={{ color: "#444" }}> Click to upload image </p></label> <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={(e) => handleFileUpload(e)} /> </>) : (<ImagePreview>{click ? <img className="close-icon" src={CloseIcon} alt="CloseIcon" disabled={click ? "" : "disabled"} onClick={() => { setIsUploaded(false); setAnnImg(null); }} /> : ""}{ann_img != null ? (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(ann_img)}`} draggable={false} alt="uploaded-img" />) : (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(postImage)}`} draggable={false} alt="uploaded-img" />)}</ImagePreview>)}</div></BoxUpload> </Container> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields"> <label>Announcement Title</label> <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={ann_title} required onChange={(e) => setAnnTitle(e.target.value)} /> </div><div className="input_fields"> <label>Announcement Description</label> <textarea type="text" style={{ height: "20rem" }} className="textarea" required autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={ann_desc} onChange={(e) => setAnnDesc(e.target.value)} /> </div>{click ? <> <div className="input_fields"> <label>Date Created</label> <input type="date" className="inputs" required autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setDateCreated(e.target.value)} /> </div></> : <> <div className="input_fields"> <label>Date Created</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_created} /></p></div></>}{date_updated ? <> <div className="input_fields"> <label>Date Updated</label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_updated} /></p></div></> : ""}</div></div><div className="add_resident_container_footer" id="mobile_hidden"> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile">{click ? <> <div className="input_fields" > <input type="submit" value="Save Changes" className="editProfile_btn" onClick={edit_announcement} /> </div><div className="input_fields" > <input type="submit" value="Cancel Edit" className="editProfile_btn" onClick={back} /> </div></> : <> <div className="input_fields" > <input type="submit" value="Edit Announcement" className="editProfile_btn" onClick={edit} /> </div><div className="input_fields" > <input type="submit" value="Delete Announcement" className="editProfile_btn" onClick={delete_announcement} /> </div></>}</div></div></div></PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}> <Table className={classes.table} aria-label="simple table"> <TableHead> <TableRow> <TableCell className={classes.tableHeaderCell}>Announcment Title</TableCell> <TableCell className={classes.tableHeaderCell}>Date Created</TableCell> <TableCell className={classes.tableHeaderCell} id="mobile_hidden" >Action</TableCell> </TableRow> </TableHead> <TableBody>{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { return (<TableRow > <TableCell style={{ cursor: 'pointer' }} onClick={() => openInPopup(row.announcement_id, row.announcement_title, row.announcement_desc, row.announcement_img, row.date_submitted, row.date_updated)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name} style={{ cursor: 'pointer' }}>{row.announcement_title}</Typography> </Grid> </Grid> </TableCell> <TableCell className={classes.tableCell}><p className="inputs"><Moment format={"MMMM DD, YYYY"} date={row.date_created} /></p></TableCell> <TableCell id="mobile_hidden"> <button className="view_edit" onClick={() => openInPopup(row.announcement_id, row.announcement_title, row.announcement_desc, row.announcement_img, row.date_submitted, row.date_updated)}><FaEdit /></button> </TableCell> </TableRow>) })}</TableBody> <TableFooter> <TablePagination rowsPerPageOptions={[5, 10, 15]} component="span" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} className={classes.tablePagination} /> </TableFooter> </Table> </TableContainer>
        </div>
    )
}