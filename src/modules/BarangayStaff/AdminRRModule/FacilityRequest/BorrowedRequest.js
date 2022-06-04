import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import BorrowedTable from './../../../../components/Tables/FacilityRequest/BorrowedTable'
import loading from '../../../../assets/icons/loading.png'
const BorrowedRequest = () => {
    Axios.defaults.withCredentials = true;
    const [bs, setBs] = useState(""), [borrowedRequests, setBorrowedRequests] = useState([]), [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetBorrowedReservationRequest").then((response) => { setBorrowedRequests(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    function borrowedSearch(rows) { return rows.filter(row => row.last_name.toLowerCase().indexOf(bs.toLowerCase()) > -1 || row.status.toLowerCase().indexOf(bs.toLowerCase()) > -1) }
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={bs} onChange={(e) => setBs(e.target.value)} placeholder="Search Name" /> </div></div><center> <BorrowedTable data={borrowedSearch(borrowedRequests)} /> </center> </div>
        </div>
    )
}
export default BorrowedRequest