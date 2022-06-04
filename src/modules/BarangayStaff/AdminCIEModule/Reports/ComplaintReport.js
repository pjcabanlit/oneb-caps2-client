import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import ComplainTable from '../../../../components/Tables/ResidentReports/ComplainTable'
import loading from '../../../../assets/icons/loading.png'
const ComplainReport = () => {
    Axios.defaults.withCredentials = true;
    const [complaintReport, setComplaintReport] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(!1)
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetComplaintReports").then((response) => { setComplaintReport(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <main>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <ComplainTable data={complaintReport} /> </center> </div>
        </main>
    )
}
export default ComplainReport