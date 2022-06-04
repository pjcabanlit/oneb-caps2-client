import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import "./ResidentInformation.css";
import ViewEditDialog from './../../../../components/Dialog/ViewEditDialog';
import LoginAuthPop from "../../../../components/Dialog/LoginAuthPop";
import { IoIosAdd } from 'react-icons/io';
import PopUp from './../../../../components/Dialog/PopUp'
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import SuccessDialog from './../../../../components/Dialog/SuccessDialog';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import Resident from './Residents/Residents'
import Registered from './Residents/Registered'
import AdminSidebar from "../../AdminHome/AdminSidebar";
import AdminNavbar from "../../AdminHome/AdminNavbar";
import Archived from "./Residents/Archived";
import Pending from "./Residents/Pending";
require("es6-promise").polyfill();
require("isomorphic-fetch");
export default function ResidentInformation() {
    Axios.defaults.withCredentials = true;
    const [householdNumber, setHouseholdNumber] = useState("")
    let { url } = useRouteMatch();
    const history = useHistory(), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [openPopup, setOpenPopup] = useState(!1), [street, setStreet] = useState(""), [house_no, setHouseNo] = useState(""), openInPopup = () => { setOpenPopup(!0) }, refresh = () => { setSuccesDialog({ ...successDialog, isOpen: !1 }); history.push("/ResidentInformation") }, [id, setId] = useState(0), [active, setActive] = useState([{ id: 0, buttonName: "List of Household", isActive: !0, path: `${url}/residents` }, { id: 1, buttonName: "Registered Users", isActive: !1, path: `${url}/registered` }, { id: 2, buttonName: "Pending Registration", isActive: !1, path: `${url}/pending` }, { id: 3, buttonName: "List of Archived", isActive: !1, path: `${url}/archived` }]), toggleActive = e => { setActive(active.map((t, s) => s === e ? { ...t, isActive: !0 } : { ...t, isActive: !1 })); setId(e) }, [sideBarOpen, setSidebarOpen] = useState(!1), openSidebar = () => { setSidebarOpen(!0) }, closeSidebar = () => { setSidebarOpen(!1) };
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    const add_resident_confirm = () => { setOpenPopup(false); setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.post("http://localhost:3001/AddHousehold", { abr_street: street, abr_HouseNo: house_no, abr_dateToday: displaytodaysdate, abr_householdNumber: householdNumber }).then((response) => { if (response.data.errorMessage) { setErrorDialog({ isOpen: true, title: "Add Household Failed.", subtitle: response.data.errorMessage, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.err) { setErrorDialog({ isOpen: true, title: "Add Household Failed.", subtitle: response.data.err, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setSuccesDialog({ isOpen: true, title: response.data.successMessage, subtitle: "", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } }) }
    const add_resident = () => { const noSpecialChars = /^[A-Za-z0-9]+$/; if (!street || !house_no) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!noSpecialChars.test(String(house_no).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "House Number cannot contain any special character.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!noSpecialChars.test(String(street).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Street name cannot contain any special character.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: 'Are you sure you want to Add this Resident?', subtitle: 'Please check all the information before adding a Resident.', noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>, yesButton: <button onClick={() => add_resident_confirm()} className="alert_yesBtn"> Yes </button>, }) } }
    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                <LoginAuthPop
                    errorDialog={errorDialog}
                    setErrorDialog={setErrorDialog}
                />
                <ViewEditDialog
                    viewEditDialog={viewEditDialog}
                    setViewEditDialog={setViewEditDialog}
                />
                <SuccessDialog
                    successDialog={successDialog}
                    setSuccessDialog={setSuccesDialog}
                />
                <PopUp
                    title="Add New Household"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    maxWidth="xl"
                >

                    <div className="add_new_resident_container">

                        <div className="wrapper" id="wrapper_profile">

                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label>
                                        Household Number:<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setHouseholdNumber(e.target.value)}
                                    />
                                </div>
                                <div className="input_fields">
                                    <label>
                                        Street Name:<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </div>
                                <div className="input_fields">
                                    <label>
                                        House No.:<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setHouseNo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add_resident_container_footer">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn"
                                        onClick={add_resident}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </PopUp>
                <div className="resident_information_tables">
                    <div className="certificate_request">
                        <div className="process_request_container">
                            <div className="adminhome_titles">
                                <h1>Resident Information</h1> <hr />
                            </div>
                            <Router>

                                <div className="folder">

                                    <div className="folder_buttons">
                                        {active.map((button, index) => (
                                            <Link
                                                to={button.path}
                                                key={index}
                                                onClick={() => toggleActive(button.id)}
                                                className={`custom${button.isActive ? " active" : ""
                                                    }`}
                                            >
                                                {button.buttonName}
                                            </Link>
                                        ))}
                                        <div
                                            className={`underline${id === 0 ? " active-0" : ""}${id === 1 ? " active-1" : ""
                                                }${id === 2 ? " active-2" : ""}${id === 3 ? " active-3" : ""
                                                }`}
                                        />
                                    </div>
                                    <div
                                        className="resident_tbl_header"
                                        id="resident_info_buttons"
                                    >

                                        <div className="new_resident_btn_container">

                                            <button
                                                className="new_resident_btn"
                                                onClick={openInPopup}
                                            >

                                                <IoIosAdd className="btn_icon" />
                                                New Household
                                            </button>
                                        </div>
                                    </div>
                                    <Switch>

                                        <Route
                                            path="/ResidentInformation/residents"
                                            component={Resident}
                                        />
                                        <Route
                                            path="/ResidentInformation/registered"
                                            component={Registered}
                                        />
                                        <Route
                                            path="/ResidentInformation/pending"
                                            component={Pending}
                                        />
                                        <Route
                                            path="/ResidentInformation/archived"
                                            component={Archived}
                                        />
                                        <Redirect to="/ResidentInformation/residents"></Redirect>
                                    </Switch>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}