import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from './../../../components/Footer/Footer';
import ConfirmDialog from './../../../components/Dialog/ConfirmDialog';
import SuccessDialog from './../../../components/Dialog/SuccessDialog'
import LoginAuthPop from './../../../components/Dialog/LoginAuthPop';
import Notification from './../../../components/Dialog/Notification';
import Navbar from './../../../components/Navbar/Navbar';
import Helm from '../../../components/Helmet/Helmet';
import axios from 'axios';
export default function EditEducation() {
    axios.defaults.withCredentials = true;
    const [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [user_id, setUserId] = useState(""), [number, setNumber] = useState(""), [street, setStreet] = useState(""), history = useHistory(""), refresh = () => { setSuccessDialog({ ...successDialog, isOpen: false }); history.push("/MyProfile"); }, [region, setRegion] = useState(""), [province, setProvince] = useState(""), [city, setCity] = useState(""), [city_district, setCityDistrict] = useState(""), [barangay, setBarangay] = useState(""), [postal, setPostal] = useState("");
    function BackToProfile() { history.push("/MyProfile") }
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    useEffect(() => { axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setUserId(response.data.user[0].user_id); setStreet(response.data.user[0].street_name); setNumber(response.data.user[0].number); setRegion(response.data.user[0].region); setProvince(response.data.user[0].province); setCity(response.data.user[0].city); setCityDistrict(response.data.user[0].city_district); setBarangay(response.data.user[0].barangay); setPostal(response.data.user[0].postal); } }) }, [])
    const update_address_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); axios.put("http://localhost:3001/update_address_information", { UAI_street: street, UAI_number: number, UAI_userId: user_id, UAI_dateToday: displaytodaysdate }).then((response) => { if (response.data.success) { setSuccessDialog({ isOpen: true, title: "Address Information Updated Successfully!", subtitle: "Please login your account again.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }); setNotify({ isOpen: true, message: "Profile Updated!", type: "success" }) } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const update_address = () => { const numberOnly_format = /^\d+$/; if (!street || !number) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!numberOnly_format.test(String(number))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "House No. must be a number.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Update Address Information", subtitle: "Are you sure you want to save changes?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_address_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    return (
        <div className="EditProfile_container">
            <Helm title={`Edit Address | One Barangay`} />
            <Navbar />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <div className="container"> <div className="wrapper"> <div className="titles"> <h1> Edit Address Information </h1> </div><p>All <span className="required_symbol">*</span> are required.</p><div className="forms"> <div className="input_fields"> <label>Region</label> <input type="text" className="inputs" disabled defaultValue={region} /> </div><div className="input_fields"> <label>Province</label> <input type="text" className="inputs" defaultValue={province} disabled /> </div><div className="input_fields"> <label>City</label> <input type="text" disabled className="inputs" defaultValue={city} /> </div><div className="input_fields"> <label>City District</label> <input type="text" className="inputs" disabled defaultValue={city_district} /> </div><div className="input_fields"> <label>Barangay</label> <input type="text" className="inputs" defaultValue={barangay} disabled /> </div><div className="input_fields"> <label>Postal</label> <input type="text" className="inputs" defaultValue={postal} disabled /> </div><div className="input_fields"> <label>Street<span className="required_symbol">*</span></label> <input type="text" className="inputs" defaultValue={street} onChange={(e) => { setStreet(e.target.value); }} /> </div><div className="input_fields"> <label>House No.<span className="required_symbol">*</span></label> <input type="text" className="inputs" defaultValue={number} onChange={(e) => { setNumber(e.target.value); }} /> </div><div className="input_fields"> <input type="submit" value="Save Changes" id="submitBTN" className="btn" onClick={update_address} /> </div><div className="input_fields"> <input type="submit" value="Back" className="btn" onClick={BackToProfile} /> </div></div></div></div>
            <Footer />
        </div>
    )
}