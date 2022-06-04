import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./EditProfile.css";
import Footer from "./../../../components/Footer/Footer";
import ConfirmDialog from "./../../../components/Dialog/ConfirmDialog";
import SuccessDialog from "./../../../components/Dialog/SuccessDialog";
import LoginAuthPop from "./../../../components/Dialog/LoginAuthPop";
import Notification from "./../../../components/Dialog/Notification";
import ViewEditDialog from "../../../components/Dialog/ViewEditDialog";
import Navbar from "./../../../components/Navbar/Navbar";
import PasswordDialog from "../../../components/Dialog/PasswordDialog";
import Helm from "../../../components/Helmet/Helmet";
import moment from "moment";
function EditProfile() {
    Axios.defaults.withCredentials = true;
    const history = useHistory(), [householdHead, setHouseHoldHead] = useState(""), [relationshipToHousehold, setRelationshipToHousehold] = useState(""), [nameOfHouseholdHead, setNameOfHouseholdHead] = useState(""), [user_id, setUserId] = useState(""), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setPrefix] = useState(""), [gender, setSex] = useState(""), [contact, setContact] = useState(""), [email, setEmail] = useState(""), [birthdate, setBirthdate] = useState(""), [birthplace, setBirthplace] = useState(""), [nationality, setNationality] = useState(""), [civil_status, setCivilStatus] = useState(""), [spouseName, setSpouseName] = useState(""), [occupation, setOccupation] = useState(""), [date_resided, setDateResided] = useState(""), [disable, setDisable] = useState(""), [disabilityKind, setDisabilityKind] = useState(""), [solo_parent, setSoloParent] = useState(""), [isVoter, setIsVoter] = useState(""), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [passwordDialog, setPasswordDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), refresh = () => { setSuccessDialog({ ...successDialog, isOpen: !1 }); history.push("/MyProfile") }, backToProfile = () => { history.push("/MyProfile") }, email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, contact_format = /^(09|\+639)\d{9}$/, stringOnly_format = /^[a-zA-Z\s]*$/, showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();
    useEffect(() => { Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setUserId(response.data.user[0].user_id); setFirstName(response.data.user[0].first_name); setMiddleName(response.data.user[0].middle_name); setLastName(response.data.user[0].last_name); setPrefix(!response.data.user[0].suffix === null ? "" : response.data.user[0].suffix); setSex(response.data.user[0].gender); setEmail(response.data.user[0].email); setContact(response.data.user[0].contact); setNationality(response.data.user[0].nationality); setCivilStatus(response.data.user[0].civil_status); setBirthdate(response.data.user[0].birthdate); setBirthplace(response.data.user[0].birthplace); setDateResided(response.data.user[0].date_resided); setDisable(response.data.user[0].disable); setIsVoter(response.data.user[0].is_voter); setRelationshipToHousehold(response.data.user[0].rel_to_household); setNameOfHouseholdHead(response.data.user[0].householdhead_name); setHouseHoldHead(response.data.user[0].household_head); setOccupation(response.data.user[0].occupation); setSoloParent(response.data.user[0].solo_parent) } }); }, []);
    function UpdateProfile() { if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase()) || !stringOnly_format.test(String(nameOfHouseholdHead).toLowerCase()) || !stringOnly_format.test(String(spouseName).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain letters only.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (!contact_format.test(String(contact))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect Contact Number format.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (!email_format.test(String(email).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect E-mail address format.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (!stringOnly_format.test(String(nameOfHouseholdHead).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect value for Relationship to Household Head.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (!stringOnly_format.test(String(nationality).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect value for Nationality", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else if (!first_name || !last_name || !gender || !contact || !email || !birthdate) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "You cannot remove the required fields.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } else { setConfirmDialog({ isOpen: true, title: "Update Profile", subtitle: "Are you sure you want to save changes?", noButton: (<button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn" > No </button>), yesButton: (<button onClick={() => updateProfile_confirm()} className="alert_yesBtn" >Yes</button>), }); } }
    function updateProfile_confirm() { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/update_profile", { EPI_userId: user_id, EPI_firstName: first_name, EPI_middleName: !middle_name ? "" : middle_name, EPI_lastName: last_name, EPI_suffix: !suffix ? "" : suffix, EPI_birthdate: moment(birthdate).format('YYYY-MM-DD'), EPI_birthplace: birthplace, EPI_gender: gender, EPI_contact: !contact ? "" : contact, EPI_nationality: nationality, EPI_civilStatus: civil_status, EPI_spouseName: spouseName, EPI_email: email, EPI_occupation: occupation, EPI_residenceYear: moment(date_resided).format('YYYY-MM-DD'), EPI_householdHead: householdHead, EPI_relToHousehold: relationshipToHousehold, EPI_householdHeadName: nameOfHouseholdHead, EPI_soloParent: solo_parent, EPI_disable: disable, EPI_disableKind: disabilityKind, EPI_isVoter: isVoter, EPI_dateToday: displaytodaysdate, }).then((response) => { if (response.data.success) { setSuccessDialog({ isOpen: true, title: "Profile Updated Successfully.", subtitle: "Please login your account again to show the updated details.", noButton: (<button onClick={() => refresh()} className="alert_backBtn"> Back </button>), }); setNotify({ isOpen: true, message: "Profile Updated!", type: "success", }); } else { setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: (<button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn" > Back </button>), }); } }); }
    return (
        <div className="EditProfile_container">
            <Helm title={`Edit Profile | One Barangay`} />
            <Notification notify={notify} setNotify={setNotify} />
            <SuccessDialog
                successDialog={successDialog}
                setSuccessDialog={setSuccessDialog}
            />
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
            <PasswordDialog
                passwordDialog={passwordDialog}
                setPasswordDialog={setPasswordDialog}
            />
            <Navbar />
            <div className="container">
                <div className="wrapper">
                    <div className="titles">
                        <h1> EDIT PERSONAL INFORMATION </h1>
                    </div>
                    <p>

                        All <span className="required_symbol">*</span> are required.
                    </p>
                    <div className="forms">
                        <div className="input_fields">
                            <label>

                                Household Head<span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    value={householdHead}
                                    onChange={(e) => {
                                        setHouseHoldHead(e.target.value);
                                    }}
                                    autoComplete="off"
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        {householdHead === "No" ? (
                            <div className="input_fields">
                                <label>
                                    Name of Household Head
                                    <span className="required_symbol">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={nameOfHouseholdHead}
                                    required
                                    className="inputs"
                                    autoComplete="off"
                                    onChange={(e) => setNameOfHouseholdHead(e.target.value)}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {householdHead === "No" ? (
                            <div className="input_fields">
                                <label>

                                    Relationship to Household head
                                    <span className="required_symbol">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="inputs"
                                    onChange={(e) => {
                                        setRelationshipToHousehold(e.target.value);
                                    }}
                                    autoComplete="off"
                                    value={relationshipToHousehold}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="input_fields">
                            <label>

                                First Name<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                value={first_name}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input_fields">
                            <label>Middle Name</label>
                            <input
                                type="text"
                                className="inputs"
                                value={middle_name}
                                onChange={(e) => {
                                    setMiddleName(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Last Name<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                value={last_name}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input_fields">
                            <label>Suffix</label>
                            <input
                                type="text"
                                className="inputs"
                                value={suffix}
                                onChange={(e) => {
                                    setPrefix(e.target.value);
                                }}
                            />
                        </div>
                        <div className="input_fields">
                            <label>
                                Contact<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="number"
                                className="inputs"
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input_fields">
                            <label>
                                Gender<span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    onChange={(e) => {
                                        setSex(e.target.value);
                                    }}
                                    autoComplete="off"
                                    value={gender}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="input_fields">
                            <label>
                                E-mail<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                autoComplete="off"
                                value={email}
                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Birthdate<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="date"
                                className="inputs"
                                onChange={(e) => {
                                    setBirthdate(e.target.value);
                                }}
                                autoComplete="off"
                                value={moment(birthdate).format("YYYY-MM-DD")}
                                max={moment().format("YYYY-MM-DD")}
                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Place Of Birth<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                onChange={(e) => {
                                    setBirthplace(e.target.value);
                                }}
                                autoComplete="off"
                                value={birthplace}
                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Nationality<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                onChange={(e) => {
                                    setNationality(e.target.value);
                                }}
                                autoComplete="off"
                                value={nationality}
                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Civil Status<span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    value={civil_status}
                                    onChange={(e) => {
                                        setCivilStatus(e.target.value);
                                    }}
                                    autoComplete="off"
                                >
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>
                        {civil_status === "Married" ? (
                            <div className="input_fields">
                                <label>Spouse Name</label>
                                <input
                                    type="text"
                                    className="inputs"
                                    value={spouseName}
                                    onChange={(e) => {
                                        setSpouseName(e.target.value);
                                    }}
                                    autoComplete="off"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="input_fields">
                            <label>

                                Occupation<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="text"
                                className="inputs"
                                onChange={(e) => {
                                    setOccupation(e.target.value);
                                }}
                                autoComplete="off"
                                value={occupation}
                            />
                        </div>
                        <div className="input_fields">
                            <label>
                                Date Resided in the Brgy<span className="required_symbol">*</span>
                            </label>
                            <input
                                type="date"
                                className="inputs"
                                onChange={(e) => {
                                    setDateResided(e.target.value);
                                }}
                                autoComplete="off"
                                value={moment(date_resided).format('YYYY-MM-DD')}
                                max={moment().format("YYYY-MM-DD")}

                            />
                        </div>
                        <div className="input_fields">
                            <label>

                                Solo Parent<span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    value={solo_parent}
                                    onChange={(e) => {
                                        setSoloParent(e.target.value);
                                    }}
                                    autoComplete="off"
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="input_fields">
                            <label>

                                Person With Disability
                                <span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    onChange={(e) => {
                                        setDisable(e.target.value);
                                    }}
                                    autoComplete="off"
                                    value={disable}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        {disable === "Yes" ? (
                            <div className="input_fields">
                                <label>

                                    Type of Disablity<span className="required_symbol">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="inputs"
                                    onChange={(e) => {
                                        setDisabilityKind(e.target.value);
                                    }}
                                    autoComplete="off"
                                    value={disabilityKind}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="input_fields">
                            <label>

                                Is Voter<span className="required_symbol">*</span>
                            </label>
                            <div className="custom_select">
                                <select
                                    className="inputs"
                                    onChange={(e) => {
                                        setIsVoter(e.target.value);
                                    }}
                                    autoComplete="off"
                                    value={isVoter}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="input_fields">
                            <input
                                type="submit"
                                value="Update"
                                id="submitBTN"
                                className="btn"
                                onClick={UpdateProfile}
                            />
                        </div>
                        <div className="input_fields">
                            <input
                                type="submit"
                                value="Back"
                                className="btn"
                                onClick={backToProfile}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default EditProfile;
