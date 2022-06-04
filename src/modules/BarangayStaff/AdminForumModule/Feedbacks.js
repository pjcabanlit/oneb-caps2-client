import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import FeedbackTable from '../../../components/Tables/ResidentFeedback/FeedbackTable';
import AdminNavbar from '../AdminHome/AdminNavbar';
import AdminSidebar from '../AdminHome/AdminSidebar';
import loading from '../../../assets/icons/loading.png'
const Feedbacks = () => {
    Axios.defaults.withCredentials = true;
    const [feedback, setFeedback] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(!1), [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetFeedbackSuggestions").then((response) => { setFeedback(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    function search(rows) { return rows.filter((row) => row.first_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.middle_name.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main> <div className="resident_feedback"> <div className="certificate_request"> <div className="process_request_container"> <div className="adminhome_titles"> <h1>Resident's Feedback & Suggestions</h1> <hr /> </div><div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <FeedbackTable data={search(feedback)} /> </center> </div></div></div></div></main>
        </div>
    )
}
export default Feedbacks