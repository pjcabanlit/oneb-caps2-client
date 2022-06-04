import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import ReturnedTable from './../../../../components/Tables/FacilityRequest/ReturnedTable'
import loading from '../../../../assets/icons/loading.png'
const ReturnedRequest = () => {
    Axios.defaults.withCredentials = true;
    const [returnedRequests, setReturnedRequests] = useState([]), [rs, setRs] = useState(""), [isLoading, setIsLoading] = useState(!1);
    function returnedSearch(rows) { return rows.filter(row => row.last_name.toLowerCase().indexOf(rs.toLowerCase()) > -1 || row.status.toLowerCase().indexOf(rs.toLowerCase()) > -1) }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetReturnedReservationRequest").then((response) => { setReturnedRequests(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={rs} onChange={(e) => setRs(e.target.value)} placeholder="Search Name" /> </div></div><center> <ReturnedTable data={returnedSearch(returnedRequests)} /> </center> </div>
        </div>
    )
}
export default ReturnedRequest