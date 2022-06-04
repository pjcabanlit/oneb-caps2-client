import React, { useState } from 'react'
import './FacilityReservation.css'
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import PendingRequest from './FacilityRequest/PendingRequest';
import BorrowedRequest from './FacilityRequest/BorrowedRequest';
import ReturnedRequest from './FacilityRequest/ReturnedRequest';
import DeclinedRequest from './FacilityRequest/DeclinedRequest'
import AdminNavbar from '../AdminHome/AdminNavbar';
import AdminSidebar from '../AdminHome/AdminSidebar';
export default function FacilityReservation() {
    Axios.defaults.withCredentials = true;
    let { url } = useRouteMatch();
    const [id, setId] = useState(0), [active, setActive] = useState([{ id: 0, buttonName: "Pending List", isActive: !0, path: `${url}/pending` }, { id: 1, buttonName: "Borrowed List", isActive: !1, path: `${url}/borrowed` }, { id: 2, buttonName: "Returned List", isActive: !1, path: `${url}/returned` }, { id: 3, buttonName: "Declined List", isActive: !1, path: `${url}/declined` }]), toggleActive = e => { setActive(active.map((t, i) => i === e ? { ...t, isActive: !0 } : { ...t, isActive: !1 })); setId(e) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };

    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <div className="facility_reservation"> <div className="facility_reservation_container"> <div className="adminhome_titles"> <h1>Facility Requests</h1> <hr /> </div><Router> <div className="folder"> <div className="folder_buttons">{active.map((button, index) => (<Link to={button.path} key={index} onClick={() => toggleActive(button.id)} className={`custom${button.isActive ? " active" : ""}`}>{button.buttonName}</Link>))}<div className={`underline${id === 0 ? " active-0" : ""}${id === 1 ? " active-1" : ""}${id === 2 ? " active-2" : ""}${id === 3 ? " active-3" : ""}`} /> </div><div className="resident_tbl_header"> </div><Switch> <Route path="/Reservations-&-Requests/pending" component={PendingRequest} /> <Route path="/Reservations-&-Requests/borrowed" component={BorrowedRequest} /> <Route path="/Reservations-&-Requests/returned" component={ReturnedRequest} /> <Route path="/Reservations-&-Requests/declined" component={DeclinedRequest} /> <Redirect to="/Reservations-&-Requests/pending"></Redirect> </Switch> </div></Router> </div></div>
            </main>
        </div>

    )
}
