import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import oneb from '../../../assets/icons/oneb.png';
import './AdminSidebar.css';
import { AuthContext } from '../../../helpers/AuthContext';
import { ImHome } from 'react-icons/im'
import { AiFillInfoCircle } from 'react-icons/ai'
import { HiDocumentDuplicate, HiDocumentReport } from 'react-icons/hi'
import { FaRegCalendarAlt, FaQuestionCircle } from 'react-icons/fa'
import { MdFeedback, MdPlace, MdSettings } from 'react-icons/md'
import { RiFileSettingsLine } from 'react-icons/ri'
import Accordion2 from '../../../components/Accordion/Accordion2'
require("es6-promise").polyfill();
require("isomorphic-fetch");
const AdminSidebar = ({ sidebarOpen, closeSidebar }) => {
    Axios.defaults.withCredentials = true;
    const [username, setUsername] = useState(""), [authState, setAuthState] = useState({ username: "", id: 0, status: !1 });
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setUsername(response.data.user[0].username) } }); }, []);
    useEffect(() => { Axios.get("http://localhost:3001/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } }).then((response) => { if (response.data.message) { setAuthState({ ...authState, status: false }) } else { setAuthState({ username: response.data.username, id: response.data.resident_id, status: true }) } }) }, [])
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <div className={sidebarOpen ? "sidebar_responsive" : ""} id="adminSidebar">
                <div className="adminSidebar_title">
                    <div className="adminSidebar_img">
                        <img src={oneb} alt={oneb} />
                        <h1 className="admin_username">{username}</h1>
                    </div>
                    <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}></i>
                </div>
                <div className="adminSidebar_menu">
                    <div className="adminSidebar_link" id={window.location.pathname === "/AdminHome" ? "active" : ""}>
                        <i><ImHome /></i>
                        <Link to="/AdminHome">Dashboard</Link>
                    </div>
                    <Accordion2 title="Resident Management" id={window.location.pathname === "/ResidentInformation/residents" || window.location.pathname === "/ResidentInformation/registered" || window.location.pathname === "/ResidentInformation/archived" || window.location.pathname === "/ResidentInformation/pending" ? "active" : ""}>
                        <div className="adminSidebar_link active_menu_link" id={window.location.pathname === "/ResidentInformation/residents" || window.location.pathname === "/ResidentInformation/registered" || window.location.pathname === "/ResidentInformation/archived" || window.location.pathname === "/ResidentInformation/pending" ? "active" : ""}>
                            <i><AiFillInfoCircle /></i>
                            <Link to="/ResidentInformation">Resident Information</Link>
                        </div>
                        <div className="adminSidebar_link" id={window.location.pathname === "/document-requests/pending-requests" || window.location.pathname === "/document-requests/processed-requests" ? "active" : ""} >
                            <i><HiDocumentDuplicate /></i>
                            <Link to="/document-requests">Document Requests</Link>
                        </div>
                    </Accordion2>
                    <Accordion2 title="Facilities Management">
                        <div className="adminSidebar_link" id={window.location.pathname === "/Reservations-&-Requests" || window.location.pathname === "/Reservations-&-Requests/pending" || window.location.pathname === "/Reservations-&-Requests/borrowed" || window.location.pathname === "/Reservations-&-Requests/returned" || window.location.pathname === "/Reservations-&-Requests/declined" ? "active" : ""}>
                            <i><RiFileSettingsLine /></i>
                            <Link to="/Reservations-&-Requests">Facility Requests</Link>
                        </div>
                        <div className="adminSidebar_link" id={window.location.pathname === "/Availability-Utilities-&-Venues" ? "active" : ""}>
                            <i><MdSettings /></i>
                            <Link to="/Availability-Utilities-&-Venues">Facilities</Link>
                        </div>
                    </Accordion2>
                    <Accordion2 title="Emergency & Reports Management">
                        <div className="adminSidebar_link" id={window.location.pathname === "/BrgyEvacuationPlan" ? "active" : ""}>
                            <i><MdPlace /></i>
                            <Link to="/BrgyEvacuationPlan">Manage Evacuation Plan</Link>
                        </div>
                        <div
                            className="adminSidebar_link"
                            id={
                                window.location.pathname === "/resident-reports" ||
                                    window.location.pathname === "/resident-reports/incident" ||
                                    window.location.pathname === "/resident-reports/fire" ||
                                    window.location.pathname === "/resident-reports/emergency" ||
                                    window.location.pathname === "/resident-reports/accident" ||
                                    window.location.pathname === "/resident-reports/complaint"
                                    ? "active"
                                    : ""
                            }
                        >
                            <i>
                                <HiDocumentReport />
                            </i>
                            <Link to="/resident-reports">View Incident Reports</Link>
                        </div>
                    </Accordion2>
                    <Accordion2 title="Feedback & Suggestion Management">
                        <div
                            className="adminSidebar_link"
                            id={
                                window.location.pathname === "/feedback-suggestions"
                                    ? "active"
                                    : ""
                            }
                        >
                            <i>
                                <MdFeedback />
                            </i>
                            <Link to="/feedback-suggestions">Resident's Feedback & Suggestion</Link>

                        </div>
                        <div
                            className="adminSidebar_link"
                            id={window.location.pathname === "/manage-faqs" ? "active" : ""}
                        >

                            <i>
                                <FaQuestionCircle />
                            </i>
                            <Link to="/manage-faqs">Manage Frequently Asked Questions</Link>
                        </div>
                    </Accordion2>
                    <Accordion2 title="Program & Events Management">
                        <div
                            className="adminSidebar_link"
                            id={
                                window.location.pathname === "/manage-programs-events" ||
                                    window.location.pathname ===
                                    "/manage-programs-events/upcoming" ||
                                    window.location.pathname ===
                                    "/manage-programs-events/completed" ||
                                    window.location.pathname ===
                                    "/manage-programs-events/cancelled" ||
                                    window.location.pathname ===
                                    "/manage-programs-events/announcement"
                                    ? "active"
                                    : ""
                            }
                        >
                            <i>
                                <FaRegCalendarAlt />
                            </i>
                            <Link to="/manage-programs-events">List Of Programs/Events & Announcements</Link>
                        </div>
                    </Accordion2>

                </div>
            </div>
        </AuthContext.Provider>
    );
}
export default AdminSidebar