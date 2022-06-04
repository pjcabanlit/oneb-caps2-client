import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import AnnouncementTable from '../../../../components/Tables/ProgramsEvents/AnnouncementTable';
import loading from '../../../../assets/icons/loading.png'
const Announcement = () => {
    Axios.defaults.withCredentials = true;
    const [announcement, setAnnouncement] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(!1);
    function cancelledSearch(rows) { return rows.filter(row => row.announcement_title.toLowerCase().indexOf(q.toLowerCase()) > -1) }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetAnnouncement").then((response) => { setAnnouncement(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Announcement Title" /> </div></div><center> <AnnouncementTable data={cancelledSearch(announcement)} /> </center> </div>
        </div>
    )
}
export default Announcement