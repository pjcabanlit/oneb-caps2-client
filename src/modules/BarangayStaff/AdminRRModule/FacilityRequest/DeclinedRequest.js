import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import DeclinedTable from './../../../../components/Tables/FacilityRequest/DeclinedTable'
import loading from '../../../../assets/icons/loading.png'
const BorrowedRequest = () => {
    Axios.defaults.withCredentials = true;
    const [ds, setDs] = useState(""), [declinedRequest, setDeclinedRequest] = useState([]), [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetDeclinedFacilityRequests").then((response) => { setDeclinedRequest(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    function declinedSearch(rows) { return rows.filter(row => row.last_name.toLowerCase().indexOf(ds.toLowerCase()) > -1 || row.status.toLowerCase().indexOf(ds.toLowerCase()) > -1) }
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={ds} onChange={(e) => setDs(e.target.value)} placeholder="Search Name" /> </div></div><center> <DeclinedTable data={declinedSearch(declinedRequest)} /> </center> </div></div>
    )
}
export default BorrowedRequest
