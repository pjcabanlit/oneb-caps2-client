import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import Navbar from './../../../components/Navbar/Navbar';
import Footer from './../../../components/Footer/Footer';
import AnnouncementCards from './../../../components/Cards/Announcements/AnnouncementCards';
import Helm from '../../../components/Helmet/Helmet';
import loading from '../../../assets/icons/loading.png';
const Announcements = () => {
    const [announcement, setAnnouncement] = useState([]), history = useHistory(), goToAnnouncement = n => { history.push(`/announcement/${n}`) }, [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { async function fetchLoading() { setIsLoading(!0); await Axios.get("http://localhost:3001/GetAnnouncements").then((response) => { setAnnouncement(response.data); setIsLoading(!1) }); return () => { } } fetchLoading() }, [])
    return (
        <div className="announcement_container">
            <Helm title={`Announcements | One Barangay`} />
            <Navbar />
            <div className="container"> <div className="announcement_heading"> <h1 className="">Announcements</h1> </div><div className="card_holder">{announcement.map((data, index) => (<AnnouncementCards key={index} img={data.announcement_img} title={data.announcement_title} date_created={data.date_submitted} description={data.announcement_desc} id={data.announcement_id} onclick={goToAnnouncement} />))}</div><div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div></div>
            {window.innerWidth <= 600 ? "" : <Footer />}
        </div>
    )
}
export default Announcements