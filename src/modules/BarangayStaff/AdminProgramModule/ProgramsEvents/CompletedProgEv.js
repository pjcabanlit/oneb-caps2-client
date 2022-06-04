import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import CompletedTable from './../../../../components/Tables/ProgramsEvents/CompletedTable'
import loading from '../../../../assets/icons/loading.png'
const CompletedProgEv = () => {
    Axios.defaults.withCredentials = true;
    const [completedProgEv, setCompletedProgEv] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(!1);
    function completedSearch(rows) { return rows.filter(row => row.prog_evt_title.toLowerCase().indexOf(q.toLowerCase()) > -1) }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetCompletedProgramsEvents").then((response) => { setCompletedProgEv(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <div>
            <div className="resident_information_tbl"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Program Name" /> </div></div><center> <CompletedTable data={completedSearch(completedProgEv)} /> </center> </div>
        </div>
    )
}
export default CompletedProgEv