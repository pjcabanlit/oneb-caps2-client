import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import './AdminMain.css'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog'
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop'
import SuccessDialog from '../../../components/Dialog/SuccessDialog'
import { FaFileDownload } from 'react-icons/fa'
import * as XLSX from 'xlsx'
import PopUp from '../../../components/Dialog/PopUp'
import PopUp2 from '../../../components/Dialog/PopUp2'
import Moment from 'react-moment'
import PopUp3 from '../../../components/Dialog/PopUp3'
import PopUp4 from '../../../components/Dialog/PopUp4'
import PopUp5 from '../../../components/Dialog/PopUp5'
import loading from '../../../assets/icons/loading.png'
import { FaUsers, FaHome, FaUser } from 'react-icons/fa'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Accordion from '../../../components/Accordion/Accordion'
import { FaSearch } from 'react-icons/fa'

require("es6-promise").polyfill();
require("isomorphic-fetch");

const AdminMain = () => {
    Axios.defaults.withCredentials = true;
    const history = useHistory()
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [sideBarOpen, setSidebarOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [openPopup3, setOpenPopup3] = useState(false);
    const [openPopup4, setOpenPopup4] = useState(false);
    const [openPopup5, setOpenPopup5] = useState(false);
    const [role, setRole] = useState("")

    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const [pwdList, setPwdList] = useState([])
    const [countPwd, setCountPwd] = useState([])

    const [householdHeadList, setHouseholdHeadList] = useState([])
    const [countHouseholdHead, setCountHouseholdHead] = useState([])

    const [seniorCitizenList, setSeniorCitizenList] = useState([])
    const [countSeniorCitizen, setCountSeniorCitizen] = useState([])

    const [totalPopulationList, setTotalPopulationList] = useState([])
    const [countPopulation, setCountPopulation] = useState([])

    const [maleList, setMaleList] = useState([])
    const [countMale, setCountMale] = useState([])

    const [femaleList, setFemaleList] = useState([])
    const [countFemale, setCountFemale] = useState([])

    const [voterList, setVoterList] = useState([])
    const [countVoter, setCountVoter] = useState([])

    const [brgyinfo, setBrgyInfo] = useState([])

    const [countHousehold, setCountHousehold] = useState([])

    const [totalHousehold, setTotalHousehold] = useState([])

    const [q, setQ] = useState("")

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const controller = new AbortController()
        setIsLoading(true);
        Promise.all([
            Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setRole(response.data.user[0].role) } }),
            Axios.get("http://localhost:3001/GetBarangayInformation").then((response) => {
                setBrgyInfo(response.data);
            }),
            Axios.get("http://localhost:3001/GetTotalHousehold").then((response) => {
                setCountHousehold(response.data)
            }),
            Axios.get("http://localhost:3001/HouseholdReport").then((response) => {
                setTotalHousehold(response.data)
            }),
            Axios.get("http://localhost:3001/GetTotalVoters").then((response) => {
                setVoterList(response.data)
            }),
            Axios.get("http://localhost:3001/CountVoters").then((response) => {
                setCountVoter(response.data)
            }),
            Axios.get("http://localhost:3001/GetTotalMale").then((response) => {
                setMaleList(response.data)
            }),
            Axios.get("http://localhost:3001/CountMale").then((response) => {
                setCountMale(response.data)
            }),
            Axios.get("http://localhost:3001/GetTotalFemale").then((response) => {
                setFemaleList(response.data)
            }),
            Axios.get("http://localhost:3001/CountFemale").then((response) => {
                setCountFemale(response.data)
            }),
            Axios.get("http://localhost:3001/GetTotalPopulation").then((response) => {
                setTotalPopulationList(response.data)
            }),
            Axios.get("http://localhost:3001/CountTotalPopulation").then((response) => {
                setCountPopulation(response.data)
            }),
            Axios.get("http://localhost:3001/GetSeniorCitizen").then((response) => {
                setSeniorCitizenList(response.data)
            }),
            Axios.get("http://localhost:3001/CountSeniorCitizen").then((response) => {
                setCountSeniorCitizen(response.data)
            }),
            Axios.get("http://localhost:3001/GetPwds").then((response) => {
                setPwdList(response.data)
            }),
            Axios.get("http://localhost:3001/CountPwds").then((response) => {
                setCountPwd(response.data)
            }),
            Axios.get("http://localhost:3001/GetHouseholdHeadList").then((response) => {
                setHouseholdHeadList(response.data)
            }),
            Axios.get("http://localhost:3001/CountHouseholdHead").then((response) => {
                setCountHouseholdHead(response.data)
            })
        ]).then(() => setIsLoading(false)).catch(ex => console.error(ex))
        return () => controller.abort()
    }, []);

    const totalPopulation_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(totalPopulationList)
        ws['!cols'] = []
        Object.keys(totalPopulationList[0]).forEach((cell) => {
            const colWidth = cell === 'RELATIONSHIP TO HOUSEHOLD HEAD' ? 200 : 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })
        XLSX.utils.book_append_sheet(wb, ws, `TtlPopulationBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `TtlPopulationBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const totalFemale_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(femaleList)
        ws['!cols'] = []
        Object.keys(femaleList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `TotalFemaleBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `TotalFemaleBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const totalMale_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(maleList)
        ws['!cols'] = []
        Object.keys(maleList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `TotalMaleBrgy40-${displaytodaysdate}`)
        XLSX.writeFile(wb, `TotaMaleBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const totalPwd_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(pwdList)
        ws['!cols'] = []
        Object.keys(pwdList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `TotalPWDBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `TotalPWDBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const totalVoters_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(voterList)
        ws['!cols'] = []
        Object.keys(voterList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `TotalVotersBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `TotalVotersBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const totalSeniors_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(seniorCitizenList)
        ws['!cols'] = []
        Object.keys(seniorCitizenList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `SeniorCitizenBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `SeniorCitizenBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const householdReport_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(totalHousehold)
        ws['!cols'] = []
        Object.keys(totalHousehold[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `HouseholdBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `HouseholdBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const householdHeadReport_xlsx = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(householdHeadList)
        ws['!cols'] = []
        Object.keys(householdHeadList[0]).forEach((cell) => {
            const colWidth = 100;
            ws['!cols'].push({
                wpx: colWidth,
            })
        })

        XLSX.utils.book_append_sheet(wb, ws, `HouseholdHeadBrgy407-${displaytodaysdate}`)
        XLSX.writeFile(wb, `HouseholdHeadBrgy407-${displaytodaysdate}.xlsx`, { cellStyles: true });
    }

    const filterSenior = () => {
        setOpenPopup(true)
    }

    const [filterDate, setFilterDate] = useState("")

    const [seniorFilterCheck, setSeniorFilterCheck] = useState(false)
    const filterSeniorByDate = () => {
        if (!filterDate) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "Please input a Date",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else {
            Axios.get(`http://localhost:3001/filterSeniorByDate/${filterDate}`).then((response) => {
                if (response.data.msg1) {
                    setErrorDialog({
                        isOpen: true,
                        title: response.data.msg1,
                        subtitle: "",
                        noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                    })
                } else if (response.data) {
                    setSeniorCitizenList(response.data)
                    setSeniorFilterCheck(true)
                } else {
                    setErrorDialog({
                        isOpen: true,
                        title: "Connection Error",
                        subtitle: "Please check your connection and try again.",
                        noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                    })
                }
            })
        }
    }

    const [age1, setAge1] = useState("")
    const [age2, setAge2] = useState("")

    const filterPopulation = () => {
        setOpenPopup2(true)
    }

    const filterAgeBracket = () => {
        Axios.get("http://localhost:3001/filterAgeBracket", {
            params: {
                filter_age1: age1,
                filter_age2: age2
            }
        }).then((response) => {
            if (response.data.msg1) {
                setErrorDialog({
                    isOpen: true,
                    title: "Filter Notice",
                    subtitle: response.data.msg1,
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else {
                setTotalPopulationList(response.data)
            }
        })
    }

    const [searchColumns, setSearchColumns] = useState([
        'LAST',
        'FIRST'
    ])

    function searchFunction(rows) {
        return rows.filter((row) =>
            searchColumns.some(
                (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            ),
        );
    }

    const columns = totalPopulationList[0] && Object.keys(totalPopulationList[0])

    const [ex1, setEx1] = useState(false)
    const [ex2, setEx2] = useState(false)
    const [ex3, setEx3] = useState(false)
    const [ex4, setEx4] = useState(false)

    const openEx1 = () => {
        setOpenPopup5(true)
        setEx1(true)
        setEx2(false)
        setEx3(false)
        setEx4(false)
    }

    const openEx2 = () => {
        setOpenPopup5(true)
        setEx2(true)
        setEx1(false)
        setEx3(false)
        setEx4(false)
    }

    const openEx3 = () => {
        setOpenPopup5(true)
        setEx3(true)
        setEx1(false)
        setEx2(false)
        setEx4(false)
    }

    const openEx4 = () => {
        setOpenPopup5(true)
        setEx4(true)
        setEx3(false)
        setEx1(false)
        setEx2(false)
    }

    const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
    }


    const resetSeniorFilter = () => {
        Axios.get("http://localhost:3001/GetSeniorCitizen").then((response) => {
            setSeniorCitizenList(response.data)
            setSeniorFilterCheck(false)
        })
    }

    const resetAgeBracketFilter = () => {
        Axios.get("http://localhost:3001/GetTotalPopulation").then((response) => {
            setTotalPopulationList(response.data)
        })
    }

    const [hhNum, setHHNum] = useState("")
    const filterByHHNumb = () => {
        Axios.get(`http://localhost:3001/GetByHouseholdNumber/${hhNum}`).then((response) => {
            setTotalPopulationList(response.data)
        })
    }


    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <PopUp title="Filter Senior Citizen" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl">
                <div>
                    <div className='filter_senior_upper'>
                        <p>Generate Total Senior Citizen</p>
                        <span> <FaFileDownload className="download_report" onClick={totalSeniors_xlsx} /></span>
                    </div>
                    <div className='filter_senior_lower'>
                        <p>Filter Senior Citizen</p>
                        <div className="input_fields">
                            <input type="date" className="filter_input" onChange={(e) => setFilterDate(e.target.value)} />
                        </div>
                        <div className="input_fields">
                            <input type="submit" value="Filter" className='filter_btn' onClick={filterSeniorByDate} />
                        </div>
                        <div className="input_fields">
                            <input type="submit" value="Reset" className='filter_btn' onClick={resetSeniorFilter} />
                        </div>
                    </div>
                    <div>
                        {seniorFilterCheck ?
                            <p>Possible Senior Citizens on <Moment format={"MMMM DD, YYYY"} date={filterDate} /></p> :
                            <p>Senior Citizens as of <Moment format={"MMMM DD, YYYY"} date={displaytodaysdate} /></p>
                        }
                        <table className='view_edit_household_table' id="senior_tbl_toXlsx">
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Ext.</th>
                                    <th>No.</th>
                                    <th>Street Name</th>
                                    <th>Birth Place</th>
                                    <th>Birth Date</th>
                                    <th>Sex</th>
                                    <th>Civil Status</th>
                                    <th>Citizenship</th>
                                    <th>Occupation</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>

                                {seniorCitizenList.map((row) => (
                                    <tr>
                                        <td data-aria-label='Last Name'>{row.LAST}</td>
                                        <td data-aria-label='First Name'>{row.FIRST}</td>
                                        <td data-aria-label='Middle Name'>{row.MIDDLE}</td>
                                        <td data-aria-label='Ext'>{row.EXT}</td>
                                        <td data-aria-label='No.'>{row.NUMBER}</td>
                                        <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                        <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                        <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                        <td data-aria-label='Sex'>{row.SEX}</td>
                                        <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                        <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                        <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                        <td data-aria-label='Occupation'>{row.AGE}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                        <div className='filter_by_age_btn'>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="filter_btn"
                                table="senior_tbl_toXlsx"
                                filename={`FilteredSeniorCitizenBrgy407-${displaytodaysdate}`}
                                sheet={`FilteredSeniorCitizenBrgy407-${displaytodaysdate}`}
                                buttonText="Download as XLS" />
                        </div>
                    </div>
                </div>
            </PopUp>
            <PopUp2 title="Filter Residents" openPopup2={openPopup2} setOpenPopup2={setOpenPopup2} maxWidth="xl">
                <div>
                    <div className='filter_senior_upper'>
                        <p>Generate Total Population Report</p>
                        <span className="font-bold text-title" > <FaFileDownload className="download_report" onClick={totalPopulation_xlsx} /></span>
                    </div>
                    <Accordion title="Search by Categories">
                        <div className='filter_section'>
                            <div>
                                <p>Select categories on what you want to filter.</p>
                            </div>
                            <div className='filterResident_inputContainer'>
                                <input type="text" className='filterResident_input' value={q} onChange={(e) => setQ(e.target.value)} />
                            </div>
                            {columns && columns.map((column) => (
                                <div className='filter_container'>
                                    <label className='option_item'>
                                        <input
                                            type='checkbox'
                                            className='filter_checkbox'
                                            checked={searchColumns.includes(column)}
                                            onChange={(e) => {
                                                const checked = searchColumns.includes(column);
                                                setSearchColumns((prev) => checked ? prev.filter((sc) => sc !== column) : [...prev, column])
                                            }}
                                        />
                                        <div className='option_inner'>
                                            <div className='filter_tickmark'></div>
                                            <span className="filter_name"> {column}</span>
                                        </div>

                                    </label>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                    <Accordion title="Filter by Age Bracket">
                        <div className='filter_age_container'>
                            <p className='filter_age_title'>Filter Residents by Age Bracket</p>
                            <div className='filter_by_age'>
                                <div className="">
                                    <input type="text" className='filter_input_byAge' onChange={(e) => setAge1(e.target.value)} placeholder="Enter Age 1" />
                                </div>
                                <div className="">
                                    <input type="text" className='filter_input_byAge' onChange={(e) => setAge2(e.target.value)} placeholder="Enter Age 2" />
                                </div>
                            </div>
                            <div className='filter_by_age_btn'>
                                <button onClick={filterAgeBracket} className="filter_btn">Filter</button>
                            </div>
                            <div className='filter_by_age_btn'>
                                <button onClick={resetAgeBracketFilter} className="filter_btn">Reset</button>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Search by Household Number">
                        <div className='filter_age_container'>
                            <div className="resident_tbl_header">
                                <div className="search_resident">
                                    <i className=""><FaSearch /></i>
                                    <input
                                        type="text"
                                        onChange={(e) => setHHNum(e.target.value)}
                                        placeholder="Search Household Number"
                                    />
                                </div>
                            </div>
                            <div>
                                <button onClick={filterByHHNumb}>Filter</button>
                                <button onClick={resetAgeBracketFilter}>Reset</button>
                            </div>
                        </div>
                    </Accordion>
                    <div>
                        <table className='view_edit_household_table' id="table-to-xls">
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Ext.</th>
                                    <th>No.</th>
                                    <th>Street Name</th>
                                    <th>Birth Place</th>
                                    <th>Birth Date</th>
                                    <th>Sex</th>
                                    <th>Civil Status</th>
                                    <th>Citizenship</th>
                                    <th>Occupation</th>
                                    <th>Relationship to Household Head</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchFunction(totalPopulationList).map((row) => (
                                    <tr style={row.RELATIONSHIP_TO_HOUSEHOLD_HEAD === "Head of the Family" ? { background: "#BDD2B6" } : { background: "White" }}>
                                        <td data-aria-label='Last Name'>{row.LAST}</td>
                                        <td data-aria-label='First Name'>{row.FIRST}</td>
                                        <td data-aria-label='Middle Name'>{row.MIDDLE}</td>
                                        <td data-aria-label='Ext'>{row.EXT}</td>
                                        <td data-aria-label='No.'>{row.NUMBER}</td>
                                        <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                        <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                        <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                        <td data-aria-label='Sex'>{row.SEX}</td>
                                        <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                        <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                        <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                        <td data-aria-label='Occupation'>{row.RELATIONSHIP_TO_HOUSEHOLD_HEAD}</td>
                                        <td data-aria-label='Occupation'>{row.AGE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='filter_by_age_btn'>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="filter_btn"
                            table="table-to-xls"
                            filename={`FilteredResidentsBrgy407-${displaytodaysdate}`}
                            sheet={`FilteredResidentsBrgy407-${displaytodaysdate}`}
                            buttonText="Download as XLS" />
                    </div>
                </div>
            </PopUp2>
            <PopUp3 title="Total Household" openPopup3={openPopup3} setOpenPopup3={setOpenPopup3} maxWidth="xl">
                <div>
                    <div>
                        <table className='view_edit_household_table'>
                            <thead>
                                <tr>
                                    <th>Street Name</th>
                                    <th>House No.</th>
                                    <th>Total Family Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalHousehold.map((row) => (
                                    <tr>
                                        <td data-aria-label='Last Name'>{row.STREET_NAME}</td>
                                        <td data-aria-label='First Name'>{row.HOUSE_NO}</td>
                                        <td data-aria-label='Middle Name'>{row.TOTAL_MEMBERS}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='filter_by_age_btn'>
                            <button onClick={householdReport_xlsx} className="filter_btn">Download Report</button>
                        </div>
                    </div>
                </div>
            </PopUp3>
            <PopUp4 title="Total Household Head" openPopup4={openPopup4} setOpenPopup4={setOpenPopup4} maxWidth="xl">
                <div>
                    <div>
                        <table className='view_edit_household_table'>
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Ext.</th>
                                    <th>No.</th>
                                    <th>Street Name</th>
                                    <th>Birth Place</th>
                                    <th>Birth Date</th>
                                    <th>Sex</th>
                                    <th>Civil Status</th>
                                    <th>Citizenship</th>
                                    <th>Occupation</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {householdHeadList.map((row) => (
                                    <tr>
                                        <td data-aria-label='Last Name'>{row.LAST_NAME}</td>
                                        <td data-aria-label='First Name'>{row.FIRST_NAME}</td>
                                        <td data-aria-label='Middle Name'>{row.MIDDLE_NAME}</td>
                                        <td data-aria-label='Ext'>{row.EXT}</td>
                                        <td data-aria-label='No.'>{row.HOUSE_NO}</td>
                                        <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                        <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                        <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                        <td data-aria-label='Sex'>{row.SEX}</td>
                                        <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                        <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                        <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                        <td data-aria-label='Occupation'>{row.AGE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='filter_by_age_btn'>
                        <button onClick={householdHeadReport_xlsx} className="filter_btn">Download Report</button>
                    </div>
                </div>
            </PopUp4>
            <PopUp5 title={`${ex1 ? `Total Voters` : ex2 ? `Total PWDs` : ex3 ? `Total Male Residents` : ex4 ? `Total Female Residents` : ``}`} openPopup5={openPopup5} setOpenPopup5={setOpenPopup5} maxWidth="xl">
                {ex1 ?
                    <div>
                        <div>
                            <table className='view_edit_household_table'>
                                <thead>
                                    <tr>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Ext.</th>
                                        <th>No.</th>
                                        <th>Street Name</th>
                                        <th>Birth Place</th>
                                        <th>Birth Date</th>
                                        <th>Sex</th>
                                        <th>Civil Status</th>
                                        <th>Citizenship</th>
                                        <th>Occupation</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voterList.map((row) => (
                                        <tr>
                                            <td data-aria-label='Last Name'>{row.LAST_NAME}</td>
                                            <td data-aria-label='First Name'>{row.FIRST_NAME}</td>
                                            <td data-aria-label='Middle Name'>{row.MIDDLE_NAME}</td>
                                            <td data-aria-label='Ext'>{row.EXT}</td>
                                            <td data-aria-label='No.'>{row.HOUSE_NO}</td>
                                            <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                            <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                            <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                            <td data-aria-label='Sex'>{row.SEX}</td>
                                            <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                            <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                            <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                            <td data-aria-label='Occupation'>{row.AGE}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='filter_by_age_btn'>
                            <button onClick={totalVoters_xlsx} className="filter_btn">Download Report</button>
                        </div>
                    </div>
                    : ex2 ?
                        <div>
                            <div>
                                <table className='view_edit_household_table'>
                                    <thead>
                                        <tr>
                                            <th>PWD Id No.</th>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>Ext.</th>
                                            <th>Type Of Disability</th>
                                            <th>Birth Date</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                            <th>Civil Status</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pwdList.map((row) => (
                                            <tr>
                                                <td data-aria-label='Last Name'>{row.PWD_ID_NO}</td>
                                                <td data-aria-label='First Name'>{row.FIRST_NAME}</td>
                                                <td data-aria-label='Middle Name'>{row.MIDDLE_NAME}</td>
                                                <td data-aria-label='Middle Name'>{row.LAST_NAME}</td>
                                                <td data-aria-label='Ext'>{row.EXT}</td>
                                                <td data-aria-label='No.'>{row.TYPE_OF_DISABILITY}</td>
                                                <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                                <td data-aria-label='Occupation'>{row.AGE}</td>
                                                <td data-aria-label='Sex'>{row.GENDER}</td>
                                                <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                                <td data-aria-label='Occupation'>{row.ADDRESS}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='filter_by_age_btn'>
                                <button onClick={totalPwd_xlsx} className="filter_btn">Download Report</button>
                            </div>
                        </div>
                        : ex3 ?
                            <div>
                                <div>
                                    <table className='view_edit_household_table'>
                                        <thead>
                                            <tr>
                                                <th>Last Name</th>
                                                <th>First Name</th>
                                                <th>Middle Name</th>
                                                <th>Ext.</th>
                                                <th>No.</th>
                                                <th>Street Name</th>
                                                <th>Birth Place</th>
                                                <th>Birth Date</th>
                                                <th>Sex</th>
                                                <th>Civil Status</th>
                                                <th>Citizenship</th>
                                                <th>Occupation</th>
                                                <th>Age</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {maleList.map((row) => (
                                                <tr>
                                                    <td data-aria-label='Last Name'>{row.LAST_NAME}</td>
                                                    <td data-aria-label='First Name'>{row.FIRST_NAME}</td>
                                                    <td data-aria-label='Middle Name'>{row.MIDDLE_NAME}</td>
                                                    <td data-aria-label='Ext'>{row.EXT}</td>
                                                    <td data-aria-label='No.'>{row.HOUSE_NO}</td>
                                                    <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                                    <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                                    <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                                    <td data-aria-label='Sex'>{row.SEX}</td>
                                                    <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                                    <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                                    <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                                    <td data-aria-label='Occupation'>{calculate_age(row.DATE_OF_BIRTH)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='filter_by_age_btn'>
                                    <button onClick={totalMale_xlsx} className="filter_btn">Download Report</button>
                                </div>
                            </div>
                            : ex4 ?
                                <div>
                                    <div>
                                        <table className='view_edit_household_table'>
                                            <thead>
                                                <tr>
                                                    <th>Last Name</th>
                                                    <th>First Name</th>
                                                    <th>Middle Name</th>
                                                    <th>Ext.</th>
                                                    <th>No.</th>
                                                    <th>Street Name</th>
                                                    <th>Birth Place</th>
                                                    <th>Birth Date</th>
                                                    <th>Sex</th>
                                                    <th>Civil Status</th>
                                                    <th>Citizenship</th>
                                                    <th>Occupation</th>
                                                    <th>Age</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {femaleList.map((row) => (
                                                    <tr>
                                                        <td data-aria-label='Last Name'>{row.LAST_NAME}</td>
                                                        <td data-aria-label='First Name'>{row.FIRST_NAME}</td>
                                                        <td data-aria-label='Middle Name'>{row.MIDDLE_NAME}</td>
                                                        <td data-aria-label='Ext'>{row.EXT}</td>
                                                        <td data-aria-label='No.'>{row.HOUSE_NO}</td>
                                                        <td data-aria-label='Street Name'>{row.STREET_NAME}</td>
                                                        <td data-aria-label='Birth Place'>{row.PLACE_OF_BIRTH}</td>
                                                        <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.DATE_OF_BIRTH} /></td>
                                                        <td data-aria-label='Sex'>{row.SEX}</td>
                                                        <td data-aria-label='Civil Status'>{row.CIVIL_STATUS}</td>
                                                        <td data-aria-label='Citizenship'>{row.CITIZENSHIP}</td>
                                                        <td data-aria-label='Occupation'>{row.OCCUPATION}</td>
                                                        <td data-aria-label='Occupation'>{calculate_age(row.DATE_OF_BIRTH)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='filter_by_age_btn'>
                                        <button onClick={totalFemale_xlsx} className="filter_btn">Download Report</button>
                                    </div>
                                </div>
                                : ""
                }
            </PopUp5>
            <main>
                <div className="adminMain_container">
                    <div className="loading_container">
                        {isLoading && <img src={loading} alt={loading} className="loading_icon" />}
                    </div>
                    <div className="adminMain_title">
                        {brgyinfo.map((row, index) => (
                            <>
                                <img
                                    key={index}
                                    id="uploaded-image"
                                    src={

                                        `data:image/jpeg;base64,${Buffer.from(
                                            row.brgy_image
                                        )}`
                                    }
                                    draggable={false}
                                    alt="uploaded-img"
                                />
                                <div className="adminMain_greeting">
                                    <h1>{row.brgy_barangay + " " + row.brgy_zone + " " + row.brgy_district}</h1>
                                    <p>Welcome to Dashboard</p>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="adminMain_cards" >
                        {countPopulation.map((row, index) => (
                            <div className="adminCard" onClick={() => filterPopulation()}>
                                <i className="text-lightblue"><FaUsers /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total Population</p>

                                    <span className="font-bold text-title" >{row.residents}</span>
                                </div>
                            </div>
                        ))}
                        {countHousehold.map((row, index) => (
                            <div className="adminCard" onClick={() => setOpenPopup3(true)}>
                                <i className="text-lightblue"><FaUsers /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total Household</p>

                                    <span className="font-bold text-title" >{row.households} </span>
                                </div>
                            </div>
                        ))}
                        {countHouseholdHead.map((row, index) => (
                            <div className={"adminCard"} onClick={() => setOpenPopup4(true)}>
                                <i className="text-lightblue"><FaHome /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total Household Head</p>
                                    <span className="font-bold text-title">{row.HouseholdHead}</span>
                                </div>

                            </div>
                        ))}

                        {countSeniorCitizen.map((row, index) => (
                            <div className="adminCard" onClick={() => filterSenior()}>
                                <i className="text-lightblue"><FaUser /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total No.of Senior Citizens</p>
                                    <span className="font-bold text-title"> {row.seniors}</span>
                                </div>
                            </div>
                        ))}
                        {countVoter.map((row, index) => (
                            <div className="adminCard" onClick={() => openEx1()}>
                                <i className="text-lightblue"><FaUser /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total No.of Voters</p>
                                    <span className="font-bold text-title">{row.voters} </span>
                                </div>
                            </div>
                        ))}
                        {countPwd.map((row, index) => (
                            <div className="adminCard" onClick={() => openEx2()}>
                                <i className="text-lightblue"><FaUser /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total No.of PWDs</p>
                                    <span className="font-bold text-title"> {row.pwd_number}</span>
                                </div>
                            </div>
                        ))}

                        {countMale.map((row, index) => (
                            <div className="adminCard" onClick={() => openEx3()}>
                                <i className="text-lightblue"><FaUser /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total No.of Male</p>
                                    <span className="font-bold text-title"> {row.total_male} </span>
                                </div>
                            </div>
                        ))}
                        {countFemale.map((row, index) => (
                            <div className="adminCard" onClick={() => openEx4()}>
                                <i className="text-lightblue"><FaUser /></i>
                                <div className="adminCard_inner">
                                    <p className="text-primary-p">Total No.of Female</p>
                                    <span className="font-bold text-title"> {row.total_female} </span>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
                {localStorage.getItem("token") && role === "User" ? history.push("/home") : ""}
                {localStorage.getItem("token") && role === "TechAdmin" ? history.push("/technical-admin") : ""}
            </main >
        </div >
    )
}

export default AdminMain;