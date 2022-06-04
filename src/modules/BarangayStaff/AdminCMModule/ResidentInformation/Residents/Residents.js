import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import HouseholdTable from '../../../../../components/Tables/ResidentInformation/HouseholdTable';
import loading from '../../../../../assets/icons/loading.png'
import { FaSearch } from 'react-icons/fa'

const Residents = () => {
    Axios.defaults.withCredentials = true;
    const [householdList, setHouseholdList] = useState([])
    const [q, setQ] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchLoading() {
            setIsLoading(true);
            await Axios.get("http://localhost:3001/GetHouseholdInformation").then((response) => {
                setHouseholdList(response.data);
                setIsLoading(false);
            })
            return () => { };
        }
        fetchLoading()
    }, []);

    function searches(rows) {
        return rows.filter(
            (row) =>
                row.street.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.house_no.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.HouseholdHead.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.household_number.toString().toLowerCase().indexOf(q.toLowerCase()) > -1);
    }
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
                            placeholder="Search House Number, Street, Household Head Name, Household Number"
                        />
                    </div>
                </div>
                <center>
                    <HouseholdTable data={searches(householdList)} />
                </center>
            </div>
        </div>
    )
}

export default Residents
