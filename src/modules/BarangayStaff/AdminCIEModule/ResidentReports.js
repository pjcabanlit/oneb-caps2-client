import React, { useState } from 'react'
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import AccidentReport from './Reports/AccidentReport';
import ComplaintReport from './Reports/ComplaintReport';
import EmergencyReport from './Reports/EmergencyReport';
import FireReport from './Reports/FireReport';
import IncidentReport from './Reports/IncidentReport';
import AdminNavbar from '../AdminHome/AdminNavbar';
import AdminSidebar from '../AdminHome/AdminSidebar';
const ResidentReports = () => {
    Axios.defaults.withCredentials = true;
    let { url } = useRouteMatch();
    const [id, setId] = useState(0), [active, setActive] = useState([{ id: 0, buttonName: "Incident Reports", isActive: !0, path: `${url}/incident` }, { id: 1, buttonName: "Fire Incident Reports", isActive: !1, path: `${url}/fire` }, { id: 2, buttonName: "Emergency Reports", isActive: !1, path: `${url}/emergency` }, { id: 3, buttonName: "Accident Reports", isActive: !1, path: `${url}/accident` }, { id: 4, buttonName: "Complaint Reports", isActive: !1, path: `${url}/complaint` }]), toggleActive = e => { setActive(active.map((t, i) => i === e ? { ...t, isActive: !0 } : { ...t, isActive: !1 })); setId(e) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main> <div className="resident_reports"> <div className="certificate_request"> <div className="process_request_container"> <div className="adminhome_titles"> <h1>Resident Reports</h1> <hr /> </div><Router> <div className="folder"> <div className="folder_buttons">{active.map((button, index) => (<Link to={button.path} key={index} onClick={() => toggleActive(button.id)} className={`custom${button.isActive ? " active" : ""}`}>{button.buttonName}</Link>))}<div className={`underline${id === 0 ? " active-0" : ""}${id === 1 ? " active-1" : ""}${id === 2 ? " active-2" : ""}${id === 3 ? " active-3" : ""}${id === 4 ? " active-4" : ""}`} /> </div><div className="resident_tbl_header"> </div><Switch> <Route path="/resident-reports/incident" component={IncidentReport} /> <Route path="/resident-reports/accident" component={AccidentReport} /> <Route path="/resident-reports/emergency" component={EmergencyReport} /> <Route path="/resident-reports/fire" component={FireReport} /> <Route path="/resident-reports/complaint" component={ComplaintReport} /> <Redirect to="/resident-reports/incident"></Redirect> </Switch> </div></Router> </div></div></div></main>
        </div>
    )
}
export default ResidentReports