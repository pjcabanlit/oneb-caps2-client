import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./RequestReserve.css";
import ConfirmDialog from "./../../../components/Dialog/ConfirmDialog";
import LoginAuthPop from "./../../../components/Dialog/LoginAuthPop";
import SuccessDialog from "./../../../components/Dialog/SuccessDialog";
import Notification from "./../../../components/Dialog/Notification";
import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import Helm from "../../../components/Helmet/Helmet";
import moment from 'moment'
function RequestUtilities() {
    Axios.defaults.withCredentials = true;
    const [username, setUsername] = useState(""), [resident_id, setResidentId] = useState(""), [account_id, setAccountId] = useState(""), [address, setAddress] = useState(""), [contact, setContact] = useState(""), [date_need, setDateNeed] = useState(""), [item, setItem] = useState(""), [quantity, setQuantity] = useState(""), [purpose, setPurpose] = useState(""), [time_need, setTimeNeed] = useState(""), [time_ended, setTimeEnded] = useState(""), [facilityList, setFacilityList] = useState([]), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [quant, setQuant] = useState([]), [type, setType] = useState(""), refresh = () => { setSuccesDialog({ ...successDialog, isOpen: false }); window.location.reload() }
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate()
    useEffect(() => { Axios.get("http://localhost:3001/UserGetFacilitiesList").then((response) => { setFacilityList(response.data) }); }, []);
    useEffect(() => { if (item) { Axios.get(`http://localhost:3001/GetQuantity/${item}`).then((response) => { setQuant(response.data[0].quantity) }); } }, [item]);
    useEffect(() => { if (item) { Axios.get(`http://localhost:3001/GetType/${item}`).then((response) => { setType(response.data[0].facility_type) }); } }, [item]);
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setResidentId(response.data.user[0].resident_id); setAccountId(response.data.user[0].account_id); setUsername(response.data.user[0].username); setAddress(response.data.user[0].street_name + ", " + response.data.user[0].number); setContact(response.data.user[0].contact); } }); }, []);
    function submit_request() { const numberOnly_format = /^\d+$/; if (!date_need || !item || !time_ended || !time_need) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>), }); } else if (type === "Utility" && !quantity) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>), }); } else if (quantity > quant && (type === "Utility")) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Requested Quantity is higher than the Item Available.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back </button>), }); } else if (type === "Utility" && !numberOnly_format.test(String(quantity))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect value for Quantity.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back </button>), }); } else if (1 > quant && (type === "Venue")) { setErrorDialog({ isOpen: true, title: "Sorry!", subtitle: "Venue is not available right now.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Request Form?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No</button>), yesButton: (<button onClick={() => request_confirmed()} className="alert_yesBtn">Yes</button>), }); } }
    function request_confirmed() { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.post("http://localhost:3001/RequestUtilities", { request_inhabitant_id: resident_id, request_brgyaccount_id: account_id, request_address: address, request_contact: !contact ? "No Contact Information" : contact, request_date_need: date_need, request_time_need: time_need, request_time_ended: time_ended, request_item: item, request_quantity: type === "Venue" ? 1 : quantity, request_dToday: displaytodaysdate, request_purpose: purpose, request_username: username, }).then((response) => { if (response.data.success) { setSuccesDialog({ isOpen: true, title: "Request Submitted!", subtitle: "", noButton: (<button onClick={refresh} className="alert_backBtn"> Back </button>), }); setNotify({ isOpen: true, message: "Submitted Successfully", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Request Failed.", subtitle: "Please check your connection and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>), }); } }); }
    return (
        <div className="RequestReserve_main">
            <Helm title={`Request Utilities | One Barangay`} />
            <Navbar />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={successDialog} />
            <div className="container"> <div className="EditProfile_container"> <div className="wrapper"> <div className="titles"> <h1> Facility Reservation & Request Form </h1> </div><p className="noteEnglish"> <span className="reminder">NOTE: </span> Provided below are forms for requesting equipment and reservations of facilities of Barangay 407, please answer the form correctly and double check the form before to proceed to submission to avoid mistakes. </p><p className="noteTagalog"> <span className="reminder">TANDAAN: </span> Ibinigay sa ibaba ang mga form para sa paghingi ng kagamitan at pagpapareserba ng mga pasilidad ng Barangay 407, mangyaring sagutin nang tama ang form at i-double check ang form bago magpatuloy sa pagsusumite upang maiwasan ang mga pagkakamali. </p><p className="required_symbol_english"> <span className="reminder">REMINDER: </span> All{" "}<span className="required_symbol">*</span> are required.{" "}</p><p className="required_symbol_tagalog"> <span className="reminder">PAALALA: </span> Lahat ng may{" "}<span className="required_symbol">*</span> ay kailangan.{" "}</p><div className="forms"> <div className="input_fields"> <label> Date Needed <span className="required_symbol">*</span> </label> <input type="date" className="inputs" onChange={(e) => setDateNeed(e.target.value)} min={moment().format("YYYY-MM-DD")} /> </div><div className="input_fields"> <label> Time Needed <span className="required_symbol">*</span> </label> <input type="time" className="inputs" onChange={(e) => setTimeNeed(e.target.value)} /> </div><div className="input_fields"> <label> Time Return <span className="required_symbol">*</span> </label> <input type="time" className="inputs" onChange={(e) => setTimeEnded(e.target.value)} /> </div><div className="input_fields"> <label> Item <span className="required_symbol">*</span> </label> <div className="custom_select"> <select className="inputs" onChange={(e) => setItem(e.target.value)}> <option value="">Select</option>{facilityList.map((row, index) => (<> <option key={index} value={row.facility_id}>{type === "Venue" ? row.facility_name + (row.facility_location ? ' - ' + row.facility_location : "") : row.facility_name}</option> </>))}</select> </div></div><div className="input_fields"> <label> </label>{type === "Venue" ? <p >{quant <= 1 ? 'Available' : 'Not available'}</p> : <p >{`${quant}available`}</p>}</div>{type === "Venue" ? "" : <div className="input_fields"> <label> Quantity <span className="required_symbol">*</span> </label> <input type="number" className="inputs" onChange={(e) => setQuantity(e.target.value)} /> </div>}<div className="input_fields"> <label> Purpose <span className="required_symbol">*</span> </label> <input type="text" className="inputs" onChange={(e) => setPurpose(e.target.value)} /> </div><div className="input_fields"> <input type="submit" value="Submit" className="btn" onClick={submit_request} /> </div></div></div></div></div>
            {window.innerWidth <= 600 ? "" : <Footer />}
        </div>
    );
}
export default RequestUtilities;