import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import './ReservationModule.css'
import Navbar from './../../../components/Navbar/Navbar'
import Footer from './../../../components/Footer/Footer'
import Helm from '../../../components/Helmet/Helmet'
import FacilityCard from '../../../components/Cards/Facilities/FacilityCard'
import './../../../components/Cards/Facilities/FacilityCard.css'
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop'
import loading from '../../../assets/icons/loading.png'

export default function ReservationModule() {
    Axios.defaults.withCredentials = true
    const [resident_id, setResidentId] = useState(""), [user_id, setUserId] = useState(""), history = useHistory(), [facilityList, setFacilityList] = useState([]), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setResidentId(response.data.user[0].resident_id); setUserId(response.data.user[0].user_id) } }); }, []);
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/UserGetFacilitiesList").then((response) => { setFacilityList(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    const onClickRequestNow = () => { if (!user_id) { setErrorDialog({ isOpen: true, title: "Access Denied", subtitle: "Please login your account and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>), }); } else if (!resident_id) { setErrorDialog({ isOpen: true, title: "Access Denied", subtitle: "You are not verified yet as Resident in the Barangay. Please fill up all your information in your Profile so that the barangay can confirm if you are really a resident.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn"> Back</button>), }); } else { history.push('/RequestUtilities'); } }
    return (
        <div className="ReservationModule_main">
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <Helm title={`Reservation & Request | One Barangay`} />
            <Navbar />
            <div className="container"> <div className="ReservationModule_container"> <div className="ReservationModule_title"> <h1>List of Facilities</h1> </div><div className="container"> <div className="card_holder">{facilityList.map((data, index) => (<FacilityCard key={index} id={data.facility_id} img={data.facility_img} title={data.facility_name} quantity={data.quantity} onClickDownload={onClickRequestNow} />))}</div><div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div></div></div></div>
            <Footer />
        </div>
    )
}