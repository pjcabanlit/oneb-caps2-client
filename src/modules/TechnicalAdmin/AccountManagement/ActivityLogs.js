import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ActivityLogsTable from '../../../components/Tables/ActivityLogs/ActivityLogsTable'
import TechnicalNavbar from '../../../components/Navbar/TechnicalAdmin/TechnicalNavbar';
import TechnicalSidebar from '../../../components/Sidebar/TechnicalAdmin/TechnicalSidebar';
export default function ActivityLogs() {
    Axios.defaults.withCredentials = true;
    const [officialLogs, setOfficialLogs] = useState([]), [q, setQ] = useState(""), [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    useEffect(() => { Axios.get("http://localhost:3001/GetActivityLogs").then((response) => { setOfficialLogs(response.data); }) }, [])
    function search(rows) { return rows.filter((row) => row.audit_action_type.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.username.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.role.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    return (
        <div className="adminHome_container">
            <TechnicalNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <TechnicalSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main> <div className="certificate_request"> <div className="process_request_container"> <div className="adminhome_titles"> <h1>View Activity Logs</h1> <hr /> </div><div className="resident_information_tbl"> <div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search username, role, type of action..." /> </div></div><center> <ActivityLogsTable data={search(officialLogs)} /> </center> </div></div></div></main>
        </div>
    )
}