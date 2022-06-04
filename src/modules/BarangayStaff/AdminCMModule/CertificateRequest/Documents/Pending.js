import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import PendingTable from '../../../../../components/Tables/DocumentRequest/PendingTable'
import './../../../../../components/Tables/DocumentRequest/PendingTable.css'
import loading from '../../../../../assets/icons/loading.png'
const Pending = () => {
    Axios.defaults.withCredentials = true;
    const [pendingDocuments, setPendingDocuments] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(!1);
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetPendingDocuments").then((response) => { setPendingDocuments(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    function search(rows) { return rows.filter((row) => row.first_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.middle_name.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    return (
        <main>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <PendingTable data={search(pendingDocuments)} /> </center> </div>
        </main>
    )
}
export default Pending