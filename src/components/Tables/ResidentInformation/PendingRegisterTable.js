import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './ResidentTable.css'
import ViewEditDialog from '../../Dialog/ViewEditDialog'
import ConfirmDialog from '../../Dialog/ConfirmDialog'
import LoginAuthPop from '../../Dialog/LoginAuthPop';
import SuccessDialog from '../../Dialog/SuccessDialog';
import SuccessRegisterDialog from '../../Dialog/SuccessRegisterDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopUp from '../../Dialog/PopUp';
import { FaEdit } from 'react-icons/fa';
import { Container, BoxUpload, ImagePreview } from "../../Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
import Moment from 'react-moment'
import emailjs from 'emailjs-com'
import moment from 'moment'
import { init } from 'emailjs-com';
init("user_fkY78MeKQHllD5wrTnSOv");

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 200,
    },
    tableContainer: {
        maxWidth: 1175,
        borderRadius: 0,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#0061a8',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        fontFamily: "Montserrat, sans-serif",
        cursor: "pointer",
        lineHeight: "1.43",
        paddingTop: "15px",
        paddingBottom: "15px",
    },
    tableCell: {
        fontFamily: "Montserrat, sans-serif",
        cursor: "pointer",
        fontSize: "15px"

    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        cursor: "pointer",
        fontWeight: 'bold',
        color: "#2e4a56",
        fontFamily: "Montserrat, sans-serif"
    },
    residentIdTitle: {
        fontSize: "15px"
    },
    pagination: {
        overflow: "hidden"
    }
}))

