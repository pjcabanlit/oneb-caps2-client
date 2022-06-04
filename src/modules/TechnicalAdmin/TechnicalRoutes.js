import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import TechnicalHome from './TechnicalHome';
import BarangayOfficials from './AccountManagement/BarangayOfficials';
import ActivityLogs from './AccountManagement/ActivityLogs';
import Account from './AccountManagement/Account';
import BarangayInformation from './ContentManagement/BarangayInformation';
import Login from '../../pages/Login';
import AdminMain from '../BarangayStaff/AdminHome/AdminMain';
import Home from '../BarangayResident/UserHome/Home'
const TechnicalRoutes = () => {
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
                        <Route path="/AdminHome" exact component={AdminMain} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/technical-admin" exact component={TechnicalHome} />
                        <Route path="/ta-register-brgyofficials" exact component={BarangayOfficials} />
                        <Route path="/ta-register-brgyofficials/officials-list" exact component={BarangayOfficials} />
                        <Route path="/ta-register-brgyofficials/archive-list" exact component={BarangayOfficials} />
                        <Route path="/ta-registered-accounts" exact component={Account} />
                        <Route path="/ta-registered-accounts/accounts-list" exact component={Account} />
                        <Route path="/ta-registered-accounts/archive-list" exact component={Account} />
                        <Route path="/ta-activity-logs" exact component={ActivityLogs} />
                        <Route path="/ta-activity-logs/resident-logs" exact component={ActivityLogs} />
                        <Route path="/ta-activity-logs/officials-logs" exact component={ActivityLogs} />
                        <Route path="/ta-brgy-info" exact component={BarangayInformation} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    )
}
export default TechnicalRoutes