/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import './SignUp.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import ob_tag from './../images/ob_icon.png'
import Notification from './../components/Dialog/Notification';
import ConfirmDialog from './../components/Dialog/ConfirmDialog';
import SuccessDialog from './../components/Dialog/SuccessDialog';
import LoginAuthPop from './../components/Dialog/LoginAuthPop';
import manila from '../assets/icons/manila.png';
import Helm from '../components/Helmet/Helmet';
import Footer from '../components/Footer/Footer';
import FormInput from '../components/Input/FormInput';
import { init } from 'emailjs-com';
import { Container, ImagePreview } from "./../../src/components/Styled/ImageStyle";
import PopUp from './../../src/components/Dialog/PopUp';
init("user_fkY78MeKQHllD5wrTnSOv");
export default function SignUp() {
    useEffect(() => { Axios.get("http://localhost:3001/GetBarangayInformation").then((response) => { setBrgyInfo(response.data); }) }, [])
    const [gender, setGender] = useState(""), [brgyinfo, setBrgyInfo] = useState([]), form = useRef(), [values, setValues] = useState({ firstName: "", middleName: "", lastName: "", suffix: "", contactNo: "", street: "", houseNo: "", email: "", birthdate: "", birthplace: "", username: "", password: "", confirmPassword: "" }), [openPopup, setOpenPopup] = useState(!1), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [successDialog, setSuccesDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [checked, setChecked] = useState(!1), [confirm, setConfirm] = useState(!1), [postImage, setPostImage] = useState(""), [image, setImage] = useState(""), history = useHistory(); var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate(); const backToLogin = () => { if (window.innerWidth <= 600) { history.push("/") } else { history.push("/login") } }, onSubmit = () => { };
    const openInPopup = (e) => { e.preventDefault(); if (!gender) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Gender must not be empty. Please try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!postImage) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Please insert your Valid ID for verification. Thank you and try again later.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setOpenPopup(true) } }
    const handleFileUpload = async (e) => { const fsize = e.target.files[0].size; const file = Math.round(fsize / 1000); if (file >= 50000) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "File too Big, please select a file less than 50MB", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>, }); } else { const file = e.target.files[0]; const base64 = await convertToBase64(file); setPostImage(base64); if (e.target.files && e.target.files[0]) { let reader = new FileReader(); reader.onload = function (e) { setImage(e.target.result); }; reader.readAsDataURL(e.target.files[0]); } } };
    const convertToBase64 = (file) => { return new Promise((resolve, reject) => { const fileReader = new FileReader(); fileReader.readAsDataURL(file); fileReader.onload = () => { const base64String = fileReader.result.replace("data:", "").replace(/^.+,/, ""); resolve(base64String); }; fileReader.onerror = (error) => { reject(error); }; }); };
    const handleSubmit = (e) => { e.preventDefault(); setConfirmDialog({ isOpen: true, title: 'Are you sure you want to Register?', subtitle: 'Please check all the information before you register.', noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>, yesButton: <button onClick={() => { Axios.post("http://localhost:3001/register", { reg_firstName: values.firstName, reg_middleName: values.middleName, reg_lastName: values.lastName, reg_suffix: values.suffix, reg_contact: values.contactNo, reg_street: values.street, reg_number: values.houseNo, reg_gender: gender, reg_email: values.email, reg_birthdate: values.birthdate, reg_birthplace: values.birthplace, reg_username: values.username, reg_password: values.password, reg_dateToday: displaytodaysdate, reg_validID: postImage, }).then((response) => { if (response.data.msg1) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "Register Error", subtitle: response.data.msg1, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.msg2) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "Register Error", subtitle: response.data.msg2, noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (response.data.msg) { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setSuccesDialog({ isOpen: true, title: "Registered Successfully!", subtitle: "", noButton: <button onClick={() => backToLogin()} className="alert_backBtn">Back</button> }); setNotify({ isOpen: true, message: "Registered Successfully", type: "success" }) } else { setConfirmDialog({ ...confirmDialog, isOpen: false, }); setErrorDialog({ isOpen: true, title: "Connection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }); }} className="alert_yesBtn"> Yes </button>, }) }
    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            placeholder: "",
            errorMessage: "First name contain letters only.",
            label: "First Name:",
            pattern: "^[a-zA-Z_ ]*$",
            required: true,
        },
        {
            id: 2,
            name: "middleName",
            type: "text",
            placeholder: "",
            errorMessage: "Middle name contain letters only.",
            label: "Middle Name:",
            pattern: "^[a-zA-Z_ ]*$",
        },
        {
            id: 3,
            name: "lastName",
            type: "text",
            placeholder: "",
            errorMessage: "Last name contain letters only.",
            label: "Last Name:",
            pattern: "^[a-zA-Z_ ]*$",
            required: true,
        },
        {
            id: 4,
            name: "suffix",
            type: "text",
            placeholder: "",
            errorMessage: "Suffix contain letters only.",
            label: "Suffix:",
            pattern: `^[a-zA-Zs]*$`,
        },
        {
            id: 5,
            name: "contactNo",
            type: "number",
            placeholder: "09xxxxxxxxx",
            errorMessage: "Invalid Contact Number format.",
            label: "Contact No.",
            pattern: `^(09|+639)d{9}$`,
            required: true,
        },
        {
            id: 6,
            name: "street",
            type: "text",
            placeholder: "",
            errorMessage: "Street is required. / Special Characters not allowed.",
            label: "Street",
            pattern: "^[a-zA-Z0-9._ ]*$",
            required: true,
        },
        {
            id: 7,
            name: "houseNo",
            type: "text",
            placeholder: "",
            errorMessage: "House Number is required. / Special Characters not allowed.",
            label: "House No.",
            pattern: "^[a-zA-Z0-9._ ]*$",
            required: true,
        },
        {
            id: 8,
            name: "email",
            type: "email",
            placeholder: "xxxxx@example.com",
            errorMessage: "Invalid e-mail address.",
            label: "E-mail",
            required: true,

        },
        {
            id: 9,
            name: "birthdate",
            type: "date",
            placeholder: "Birthdate",
            errorMessage: "Birthdate is required",
            label: "Birth date",
            required: true,

        },
        {
            id: 10,
            name: "username",
            type: "text",
            placeholder: "",
            errorMessage: "Username should be 6-10 characters and shouldn't contain any special character.",
            label: "Username:",
            pattern: "^[A-Za-z0-9]{6,10}$",
            required: true,
        },
        {
            id: 11,
            name: "password",
            type: "password",
            placeholder: "",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 12,
            name: "confirmPassword",
            type: "password",
            placeholder: "",
            errorMessage: "Password doesn't match.",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        },

    ]
    const onChange = (e) => { setValues({ ...values, [e.target.name]: e.target.value }) }
    return (
        <div>
            <Helm title={`Sign Up | One Barangay`} /><Notification notify={notify} setNotify={setNotify} /><ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} /><LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} /><SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccesDialog} />
            {brgyinfo.map((row) => (
                <>
                    <PopUp title="Submit Preview" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl"> <div className="wrapper1" id="wrapper_profile"> <div className="note2"> <p className="noteEnglish"><span className="reminder">NOTE: </span> Please double check all the information and spelling before you submit.</p><p className="noteTagalog"><span className="reminder">TANDAAN: </span> Mangyaring i-double check ang lahat ng impormasyon at spelling bago ka magsumite.</p></div><div className="forms" id="inputfields_profile"> <div className='Column-1'><div className="input_fields"><label>First Name</label><input type="text" className="inputs" autoComplete="off" value={values.firstName} disabled /></div><div className="input_fields"><label>Middle Name</label><input type="text" className="inputs" autoComplete="off" value={values.middleName} disabled /></div><div className="input_fields"><label>Last Name</label><input type="text" className="inputs" autoComplete="off" value={values.lastName} disabled /></div><div className="input_fields"><label>Suffix</label><input type="text" className="inputs" autoComplete="off" value={values.suffix} disabled /></div><div className="input_fields"><label>Gender</label><input type="text" className="inputs" autoComplete="off" value={gender} disabled /></div><div className="input_fields"><label>Contact Number</label><input type="number" className="inputs" autoComplete="off" value={values.contactNo} disabled /></div></div><div className='Column-2'><div className="input_fields"><label>Street</label><input type="text" className="inputs" autoComplete="off" value={values.street} disabled /></div><div className="input_fields"><label>House No.</label><input type="text" className="inputs" autoComplete="off" value={values.houseNo} disabled /></div><div className="input_fields"><label>Email</label><input type="text" className="inputs" autoComplete="off" value={values.email} disabled /></div><div className="input_fields"><label>Birth Date</label><input type="text" className="inputs" autoComplete="off" value={values.birthdate} disabled /></div><div className="input_fields"><label>Username</label><input type="text" className="inputs" autoComplete="off" value={values.username} disabled /></div><div className="input_fields"><label>Valid ID</label><div className='image-validId2'><Container><div className="image-upload"><ImagePreview><img id="uploaded-image" className='image-validID' src={image} draggable={!1} alt="uploaded-img" style={{ width: "350px", height: "200px" }} /></ImagePreview></div></Container></div></div></div></div></div><div className="input_fieldss terms" id='term-condition'> <label className="label_checkbox"> <input type="checkbox" onChange={(e) => setConfirm(e.target.checked)} /> <span className="checkmark"></span> </label> <p className="applicationForm_terms">I have duly reviewed the entries in this preview page and declare that the information above is true, complete, and correct to the best of my knowledge.</p></div>{confirm ? <div className="add_resident_container_footer"> <div className="wrapper" id="wrapper_profile"> <div className="input_fields" > <input id="bttn-sbmt" type="submit" value="Confirm" className="editProfile_btn" onClick={handleSubmit} /> </div></div></div> : ""}</PopUp>
                    <div className="signup_div"> <div className="topnav_container"> <img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.brgy_image)}`} draggable={false} alt="uploaded-img" className="main-logo-1" /> <img src={ob_tag} alt={ob_tag} className="login_header_title" /> <img src={manila} alt={manila} className="main-logo-2" /> </div><div className="EditProfile_container"> <div className="wrapper"> <div className="titles">REGISTRATION</div><div className="forms"> <form onSubmit={openInPopup} ref={form}> <div className="input_fieldss" > <label>Gender<span className="required_symbol">*</span></label> <div className="custom_select"> <select className="inputs" autoComplete="off" onChange={(e) => setGender(e.target.value)}> <option value="">Select</option> <option value="Male">Male</option> <option value="Female">Female</option> </select> </div></div>{inputs.map((input) => (<FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />))}<div className="input_fieldss" > <label>Valid ID<span className="required_symbol">*</span></label> <input className="inputs" id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png," onChange={(e) => handleFileUpload(e)} /> </div><div className="input_fieldss terms"> <label className="label_checkbox"> <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} /> <span className="checkmark"></span> </label> <p className="applicationForm_terms">I have read and agreed to the <a href="/terms-of-use">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy of One Barangay.</a></p></div>{checked && <div className="input_fieldss"> <input type="submit" value="Register" id="submitBTN" className="btn" onClick={onSubmit} /> </div>}<div className="input_fieldss" id="rgstr_back_btn" style={!checked ? { marginTop: 25 + "px" } : { marginTop: "" }}> <input type="submit" value="Back" className="btn" onClick={backToLogin} /> </div></form> </div></div></div></div>
                    {window.innerWidth <= 600 ? "" : <Footer />}
                </>
            ))}
        </div>
    )
}