export default function PendingRegisterTable({ data }) {
    Axios.defaults.withCredentials = true;
    const history = useHistory()
    const [viewEditDialog, setViewEditDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openPopup, setOpenPopup] = useState(false)
    const [userId, setUserId] = useState("")
    const [pwd, setPwd] = useState("");
    const [date_registered, setDateRegistered] = useState("");
    const [image, setImage] = useState("");
    const [fourPs, setFourPs] = useState("");
    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [city_district, setCityDistrict] = useState("");
    const [barangay, setBarangay] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [postal, setPostal] = useState("");
    const [household_head, setHouseholdHead] = useState("");
    const [first_name, setFirstName] = useState("");
    const [middle_name, setMiddleName] = useState("");
    const [last_name, setLastName] = useState("");
    const [suffix, setSuffix] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [birthplace, setBirthplace] = useState("");
    const [civil_status, setCivilStatus] = useState("");
    const [spouse_name, setSpouseName] = useState("")
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [occupation, setOccupation] = useState("");
    const [date_resided, setDateResided] = useState("");
    const [fourPsYear, setFourPsYear] = useState("");
    const [disability_kind, setDisabilityKind] = useState("");
    const [is_voter, setIsVoter] = useState("");
    const [solo_parent, setSoloParent] = useState("");
    const [householdhead_name, setHouseholdHeadName] = useState("");
    const [relationshipToHousehold, setRelationshipToHousehold] = useState("");
    const [age, setAge] = useState("")
    const [userImg, setUserImg] = useState("")
    const [validId, setValidId] = useState("")

    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

    function openInPopup(household_head, householdhead_name, rel_to_household, first_name, middle_name, last_name, suffix, gender, contact, email, birthdate, birthplace, nationality, civil_status, spouse_name, occupation, date_resided, religion, four_ps, fourPsYear, disable, disability_kind, solo_parent, is_voter, region, province, city, city_district, barangay, postal, number, street_name, image, date_registered, age, user_id, valid_id) {
        setOpenPopup(true);
        setHouseholdHead(household_head)
        setHouseholdHeadName(householdhead_name)
        setRelationshipToHousehold(rel_to_household)
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setGender(gender)
        setContact(contact)
        setEmail(email)
        setBirthdate(birthdate)
        setBirthplace(birthplace)
        setNationality(nationality)
        setCivilStatus(civil_status)
        setSpouseName(spouse_name)
        setOccupation(occupation)
        setDateResided(date_resided)
        setFourPs(four_ps)
        setFourPsYear(fourPsYear)
        setPwd(disable)
        setDisabilityKind(disability_kind)
        setSoloParent(solo_parent)
        setIsVoter(is_voter)
        setRegion(region)
        setProvince(province)
        setCity(city)
        setCityDistrict(city_district)
        setBarangay(barangay)
        setStreet(street_name)
        setNumber(number)
        setPostal(postal)
        setUserImg(image)
        setDateRegistered(date_registered)
        setAge(age)
        setUserId(user_id)
        setValidId(valid_id)
        if (!openPopup) {
            setClick(false)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    const [click, setClick] = useState(false);
    const edit_resident = () => {
        setClick(true)
    }

    const refresh = () => {
        setSuccessDialog({
            ...successDialog,
            isOpen: false,
        })
        history.push("/")
    }

    const form = useRef();
    const send_email_confirm = (e) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        e.preventDefault();
        emailjs.sendForm('service_aqwlsrn', 'template_1m26mcc', form.current, 'user_fkY78MeKQHllD5wrTnSOv')
            .then((result) => {
            }, (error) => {
            });

        Axios.put("http://localhost:3001/InputCode", {
            verify_code: gg,
            verify_userId: userId,
        }).then((response) => {
            if (response.data.msg) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Verification Code Sent",
                    subtitle: response.data.msg + ` ${email}`,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            }
        })
    }

    const send_mail = (e) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Verify User',
            subtitle: 'By sending a verification code this will make a user verified.',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> Back </button>,
            yesButton: <button onClick={() => send_email_confirm(e)} className="alert_yesBtn"> Continue </button>,
        })
    }

    const save_changes_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.put("http://localhost:3001/UpdateRegisteredTable", {
            hh: household_head,
            hh_name: householdhead_name,
            rel_hh: relationshipToHousehold,
            f_name: first_name,
            m_name: middle_name,
            l_name: last_name,
            suffix: suffix === null ? "" : suffix,
            gender: gender,
            b_date: moment(birthdate).format('YYYY-MM-DD'),
            b_place: birthplace,
            contact: contact,
            email: email,
            c_status: civil_status,
            spouse: spouse_name,
            occup: occupation,
            d_resided: moment(date_resided).format('YYYY-MM-DD'),
            citizenship: nationality,
            f_ps: fourPs,
            disable: pwd,
            d_kind: disability_kind,
            isVoter: is_voter,
            s_parent: solo_parent,
            region: region,
            province: province,
            city: city,
            c_district: city_district,
            brgy: barangay,
            s_name: street,
            h_num: number,
            postal: postal,
            img: postImage,
            date_today: displaytodaysdate,
            user_id: userId
        }).then((response) => {
            if (response.data.msg) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Update Success!",
                    subtitle: `User Updated Successfully.`,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            } else {

            }
        })
    }

    const save_changes = () => {
        const email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const contact_format = /^(09|\+639)\d{9}$/;
        const numberOnly_format = /^\d+$/;
        const stringOnly_format = /^[a-zA-Z\s]*$/;

        if (!first_name || !last_name || !gender || !contact || !birthdate || !birthplace || !nationality || !civil_status || !occupation || !date_resided || !pwd || !is_voter || !solo_parent || !street || !number | !household_head) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (civil_status === "Married" && !spouse_name) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (fourPs === "Yes" && !fourPsYear) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (pwd === "Yes" && !disability_kind) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (household_head === "No" && !householdhead_name && !relationshipToHousehold) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!email_format.test(String(email).toLowerCase())) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Incorrect E-mail address format.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!contact_format.test(String(contact))) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Incorrect Contact Number format.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Name should contain letters only.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!numberOnly_format.test(String(postal))) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Incorrect value. Postal should be a number.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!stringOnly_format.test(String(nationality).toLowerCase())) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Nationality should contain letters only.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (!stringOnly_format.test(String(householdhead_name).toLowerCase())) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Household Head Name should contain leters only.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else {
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure you want to update information of this Resident?',
                subtitle: 'Please check all the information before updating.',
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> Back </button>,
                yesButton: <button onClick={() => save_changes_confirm()} className="alert_yesBtn"> Yes </button>,
            })
        }
    }

    const cancelManage = () => {
        setClick(false)
    }

    const [typeFile, setTypeFile] = useState("");


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const base64String = fileReader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");

                resolve(base64String);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const [isUploaded, setIsUploaded] = useState(true);
    const [postImage, setPostImage] = useState("")
    const handleFileUpload = async (e) => {
        if (!isUploaded) {
            const fsize = e.target.files[0].size;
            const file = Math.round(fsize / 1000);
            if (file >= 50000) {
                setErrorDialog({
                    isOpen: true,
                    title: "Input Error!",
                    subtitle: "File too Big, please select a file less than 50MB",
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
                const file = e.target.files[0];
                const base64 = await convertToBase64(file);
                setPostImage(base64);
                setIsUploaded(true);

                if (e.target.files && e.target.files[0]) {
                    setTypeFile(e.target.files[0].type);
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        setImage(e.target.result);
                        setIsUploaded(true);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            }
        } else {
            setImage(e.target.value);
        }
    };

    const [gg, setGG] = useState(makeid(5))

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    return (
        <div>
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <PopUp title="View / Edit" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl">
                <div className="resident_tbl_add_resident">
                    <div className="container">
                        <div className="row">
                            <div className="upper_profile">
                                <div className="MyProfile_img_container">
                                    <Container>
                                        <BoxUpload>
                                            <div className="image-upload">
                                                {!isUploaded ? (
                                                    <>
                                                        <label htmlFor="upload-input">
                                                            <img
                                                                src={FolderIcon}
                                                                draggable={"false"}
                                                                alt="placeholder"
                                                                style={{ width: 100, height: 100 }}

                                                            />
                                                            <p style={{ color: "#444" }}> Click to upload image </p>
                                                        </label>
                                                        <input
                                                            id="upload-input"
                                                            type="file"
                                                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                                            onChange={(e) => handleFileUpload(e)}
                                                        />
                                                    </>
                                                ) : (
                                                    <ImagePreview>
                                                        {click ? <img
                                                            className="close-icon"
                                                            src={CloseIcon}
                                                            alt="CloseIcon"
                                                            disabled={click ? "" : "disabled"}

                                                            onClick={() => {
                                                                setIsUploaded(false);
                                                                setImage(null);
                                                            }}
                                                        /> : ""}

                                                        {

                                                            userImg != null ? (
                                                                <img
                                                                    id="uploaded-image"
                                                                    src={
                                                                        `data:image/jpeg;base64,${Buffer.from(
                                                                            userImg
                                                                        )}`
                                                                    }
                                                                    draggable={false}
                                                                    alt="uploaded-img"


                                                                />
                                                            ) : (
                                                                <img
                                                                    id="uploaded-image"
                                                                    src={
                                                                        `data:image/jpeg;base64,${Buffer.from(postImage)}`
                                                                        // image
                                                                    }
                                                                    draggable={false}
                                                                    alt="uploaded-img"


                                                                />
                                                            )
                                                        }
                                                    </ImagePreview>
                                                )}
                                            </div>
                                        </BoxUpload>
                                    </Container>

                                </div>
                                <div className="MyProfile_fullname">
                                    <h1 className="FN">{last_name} {suffix === "" ? "" : suffix}</h1>
                                    <h1 className="FN">{first_name}</h1>
                                    <h1 className="FN">{middle_name}</h1>
                                    <h1 className="FN">{suffix}</h1>

                                    <span className="MyProfile_role">

                                    </span>
                                    <table className="MyProfile_table">
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add_new_resident_container">
                        <div className="wrapper" id="wrapper_profile">
                            <form ref={form} className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label>Household Head<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setHouseholdHead(e.target.value)} defaultValue={household_head}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {household_head === "No" ?
                                    <>
                                        {click ?
                                            <div className="input_fields">
                                                <label>Household Head Name:<span className="required_symbol">*</span> </label>
                                                <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setHouseholdHeadName(e.target.value)} defaultValue={householdhead_name} />
                                            </div>
                                            :
                                            <div className="input_fields">
                                                <label>Household Head Name:<span className="required_symbol">*</span> </label>
                                                <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setHouseholdHeadName(e.target.value)} defaultValue={householdhead_name} />
                                            </div>
                                        }
                                    </>
                                    : ""}
                                {household_head === "No" ?
                                    <div className="input_fields">
                                        <label>Relationship To Household:<span className="required_symbol">*</span> </label>
                                        <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setRelationshipToHousehold(e.target.value)} defaultValue={relationshipToHousehold} />
                                    </div>
                                    : ""}
                                <input type="text" className="inputs" hidden autoComplete="off" name="to_name" disabled={click ? "" : "disabled"} defaultValue={first_name} />
                                <input type="text" className="inputs" hidden autoComplete="off" name="message" disabled={click ? "" : "disabled"} defaultValue={gg} />
                                <div className="input_fields">
                                    <label> Last Name:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={last_name} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label > First Name:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" required disabled={click ? "" : "disabled"} defaultValue={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Middle Name:</label>
                                    <input type="text" className="inputs" required autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Suffix:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={suffix} onChange={(e) => setSuffix(e.target.value)} />
                                </div>
                                <div className="input_fields" >
                                    <label>Gender<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" defaultValue={gender} disabled={click ? "" : "disabled"} onChange={(e) => setGender(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                {click ? "" : <div className="input_fields">
                                    <label> Age:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={age} onChange={(e) => setAge(e.target.value)} />
                                </div>}


                                {click ?
                                    <div className="input_fields">
                                        <label> Date Of Birth:<span className="text-danger">*</span></label>
                                        <input type="date" className="inputs" defaultValue={moment(birthdate).format('YYYY-MM-DD')} autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setBirthdate(e.target.value)} />
                                    </div>
                                    :
                                    <div className="input_fields">
                                        <label>Date Of Birth:</label>
                                        <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={birthdate} /></p>
                                    </div>
                                }

                                <div className="input_fields">
                                    <label> Place Of Birth:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={birthplace} onChange={(e) => setBirthplace(e.target.value)} />
                                </div>

                                <div className="input_fields">
                                    <label> Contact:<span className="text-danger">*</span></label>
                                    <input type="text" maxLength="11" pattern="[1-9]{1}[0-9]{9}" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={contact} onChange={(e) => setContact(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> E-mail:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={email} onChange={(e) => setEmail(e.target.value)} name="email" />
                                </div>

                                <div className="input_fields" >
                                    <label>Civil Status<span className="required_symbol">*</span></label>
                                    <div className="custom_select" >
                                        <select className="inputs" autoComplete="off" defaultValue={civil_status} disabled={click ? "" : "disabled"} onChange={(e) => setCivilStatus(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Separated">Separated</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>
                                {civil_status === "Married" ?
                                    <div className="input_fields">
                                        <label> Spouse Name:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={spouse_name} onChange={(e) => setSpouseName(e.target.value)} />
                                    </div>

                                    : ""
                                }


                            </form>
                        </div>
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label> Occupation:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={occupation} onChange={(e) => setOccupation(e.target.value)} />
                                </div>
                                {click ? <div className="input_fields">
                                    <label> Date Resided in the Brgy:<span className="text-danger">*</span></label>
                                    <input type="date" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={moment(date_resided).format('YYYY-MM-DD')} onChange={(e) => setDateResided(e.target.value)} />
                                </div> : <div className="input_fields">
                                    <label>Date Resided in the Brgy:</label>
                                    <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_resided} /></p>
                                </div>}

                                <div className="input_fields">
                                    <label> Nationality:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={nationality} onChange={(e) => setNationality(e.target.value)} />
                                </div>

                                <div className="input_fields" >
                                    <label>PWD<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setPwd(e.target.value)} disabled={click ? "" : "disabled"} defaultValue={pwd} >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {pwd === "Yes" ?
                                    <div className="input_fields">
                                        <label> Disability Kind:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setDisabilityKind(e.target.value)} defaultValue={disability_kind} />
                                    </div>
                                    : ""}
                                <div className="input_fields" >
                                    <label>Is Voter<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setIsVoter(e.target.value)} disabled={click ? "" : "disabled"} defaultValue={is_voter}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields" >
                                    <label>Solo Parent<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setSoloParent(e.target.value)} disabled={click ? "" : "disabled"} defaultValue={solo_parent}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label>Street<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setStreet(e.target.value)} defaultValue={street} />
                                    </div>
                                </div>

                                <div className="input_fields">
                                    <label>House No.<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <input type="text" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} onChange={(e) => setNumber(e.target.value)} defaultValue={number} />
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label>Valid ID</label>
                                    <div className='image-validId2'>
                                        <Container>
                                            <div className="image-upload">
                                                <ImagePreview>
                                                    {
                                                        validId != null ? (
                                                            <img
                                                                id="uploaded-image"
                                                                src={
                                                                    `data:image/jpeg;base64,${Buffer.from(
                                                                        validId
                                                                    )}`
                                                                }
                                                                draggable={false}
                                                                alt="uploaded-img"
                                                                style={{ width: "350px", height: "200px" }}


                                                            />
                                                        ) : (
                                                            <img
                                                                id="uploaded-image"
                                                                src={
                                                                    `data:image/jpeg;base64,${Buffer.from(postImage)}`
                                                                    // image
                                                                }
                                                                draggable={false}
                                                                alt="uploaded-img"
                                                                style={{ width: "350px", height: "200px" }}

                                                            />
                                                        )
                                                    }
                                                </ImagePreview>
                                            </div>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add_resident_container_footer">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                {click ?
                                    <>

                                        <div className="input_fields" id="mobile_hidden" >
                                            <input type="submit" className="btn" value="Save Changes" onClick={save_changes} />
                                        </div>
                                        <div className="input_fields" id="mobile_hidden">
                                            <input type="submit" className="btn" value="Send Verification Code" onClick={send_mail} />
                                        </div>
                                        <div className="input_fields" id="mobile_hidden">
                                            <input type="submit" className="btn" value="Cancel Manage" onClick={cancelManage} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="input_fields" id="mobile_hidden">
                                            <input type="submit" value="Manage Resident" className="btn" onClick={edit_resident} />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp>
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessRegisterDialog successRegisterDialog={successRegisterDialog} setSuccessRegisterDialog={setSuccessRegisterDialog} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Grid item xs={12}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className={classes.tableRow}>
                                <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Middle Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Suffix</TableCell>
                                <TableCell className={classes.tableHeaderCell} id="resident_address" >Address</TableCell>
                                <TableCell className={classes.tableHeaderCell} id="resident_action" >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody} >
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow>
                                        <TableCell onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)} id="last_name">
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography className={classes.name}>{row.last_name}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography className={classes.name}>{row.first_name}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography className={classes.name}>{row.middle_name}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography className={classes.name}>{row.suffix}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell id="resident_address" onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)} className={classes.tableCell}> {row.number + " " + row.street_name}</TableCell>

                                        <TableCell className={classes.tableCell} id="resident_action"><button className="household_editBtn" onClick={() => openInPopup(row.household_head, row.householdhead_name, row.rel_to_household, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.contact, row.email, row.birthdate, row.birthplace, row.nationality, row.civil_status, row.spouse_name, row.occupation, row.date_resided, row.religion, row.four_ps, row.fourPsYear, row.disable, row.disability_kind, row.solo_parent, row.is_voter, row.region, row.province, row.city, row.city_district, row.barangay, row.postal, row.number, row.street_name, row.image, row.date_registered, row.age, row.user_id, row.valid_id)} >Edit</button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableFooter>
                            <TablePagination rowsPerPageOptions={[5, 10, 15]}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                className={classes.pagination}
                                component={"span"}
                            />
                        </TableFooter>
                    </Table>
                </Grid>
            </TableContainer>
        </div>
    )
}