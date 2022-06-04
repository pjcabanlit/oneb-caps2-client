/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import Axios from 'axios';
import ViewEditDialog from '../../../../src/components/Dialog/ViewEditDialog'
import ConfirmDialog from '../../../../src/components/Dialog/ConfirmDialog'
import LoginAuthPop from '../../../../src/components/Dialog/LoginAuthPop';
import SuccessDialog from '../../../../src/components/Dialog/SuccessDialog';
import SuccessRegisterDialog from '../../../../src/components/Dialog/SuccessRegisterDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopUp from './../../../../src/components/Dialog/PopUp';
import { FaEdit, FaArchive } from 'react-icons/fa';
import { Container, BoxUpload, ImagePreview } from "./../../../../src/components/Styled/ImageStyle";
import FolderIcon from "../../../../src/images/folder_icon_transparent.png";
import Moment from 'react-moment'
import DefaultImage from "../../../../src/images/m1.png";

const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px", }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", fontSize: "15px" }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, pagination: { overflow: "hidden" } }))

export default function BarangayOfficialsTable({ data }) {
    Axios.defaults.withCredentials = true;
    const [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), classes = useStyles(), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), [openPopup, setOpenPopup] = useState(!1), [resident_id, setResidentId] = useState(""), [household_id, setHouseholdId] = useState(""), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setSuffix] = useState(""), [contact, setContact] = useState(""), [email, setEmail] = useState(""), [gender, setGender] = useState(""), [position, setPosition] = useState(""), [termFrom, setTermFrom] = useState(""), [termTo, setTermTo] = useState(""), [current, setCurrent] = useState(""), [official_image, setOfficialImage] = useState(""), [image, setImage] = useState(""), [postImage, setPostImage] = useState(""), handleChangePage = (event, newPage) => { setPage(newPage); }, handleChangeRowsPerPage = (event) => { setRowsPerPage(event.target.value); setPage(0); }, refresh = () => { setSuccesDialog({ ...successDialog, isOpen: false }); window.location.reload() }, [isUploaded, setIsUploaded] = useState(true), [typeFile, setTypeFile] = useState("");
    function openInPopup(resident_id, household_id, first_name, middle_name, last_name, suffix, gender, contact, email, official_image, position, term_start, term_end, set_current) { setOpenPopup(true); setResidentId(resident_id); setHouseholdId(household_id); setFirstName(first_name); setMiddleName(middle_name); setLastName(last_name); setSuffix(suffix); setGender(gender); setContact(contact); setEmail(email); setPosition(position); setTermFrom(term_start); setTermTo(term_end); setCurrent(set_current); setOfficialImage(official_image); }
    const archive_resident_confirm = (resident_id, position, term_start, term_end, set_current) => { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/ArchiveBarangayOfficial", { archive_position: position, archive_termFrom: term_start, archive_termTo: term_end, archive_current: set_current, archive_resident_id: resident_id, }).then((response) => { }); setSuccessRegisterDialog({ isOpen: true, title: "Archived Successfully!", subtitle: "You can view archived officials in Archive Table.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }) };
    function archive_resident(resident_id, position, term_start, term_end, set_current) { setConfirmDialog({ isOpen: true, title: "End Term", subtitle: "Are you sure you want to End Term for this official? This cannot be undone.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => archive_resident_confirm(resident_id, position, term_start, term_end, set_current)} className="alert_yesBtn"> Yes </button> }) };
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); };
    const handleFileUpload = async (e) => { if (!isUploaded) { const fsize = e.target.files[0].size; const file = Math.round(fsize / 1000); if (file >= 80) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too Big, please select a file less than 80kb", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (file < 20) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too small, please select a file greater than 200kb.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); if (e.target.files && e.target.files[0]) { setTypeFile(e.target.files[0].type); let reader = new FileReader(); reader.onload = function (e) { setIsUploaded(true); }; reader.readAsDataURL(e.target.files[0]); } } } else { setImage(e.target.value); } };
    return (
        <div>
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccesDialog} />
            <PopUp title="View / Edit Official" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="ls"> <div className="resident_tbl_add_resident"> <div className="container"> <div className="row"> <div className="upper_profile"> <div className="MyProfile_img_container"> <Container> <BoxUpload> <div className="image-upload">{!isUploaded ? (<> <label htmlFor="upload-input"> <img src={FolderIcon} draggable={"false"} alt="placeholder" style={{ width: 100, height: 100 }} /> <p style={{ color: "#444" }}> Click to upload image </p></label> <input id="upload-input" type="file" accept=".jpg,.jpeg,.png," onChange={(e) => handleFileUpload(e)} /> </>) : (<ImagePreview>{official_image != null ? (<img id="uploaded-image" src={official_image.length !== 1 ? `data:image/jpeg;base64,${Buffer.from(official_image)}` : DefaultImage} draggable={false} alt="uploaded-img" style={{ width: "300px", height: "300px" }} />) : (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(postImage)}`} draggable={false} style={{ width: "300px", height: "300px" }} />)}</ImagePreview>)}</div></BoxUpload> </Container> </div><div className="MyProfile_fullname"> <h1 className="FN">{first_name + " " + middle_name + " " + last_name + " " + suffix}</h1> <span className="MyProfile_role"> <small className="R">{position}</small> </span> </div></div></div></div><div className="add_new_resident_container"> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields"> <label> Position:</label> <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={position} onChange={(e) => setPosition(e.target.value)} /> </div><div className="input_fields"> <label>Term From: </label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={termFrom} /></p></div><div className="input_fields"> <label>Term To: </label> <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={termTo} /></p></div><div className="input_fields"> <label>Last Name: </label> <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={last_name} onChange={(e) => setLastName(e.target.value)} /> </div><div className="input_fields"> <label >First Name:</label> <input type="text" className="inputs" autoComplete="off" required disabled defaultValue={first_name} onChange={(e) => setFirstName(e.target.value)} /> </div><div className="input_fields"> <label>Middle Name:</label> <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={middle_name} onChange={(e) => setMiddleName(e.target.value)} /> </div><div className="input_fields"> <label>Suffix:</label> <input type="text" className="inputs" autoComplete="off" disabled defaultValue={suffix} onChange={(e) => setSuffix(e.target.value)} /> </div></div></div><div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields" > <label>Gender:</label> <div className="custom_select"> <select className="inputs" defaultValue={gender} disabled onChange={(e) => setGender(e.target.value)}> <option value="">Select</option> <option value="Male">Male</option> <option value="Female">Female</option> </select> </div></div><div className="input_fields"> <label>Contact: </label> <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={contact} onChange={(e) => setContact(e.target.value)} /> </div><div className="input_fields"> <label>E-mail: </label> <input type="text" className="inputs" autoComplete="off" disabled defaultValue={email} onChange={(e) => setEmail(e.target.value)} /> </div><div className="input_fields" > <label>Status: </label> <div className="custom_select"> <select className="inputs" defaultValue={current} disabled onChange={(e) => setCurrent(e.target.value)}> <option value="">Select</option> <option value="Active">Active</option> <option value="Not Active">Not Active</option> </select> </div></div></div></div></div></div></PopUp>
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessRegisterDialog successRegisterDialog={successRegisterDialog} setSuccessRegisterDialog={setSuccessRegisterDialog} />
            <TableContainer component={Paper} className={classes.tableContainer}> <Grid item xs={12}> <Table className={classes.table} aria-label="simple table"> <TableHead> <TableRow className={classes.tableRow}> <TableCell className={classes.tableHeaderCell}>Full Name</TableCell> <TableCell className={classes.tableHeaderCell} id="resident_address" >Position</TableCell> <TableCell className={classes.tableHeaderCell} id="resident_address" >Term From-To</TableCell> <TableCell className={classes.tableHeaderCell} id="resident_action" >Action</TableCell> </TableRow> </TableHead> <TableBody className={classes.tableBody}>{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { return (<TableRow> <TableCell onClick={() => openInPopup(row.resident_id, row.household_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.official_image, row.position, row.term_start, row.term_end, row.set_current, row.official_image)}> <Grid container> <Grid item lg={2}> <Avatar src={`data:image/jpeg;base64,${Buffer.from(row.official_image)}`} draggable={false} style={{ width: "45px", height: "45px", borderRadius: "50%", }} className={classes.avatar} /> </Grid> <Grid item lg={10}> <Typography className={classes.name}>{row.last_name}</Typography> <Typography className={classes.name}>{row.first_name + " " + row.middle_name + " " + row.suffix}</Typography> </Grid> </Grid> </TableCell> <TableCell id="resident_address" onClick={() => openInPopup(row.resident_id, row.household_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.official_image, row.position, row.term_start, row.term_end, row.set_current)} className={classes.tableCell}>{row.position}</TableCell> <TableCell id="resident_address" onClick={() => openInPopup(row.resident_id, row.household_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.official_image, row.position, row.term_start, row.term_end, row.set_current)} className={classes.tableCell}>{row.term_start + " - " + row.term_end}</TableCell> <TableCell className={classes.tableCell} id="resident_action"><button className="view_edit" onClick={() => openInPopup(row.resident_id, row.household_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.official_image, row.position, row.term_start, row.term_end, row.set_current)}><FaEdit /></button> <button className="archive_button" onClick={() => archive_resident(row.resident_id, row.position, row.term_start, row.term_end, row.set_current)}><FaArchive /></button></TableCell> </TableRow>) })}</TableBody> <TableFooter> <TablePagination rowsPerPageOptions={[5, 10, 15]} count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} className={classes.pagination} component={"span"} /> </TableFooter> </Table> </Grid> </TableContainer>
        </div>
    )
}