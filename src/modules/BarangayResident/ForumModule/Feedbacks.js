import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Feedback.css";
import ConfirmDialog from "./../../../components/Dialog/ConfirmDialog";
import LoginAuthPop from "./../../../components/Dialog/LoginAuthPop";
import SuccessDialog from "./../../../components/Dialog/SuccessDialog";
import Notification from "./../../../components/Dialog/Notification";
import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import Helm from "../../../components/Helmet/Helmet";
function Feedbacks() {
    const [resident_id, setResidentId] = useState(""), [feedback, setFeedback] = useState(""), [account_id, setAccountId] = useState(""), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), back = () => { setSuccesDialog({ ...successDialog, isOpen: false }); window.location.reload() }
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setResidentId(response.data.user[0].resident_id); setAccountId(response.data.user[0].account_id) } }) }, [])
    function submit_feedback() { if (!feedback) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want to submit the Feedback & Suggestion?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => feedback_confirmed()} className="alert_yesBtn">{" "}Yes{" "}</button>), }); } }
    function feedback_confirmed() { Axios.post("http://localhost:3001/Feedback", { feedback_suggestion_details: feedback, feedback_suggestion_inhabitant_id: resident_id, feedback_suggestion_accountId: account_id, feedback_suggestion_date_today: displaytodaysdate, }).then((response) => { if (response.data.success) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccesDialog({ isOpen: true, title: "Feedback & Suggestions Submitted!", subtitle: "", noButton: (<button onClick={() => back()} className="alert_backBtn"> Back </button>), }); setNotify({ isOpen: true, message: "Submitted.", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error.", subtitle: "Please check your connection and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } }); }
    return (
        <div>
            <Helm title={`Feedback & Suggestion | One Barangay`} />
            <Navbar />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} /> <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} /> <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccesDialog} />
            <div className="Feedbacks_container"> <div className="container"> <div className="EditProfile_container"> <div className="wrapper"> <div className="titles"> <h1>Feedback and Suggestions</h1> </div><p className="noteEnglish"> As a part of continuous and committed public service, we want to hear your Feedbacks and Suggestions to serve you better! Express your satisfaction by filling up the form provided. </p><p className="noteTagalog"> Bilang bahagi ng tuloy-tuloy at nakatuon na serbisyo publiko, nais naming marinig ang iyong Mga Feedback at Mungkahi na mas maihatid ka! Ipahayag ang iyong kasiyahan sa pamamagitan ng pagpunan ng ibinigay na form. </p><p className="noteEnglish"> <span className="reminder"> DISCLAIMER: </span> Submitted forms will undergo to Barangay for viewing, unlawful or defamatory statements can be subjected to a legal action. </p><p className="noteTagalog"> <span className="reminder"> DISCLAIMER: </span> Ang mga naisumite na form ay sasailalim sa Barangay para sa pagtingin, labag sa batas o mapanirang pahiwatig na pahayag ay maaaring mapailalim sa isang ligal na aksyon. </p><div className="forms"> <div className="input_fields"> <label> Please state here your Feedback and Suggestions:{" "}<span className="required_symbol">*</span> </label> <textarea className="textarea" onChange={(e) => setFeedback(e.target.value)}></textarea> </div><div className="input_fields"> <input type="submit" value="Submit" className="btn" onClick={submit_feedback} /> </div></div></div></div></div></div>
            {window.innerWidth <= 600 ? "" : <Footer />
            }
        </div>
    );
}
export default Feedbacks;