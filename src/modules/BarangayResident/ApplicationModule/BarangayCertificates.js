import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./BarangayCertificates.css";
import Footer from "./../../../components/Footer/Footer";
import Notification from "./../../../components/Dialog/Notification";
import ConfirmDialog from "./../../../components/Dialog/ConfirmDialog";
import LoginAuthPop from "./../../../components/Dialog/LoginAuthPop";
import SuccessRegisterDialog from "./../../../components/Dialog/SuccessRegisterDialog";
import Navbar from "./../../../components/Navbar/Navbar";
import ScrollToTop from "./../../../components/ScrollToTop/ScrollToTop";
import moment from "moment";
import Helm from "../../../components/Helmet/Helmet";
function BarangayCertificates() {
    Axios.defaults.withCredentials = true;
    const [resident_id, setResidentId] = useState(""), [account_id, setAccountId] = useState(""), [email, setEmail] = useState(""), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setSuffix] = useState(""), [complete_address, setCompleteAddress] = useState(""), [sex, setSex] = useState(""), [birthdate, setBirthdate] = useState(""), [purpose, setPurpose] = useState(""), [otherPurpose, setOtherPurpose] = useState(""), [civil_status, setCivilStatus] = useState(""), [years_resided, setYearsResided] = useState(""), [document_type, setDocumentType] = useState(""), [contact_person, setContactPerson] = useState(""), [contact_address, setContactAddress] = useState(""), [contact_contact, setContactContact] = useState(""), [business_name, setBusinessName] = useState(""), [business_address, setBusinessAddress] = useState(""), [business_type, setBusinessType] = useState(""), [status, setStatus] = useState(""), [vehicle, setVehicle] = useState(""), [vehicle_type, setVehicleType] = useState(""), [plate_no, setPlateNo] = useState(""), [destination, setDestination] = useState(""), [departure_date, setDepartureDate] = useState(""), [check, setCheck] = useState(""), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), history = useHistory(), [sss, setSSS] = useState(""), [tin, setTIN] = useState(""), [cStatus, setCStatus] = useState(""), [bplace, setBplace] = useState("")
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();

    const displaytodaystime = showdate.getHours() + ':' + showdate.getMinutes() + ':' + showdate.getSeconds()

    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setResidentId(response.data.user[0].resident_id); setAccountId(response.data.user[0].account_id); setFirstName(response.data.user[0].first_name); setMiddleName(response.data.user[0].middle_name); setLastName(response.data.user[0].last_name); setSex(response.data.user[0].gender); setCompleteAddress(response.data.user[0].number + " " + response.data.user[0].street_name + " " + response.data.user[0].barangay + " " + response.data.user[0].city_district); setSuffix(response.data.user[0].suffix); setCivilStatus(response.data.user[0].civil_status); setBirthdate(moment(response.data.user[0].birthdate).format('YYYY-MM-DD')); setYearsResided(response.data.user[0].years_resided); setEmail(response.data.user[0].email); setCStatus(response.data.user[0].civil_status); setBplace(response.data.user[0].birthplace); } }) }, [])
    function indigency_confirmed() { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.post("http://localhost:3001/insertCOI", { coi_dToday: displaytodaysdate, coi_tToday: displaytodaystime, coi_residentId: resident_id, coi_accountId: account_id, coi_fName: first_name, coi_mName: middle_name == null ? '' : middle_name, coi_lName: last_name, coi_suffix: suffix == null ? '' : suffix, coi_sex: sex, coi_address: complete_address, coi_yResided: years_resided, coi_purpose: purpose === "Others" ? otherPurpose : purpose, coi_email: email }).then((response) => { if (response.data.err1) { setErrorDialog({ isOpen: true, title: "You already requested this document.", subtitle: response.data.err1, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (response.data.success1) { setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn">Yes</button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn" > Back</button>), }); setNotify({ isOpen: true, message: "Request Successful", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Check your connection and reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } }) }
    function apply_certificate() { if (!resident_id) { setErrorDialog({ isOpen: true, title: "Access Denied.", subtitle: "Please login your account again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (document_type === "Certificate of Indigency") { if (!purpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => indigency_confirmed()} className="alert_yesBtn">Yes</button> }); } } else if (document_type === "Barangay ID") { if (!purpose || !contact_person || !contact_address || !contact_contact) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>), yesButton: (<button onClick={() => barangay_id_confirmed()} className="alert_yesBtn">Yes</button>), }); } } else if (document_type === "Good Moral") { if (!purpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No</button>), yesButton: (<button onClick={() => good_moral_confirmed()} className="alert_yesBtn">Yes</button>), }); } } else if (document_type === "Business Clearance") { if (!business_name || !business_address || !business_type) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Requried fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>), yesButton: (<button onClick={() => business_clearance_confirmed()} className="alert_yesBtn">Yes</button>), }); } } else if (document_type === "Barangay Clearance") { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>), yesButton: (<button onClick={() => barangay_clearance_confirmed()} className="alert_yesBtn">Yes</button>), }); } else if (document_type === "Travel Pass") { if (!vehicle || !destination || !departure_date || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Requried fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Please specify a purpose.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (vehicle === "Yes" && (!vehicle_type || !plate_no)) { setErrorDialog({ isOpen: true, title: "Input Error", subtitle: "Requried fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { setConfirmDialog({ isOpen: true, title: "Submit Confirmation", subtitle: "Are you sure you want to submit the Application?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>), yesButton: (<button onClick={() => travel_pass_confirmed()} className="alert_yesBtn">Yes</button>), }); } } }
    function barangay_id_confirmed() { Axios.post("http://localhost:3001/BarangayCertificates", { brgy_cert_ResidentId: resident_id, brgy_cert_AccountId: account_id, brgy_cert_fName: first_name, brgy_cert_mName: middle_name == null ? '' : middle_name, brgy_cert_lName: last_name, brgy_cert_suffix: suffix == null ? '' : suffix, brgy_cert_sex: sex, brgy_cert_address: complete_address, brgy_cert_dToday: displaytodaysdate, brgy_cert_birthdate: birthdate, brgy_cert_purpose: purpose === "Others" ? otherPurpose : purpose, brgy_cert_dType: document_type, brgy_cert_cPerson: contact_person, brgy_cert_cAddress: contact_address, brgy_cert_cContact: contact_contact, cStatus: cStatus, bPlace: bplace, sssNo: sss, tinNo: tin, req_email: email, tToday: displaytodaystime }).then((response) => { if (response.data.err2) { setErrorDialog({ isOpen: true, title: "You already requested this document.", subtitle: response.data.err2, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (response.data.success2) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes </button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Request Successful", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Check your connection and reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } }); }
    function good_moral_confirmed() { Axios.post("http://localhost:3001/BarangayCertificates", { brgy_cert_ResidentId: resident_id, brgy_cert_AccountId: account_id, brgy_cert_fName: first_name, brgy_cert_mName: middle_name == null ? '' : middle_name, brgy_cert_lName: last_name, brgy_cert_suffix: suffix == null ? '' : suffix, brgy_cert_sex: sex, brgy_cert_address: complete_address, brgy_cert_dToday: displaytodaysdate, brgy_cert_purpose: purpose === "Others" ? otherPurpose : purpose, brgy_cert_dType: document_type, req_email: email, tToday: displaytodaystime }).then((response) => { if (response.data.err3) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "You already requested this document.", subtitle: response.data.err3, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (response.data.success3) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn">Yes</button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Request Successful", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Check your connection and reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } }); }
    function business_clearance_confirmed() { Axios.post("http://localhost:3001/BarangayCertificates", { brgy_cert_ResidentId: resident_id, brgy_cert_AccountId: account_id, brgy_cert_fName: first_name, brgy_cert_mName: middle_name == null ? '' : middle_name, brgy_cert_lName: last_name, brgy_cert_suffix: suffix == null ? '' : suffix, brgy_cert_dToday: displaytodaysdate, brgy_cert_dType: document_type, brgy_cert_bName: business_name, brgy_cert_bAddress: business_address, brgy_cert_bType: business_type, brgy_cert_bStatus: status, req_email: email, tToday: displaytodaystime }).then((response) => { if (response.data.err1) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "You already requested this document.", subtitle: response.data.err1, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (response.data.success1) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn">Yes</button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn" >Back </button>), }); setNotify({ isOpen: true, message: "Request Successful", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Check your connection and reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } }); }
    function barangay_clearance_confirmed() { Axios.post("http://localhost:3001/BarangayCertificates", { brgy_cert_ResidentId: resident_id, brgy_cert_AccountId: account_id, brgy_cert_fName: first_name, brgy_cert_mName: middle_name == null ? '' : middle_name, brgy_cert_lName: last_name, brgy_cert_suffix: suffix == null ? '' : suffix, brgy_cert_sex: sex, brgy_cert_address: complete_address, brgy_cert_dToday: displaytodaysdate, brgy_cert_birthdate: birthdate, brgy_cert_purpose: purpose, brgy_cert_cStatus: civil_status, brgy_cert_dType: document_type, brgy_cert_yResided: years_resided, brgy_cert_cPerson: contact_person, brgy_cert_cAddress: contact_address, brgy_cert_cContact: contact_contact, req_email: email, tToday: displaytodaystime }).then((response) => { }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes</button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn">Back</button>), }); setNotify({ isOpen: true, message: "Registered Successfully", type: "success", }); }
    function travel_pass_confirmed() { Axios.post("http://localhost:3001/BarangayCertificates", { brgy_cert_ResidentId: resident_id, brgy_cert_AccountId: account_id, brgy_cert_fName: first_name, brgy_cert_mName: middle_name == null ? '' : middle_name, brgy_cert_lName: last_name, brgy_cert_suffix: suffix == null ? '' : suffix, brgy_cert_address: complete_address, brgy_cert_vehicle: vehicle, brgy_cert_vType: vehicle_type, brgy_cert_pNo: plate_no, brgy_cert_destination: destination, brgy_cert_dDate: departure_date, brgy_cert_purpose: purpose === "Others" ? otherPurpose : purpose, brgy_cert_dToday: displaytodaysdate, brgy_cert_dType: document_type, req_email: email, tToday: displaytodaystime }).then((response) => { if (response.data.err4) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "You already requested this document.", subtitle: response.data.err4, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else if (response.data.success4) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Application Successfully Submitted!", subtitle: "Do you want to request another document?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes</button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn">Back</button>), }); setNotify({ isOpen: true, message: "Registered Successfully", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Check your connection and reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } }); }
    function RequestAgain() { setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, }); setTimeout(function () { window.location.reload(); }, 0); }
    function backtoHome() { history.push("/ApplicationModule"); }
    return (
        <div className="barangay_certifcates">
            <Helm title={`Barangay Documents | One Barangay`} />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <LoginAuthPop
                errorDialog={errorDialog}
                setErrorDialog={setErrorDialog}
            />
            <SuccessRegisterDialog
                successRegisterDialog={successRegisterDialog}
                setSuccessRegisterDialog={setSuccessRegisterDialog}
            />
            <Navbar />
            <ScrollToTop />
            <div
                className="EditProfile_container"
                style={
                    !document_type ? { marginBottom: "20vh" } : { marginBottom: "" }
                }
            >
                <div className="container">
                    <div className="wrapper">
                        <div className="brgy_cl_titles">

                            <h1>ONLINE APPLICATION FORM FOR BARANGAY CERTIFICATES</h1>
                            <p className="noteEnglish">

                                <span className="reminder">NOTE: </span> Please fill out all
                                required information which will be reflected in the Barangay
                                registry and Barangay Certificate. We enjoin you to provide
                                only true and accurate information to avoid penalties as
                                provided in the law.
                            </p>
                            <p className="noteEnglish">

                                Please provide your active email address and Philippine mobile
                                number to receive updates on your Barangay Clearance
                                application.
                            </p>
                            <p className="noteTagalog">

                                <span className="reminder">TANDAAN: </span> Punan ang lahat ng
                                kailangang impormasyon para sa inyong Barangay Certificate.
                                Ibigay lamang ang totoo at tamang impormasyon upang maiwasan
                                ang parusang ayos sa batas.
                            </p>
                            <p className="noteTagalog">

                                Ibigay lamang ang iyong aktibong email address at Philippine
                                mobile number upang makatanggap ng mga mensahe sa iyong
                                rehistrasyon sa Barangay Clearance.
                            </p>
                            <p className="required_symbol_english">

                                <span className="reminder">REMINDER: </span> All
                                <span className="required_symbol">*</span> are required.
                            </p>
                            <p className="required_symbol_tagalog">

                                <span className="reminder">PAALALA: </span> Lahat ng may
                                <span className="required_symbol">*</span> ay kailangan.
                            </p>
                        </div>
                        <div className="forms">
                            <div className="input_fields">

                                <label>

                                    Type of Document <span className="required_symbol">
                                        *
                                    </span>
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
                            <div>
                                {document_type === "Certificate of Indigency" ? (
                                    <div>

                                        <div className="input_fields">

                                            <label>

                                                Purpose <span className="required_symbol">
                                                    *
                                                </span>
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
                                                        setOtherPurpose(e.target.value);
                                                    }}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {document_type === "Barangay ID" ? (
                                    <div>
                                        <div className="input_fields">

                                            <label>

                                                SSS No.
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                onChange={(e) => {
                                                    setSSS(e.target.value);
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
                                                    setTIN(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>

                                                Purpose <span className="required_symbol">
                                                    *
                                                </span>
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
                                                        setOtherPurpose(e.target.value);
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

                                                Full Name <span className="required_symbol">
                                                    *
                                                </span>
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

                                                Contact No. <span className="required_symbol">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                className="inputs"
                                                onChange={(e) => {
                                                    setContactContact(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {document_type === "Good Moral" ? (
                                    <div>

                                        <div className="input_fields">

                                            <label>

                                                Purpose <span className="required_symbol">
                                                    *
                                                </span>
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
                                                        setOtherPurpose(e.target.value);
                                                    }}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {document_type === "Business Clearance" ? (
                                    <div>

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

                                                Status <span className="required_symbol">*</span>
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
                                    </div>
                                ) : (
                                    ""
                                )}
                                {document_type === "Travel Pass" ? (
                                    <div>

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
                                            <>

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
                                                <br />
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <label>

                                                Destination <span className="required_symbol">
                                                    *
                                                </span>
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
                                                min={moment().format('YYYY-MM-DD')}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Purpose <span className="required_symbol">*</span>
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
                                                        setOtherPurpose(e.target.value);
                                                    }}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {!document_type ? (
                                    ""
                                ) : (
                                    <div>

                                        <div className="input_fieldss terms">

                                            <label className="label_checkbox">

                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => setCheck(e.target.checked)}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            <p className="applicationForm_terms">
                                                I have read and agreed to the
                                                <a href="/terms-of-use">Terms of Use</a> and
                                                <a href="/privacy-policy">
                                                    Privacy Policy of One Barangay.
                                                </a>
                                            </p>
                                        </div>
                                        {!check ? (
                                            ""
                                        ) : (
                                            <div>

                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        id="submitBTN"
                                                        value="Submit"
                                                        className="btn"
                                                        onClick={apply_certificate}
                                                        style={{ marginTop: "20px" }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="input_fields">

                                    <input
                                        type="submit"
                                        value="Back"
                                        className="btn"
                                        id="forms_backBtn"
                                        onClick={backtoHome}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {window.innerWidth <= 600 ? "" : <Footer />}
        </div>
    );
}
export default BarangayCertificates;