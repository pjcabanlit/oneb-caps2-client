import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ArchiveOfficialsTable from '../../../../../src/components/Tables/BarangayOfficial/ArchiveOfficialsTable'
import loading from '../../../../assets/icons/loading.png'
const ArchiveList = () => {
    Axios.defaults.withCredentials = true;
    const [official_list, setOfficialList] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(false)
    function search(rows) { return rows.filter((row) => row.first_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.middle_name.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetArchiveOfficial").then((response) => { setOfficialList(response.data); setIsLoading(false) }); return () => { }; } fetchLoading() }, []);
    return (
        <main>
            <div className="certificate_request"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="process_request_container"> <div className="resident_information_tbl"> <div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Name" /> </div></div><center> <ArchiveOfficialsTable data={search(official_list)} /> </center> </div></div></div>
        </main>
    );
}
export default ArchiveList