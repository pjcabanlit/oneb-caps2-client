import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './Facilities.css'
import FacilityTable from './FacilityTable'
import FacilityDialog from '../../../components/Dialog/FacilityDialog'
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog'
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop'
import SuccessDialog from '../../../components/Dialog/SuccessDialog'
import Notification from '../../../components/Dialog/Notification'
import PopUp from '../../../components/Dialog/PopUp';
import { IoIosAdd } from 'react-icons/io'
import { Container, BoxUpload, ImagePreview } from "./../../../components/Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
import AdminNavbar from '../AdminHome/AdminNavbar'
import AdminSidebar from '../AdminHome/AdminSidebar'
import loading from '../../../assets/icons/loading.png'
function Facilities() {
    Axios.defaults.withCredentials = true;
    const [facilityDialog, setFacilityDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [q, setQ] = useState(""), [openPopup, setOpenPopup] = useState(!1), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [facilityList, setFacilityList] = useState([]), [facilityName, setFacilityName] = useState(""), [quantity, setQuantity] = useState(""), [postImage, setPostImage] = useState(""), [type, setType] = useState(""), [location, setLocation] = useState(""), [isLoading, setIsLoading] = useState(!1), [image, setImage] = useState(""), [isUploaded, setIsUploaded] = useState(!1), [typeFile, setTypeFile] = useState(""), refresh = () => { setSuccessDialog({ ...successDialog, isOpen: !1 }); window.location.reload() }, openInPopup = () => { setOpenPopup(!0) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetFacilities").then((response) => { setFacilityList(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    const add_facility_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.post("http://localhost:3001/AddFacility", { AF_facilityName: facilityName, AF_quantity: type === "Utility" ? quantity : 1, AF_location: type === "Venue" ? location : null, AF_type: !location ? "Utility" : "Venue", AF_img: postImage }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Add Facility", subtitle: response.data.msg, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }); }
    const add_facility = () => { if (type === "Utility" && (!facilityName || !quantity)) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!type === "Utility" && (!facilityName || !location)) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to add facility?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => add_facility_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    function search(rows) { return rows.filter((row) => row.facility_name.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); };
    const handleFileUpload = async (e) => { if (!isUploaded) { const fsize = e.target.files[0].size; const file = Math.round(fsize / 1000); if (file >= 50000) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too Big, please select a file less than 50MB", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (file < 20) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too small, please select a file greater than 200kb.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); if (e.target.files && e.target.files[0]) { setTypeFile(e.target.files[0].type); let reader = new FileReader(); reader.onload = function (e) { setImage(e.target.result); setIsUploaded(true); }; reader.readAsDataURL(e.target.files[0]); } } } else { setImage(e.target.value); } };
    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <FacilityDialog facilityDialog={facilityDialog} setFacilityDialog={setFacilityDialog} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
                <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
                <Notification notify={notify} setNotify={setNotify} />
                <PopUp title="Add New Facility" openPopup={openPopup} setOpenPopup={setOpenPopup}> <div className="wrapper" id="wrapper_profile"> <div className="MyProfile_img_container" style={{ marginBottom: "20px" }}> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><Container> <BoxUpload> <div className="image-upload">{!isUploaded ? (<> <label htmlFor="upload-input"> <img src={FolderIcon} draggable={"false"} alt="placeholder" style={{ width: 100, height: 100 }} /> <p style={{ color: "#444" }}> Click to upload image </p></label> <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={(e) => handleFileUpload(e)} /> </>) : (<ImagePreview> <img className="close-icon" src={CloseIcon} alt="CloseIcon" onClick={() => { setIsUploaded(false); setImage(null); }} />{typeFile.includes("video") ? (<video id="uploaded-image" src={image} draggable={false} controls autoPlay alt="uploaded-img" style={{ width: "300px", height: "300px" }} />) : (<img id="uploaded-image" src={image} draggable={false} alt="uploaded-img" style={{ width: "300px", height: "300px" }} />)}</ImagePreview>)}</div></BoxUpload> </Container> </div><div className="forms" id="inputfields_profile"> <div className="input_fields"> <label>Type:<span className="required_symbol">* </span></label> <select className="inputs" autoComplete="off" onChange={(e) => setType(e.target.value)}> <option value="">Select</option> <option value="Utility">Utility</option> <option value="Venue">Venue</option> </select> </div></div>{type !== "" ? <div className="forms" id="inputfields_profile"> <div className="input_fields"> <label >{type === "Utility" ? "Utility Name" : "Venue Name"}:<span className="text-danger">*</span></label> <input type="text" className="inputs" autoComplete="off" required onChange={(e) => setFacilityName(e.target.value)} /> </div>{type === "Utility" ? <div className="input_fields"> <label> Quantity:<span className="text-danger">*</span></label> <input type="number" className="inputs" required autoComplete="off" onChange={(e) => setQuantity(e.target.value)} /> </div> : <div className="input_fields"> <label> Location:<span className="text-danger">*</span></label> <input type="text" className="inputs" required autoComplete="off" onChange={(e) => setLocation(e.target.value)} /> </div>}</div> : ""}</div><div className="add_resident_container_footer"> <div className="wrapper" id="wrapper_profile"> <div className="forms" id="inputfields_profile"> <div className="input_fields" > <input type="submit" value="Submit" className="btn" onClick={add_facility} /> </div></div></div></div></PopUp>
                <div className="certificate_request"> <div className="process_request_container"> <div className="mng_avail_container"> <div className="adminhome_titles"> <h1>Facility Settings</h1> </div><hr /> <div className="resident_information_tbl"> <div className="resident_tbl_header"> <div className="new_resident_btn_container"> <button className="new_resident_btn" onClick={openInPopup}> <IoIosAdd className="btn_icon" />Add Facility</button> </div><div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <FacilityTable data={search(facilityList)} /> </center> </div></div></div></div>
            </main>
        </div>
    )
}
export default Facilities;