import React, { useState, useEffect } from "react";
import Axios from 'axios'
import AccountTable from "./../../../../components/Tables/Account/AccountTable";
import loading from '../../../../assets/icons/loading.png'
export default function AccountList() {
    Axios.defaults.withCredentials = true;
    const [account_list, setAccountList] = useState([]), [q, setQ] = useState(""), [isLoading, setIsLoading] = useState(false)
    function search(rows) { return rows.filter((row) => row.first_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || row.middle_name.toLowerCase().indexOf(q.toLowerCase()) > -1); }
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetAccounts").then((response) => { setAccountList(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <main>
            <div className="certificate_request"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div><div className="process_request_container"> <div className="resident_information_tbl"> <div className="resident_tbl_header"> <div className="search_resident"> <i className="fa fa-search"></i> <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." /> </div></div><center> <AccountTable data={search(account_list)} /> </center> </div></div></div>
        </main>
    );
}