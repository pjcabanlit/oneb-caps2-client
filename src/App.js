import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserHome from './modules/BarangayResident/UserHome/UserHome';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import AdminHome from './modules/BarangayStaff/AdminHome/AdminHome';
import Login from './pages/Login'
import RefreshToScroll from './components/ScrollToTop/RefreshToScroll';
import './styles/App.css';
import './scss/Root.scss';
import { AuthContext } from './helpers/AuthContext';
import Axios from 'axios'
import TechnicalRoutes from './modules/TechnicalAdmin/TechnicalRoutes';
import ForgotAccount from './pages/ForgotAccount/ForgotAccount';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
    const [residentId, setResidentId] = useState("")
    const [user_id, setUserId] = useState("")
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

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                setResidentId(response.data.user[0].resident_id);
                setUserId(response.data.user[0].user_id)
            }
        });
    }, []);


    return (
        <div className="oneb_root">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <RefreshToScroll />
                    {window.innerWidth <= 600 && !residentId && !user_id ?
                        <>
                            <Route path="/" exact component={(props) => <Login />} />
                        </>
                        :
                        <Route path="/" exact component={(props) => <LandingPage />} />
                    }

                    <Route path="/home" exact component={(props) => <UserHome />} />
                    <Route path="/login" exact component={(props) => <Login />} />
                    <Route path='/register' exact component={SignUp} />
                    <Route path="/privacy-policy" exact render={(props) => <PrivacyPolicy />} />
                    <Route path="/terms-of-use" exact render={(props) => <TermsOfUse />} />
                    <Route path="/forgot-account" exact render={(props) => <ForgotAccount />} />
                    <Route path="/register" exact render={(props) => { <SignUp /> }} />
                    <Route path="/MyProfile" exact render={(props) => <UserHome />} />
                    <Route path="/CIEModule" exact render={(props) => <UserHome />} />
                    <Route path="/Programs&Events" exact render={(props) => <UserHome />} />
                    <Route path="/ApplicationModule" exact render={(props) => <UserHome />} />
                    <Route path="/Barangay-Certificates" exact render={(props) => <UserHome />} />
                    <Route path='/EmergencyIncidentReport' exact render={(props) => <UserHome />} />
                    <Route path='/Submit-Complain-Report' exact render={(props) => <UserHome />} />
                    <Route path='/brgy-programs&events' exact render={(props) => <UserHome />} />
                    <Route path='/brgy-programs-events/:id' exact render={(props) => <UserHome />} />
                    <Route path='/announcements' exact render={(props) => <UserHome />} />
                    <Route path='/announcement/:id' exact render={(props) => <UserHome />} />
                    <Route path='/Reservation-Module' exact render={(props) => <UserHome />} />
                    <Route path='/RequestUtilities' exact render={(props) => <UserHome />} />
                    <Route path='/Feedbacks' exact render={(props) => <UserHome />} />
                    <Route path='/FAQs' exact render={(props) => <UserHome />} />
                    <Route path="/EditProfile" exact render={(props) => <UserHome />} />
                    <Route path="/EditAccount" exact render={(props) => <UserHome />} />
                    <Route path="/MyAccount" exact render={(props) => <UserHome />} />
                    <Route path="/MyApplication" exact render={(props) => <UserHome />} />
                    <Route path="/MyApplication/document-pending" exact render={(props) => <UserHome />} />
                    <Route path="/MyApplication/document-declined" exact render={(props) => <UserHome />} />
                    <Route path="/MyApplication/document-processed" exact render={(props) => <UserHome />} />
                    <Route path='/Edit-Personal-Information' exact render={(props) => <UserHome />} />
                    <Route path='/Edit-Address-Information' exact render={(props) => <UserHome />} />
                    <Route path='/AdminHome' exact render={(props) => <AdminHome />} />
                    <Route path='/generate-report/:id' exact render={(props) => <AdminHome />} />
                    <Route path='/ResidentInformation' exact render={(props) => <AdminHome />} />
                    <Route path='/ResidentInformation/residents' exact render={(props) => <AdminHome />} />
                    <Route path='/ResidentInformation/registered' exact render={(props) => <AdminHome />} />
                    <Route path='/document-requests' exact render={(props) => <AdminHome />} />
                    <Route path='/document-requests/pending-requests' exact render={(props) => <AdminHome />} />
                    <Route path='/document-requests/processed-requests' exact render={(props) => <AdminHome />} />
                    <Route path='/document-requests/declined-requests' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-programs-events' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-programs-events/upcoming' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-programs-events/cancelled' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-programs-events/completed' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-programs-events/announcement' exact render={(props) => <AdminHome />} />
                    <Route path='/program-registrations' exact render={(props) => <AdminHome />} />
                    <Route path='/BrgyEvacuationPlan' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports/fire' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports/incident' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports/complaint' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports/accident' exact render={(props) => <AdminHome />} />
                    <Route path='/resident-reports/emergency' exact render={(props) => <AdminHome />} />
                    <Route path='/Reservations-&-Requests' exact render={(props) => <AdminHome />} />
                    <Route path='/Reservations-&-Requests/pending' exact render={(props) => <AdminHome />} />
                    <Route path='/Reservations-&-Requests/borrowed' exact render={(props) => <AdminHome />} />
                    <Route path='/Reservations-&-Requests/returned' exact render={(props) => <AdminHome />} />
                    <Route path='/Reservations-&-Requests/declined' exact render={(props) => <AdminHome />} />
                    <Route path='/Availability-Utilities-&-Venues' exact render={(props) => <AdminHome />} />
                    <Route path='/feedback-suggestions' exact render={(props) => <AdminHome />} />
                    <Route path='/generate-certificate' exact render={(props) => <AdminHome />} />
                    <Route path='/manage-faqs' exact render={(props) => <AdminHome />} />
                    <Route path='/technical-admin' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-register-brgyofficials' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-activity-logs' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-brgy-info' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-registered-accounts' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-registered-accounts/archive-list' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-registered-accounts/accounts-list' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-register-brgyofficials/officials-list' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-register-brgyofficials/archive-list' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-activity-logs/officials-logs' exact render={(props) => <TechnicalRoutes />} />
                    <Route path='/ta-activity-logs/resident-logs' exact render={(props) => <TechnicalRoutes />} />
                    {/* <ProtectedRoute path="/home" component={UserHome} isAuth={isAuth} /> */}
                </Router>
            </AuthContext.Provider>
        </div>
    )
}
export default App;