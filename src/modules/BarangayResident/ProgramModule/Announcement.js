import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Announcement.css'
import Navbar from './../../../components/Navbar/Navbar';
import Footer from './../../../components/Footer/Footer';
import AnnouncementCards from './../../../components/Cards/Announcements/AnnouncementCards';
import Helm from '../../../components/Helmet/Helmet';
import Axios from 'axios'
import loading from '../../../assets/icons/loading.png';
const Announcement = () => {
    const [progevList, setProgEvList] = useState([]), history = useHistory(), onclick = s => { history.push(`/brgy-programs-events/${s}`) }, [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { async function fetchLoading() { setIsLoading(!0); await Axios.get("http://localhost:3001/GetProgramsEvents").then((response) => { setProgEvList(response.data); setIsLoading(!1) }); return () => { } } fetchLoading() }, [])
    return (
        <div className="announcement_container">
            <Helm title={`Programs & Events | One Barangay`} />
            <Navbar />
            <div className="container"> <div className="announcement_heading"> <h1 className="">Programs & Events</h1> </div><div className="card_holder">{progevList.map((data, index) => (<AnnouncementCards key={index} img={data.prog_ev_img} title={data.prog_evt_title} date_created={data.date_created} description={data.prog_ev_desc} id={data.prog_ev_id} onclick={onclick} />))}</div><div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div></div>
            {window.innerWidth <= 600 ? "" : <Footer />}
        </div>
    )
}
export default Announcement