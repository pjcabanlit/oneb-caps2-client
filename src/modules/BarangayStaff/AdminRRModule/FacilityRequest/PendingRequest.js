import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import ReservationTable from './../../../../components/Tables/FacilityRequest/ReservationTable'
import loading from '../../../../assets/icons/loading.png'
const PendingRequest = () => {
    Axios.defaults.withCredentials = true;
    const [pendingRequests, setPendingRequests] = useState([]); const [q, setQ] = useState(""); const [isLoading, setIsLoading] = useState(false)
    function pendingSearch(rows) { return rows.filter(row => row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.status.toLowerCase().indexOf(q.toLowerCase()) > -1) }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetPendingReservationRequest").then((response) => { setPendingRequests(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <ReservationTable data={pendingSearch(pendingRequests)} /> </center> </div>
        </div>
    )
}
export default PendingRequest