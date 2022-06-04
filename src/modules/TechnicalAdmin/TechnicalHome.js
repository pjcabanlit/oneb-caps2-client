import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import TechnicalNavbar from '../../components/Navbar/TechnicalAdmin/TechnicalNavbar';
import TechnicalSidebar from '../../components/Sidebar/TechnicalAdmin/TechnicalSidebar';
import loading from '../../assets/icons/loading.png'
import { FaUserCheck, FaUserTimes, FaUserTie } from 'react-icons/fa'
import './TechnicalHome.css'
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, border: "0.5px solid #d5dbd9" }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, status: { fontWeight: 'bold', fontSize: '0.75rem', color: 'white', backgroundColor: 'grey', borderRadius: 5, padding: '3px 10px', display: 'inline-block', fontFamily: "Montserrat, sans-serif", }, pagination: { overflow: "hidden" } }))
const TechnicalHome = () => {
    Axios.defaults.withCredentials = true;
    const classes = useStyles(), [totalNumAccount, setTotalNumAccount] = useState([]), [totalNumOfficial, setTotalNumOfficial] = useState([]), [technicalAdminLogs, setTechnicalAdminLogs] = useState([]), [unverified, setUnverified] = useState([]), [brgyinfo, setBrgyInfo] = useState([]), [isLoading, setIsLoading] = useState(!1), [page, setPage] = useState(0), [rowsPerPage, setRowsPerPage] = useState(5), handleChangePage = (e, t) => { setPage(t) }, handleChangeRowsPerPage = e => { setRowsPerPage(+e.target.value); setPage(0) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    useEffect(() => { async function fetchLoading() { setIsLoading(true); await Axios.get("http://localhost:3001/GetBarangayInformation").then((response) => { setBrgyInfo(response.data); setIsLoading(false) }); await Axios.get("http://localhost:3001/CountAccounts").then((response) => { setTotalNumAccount(response.data); setIsLoading(false); }); await Axios.get("http://localhost:3001/CountBarangayOfficials").then((response) => { setTotalNumOfficial(response.data); setIsLoading(false); }); await Axios.get("http://localhost:3001/GetTechnicalAdminLogs").then((response) => { setTechnicalAdminLogs(response.data); setIsLoading(false); }); await Axios.get("http://localhost:3001/CountUnverifiedAccounts").then((response) => { setUnverified(response.data); setIsLoading(false); }); return () => { }; } fetchLoading() }, []);
    return (
        <div className="adminHome_container">
            <TechnicalNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <TechnicalSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main> <div className="adminMain_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}<div className="adminMain_title">{brgyinfo.map((row) => (<> <img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.brgy_image)}`} draggable={false} alt="uploaded-img" /> <div className="adminMain_greeting"> <h1>{row.brgy_barangay + " " + row.brgy_zone + " " + row.brgy_district}</h1> <p>Welcome to Technical Admin Dashboard</p></div></>))}</div><div className="adminMain_cards"> <div className="adminCard"> <i className="text-lightblue" id="dashboard_icon"><FaUserCheck /> </i> <div className="adminCard_inner"> <p className="text-primary-p">Total Verified Users</p><span className="font-bold text-title">{totalNumAccount.map((row) => (row.account))}</span> </div></div><div className="adminCard"> <i className="text-lightblue" id="dashboard_icon"><FaUserTimes /></i> <div className="adminCard_inner"> <p className="text-primary-p">Total Unverified Users</p><span className="font-bold text-title">{unverified.map((row) => (row.unverified))}</span> </div></div><div className="adminCard"> <i className="text-lightblue" id="dashboard_icon"><FaUserTie /></i> <div className="adminCard_inner"> <p className="text-primary-p">Total No. of Official</p><span className="font-bold text-title">{totalNumOfficial.map((row) => (row.official))}</span> </div></div></div><div className="adminCharts_chart"> <div className="adminMain_greeting"> <h1>Your Daily Activity</h1> </div><center> <TableContainer component={Paper} className={classes.tableContainer}> <Table className={classes.table} aria-label="simple table"> <TableHead > <TableRow className={classes.tableRow}> <TableCell className={classes.tableHeaderCell}>Action</TableCell> <TableCell className={classes.tableHeaderCell}>Type of Action</TableCell> <TableCell className={classes.tableHeaderCell}>Date Performed</TableCell> <TableCell className={classes.tableHeaderCell}>Time Performed</TableCell> </TableRow> </TableHead> <TableBody>{technicalAdminLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { return (<TableRow> <TableCell className={classes.tableCell}> <Typography className={classes.name}>{row.audit_action}</Typography> </TableCell> <TableCell > <Typography className={classes.name}>{row.audit_action_type}</Typography> </TableCell> <TableCell > <Typography className={classes.name}><p><Moment format={"MMMM DD, YYYY"} date={row.audit_date_performed} /></p></Typography> </TableCell> <TableCell > <Typography className={classes.name}>{row.audit_time_performed}</Typography> </TableCell> </TableRow>) })}</TableBody> <TableFooter> <TablePagination rowsPerPageOptions={[5, 10, 15]} count={technicalAdminLogs.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} className={classes.pagination} component={"span"} /> </TableFooter> </Table> </TableContainer> </center> </div></div></main>
        </div>
    )
}
export default TechnicalHome;