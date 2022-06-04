import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import PendingRegisterTable from '../../../../../components/Tables/ResidentInformation/PendingRegisterTable'
import loading from '../../../../../assets/icons/loading.png'
import { FaSearch } from 'react-icons/fa'

const Pending = () => {
    Axios.defaults.withCredentials = true;
    const [nonVerifiedUser, setNonVerifiedUser] = useState([]);
    const [q, setQ] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    function search(rows) {
        return rows.filter(
            (row) =>
                row.first_name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.last_name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.middle_name.toLowerCase().indexOf(q.toLowerCase()) > -1);
    }

    useEffect(() => {
        async function fetchLoading() {
            setIsLoading(true);
            await Axios.get("http://localhost:3001/PendingRegisterInformation").then((response) => {
                setNonVerifiedUser(response.data);
                setIsLoading(false);

            });
            return () => { };
        }
        fetchLoading()
    }, []);


    return (
        <div>
            <div className="resident_information_tbl">
                <div className="loading_container">
                    {isLoading && <img src={loading} alt={loading} className="loading_icon" />}
                </div>
                <div className="resident_tbl_header">
                    <div className="search_resident">
                        <i className=""><FaSearch /></i>
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search Name"
                        />
                    </div>
                </div>
                <center>
                    <PendingRegisterTable data={search(nonVerifiedUser)} />
                </center>
            </div>
        </div>
    )
}

export default Pending
