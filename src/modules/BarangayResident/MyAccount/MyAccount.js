import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './MyProfile.css';
import Axios from 'axios';
import Footer from './../../../components/Footer/Footer';
import Navbar from './../../../components/Navbar/Navbar';
import loading from '../../../assets/icons/loading.png';
function MyAccount() {
    Axios.defaults.withCredentials = true;
    const [username, setUsername] = useState(""), [password, setPassword] = useState(""), [isLoading, setIsLoading] = useState(!1), history = useHistory(), edit_profile = () => { history.push("/EditAccount") };
    useEffect(() => { async function fetchLoading() { setIsLoading(!0); await Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setUsername(response.data.user[0].username); setPassword(response.data.user[0].password); setIsLoading(!1) } }); return () => { } } fetchLoading() }, [])
    return (
        <div className="MyAccount_container">
            <Navbar />
            <div className="forPadding"> <div className="personal_info"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><form> <div className="container_fluid"> <fieldset className="fieldset_container"> <legend> <i className="fa fa-map-marked-alt"></i> Account Information </legend> <div className="personal_info_col"> <div className="form-group"> <label className="control_label" htmlFor="username"> Username: <span className="text-danger">*</span> </label> <div className="inputfield_view"> <input type="text" name="province" id="province" value={username} required className="form-control" autoComplete="off" disabled /> </div></div><div className="form-group"> <label className="control_label" htmlFor="password"> Password: <span className="text-danger">*</span> </label> <div className="inputfield_view"> <input type="password" name="city_municipality" id="city_municipality" value={password} required className="form-control" autoComplete="off" disabled /> </div></div></div></fieldset> <div className="editProfile_container"> <input type="submit" className="editProfile_btn" value="Edit Account" onClick={edit_profile} /> </div></div></form> </div></div>
            <Footer />
        </div>
    )
}
export default MyAccount