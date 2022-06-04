import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BarangayCertificates from '../ApplicationModule/BarangayCertificates';
import EmergencyIncidentReport from './../CrimeIncidentModule/EmergencyIncidentReport';
import ComplainReport from '../CrimeIncidentModule/ComplainReport';
import Announcement from './../ProgramModule/Announcement';
import RequestUtilities from './../ReservationModule/RequestUtilities';
import Feedbacks from './../ForumModule/Feedbacks';
import FAQs from './../ForumModule/FAQs';
import './Home.css';
import ApplicationModule from './../ApplicationModule/ApplicationModule';
import Home from './Home';
import CrimeIncidentModule from './../CrimeIncidentModule/CrimeIncidentModule';
import MyProfile from './../MyAccount/MyProfile';
import MyApplications from './../MyAccount/MyApplications';
import EditProfile from './../MyAccount/EditProfile'
import ReservationModule from './../ReservationModule/ReservationModule';
import EditAccount from './../MyAccount/EditAccount';
import MyAccount from './../MyAccount/MyAccount';
import EditAddress from './../MyAccount/EditAddress';
import Login from './../../../pages/Login';
import RefreshToScroll from './../../../components/ScrollToTop/RefreshToScroll';
import { AuthContext } from './../../../helpers/AuthContext';
import Axios from 'axios'
import ViewProgramsEvents from '../ProgramModule/ViewProgramEvents';
import AdminMain from '../../BarangayStaff/AdminHome/AdminMain'
import SignUp from './../../../pages/SignUp'
import ForgotAccount from './../../../pages/ForgotAccount/ForgotAccount'
import Announcements from '../ProgramModule/Announcements';
import PrivacyPolicy from '../../../pages/PrivacyPolicy';
import TermsOfUse from '../../../pages/TermsOfUse';
import LandingPage from '../../../pages/LandingPage';
import TechnicalHome from '../../TechnicalAdmin/TechnicalHome';
function UserHome() {
    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
    useEffect(() => { Axios.get("http://localhost:3001/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } }).then((response) => { if (response.data.message) { setAuthState({ ...authState, status: false }) } else { setAuthState({ username: response.data.username, id: response.data.resident_id, status: true }) } }) }, [])
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <Router>
                <RefreshToScroll />
                <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/technical-admin" exact component={TechnicalHome} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/privacy-policy' exact component={PrivacyPolicy} />
                    <Route path='/terms-of-use' exact component={TermsOfUse} />
                    <Route path='/register' exact component={SignUp} />
                    <Route path='/forgot-account' exact component={ForgotAccount} />
                    <Route path="/AdminHome" exact component={AdminMain} />
                    <Route path='/MyProfile' exact component={MyProfile} />
                    <Route path='/MyApplication' exact component={MyApplications} />
                    <Route path="/MyApplication/document-pending" component={MyApplications} />
                    <Route path="/MyApplication/document-declined" component={MyApplications} />
                    <Route path="/MyApplication/document-processed" component={MyApplications} />
                    <Route path='/ApplicationModule' exact component={ApplicationModule} />
                    <Route path='/Barangay-Certificates' exact component={BarangayCertificates} />
                    <Route path='/CIEModule' exact component={CrimeIncidentModule} />
                    <Route path='/EmergencyIncidentReport' exact component={EmergencyIncidentReport} />
                    <Route path='/Submit-Complain-Report' exact component={ComplainReport} />
                    <Route path='/brgy-programs&events' exact component={Announcement} />
                    <Route path='/brgy-programs-events/:id' exact component={ViewProgramsEvents} />
                    <Route path='/announcements' exact component={Announcements} />
                    <Route path='/announcement/:id' exact component={ViewProgramsEvents} />
                    <Route path='/Reservation-Module' exact component={ReservationModule} />
                    <Route path='/RequestUtilities' exact component={RequestUtilities} />
                    <Route path='/Feedbacks' exact component={Feedbacks} />
                    <Route path='/FAQs' exact component={FAQs} />
                    <Route path='/EditAccount' exact component={EditAccount} />
                    <Route path='/MyAccount' exact component={MyAccount} />
                    <Route path='/Edit-Personal-Information' exact component={EditProfile} />
                    <Route path='/Edit-Address-Information' exact component={EditAddress} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    )
}
export default UserHome;