import React, { useState } from 'react'
import './CertificateRequest.css';
import Axios from 'axios';
import Notification from "../../../../components/Dialog/Notification";
import ConfirmDialog from '../../../../components/Dialog/ConfirmDialog';
import LoginAuthPop from '../../../../components/Dialog/LoginAuthPop';
import './../../../../styles/Common.css';
import PopUp from './../../../../components/Dialog/PopUp'
import { IoIosAdd } from 'react-icons/io';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import Pending from './Documents/Pending';
import Processed from './Documents/Processed';
import { saveAs } from 'file-saver';
import SuccessDialog from '../../../../components/Dialog/SuccessDialog';
import AdminNavbar from '../../AdminHome/AdminNavbar';
import AdminSidebar from '../../AdminHome/AdminSidebar';
import Declined from './Documents/Declined';
require("es6-promise").polyfill();
require("isomorphic-fetch");
export default function CertificateRequest() {
    Axios.defaults.withCredentials = true;
    let { url } = useRouteMatch();
    const [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [openPopup, setOpenPopup] = useState(!1), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setSuffix] = useState(""), [complete_address, setCompleteAddress] = useState(""), [sex, setSex] = useState(""), [birthdate, setBirthdate] = useState(""), [purpose, setPurpose] = useState(""), [years_resided, setYearsResided] = useState(""), [document_type, setDocumentType] = useState(""), [contact_person, setContactPerson] = useState(""), [contact_address, setContactAddress] = useState(""), [contact_contact, setContactContact] = useState(""), [business_name, setBusinessName] = useState(""), [business_address, setBusinessAddress] = useState(""), [business_type, setBusinessType] = useState(""), [status, setStatus] = useState(""), [vehicle, setVehicle] = useState(""), [vehicle_type, setVehicleType] = useState(""), [plate_no, setPlateNo] = useState(""), [destination, setDestination] = useState(""), [departure_date, setDepartureDate] = useState(""), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [id, setId] = useState(0), [active, setActive] = useState([{ id: 0, buttonName: "List of Pending Requests", isActive: !0, path: `${url}/pending-requests` }, { id: 1, buttonName: "List of Processed Requests", isActive: !1, path: `${url}/processed-requests` }, { id: 2, buttonName: "List of Declined Requests", isActive: !1, path: `${url}/declined-requests` }]), toggleActive = (id) => { setActive(active.map((button, index) => (index === id ? { ...button, isActive: true } : { ...button, isActive: false }))); setId(id); }, openInPopup = () => { setOpenPopup(true) }, [sideBarOpen, setSidebarOpen] = useState(false), openSidebar = () => { setSidebarOpen(true); }, closeSidebar = () => { setSidebarOpen(false); }
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();
    function download_coi() { const numberOnly_format = /^\d+$/; const stringOnly_format = /^[a-zA-Z\s]*$/; if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }); } else if (!numberOnly_format.test(String(years_resided))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Years Resided should be a number.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }); } else if (!first_name || !last_name || !complete_address || !years_resided || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>), }); } else { Axios.post("http://localhost:3001/create-pdf-coi", { COI_firstName: first_name, COI_middleName: middle_name == null ? "" : middle_name, COI_lastName: last_name, COI_suffix: suffix == null ? "" : suffix, COI_address: complete_address, COI_yearsResided: years_resided, COI_purpose: purpose, COI_processed_date: displaytodaysdate, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-coi", { responseType: "blob", })).then((response) => { const pdfBlob = new Blob([response.data], { type: "application/pdf", }); saveAs(pdfBlob, `Certificate-of-Indigency-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false }); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds, the certificate will automatically download.`, noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>, }) } };
    function download_goodMoral() { Axios.post("http://localhost:3001/WalkInGM", { WI_GM_fName: first_name, WI_GM_mName: middle_name, WI_GM_lName: last_name, WI_GM_suffix: suffix, WI_GM_address: complete_address, WI_GM_gender: sex, WI_GM_purpose: purpose, WI_GM_dateToday: displaytodaysdate, }).then((response) => { if (response.data.message) { setErrorDialog({ isOpen: true, title: "Generate Error.", subtitle: response.data.message, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { Axios.post("http://localhost:3001/create-pdf-goodMoral", { gm_firstName: first_name, gm_middleName: middle_name == null ? "" : middle_name, gm_lastName: last_name, gm_suffix: suffix == null ? "" : suffix, gm_address: complete_address, gm_gender: sex, gm_purpose: purpose, gm_processed_date: displaytodaysdate, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-goodMoral", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Good-Moral-${first_name + "_" + middle_name == null ? "" : middle_name + "_" + last_name + "" + suffix == null ? "" : suffix}.pdf`); }); setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false }); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds, the certificate will automatically download.`, noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>, }) } }) }
    function download_travelPass() { const stringOnly_format = /^[a-zA-Z\s]*$/; if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!first_name || !last_name || !complete_address || !vehicle || !destination || !departure_date || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (vehicle === "Yes" && (!vehicle_type || !plate_no)) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { if (vehicle === "Yes") { Axios.post("http://localhost:3001/create-pdf-travelPass", { tp_firstName: first_name, tp_middleName: middle_name == null ? "" : middle_name, tp_lastName: last_name, tp_suffix: suffix == null ? "" : suffix, tp_address: complete_address, tp_vehicleType: vehicle_type, tp_plateNo: plate_no, tp_destination: destination, tp_departureDate: departure_date, tp_purpose: purpose, tp_processed_date: displaytodaysdate, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-travelPass", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Travel-Pass-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false }); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds, the certificate will automatically download.`, noButton: <button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false })} className="alert_backBtn">Back</button>, }) } else { Axios.post("http://localhost:3001/create-pdf-travelPassNoVehicle", { tp_firstName: first_name, tp_middleName: middle_name == null ? "" : middle_name, tp_lastName: last_name, tp_suffix: suffix == null ? "" : suffix, tp_address: complete_address, tp_destination: destination, tp_departureDate: departure_date, tp_purpose: purpose, tp_processed_date: displaytodaysdate, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-travelPassNoVehicle", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Travel-Pass-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false }); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds, the certificate will automatically download.`, noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>, }) } } }
    function download_businessClearance() { Axios.post("http://localhost:3001/create-pdf-businessClearance", { busC_firstName: first_name, busC_middleName: middle_name == null ? "" : middle_name, busC_lastName: last_name, busC_suffix: suffix == null ? "" : suffix, busC_businessName: business_name, busC_businessAddress: business_address, busC_businessType: business_type, busC_businessStatus: status, busC_processed_date: displaytodaysdate, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-businessClearance", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Business-Clearance-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false }); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds, the certificate will automatically download.`, noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>, }) }
    const new_certificate = () => { const contact_format = /^(09|\+639)\d{9}$/; const numberOnly_format = /^\d+$/; const stringOnly_format = /^[a-zA-Z\s]*$/; if (document_type === "Certificate of Indigency") { if (!first_name || !last_name || !complete_address || !years_resided || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!numberOnly_format.test(String(years_resided))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Years Resided in the Barangay should be a number.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_coi()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Barangay ID") { if (!first_name || !last_name || !complete_address || !sex || !birthdate || !purpose || !contact_person || !contact_address || !contact_contact) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase()) || !stringOnly_format.test(String(contact_person).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!contact_format.test(String(contact_contact))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect Contact Number format.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={null} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Good Moral") { if (!first_name || !last_name || !complete_address || !sex || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_goodMoral()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Business Clearance") { if (!first_name || !last_name || !business_name || !business_address || !business_type || !status) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_businessClearance()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Travel Pass") { if (!first_name || !last_name || !complete_address || !vehicle || !destination || !departure_date || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if ((vehicle === "Yes") && (!vehicle_type || !plate_no)) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_travelPass()} className="alert_yesBtn"> Yes </button> }) }; }; }
    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <LoginAuthPop
                    errorDialog={errorDialog}
                    setErrorDialog={setErrorDialog}
                />
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                <SuccessDialog
                    successDialog={successDialog}
                    setSuccessDialog={setSuccessDialog}
                />
                <PopUp
                    title="New Document"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >

                    <div className="add_new_resident_container">

                        <div className="wrapper" id="wrapper_profile">

                            <div className="forms">

                                <div className="input_fields">

                                    <label>
                                        Document Type <span className="required_symbol">*</span>
                                    </label>
                                    <div className="custom_select">

                                        <select
                                            className="inputs"
                                            onChange={(e) => {
                                                setDocumentType(e.target.value);
                                            }}
                                        >

                                            <option value="">Select</option>
                                            <option value="Certificate of Indigency">
                                                Certificate of Indigency
                                            </option>
                                            <option value="Barangay ID">Barangay ID</option>
                                            <option value="Good Moral">Good Moral</option>
                                            <option value="Business Clearance">
                                                Business Clearance
                                            </option>
                                            <option value="Travel Pass">Travel Pass</option>
                                        </select>
                                    </div>
                                </div>
                                {document_type && (
                                    <div>
                                        {document_type === "Certificate of Indigency" ? (
                                            <div>

                                                <div className="input_fields">

                                                    <label>
                                                        First Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Last Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setLastName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Suffix</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Complete Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setCompleteAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Gender<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setSex(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Years Resided in the Barangay
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setYearsResided(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Purpose<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="All Legal Intents and Purposes">
                                                                All Legal Intents and Purposes
                                                            </option>
                                                            <option value="Applying A Job">
                                                                Applying A Job
                                                            </option>
                                                            <option value="Applying A Bank Account">
                                                                Applying A Bank Account
                                                            </option>
                                                            <option value="Certify Residency">
                                                                Certify Residency
                                                            </option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {purpose === "Others" ? (
                                                    <div className="input_fields">

                                                        <label>
                                                            Please Specify Purpose
                                                            <span className="required_symbol">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="forms" id="inputfields_profile">

                                                    <div className="input_fields">

                                                        <input
                                                            type="submit"
                                                            value="Generate"
                                                            className="btn"
                                                            onClick={new_certificate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {document_type === "Barangay ID" ? (
                                            <div>

                                                <div className="input_fields">

                                                    <label>
                                                        First Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Last Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setLastName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Suffix</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Complete Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setCompleteAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Gender<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setSex(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="input_fields">
                                                    <label>
                                                        Birthdate
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setBirthdate(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                        max={moment().format("YYYY-MM-DD")}
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Birthplace
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setPurpose(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">
                                                    <label>
                                                        Civil Status
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setPurpose(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        SSS No.
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setPurpose(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        TIN No.
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setPurpose(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Purpose<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="All Legal Intents and Purposes">
                                                                All Legal Intents and Purposes
                                                            </option>
                                                            <option value="Applying A Job">
                                                                Applying A Job
                                                            </option>
                                                            <option value="Applying A Bank Account">
                                                                Applying A Bank Account
                                                            </option>
                                                            <option value="Certify Residency">
                                                                Certify Residency
                                                            </option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {purpose === "Others" ? (
                                                    <div className="input_fields">

                                                        <label>
                                                            Please Specify Purpose
                                                            <span className="required_symbol">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="person_to_contact">

                                                    <p> Person to Contact In Case of Emergency </p>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Full Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setContactPerson(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Complete Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setContactAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Contact No.
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setContactContact(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="forms" id="inputfields_profile">

                                                    <div className="input_fields">

                                                        <input
                                                            type="submit"
                                                            value="Generate"
                                                            className="btn"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {document_type === "Good Moral" ? (
                                            <div>

                                                <div className="input_fields">

                                                    <label>
                                                        First Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Last Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setLastName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Suffix</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Complete Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setCompleteAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Gender<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setSex(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Purpose<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="All Legal Intents and Purposes">
                                                                All Legal Intents and Purposes
                                                            </option>
                                                            <option value="Applying A Job">
                                                                Applying A Job
                                                            </option>
                                                            <option value="Applying A Bank Account">
                                                                Applying A Bank Account
                                                            </option>
                                                            <option value="Certify Residency">
                                                                Certify Residency
                                                            </option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {purpose === "Others" ? (
                                                    <div className="input_fields">

                                                        <label>
                                                            Please Specify Purpose
                                                            <span className="required_symbol">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="forms" id="inputfields_profile">

                                                    <div className="input_fields">

                                                        <input
                                                            type="submit"
                                                            value="Generate"
                                                            className="btn"
                                                            onClick={new_certificate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {document_type === "Business Clearance" ? (
                                            <div>

                                                <div className="input_fields">

                                                    <label>
                                                        First Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Last Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setLastName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Suffix</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Name of Business
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setBusinessName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Business Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setBusinessAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Type of Business
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setBusinessType(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Status<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setStatus(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="New">New</option>
                                                            <option value="Renewal">Renewal</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="forms" id="inputfields_profile">

                                                    <div className="input_fields">

                                                        <input
                                                            type="submit"
                                                            value="Generate"
                                                            className="btn"
                                                            onClick={new_certificate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {document_type === "Travel Pass" ? (
                                            <div>

                                                <div className="input_fields">

                                                    <label>
                                                        First Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Last Name
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setLastName(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Suffix</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Complete Address
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <textarea
                                                        className="textarea"
                                                        onChange={(e) => {
                                                            setCompleteAddress(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    ></textarea>
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Do you have a vehicle?
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setVehicle(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="None">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {vehicle === "Yes" ? (
                                                    <div>

                                                        <div className="input_fields">

                                                            <label>
                                                                Vehicle Type
                                                                <span className="required_symbol">*</span>
                                                            </label>
                                                            <input
                                                                className="inputs"
                                                                onChange={(e) => {
                                                                    setVehicleType(e.target.value);
                                                                }}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        <div className="input_fields">

                                                            <label>
                                                                Plate No.
                                                                <span className="required_symbol">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="inputs"
                                                                onChange={(e) => {
                                                                    setPlateNo(e.target.value);
                                                                }}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="input_fields">

                                                    <label>
                                                        Destination
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setDestination(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Date of Departure
                                                        <span className="required_symbol">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="inputs"
                                                        onChange={(e) => {
                                                            setDepartureDate(e.target.value);
                                                        }}
                                                        autoComplete="off"
                                                        min={moment().format("YYYY-MM-DD")}
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Purpose<span className="required_symbol">*</span>
                                                    </label>
                                                    <div className="custom_select">

                                                        <select
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">Select</option>
                                                            <option value="All Legal Intents and Purposes">
                                                                All Legal Intents and Purposes
                                                            </option>
                                                            <option value="Applying A Job">
                                                                Applying A Job
                                                            </option>
                                                            <option value="Applying A Bank Account">
                                                                Applying A Bank Account
                                                            </option>
                                                            <option value="Certify Residency">
                                                                Certify Residency
                                                            </option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {purpose === "Others" ? (
                                                    <div className="input_fields">

                                                        <label>
                                                            Please Specify Purpose
                                                            <span className="required_symbol">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="inputs"
                                                            onChange={(e) => {
                                                                setPurpose(e.target.value);
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="forms" id="inputfields_profile">

                                                    <div className="input_fields">

                                                        <input
                                                            type="submit"
                                                            value="Generate"
                                                            className="btn"
                                                            onClick={new_certificate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </PopUp>
                <Router>

                    <div className="certificate_request">

                        <div className="process_request_container">

                            <div className="adminhome_titles">

                                <h1>Barangay Document Requests</h1> <hr />
                            </div>
                            <div className="folder">

                                <div className="folder_buttons">
                                    {active.map((button, index) => (
                                        <Link
                                            to={button.path}
                                            key={index}
                                            onClick={() => toggleActive(button.id)}
                                            className={`custom${button.isActive ? " active" : ""}`}
                                        >
                                            {button.buttonName}
                                        </Link>
                                    ))}
                                    <div
                                        className={`underline${id === 0 ? " active-0" : ""}${id === 1 ? " active-1" : ""
                                            }${id === 2 ? " active-2" : ""}`}
                                    />
                                </div>
                                <div className="resident_tbl_header">

                                    <div className="new_resident_btn_container">

                                        <button
                                            className="new_resident_btn"
                                            onClick={openInPopup}
                                        >

                                            <IoIosAdd className="btn_icon" />
                                            New Document
                                        </button>
                                    </div>
                                </div>
                                <Switch>

                                    <Route
                                        path="/document-requests/pending-requests"
                                        component={Pending}
                                    />
                                    <Route
                                        path="/document-requests/processed-requests"
                                        component={Processed}
                                    />
                                    <Route
                                        path="/document-requests/declined-requests"
                                        component={Declined}
                                    />
                                    <Redirect to="/document-requests/pending-requests"></Redirect>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </main>
        </div>
    );
}