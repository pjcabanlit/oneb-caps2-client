import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './AdminHome.css'
import AdminMain from './AdminMain';
import ResidentInformation from '../AdminCMModule/ResidentInformation/ResidentInformation';
import Feedbacks from './../AdminForumModule/Feedbacks';
import ManageProgEv from '../AdminProgramModule/ManageProgEv'
import EvacuationPlan from '../AdminCIEModule/EvacuationPlan'
import FacilityReservation from '../AdminRRModule/FacilityReservation'
import CertificateRequest from '../AdminCMModule/CertificateRequest/CertificateRequest';
import { AuthContext } from '../../../helpers/AuthContext';
import Facilities from '../AdminRRModule/Facilities';
import ResidentReports from '../AdminCIEModule/ResidentReports';
import ManageFAQs from '../AdminForumModule/ManageFAQs';
import Login from '../../../pages/Login'
import Home from '../../BarangayResident/UserHome/Home';
import TechnicalHome from '../../TechnicalAdmin/TechnicalHome';
const AdminHome = () => {
    Axios.defaults.withCredentials = true;
    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
    useEffect(() => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.message) { setAuthState({ ...authState, status: false }) } else { setAuthState({ username: response.data.username, id: response.data.resident_id, status: true }) }
        })
    }, [])
    return (
        <div>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/technical-admin" exact component={TechnicalHome} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/AdminHome" exact component={AdminMain} />
                        <Route path="/ResidentInformation" exact component={ResidentInformation} />
                        <Route path="/ResidentInformation/residents" exact component={ResidentInformation} />
                        <Route path="/ResidentInformation/registered" exact component={ResidentInformation} />
                        <Route path="/document-requests" exact component={CertificateRequest} />
                        <Route path="/document-requests/pending-requests" exact component={CertificateRequest} />
                        <Route path="/document-requests/processed-requests" exact component={CertificateRequest} />
                        <Route path="/document-requests/declined-requests" exact component={CertificateRequest} />
                        <Route path="/manage-programs-events" exact component={ManageProgEv} />
                        <Route path="/manage-programs-events/upcoming" exact component={ManageProgEv} />
                        <Route path="/manage-programs-events/cancelled" exact component={ManageProgEv} />
                        <Route path="/manage-programs-events/completed" exact component={ManageProgEv} />
                        <Route path="/manage-programs-events/announcement" exact component={ManageProgEv} />
                        <Route path="/BrgyEvacuationPlan" exact component={EvacuationPlan} />
                        <Route path="/Reservations-&-Requests" exact component={FacilityReservation} />
                        <Route path="/Reservations-&-Requests/pending" exact component={FacilityReservation} />
                        <Route path="/Reservations-&-Requests/borrowed" exact component={FacilityReservation} />
                        <Route path="/Reservations-&-Requests/returned" exact component={FacilityReservation} />
                        <Route path="/Reservations-&-Requests/declined" exact component={FacilityReservation} />
                        <Route path="/Availability-Utilities-&-Venues" exact component={Facilities} />
                        <Route path="/resident-reports" exact component={ResidentReports} />
                        <Route path="/resident-reports/accident" exact component={ResidentReports} />
                        <Route path="/resident-reports/incident" exact component={ResidentReports} />
                        <Route path="/resident-reports/emergency" exact component={ResidentReports} />
                        <Route path="/resident-reports/complaint" exact component={ResidentReports} />
                        <Route path="/resident-reports/fire" exact component={ResidentReports} />
                        <Route path="/feedback-suggestions" exact component={Feedbacks} />
                        <Route path="/manage-faqs" exact component={ManageFAQs} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    )
}
export default AdminHome;