import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import m1 from '../../../assets/icons/oneb.png';
import { AuthContext } from '../../../helpers/AuthContext';
import { FiActivity } from 'react-icons/fi'
import { RiAccountCircleFill } from 'react-icons/ri'
import { FaUserTie } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { HiInformationCircle } from 'react-icons/hi'
require("es6-promise").polyfill();
require("isomorphic-fetch");
const TechnicalSidebar = ({ sidebarOpen, closeSidebar }) => {
    const [username, setUsername] = useState(""), [authState, setAuthState] = useState({ username: "", id: 0, status: false });
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setUsername(response.data.user[0].username) } }); }, []);
    useEffect(() => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.data.message) {
                setAuthState({ ...authState, status: false })
            } else {
                setAuthState({ username: response.data.username, id: response.data.resident_id, status: true })
            }
        })
    }, [])
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <div className={sidebarOpen ? "sidebar_responsive" : ""} id="adminSidebar"> <div className="adminSidebar_title"> <div className="adminSidebar_img"> <img src={m1} alt={m1} /> <h1 className="admin_username">{username}</h1> </div><i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}></i> </div><div className="adminSidebar_menu"> <div className="adminSidebar_link" id={window.location.pathname === "/technical-admin" ? "active" : ""}> <i> <AiFillHome /></i> <a href="/technical-admin" >Dashboard</a> </div><h2>Account Management</h2> <div className="adminSidebar_link active_menu_link" id={window.location.pathname === "/ta-registered-accounts/accounts-list" || window.location.pathname === "/ta-registered-accounts/archive-list" ? "active" : ""}> <i> <RiAccountCircleFill /></i> <a href="/ta-registered-accounts">Accounts</a> </div><div className="adminSidebar_link active_menu_link" id={window.location.pathname === "/ta-register-brgyofficials/officials-list" || window.location.pathname === "/ta-register-brgyofficials/archive-list" ? "active" : ""}> <i><FaUserTie /> </i> <a href="/ta-register-brgyofficials">Barangay Officials</a> </div><div className="adminSidebar_link" id={window.location.pathname === "/ta-activity-logs" ? "active" : ""}> <i><FiActivity /></i> <a href="/ta-activity-logs">Activity Logs</a> </div><h2>Content Management</h2> <div className="adminSidebar_link active_menu_link" id={window.location.pathname === "/ta-brgy-info" ? "active" : ""}> <i > <HiInformationCircle /></i> <a href="/ta-brgy-info">Barangay Information</a> </div></div></div>
        </AuthContext.Provider>
    )
}
export default TechnicalSidebar