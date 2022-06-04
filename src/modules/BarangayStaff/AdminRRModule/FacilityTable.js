import React, { useState } from 'react'
import './FacilityTable.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import ViewEditDialog from './../../../components/Dialog/ViewEditDialog';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import Notification from '../../../components/Dialog/Notification';
import SuccessDialog from '../../../components/Dialog/SuccessDialog';
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop';
import { FaEdit } from 'react-icons/fa';
import PopUp from '../../../components/Dialog/PopUp';
import { Container, BoxUpload, ImagePreview } from "./../../../components/Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" } }))
function FacilityTable({ data }) {
    Axios.defaults.withCredentials = true;
    const classes = useStyles(), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [facility_name, setFacilityName] = useState(""), [quantity, setQuantity] = useState(""), [facility_id, setFacilityId] = useState(""), [facility_image, setFacilityImage] = useState(""), [postImage, setPostImage] = useState(""), [location, setLocation] = useState(""), [type, setType] = useState(""), [editImage, setEditImage] = useState(!1), [, setImage] = useState(""), [isUploaded, setIsUploaded] = useState(!0), [openPopup, setOpenPopup] = useState(!1), [click, setClick] = useState(!1), edit = () => { setClick(!0) }, back = () => { setClick(!1) }, handleChangePage = (e, t) => { setPage(t) }, handleChangeRowsPerPage = e => { setRowsPerPage(+e.target.value); setPage(0) }, refresh = () => { setSuccesDialog({ ...successDialog, isOpen: !1 }); window.location.reload() };
    const edit_facility_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); if (editImage) { Axios.put("http://localhost:3001/EditFacilityImage", { editFacility_facilityId: facility_id, editFacility_image: postImage, }).then((response) => { if (response.data.err) { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.success) { setSuccesDialog({ isOpen: true, title: "Edit Facility", subtitle: response.data.msg, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }); } Axios.put("http://localhost:3001/EditFacility", { editFacility_facilityName: facility_name, editFacility_quantity: quantity, editFacility_facilityId: facility_id, editFacility_location: location, editFacility_image: postImage, }).then((response) => { if (response.data.msg) { setSuccesDialog({ isOpen: true, title: "Edit Facility", subtitle: response.data.msg, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }); }
    const edit_facility = () => { if (!facility_name || !quantity || !postImage) { setErrorDialog({ isOpen: true, title: "All fields must not be empty.", subtitle: "", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to add facility?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => edit_facility_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const delete_facility_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.delete(`http://localhost:3001/deleteFacility/${facility_id}`).then((response) => { if (response.data.err) { setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.success) { setSuccesDialog({ isOpen: true, title: "Delete Facility", subtitle: response.data.success, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const delete_facility = () => { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to delete this facility?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => delete_facility_confirm()} className="alert_yesBtn"> Yes </button> }) }
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); };
    const handleFileUpload = async (e) => { if (!isUploaded) { const fsize = e.target.files[0].size; const file = Math.round(fsize / 1000); if (file >= 50000) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too Big, please select a file less than 50MB", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (file < 20) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too small, please select a file greater than 200kb.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); setIsUploaded(true); if (e.target.files && e.target.files[0]) { let reader = new FileReader(); reader.onload = function (e) { setImage(e.target.result); setIsUploaded(true); }; reader.readAsDataURL(e.target.files[0]); } } } else { setImage(e.target.value); } };
    const openInPopup = (facility_id, facility_name, quantity, location, facility_type, facility_img) => { setOpenPopup(true); setFacilityName(facility_name); setQuantity(quantity); setFacilityId(facility_id); setLocation(location); setType(facility_type); setFacilityImage(facility_img); if (!openPopup) { setClick(false); } }
    return (
        <div className="">
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccesDialog} />
            <PopUp title="Edit Facility" openPopup={openPopup} setOpenPopup={setOpenPopup}> <div className="wrapper" id="wrapper_profile"> <div className="MyProfile_img_container" style={{ marginBottom: "20px" }}> <Container> <BoxUpload> <div className="image-upload">{!isUploaded ? (<> <label htmlFor="upload-input"> <img src={FolderIcon} draggable={"false"} alt="placeholder" style={{ width: 100, height: 100 }} /> <p style={{ color: "#444" }}> Click to upload image </p></label> <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={(e) => handleFileUpload(e)} /> </>) : (<ImagePreview>{click ? <img className="close-icon" src={CloseIcon} alt="CloseIcon" disabled={click ? "" : "disabled"} onClick={() => { setIsUploaded(false); setFacilityImage(null); setEditImage(true); }} /> : ""}{facility_image != null ? (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(facility_image)}`} draggable={false} alt="uploaded-img" />) : (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(postImage)}`} draggable={false} alt="uploaded-img" />)}</ImagePreview>)}</div></BoxUpload> </Container> </div><div className="forms" id="inputfields_profile"> <div className="input_fields"> <label > Facility Name:<span className="text-danger">*</span></label> <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={facility_name} required onChange={(e) => setFacilityName(e.target.value)} /> </div>{type === "Venue" ? <div className="input_fields"> <label> Location:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={location} onChange={(e) => setLocation(e.target.value)} /> </div> : <div className="input_fields"> <label> Quantity:<span className="text-danger">*</span></label> <input type="number" className="inputs" required autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} /> </div>}</div></div><div className="add_resident_container_footer" id="mobile_hidden"> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile">{click ? <> <div className="input_fields" > <input type="submit" value="Save Changes" className="editProfile_btn" onClick={edit_facility} /> </div><div className="input_fields" > <input type="submit" value="Cancel Edit" className="editProfile_btn" onClick={back} /> </div></> : <> <div className="input_fields" > <input type="submit" value="Edit Facility" className="editProfile_btn" onClick={edit} /> </div><div className="input_fields" > <input type="submit" value="Delete Facility" className="editProfile_btn" onClick={delete_facility} /> </div></>}</div></div></div></PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}> <Table className={classes.table} aria-label="simple table"> <TableHead> <TableRow> <TableCell className={classes.tableHeaderCell}>Facility</TableCell> <TableCell className={classes.tableHeaderCell}>Quantity</TableCell> <TableCell className={classes.tableHeaderCell}>Available</TableCell> <TableCell className={classes.tableHeaderCell} id="mobile_hidden">Action</TableCell> </TableRow> </TableHead> <TableBody>{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { return (<TableRow> <TableCell className={classes.tableCell} onClick={() => openInPopup(row.facility_id, row.facility_name, row.quantity, row.facility_location, row.facility_type, row.facility_img)}> <Grid container> <Grid item lg={10}> <Typography className={classes.name}>{row.facility_name}</Typography> </Grid> </Grid> </TableCell> <TableCell className={classes.tableCell}>{row.quantity}</TableCell> <TableCell className={classes.tableCell}>{row.quantity}</TableCell> <TableCell id="mobile_hidden"><button className="view_edit" onClick={() => openInPopup(row.facility_id, row.facility_name, row.quantity, row.facility_location, row.facility_type, row.facility_img)}> <FaEdit /> </button></TableCell> </TableRow>) })}</TableBody> <TableFooter > <TablePagination className={classes.tablePagination} rowsPerPageOptions={[5, 10, 15]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} /> </TableFooter> </Table> </TableContainer>
        </div>
    )
}
export default FacilityTable