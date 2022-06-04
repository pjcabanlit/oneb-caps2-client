import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './MyApplications.css';
import Footer from './../../../components/Footer/Footer';
import Navbar from './../../../components/Navbar/Navbar';
import Helm from '../../../components/Helmet/Helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import Accordion from '../../../components/Accordion/Accordion'
import MyReportTable from '../../../components/Tables/MyReports/MyReportTable';
import MyFeedbackTable from '../../../components/Tables/MyFeedback/MyFeedbackTable';
import MyComplaintTable from '../../../components/Tables/MyComplaint/MyComplainTable';
import MyDocumentTable from '../../../components/Tables/MyDocumentRequest/MyDocumentTable';
import MyRequestTable from '../../../components/Tables/MyFacilityRequest/MyRequestTable';
import loading from '../../../assets/icons/loading.png';
function MyApplications() {
    Axios.defaults.withCredentials = true;
    const [resident_id, setResidentId] = useState(""), [myReports, setMyReports] = useState([]), [myFeedback, setMyFeedback] = useState([]), [myComplaint, setMyComplaint] = useState([]), [documentReqList, setDocumentReqList] = useState([]), [reservationReqList, setReservationReqList] = useState([]), [isLoading, setIsLoading] = useState(false)
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setResidentId(response.data.user[0].resident_id) } }) }, [])
    useEffect(() => { const controller = new AbortController(); setIsLoading(!0); if (resident_id) { Promise.all([Axios.get(`http://localhost:3001/MyDocuments/${resident_id}`).then((response) => { setDocumentReqList(response.data) }), Axios.get(`http://localhost:3001/MyRequestFacility/${resident_id}`).then((response) => { setReservationReqList(response.data) }), Axios.get(`http://localhost:3001/GetMyReports/${resident_id}`).then((response) => { setMyReports(response.data) }), Axios.get(`http://localhost:3001/GetMyFeedback/${resident_id}`).then((response) => { setMyFeedback(response.data) }), Axios.get(`http://localhost:3001/GetMyComplaint/${resident_id}`).then((response) => { setMyComplaint(response.data) })]).then(() => setIsLoading(!1)).catch(ex => console.error(ex)) } return () => controller.abort() }, [resident_id])
    return (
        <div className="myapplication_main">
            <Helm title={`My Applications | One Barangay`} />
            <Navbar />
            <div className="MyApplicationFormatter"> <div className="container"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="myapplication_container"> <div className="MyApplications_tableContainer"> <Router> <div className="MyApplications_title"> <h1>My Applications</h1> </div><Accordion title="My Document Requests" > <MyDocumentTable data={documentReqList} /> </Accordion> <div style={{ margin: "20px" }} /> <Accordion title="My Reservation & Request"> <MyRequestTable data={reservationReqList} /> </Accordion> <div style={{ margin: "20px" }} /> <Accordion title="My Reports"> <MyReportTable data={myReports} /> </Accordion> <div style={{ margin: "20px" }} /> <Accordion title="My Complaint"> <MyComplaintTable data={myComplaint} /> </Accordion> <div style={{ margin: "20px" }} /> <Accordion title="My Feedback & Suggestion"> <MyFeedbackTable data={myFeedback} /> </Accordion> </Router> </div></div></div>{window.innerWidth <= 600 ? "" : <Footer />}</div>
        </div>
    )
}
export default MyApplications