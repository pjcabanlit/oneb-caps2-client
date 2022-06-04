import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EmergencyIncidentReport.css";
import LoginAuthPop from "./../../../components/Dialog/LoginAuthPop";
import Notification from "./../../../components/Dialog/Notification";
import ConfirmDialog from "./../../../components/Dialog/ConfirmDialog";
import ScrollToTop from "./../../../components/ScrollToTop/ScrollToTop";
import SuccessRegisterDialog from "./../../../components/Dialog/SuccessRegisterDialog"
import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import Helm from "../../../components/Helmet/Helmet";
import moment from 'moment';
function EmergencyIncidentReport() {
    Axios.defaults.withCredentials = true;
    const [category, setCategory] = useState(""), [resident_id, setResidentId] = useState(""), [account_id, setAccountId] = useState(""), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: false, title: "", subtitle: "", yesButton: "", noButton: "", }), [incidentDate, setIncidentDate] = useState(""), [incidentTime, setIncidentTime] = useState(""), [incidentLocation, setIncidentLocation] = useState(""), [incident, setIncident] = useState(""), [video, setVideo] = useState(""), [fireLocation, setFireLocation] = useState(""), [fireDetails, setFireDetails] = useState(""), [fireDate, setFireDate] = useState(""), [fireTime, setFireTime] = useState(""), [firebrigade, setFirebrigade] = useState(""), [accidentDate, setAccidentDate] = useState(""), [accidentTime, setAccidentTime] = useState(""), [accidentLocation, setAccidentLocation] = useState(""), [accidentDescription, setAccidentDescription] = useState(""), [emergencyAddress, setEmergencyAddress] = useState(""), [emergencyDescription, setEmergencyDescription] = useState(""), [, setImage] = useState(""), [postImage, setPostImage] = useState("");
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setResidentId(response.data.user[0].resident_id); setAccountId(response.data.user[0].account_id); } }); }, []);
    const RequestAgain = () => { setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, }); setTimeout(function () { window.location.reload(); }, 0); }
    function incident_report_submit() { setErrorDialog({ ...errorDialog, isOpen: false, }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); if (!resident_id) { setErrorDialog({ isOpen: true, title: "Oops! Access Denied.", subtitle: "You must be logged in to continue.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else if (!incidentDate || !incidentTime || !incident || !incidentLocation) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All fields are required", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else { setConfirmDialog({ isOpen: true, title: "Report Confirmation", subtitle: "Are you sure you want to submit the Report?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => incident_report_confirmed()} className="alert_yesBtn" >{" "}Yes{" "}</button>), }); } }
    function incident_report_confirmed() { Axios.post("http://localhost:3001/IncidentReport", { IncidentReport_date: incidentDate, IncidentReport_time: incidentTime, IncidentReport_location: incidentLocation, IncidentReport_incident: incident, IncidentReport_residentId: resident_id, IncidentReport_accountId: account_id, IncidentReport_dateToday: displaytodaysdate, IncidentReport_ImgVid: !postImage ? null : postImage, IncidentReport_vid: !video ? null : video }).then((response) => { if (response.data.success) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Report Successfully Submitted!", subtitle: "Do you want to file another report?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes </button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Report Submitted", type: "success" }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connnection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>, }); } }); }
    function fire_report_submit() { setErrorDialog({ ...errorDialog, isOpen: false, }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); if (!resident_id) { setErrorDialog({ isOpen: true, title: "Oops! Access Denied.", subtitle: "You must be logged in to continue.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else if (!fireLocation || !fireDetails || !fireDate || !fireTime || !firebrigade) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All fields are required", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else { setConfirmDialog({ isOpen: true, title: "Report Confirmation", subtitle: "Are you sure you want to submit the Report?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => fire_report_confirmed()} className="alert_yesBtn" >{" "}Yes{" "}</button>), }); } }
    function fire_report_confirmed() { Axios.post("http://localhost:3001/FireReport", { FireReport_location: fireLocation, FireReport_details: fireDetails, FireReport_date: fireDate, FireReport_time: fireTime, FireReport_firebrigade: firebrigade, FireReport_residentId: resident_id, FireReport_accountId: account_id, FireReport_dateToday: displaytodaysdate, FireReport_ImgVid: !postImage ? null : postImage, FireReport_vid: !video ? null : video }).then((response) => { if (response.data.success) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Report Successfully Submitted!", subtitle: "Do you want to file another report?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes </button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Report Submitted", type: "success" }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connnection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>, }); } }); }
    function accident_report_submit() { setErrorDialog({ ...errorDialog, isOpen: false, }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); if (!resident_id) { setErrorDialog({ isOpen: true, title: "Oops! Access Denied.", subtitle: "You must be logged in to continue.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else if (!accidentTime || !accidentDate || !accidentLocation || !accidentDescription) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All fields are required", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else { setConfirmDialog({ isOpen: true, title: "Report Confirmation", subtitle: "Are you sure you want to submit the Report?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => accident_report_confirmed()} className="alert_yesBtn" >{" "}Yes{" "}</button>), }); } }
    function accident_report_confirmed() { Axios.post("http://localhost:3001/AccidentReport", { AccidentReport_time: accidentTime, AccidentReport_date: accidentDate, AccidentReport_location: accidentLocation, AccidentReport_accidentDescription: accidentDescription, AccidentReport_residentId: resident_id, AccidentReport_accountId: account_id, AccidentReport_dateToday: displaytodaysdate, AccidentReport_ImgVid: !postImage ? null : postImage, AccidentReport_vid: !video ? null : video }).then((response) => { if (response.data.success) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Report Successfully Submitted!", subtitle: "Do you want to file another report?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes </button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Report Submitted", type: "success" }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connnection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>, }); } }); }
    function emergency_report_submit() { setErrorDialog({ ...errorDialog, isOpen: false, }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); if (!resident_id) { setErrorDialog({ isOpen: true, title: "Oops! Access Denied.", subtitle: "You must be logged in to continue.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else if (!emergencyAddress || !emergencyDescription) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All fields are required", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); setConfirmDialog({ ...confirmDialog, isOpen: false, }); } else { setConfirmDialog({ isOpen: true, title: "Report Confirmation", subtitle: "Are you sure you want to submit the Report?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => emergency_report_confirmed()} className="alert_yesBtn" >{" "}Yes{" "}</button>), }); } }
    function emergency_report_confirmed() { Axios.post("http://localhost:3001/EmergencyReport", { EmergencyReport_emergencyAddress: emergencyAddress, EmergencyReport_description: emergencyDescription, EmergencyReport_residentId: resident_id, EmergencyReport_accountId: account_id, EmergencyReport_dateToday: displaytodaysdate, EmergencyReport_ImgVid: !postImage ? null : postImage, EmergencyReport_vid: !video ? null : video }).then((response) => { if (response.data.success) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccessRegisterDialog({ isOpen: true, title: "Report Successfully Submitted", subtitle: "Do you want to file another report?", yesButton: (<button onClick={() => RequestAgain()} className="alert_yesBtn"> Yes </button>), noButton: (<button onClick={() => setSuccessRegisterDialog({ ...successRegisterDialog, isOpen: false, })} className="alert_backBtn"> Back</button>), }); setNotify({ isOpen: true, message: "Report Submitted", type: "success" }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connnection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>, }); } }); }
    const handleFileUpload = async (e) => { const fsize = e.target.files[0].size; const file = Math.round(fsize / 1000); if (file >= 50000) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too Big, please select a file less than 50MB", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); if (e.target.files && e.target.files[0]) { let reader = new FileReader(); reader.onload = function (e) { setImage(e.target.result); }; reader.readAsDataURL(e.target.files[0]); } } };
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); };
    return (
        <div className="EmergencyReports_container">
            <Helm title={`Reports | One Barangay`} />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessRegisterDialog successRegisterDialog={successRegisterDialog} setSuccessRegisterDialog={setSuccessRegisterDialog} />
            <Navbar />
            <ScrollToTop />
            <div className="EditProfile_container" id="emergency_incident_report_container"> <div className="container"> <div className="EmergencyReports_contents"> <div className="EmergencyReports_IncidentReport"> <div className="EmergencyReports_IncidentReport_content"> <h1>What is an Incident Report?</h1> <p> An incident report is a tool that documents any event that may or may not have caused injuries to a person or damage to a company asset. It is used to capture injuries and accidents, near misses, property and equipment damage, health and safety issues, security breaches and misconducts in the worksite. </p></div><div className="EmergencyReports_IncidentReport_content"> <h1>What is the Purpose of Incident Reporting?</h1> <p> An incident report can be used in the investigation and analysis of an event. It includes the root cause and corrective actions to eliminate the risks involved and prevent similar future occurrences. Incident reports can also be used as safety documents that indicate potential risks and uncontrolled hazards found in the worksite. </p><p> Incident reporting is the process of documenting all worksite injuries, near misses, and accidents. An incident report should be completed at the time an incident occurs no matter how minor an injury is. This article covers an in-depth explanation of the incident reporting procedure and the types of events you should report. </p></div><div className="EmergencyReports_IncidentReport_content"> <h1>What is Considered an Incident?</h1> <p> Generally, an incident is defined as any event, condition, or situation which: </p><ul> <li>Causes disruption or interference to an organization;</li><li> Causes significant risks that could affect members within an organization; </li><li> Impacts on the systems and operation of worksites; and/ or </li><li> Attracts negative media attention or a negative profile for the worksite </li></ul> </div><div className="EmergencyReports_IncidentReport_content"> <h1>What to do After Completing an Incident Report</h1> <p> The incident report should be submitted to an investigation team to further study and look for deeper causes. An investigation should be conducted by those who are competent in collecting and analyzing information and evidence gathered from the incident report. Those conducting the investigation should be knowledgeable in occupational health and safety fundamentals. </p><p> The purpose of investigating an incident is not to find fault but to determine the root cause and develop corrective actions to prevent similar incidents from happening. An investigation also helps fulfill regulatory requirements (such as OSHA 300 Forms in the United States) and determines the costs involved with property or equipment damage (if any). </p></div></div></div><div className="wrapper"> <div className="brgy_cl_titles"> <h1>Online Form for Filing Report</h1> <p className="noteEnglish"> <span className="reminder">NOTE: </span> Please fill out all required information which will be reflected in the Barangay registry and Barangay Certificate. We enjoin you to provide only true and accurate information to avoid penalties as provided in the law. </p><p className="noteTagalog"> <span className="reminder">TANDAAN: </span> Punan ang lahat ng kailangang impormasyon para sa inyong Barangay Certificate. Ibigay lamang ang totoo at tamang impormasyon upang maiwasan ang parusang ayos sa batas. </p><p className="required_symbol_english"> <span className="reminder">REMINDER: </span> All{" "}<span className="required_symbol">*</span> are required.{" "}</p><p className="required_symbol_tagalog"> <span className="reminder">PAALALA: </span> Lahat ng may{" "}<span className="required_symbol">*</span> ay kailangan.{" "}</p></div><div className="forms"> <div className="input_fields"> <label> Please select what kind of report do you want to submit <span className="required_symbol">*</span> </label> <div className="custom_select"> <select className="inputs" onChange={(e) => { setCategory(e.target.value); }}> <option value="">Select</option> <option value="IncidentReport"> Incident Report</option> <option value="FireIncidentReport"> Fire Incident Report </option> <option value="EmergencyReport">Emergency Report</option> <option value="AccidentReport">Accident Report</option> </select> </div></div></div></div>{category === "FireIncidentReport" ? (<div className="wrapper"> <div className="forms"> <div className="input_fields"> <label> Date of Fire Incident <span className="required_symbol">*</span> </label> <input type="date" className="inputs" onChange={(e) => setFireDate(e.target.value)} max={moment().format("YYYY-MM-DD")} /> </div><div className="input_fields"> <label> Time of Fire Incident <span className="required_symbol">*</span> </label> <input type="time" className="inputs" onChange={(e) => setFireTime(e.target.value)} /> </div><div className="input_fields"> <label> Fire Incident Location <span className="required_symbol">*</span> </label> <textarea className="textarea" onChange={(e) => setFireLocation(e.target.value)}>{" "}</textarea> </div><div className="input_fields"> <label> Fire Incident Details <span className="required_symbol">*</span> </label> <textarea className="textarea" onChange={(e) => setFireDetails(e.target.value)} /> </div><div className="input_fields"> <label> Did fire brigade attend? <span className="required_symbol">*</span> </label> <input type="radio" className="report_radio" name="fireBrigadeAttend" id="FByes" value="Yes" onChange={(e) => setFirebrigade(e.target.value)} /> <label className="report_labelRadio" for="FByes"> Yes </label> <input type="radio" className="report_radio" name="fireBrigadeAttend" id="FBno" value="No" onChange={(e) => setFirebrigade(e.target.value)} /> <label className="report_labelRadio" for="FBno"> No </label> </div><div className="input_fields"> <label> Photo </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => handleFileUpload(e)} accept="image/*" multiple /> </div><div className="input_fields"> <label> Video </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => setVideo(e.target.files)} accept="video/*" /> </div><div className="input_fields"> <input type="submit" value="Submit Report" className="btn" onClick={fire_report_submit} /> </div></div></div>) : null}{category === "IncidentReport" ? (<div className="wrapper"> <div className="forms"> <div className="input_fields"> <label> Date of Incident:<span className="required_symbol">*</span> </label> <input type="date" className="inputs" onChange={(e) => setIncidentDate(e.target.value)} max={moment().format("YYYY-MM-DD")} /> </div><div className="input_fields"> <label> Time of Incident:<span className="required_symbol">*</span> </label> <input type="time" className="inputs" onChange={(e) => setIncidentTime(e.target.value)} /> </div><div className="input_fields"> <label> Location of Incident: <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setIncidentLocation(e.target.value)} /> </div><div className="input_fields"> <label> What was the Incident? <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setIncident(e.target.value)} /> </div><div className="input_fields"> <label> Photo </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => handleFileUpload(e)} accept="image/*" multiple /> </div><div className="input_fields"> <label> Video </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => setVideo(e.target.files)} accept="video/*" /> </div><div className="input_fields"> <input type="submit" value="Submit Report" className="btn" onClick={incident_report_submit} /> </div></div></div>) : null}{category === "AccidentReport" ? (<div className="wrapper"> <div className="forms"> <div className="input_fields"> <label> Date of Accident:<span className="required_symbol">*</span> </label> <input type="date" className="inputs" onChange={(e) => setAccidentDate(e.target.value)} max={moment().format("YYYY-MM-DD")} /> </div><div className="input_fields"> <label> Time of Accident:<span className="required_symbol">*</span> </label> <input type="time" className="inputs" onChange={(e) => setAccidentTime(e.target.value)} /> </div><div className="input_fields"> <label> Exact location of Accident: <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setAccidentLocation(e.target.value)} /> </div><div className="input_fields"> <label> Describe how the accident happened: <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setAccidentDescription(e.target.value)} /> </div><div className="input_fields"> <label> Photo </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => handleFileUpload(e)} accept="image/*" multiple /> </div><div className="input_fields"> <label> Video </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => setVideo(e.target.files)} accept="video/*" /> </div><div className="input_fields"> <input type="submit" value="Submit Report" className="btn" onClick={accident_report_submit} /> </div></div></div>) : null}{category === "EmergencyReport" ? (<div className="wrapper"> <div className="forms"> <div className="input_fields"> <label> Location of the Emergency: <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setEmergencyAddress(e.target.value)} /> </div><div className="input_fields"> <label> Describe the Emergency: <span className="required_symbol">*</span> </label> <textarea type="text" className="textarea" onChange={(e) => setEmergencyDescription(e.target.value)} /> </div><div className="input_fields"> <label> Photo </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => handleFileUpload(e)} accept="image/*" multiple /> </div><div className="input_fields"> <label> Video </label> <input type="file" className="inputs" id="file_inputs" onChange={(e) => setVideo(e.target.files)} accept="video/*" /> </div><div className="input_fields"> <input type="submit" value="Submit Report" className="btn" onClick={emergency_report_submit} /> </div></div></div>) : null}</div>{window.innerWidth <= 600 ? "" : <Footer />}</div></div>
    );
}
export default EmergencyIncidentReport;