
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './AdminNavbar.css';
import { Link, useHistory } from 'react-router-dom';
import m1 from './../../../images/m1.png'
import { RiLogoutCircleLine, RiUserSettingsLine } from 'react-icons/ri'
import PopUp from '../../../components/Dialog/PopUp'
import PopUp2 from '../../../components/Dialog/PopUp2';
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog'
import SuccessDialog from '../../../components/Dialog/SuccessDialog';

const AdminNavbar = ({ openSidebar }) => {
    Axios.defaults.withCredentials = true;
    const [authState, setAuthState] = useState({ username: "", id: 0, status: !1 }), [username, setUsername] = useState(""), [position, setPosition] = useState(""), [role, setRole] = useState(""), [setActive, setActiveState] = useState(""), menuToggle = () => { setActiveState("" === setActive ? "activate" : "") }, history = useHistory(), [accountId, setAccountId] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [changeUser, setChangeUser] = useState(false)
    const [changePw, setChangePw] = useState(false)
    const [curPass, setCurPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [newUser, setNewUsername] = useState("")

    const refresh = () => {
        setSuccessDialog({ ...successDialog, isOpen: false });
        window.location.reload()
    }
    const change_user = () => {
        if (!newUser) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "Please enter username.",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else {
            setConfirmDialog({
                isOpen: true,
                title: 'Change Username',
                subtitle: 'Are you sure you want to change your username?',
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>,
                yesButton: <button onClick={() => change_user_conf()} className="alert_yesBtn"> Yes </button>,
            })
        }
    }

    const change_user_conf = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.put("http://localhost:3001/UserUpdateUsername", {
            update_username: newUser,
            update_accountId: accountId
        }).then((response) => {
            if (response.data.msg1) {
                setErrorDialog({
                    isOpen: true,
                    title: "Change Username Failed.",
                    subtitle: response.data.msg1,
                    noButton: (
                        <button
                            onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                            className="alert_backBtn"
                        >
                            Back
                        </button>
                    ),
                });
            } else if (response.data.msg2) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Change Username",
                    subtitle: `Your username was changed successfully.`,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Something went wrong",
                    subtitle: "Please check your connection and try again.",
                    noButton: (
                        <button
                            onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                            className="alert_backBtn"
                        >
                            Back
                        </button>
                    ),
                });
            }
        })
    }

    const change_pw = () => {
        if (!newPass || !confPass) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "All fields are required.",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else if (newPass !== confPass) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "Password does not match",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else {
            setConfirmDialog({
                isOpen: true,
                title: 'Change Password',
                subtitle: 'Are you sure you want to change your password?',
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>,
                yesButton: <button onClick={() => change_pw_confirm()} className="alert_yesBtn"> Yes </button>,
            })
        }
    }

    const change_pw_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        Axios.post("http://localhost:3001/ChangeAdminPassword", {
            password: newPass,
            accId: accountId
        }).then((response) => {
            if (!response.data.success) {
                setErrorDialog({
                    isOpen: true,
                    title: "Something went wrong",
                    subtitle: "Change Password failed. Please try again.",
                    noButton: (
                        <button
                            onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                            className="alert_backBtn"
                        >
                            Back
                        </button>
                    ),
                });
            } else if (response.data.success) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Change Password",
                    subtitle: `Your password was changed successfully.`,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Something went wrong",
                    subtitle: "Please check your connection and try again.",
                    noButton: (
                        <button
                            onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                            className="alert_backBtn"
                        >
                            Back
                        </button>
                    ),
                });
            }
        })
    }

    const search_pw = () => {
        if (!curPass) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "Please enter your current password",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else {
            Axios.post(`http://localhost:3001/checkAdminPW`, {
                currentPw: curPass,
                accId: accountId
            }).then((response) => {
                if (!response.data.recovered) {
                    setErrorDialog({
                        isOpen: true,
                        title: "Incorrect Password",
                        subtitle: "",
                        noButton: (
                            <button
                                onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                                className="alert_backBtn"
                            >
                                Back
                            </button>
                        ),
                    });
                } else if (response.data.recovered) {
                    setOpenPopup2(true)
                } else {
                    setErrorDialog({
                        isOpen: true,
                        title: "Something went wrong",
                        subtitle: "Please check your connection and try again.",
                        noButton: (
                            <button
                                onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                                className="alert_backBtn"
                            >
                                Back
                            </button>
                        ),
                    });
                }
            })
        }
    }


    useEffect(() => { Axios.get("http://localhost:3001/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } }).then((response) => { if (response.data.message) { setAuthState({ ...authState, status: false }) } else { setAuthState({ username: response.data.username, id: response.data.resident_id, status: true }) } }) }, [])
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === true) { setUsername(response.data.user[0].username); setAccountId(response.data.user[0].account_id); setPosition(response.data.user[0].position); setRole(response.data.user[0].role) } }); }, []);
    const logout = async () => { localStorage.removeItem("token"); setAuthState({ username: "", id: 0, status: false }); try { await Axios.get(`http://localhost:3001/logout`, { params: { username: username, accId: accountId } }).then((response) => { }); localStorage.removeItem('token') } catch (error) { } history.push("/login") }
    return (
        <div className="adminNavbar">
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <PopUp title="Account Setting" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl">
                <div>
                    <div className="add_new_resident_container">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                {!changePw ? <div className="input_fields">
                                    <label>
                                        Username:<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="inputs"
                                        autoComplete="off"
                                        disabled={changeUser ? "" : "disabled"}
                                        defaultValue={username}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                </div> : ""}

                                {changePw ?
                                    <div className="input_fields">
                                        <label>
                                            Current Password:<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            className="inputs"
                                            autoComplete="off"
                                            onChange={(e) => setCurPass(e.target.value)}
                                        />
                                    </div> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="add_resident_container_footer">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                {changeUser ? <>
                                    <div className="input_fields">
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="editProfile_btn"
                                            onClick={change_user}
                                        />
                                    </div>
                                    <div className="input_fields">
                                        <input
                                            type="submit"
                                            value="Cancel"
                                            className="editProfile_btn"
                                            onClick={() => setChangeUser(false)}
                                        />
                                    </div> </> : changePw ? <><div className="input_fields">
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="editProfile_btn"
                                            onClick={search_pw}
                                        />
                                    </div>
                                        <div className="input_fields">
                                            <input
                                                type="submit"
                                                value="Cancel"
                                                className="editProfile_btn"
                                                onClick={() => setChangePw(false)}
                                            />
                                        </div> </> : <><div className="input_fields">
                                            <input
                                                type="submit"
                                                value="Change Username"
                                                className="editProfile_btn"
                                                onClick={() => setChangeUser(true)}
                                            />
                                        </div>
                                    <div className="input_fields">
                                        <input
                                            type="submit"
                                            value="Change Password"
                                            className="editProfile_btn"
                                            onClick={() => setChangePw(true)}
                                        />
                                    </div> </>}
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp>
            <PopUp2 title="Change Password" openPopup2={openPopup2} setOpenPopup2={setOpenPopup2} maxWidth="xl">
                <div className="add_new_resident_container">
                    <div className="wrapper" id="wrapper_profile">
                        <div className="forms" id="inputfields_profile">
                            <div className="input_fields">
                                <label>
                                    New Password:<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="inputs"
                                    autoComplete="off"
                                    onChange={(e) => setNewPass(e.target.value)}
                                />
                            </div>
                            <div className="input_fields">
                                <label>
                                    Confirm Password:<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="inputs"
                                    autoComplete="off"
                                    onChange={(e) => setConfPass(e.target.value)}
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
                                    className="editProfile_btn"
                                    onClick={change_pw}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp2>
            <div className="admin_mobile_sidebar">
                <div className="adminNavIcon" onClick={() => openSidebar()}>

                    <i className="fa fa-bars"></i>
                </div>
            </div>
            <div className="admin_action">
                <div className="admin_profile" onClick={menuToggle}>
                    <img src={m1} alt={m1} />
                </div>
                <div className={`admin_menu ${setActive}`}>
                    <h3>
                        {username}
                        <br /> <span>{position}</span>
                    </h3>
                    <ul>
                        <li>
                            <RiUserSettingsLine className="admin_icon" />
                            <button className="admin_accBtn" onClick={() => setOpenPopup(true)}>
                                Account
                            </button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <RiLogoutCircleLine className="admin_icon" />
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {role === "User" && history.push("/home")}
        </div>
    );
}
export default AdminNavbar