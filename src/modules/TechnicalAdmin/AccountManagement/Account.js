import React, { useState } from 'react'
import Axios from 'axios';
import './../../../../src/styles/Common.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import AccountList from './Account/AccountList';
import ArchiveList from './Account/ArchiveList';
import TechnicalNavbar from '../../../components/Navbar/TechnicalAdmin/TechnicalNavbar';
import TechnicalSidebar from '../../../components/Sidebar/TechnicalAdmin/TechnicalSidebar';
export default function Account() {
    Axios.defaults.withCredentials = true;
    let { url } = useRouteMatch();
    const [id, setId] = useState(0), [active, setActive] = useState([{ id: 0, buttonName: "Account List", isActive: !0, path: `${url}/accounts-list` }, { id: 1, buttonName: "Archive List", isActive: !1, path: `${url}/archive-list` }]), toggleActive = e => { setActive(active.map((t, i) => i === e ? { ...t, isActive: !0 } : { ...t, isActive: !1 })); setId(e) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    return (
        <div className="adminHome_container">
            <TechnicalNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <TechnicalSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <Router> <div className='technical_accounts'> <div className="certificate_request"> <div className="process_request_container"> <div className="adminhome_titles"> <h1>Manage Accounts</h1> <hr /> </div><div className="folder"> <div className="folder_buttons">{active.map((button, index) => (<Link to={button.path} key={index} onClick={() => toggleActive(button.id)} className={`custom${button.isActive ? " active" : ""}`}>{button.buttonName}</Link>))}<div className={`underline${id === 0 ? "active-0" : ""}${id === 1 ? " active-1" : ""}`} /> </div><Switch> <Route path="/ta-registered-accounts/accounts-list" component={AccountList} /> <Route path="/ta-registered-accounts/archive-list" component={ArchiveList} /> <Redirect to="/ta-registered-accounts/accounts-list"></Redirect> </Switch> </div></div></div></div></Router>
            </main>
        </div>
    )
}