import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
import Moment from 'react-moment'
import moment from 'moment';

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

export default function ArchivedTable({ data }) {
    Axios.defaults.withCredentials = true;
    const [viewEditDialog, setViewEditDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successDialog, setSuccesDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const history = useHistory()
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openPopup, setOpenPopup] = useState(false);
    const [resident_id, setResidentId] = useState("");
    const [pwd, setPwd] = useState("");
    const [householdhead_id, setHouseholdHeadId] = useState("");
    const [date_registered, setDateRegistered] = useState("");
    const [resImg, setResImg] = useState("")
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
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
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [occupation, setOccupation] = useState("");
    const [date_resided, setDateResided] = useState("");
    const [is_voter, setIsVoter] = useState("");
    const [solo_parent, setSoloParent] = useState("");
    const [relationshipToHousehold, setRelationshipToHousehold] = useState("");
    const [spouse, setSpouse] = useState("");
    const [age, setAge] = useState("")
    const [userId, setUserId] = useState("")

    const [householdHeadNameForArchived, setHouseholdHeadNameForArchived] = useState([])
    const [pwdDetails, setPwdDetails] = useState([])

    useEffect(() => {
        if (resident_id) {
            Axios.get(`http://localhost:3001/GetPwdDetailsForArchived/${resident_id}`).then((response) => {
                setPwdDetails(response.data);
            })
        }
    }, [resident_id])

    useEffect(() => {
        if (householdhead_id) {
            Axios.get(`http://localhost:3001/GetHouseholdHeadForArchived/${householdhead_id}`).then((response) => {
                setHouseholdHeadNameForArchived(response.data);
            })
        }
    }, [householdhead_id])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    function openInPopup(resident_id, householdHead_id, relationshipToHouseholdHead, user_id, first_name, middle_name, last_name, suffix, gender, birthdate, birthplace, contact, email, citizenship, civil_status, spouse_name, date_resided, pwd, solo_parent, voter, occupation, date_registered, image, household_head, date_updated, street, house_no, householdhead_id, age) {
        setOpenPopup(true);
        setResidentId(resident_id)
        setHouseholdHead(household_head)
        setHouseholdHeadId(householdhead_id)
        setRelationshipToHousehold(relationshipToHouseholdHead)
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setGender(gender)
        setContact(contact)
        setEmail(email)
        setBirthdate(birthdate)
        setBirthplace(birthplace)
        setNationality(citizenship)
        setCivilStatus(civil_status)
        setDateResided(date_resided)
        setPwd(pwd)
        setSoloParent(solo_parent)
        setIsVoter(voter)
        setOccupation(occupation)
        setStreet(street)
        setNumber(house_no)
        setDateRegistered(date_registered)
        setResImg(image)
        setAge(age)
        setUserId(user_id)
    }

    const [postImage, setPostImage] = useState("")

    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

    const refresh = () => {
        setSuccessRegisterDialog({
            ...successRegisterDialog,
            isOpen: false
        })
        history.push("/")
    }

    const recover_resident = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Recover Resident',
            subtitle: 'Are you sure you want recover this Resident Information? It will be move to its current Household Information and will grant access to its account.',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
            yesButton: <button onClick={() => recoverResident_confirm()} className="alert_yesBtn"> Yes </button>,
        })
    }

    const recoverResident_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.put("http://localhost:3001/restore_resident", {
            arch_residentId: resident_id,
            arch_dateToday: displaytodaysdate,
            arch_userId: userId,
        }).then((response) => {
            if (response.data.msg) {
                setSuccessRegisterDialog({
                    isOpen: true,
                    title: "Recover Resident",
                    subtitle: response.data.msg,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            } else if (response.data.msg2) {
                setSuccessRegisterDialog({
                    isOpen: true,
                    title: "Recover Resident",
                    subtitle: response.data.msg,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>,
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Something went wrong",
                    subtitle: 'Please check your connection and try again.',
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            }
        })
    }
    return (
        <div>
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccesDialog} />
            <PopUp title="View / Edit Resident" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl">
                <div className="resident_tbl_add_resident">
                    <div className="container">
                        <div className="row">
                            <div className="upper_profile">
                                <div className="MyProfile_img_container">
                                    <Container>
                                        <BoxUpload>
                                            <div className="image-upload">
                                                <ImagePreview>
                                                    {
                                                        resImg != null ? (
                                                            <img
                                                                id="uploaded-image"
                                                                src={

                                                                    `data:image/jpeg;base64,${Buffer.from(
                                                                        resImg
                                                                    )}`
                                                                }
                                                                draggable={false}
                                                                alt="uploaded-img"
                                                                className="img_content"

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
                                            </div>
                                        </BoxUpload>
                                    </Container>

                                </div>
                                <div className="MyProfile_fullname">
                                    <h1 className="FN">{first_name + " " + middle_name + " " + last_name + " " + suffix}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add_new_resident_container">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label>Household Head<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" autoComplete="off" disabled onChange={(e) => setHouseholdHead(e.target.value)} defaultValue={household_head}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {household_head === "No" ?
                                    <>
                                        {
                                            householdHeadNameForArchived.map((row) => (
                                                <div className="input_fields">
                                                    <label>Household Head Name:<span className="required_symbol">*</span> </label>
                                                    <input type="text" className="inputs" autoComplete="off" disabled defaultValue={row.householdHead_name} />
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    ""
                                }
                                {household_head === "No" ?
                                    <div className="input_fields">
                                        <label>Relationship To Household:<span className="required_symbol">*</span> </label>
                                        <input type="text" className="inputs" autoComplete="off" disabled onChange={(e) => setRelationshipToHousehold(e.target.value)} defaultValue={relationshipToHousehold} />
                                    </div>
                                    : ""}
                                <div className="input_fields">
                                    <label> Last Name:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={last_name} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label > First Name:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" required disabled defaultValue={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Middle Name:</label>
                                    <input type="text" className="inputs" required autoComplete="off" disabled defaultValue={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Suffix:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled defaultValue={suffix} onChange={(e) => setSuffix(e.target.value)} />
                                </div>
                                <div className="input_fields" >
                                    <label>Gender<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" defaultValue={gender} disabled onChange={(e) => setGender(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label> Age:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled defaultValue={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label>Date Of Birth: </label>
                                    <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={birthdate} /></p>

                                </div>
                                <div className="input_fields">
                                    <label> Place Of Birth:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" disabled defaultValue={birthplace} onChange={(e) => setBirthplace(e.target.value)} />
                                </div>

                                <div className="input_fields">
                                    <label> Contact:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={contact} onChange={(e) => setContact(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> E-mail:</label>
                                    <input type="text" className="inputs" autoComplete="off" disabled defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="input_fields" >
                                    <label>Civil Status<span className="required_symbol">*</span></label>
                                    <div className="custom_select" >
                                        <select className="inputs" autoComplete="off" defaultValue={civil_status} disabled onChange={(e) => setCivilStatus(e.target.value)} >
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
                                        <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={spouse} onChange={(e) => setSpouse(e.target.value)} />
                                    </div>

                                    : ""
                                }

                            </div>
                        </div>
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label> Occupation:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={occupation} onChange={(e) => setOccupation(e.target.value)} />
                                </div>

                                <div className="input_fields">
                                    <label>Date Resided in the Brgy:</label>
                                    <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_resided} /></p>
                                </div>

                                <div className="input_fields">
                                    <label> Nationality:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={nationality} onChange={(e) => setNationality(e.target.value)} />
                                </div>

                                <div className="input_fields" >
                                    <label>PWD<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setPwd(e.target.value)} disabled defaultValue={pwd} >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {pwd === "Yes" ?
                                    <>
                                        {pwdDetails.map((row) => (
                                            <div className="input_fields">
                                                <label> Disability Kind:<span className="text-danger">*</span></label>
                                                <input type="text" required className="inputs" autoComplete="off" disabled defaultValue={row.disability_kind} />
                                            </div>
                                        ))}
                                    </>
                                    : ""}
                                <div className="input_fields" >
                                    <label>Is Voter<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setIsVoter(e.target.value)} disabled defaultValue={is_voter}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields" >
                                    <label>Solo Parent<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => setSoloParent(e.target.value)} disabled defaultValue={solo_parent}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input_fields">
                                    <label>Street<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <input type="text" className="inputs" autoComplete="off" disabled onChange={(e) => setStreet(e.target.value)} defaultValue={street} />
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label>House No.<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <input type="text" className="inputs" autoComplete="off" disabled onChange={(e) => setNumber(e.target.value)} defaultValue={number} />
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label>Date Registered: </label>
                                    <p className="inputs"><Moment format={"MMMM DD, YYYY"} date={date_registered} /></p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recover_btn_container">
                        <div className="input_fields" id="mobile_hidden">
                            <input type="submit" value="Recover Resident" className="btn" onClick={recover_resident} />
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
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow>
                                        <TableCell key={index[0]} onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)} id="last_name">
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography className={classes.name} key={index[1]}>{row.last_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell key={index[2]} onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography key={index[3]} className={classes.name}>{row.first_name}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell key={index[4]} onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography key={index[5]} className={classes.name}>{row.middle_name}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)}>
                                            <Grid container>
                                                <Grid item lg={10} >
                                                    <Typography key={index[6]} className={classes.name}>{row.suffix}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell id="resident_address" key={index[7]} onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)} className={classes.tableCell}> {row.house_no + " " + row.street}</TableCell>

                                        <TableCell key={index[8]} className={classes.tableCell} id="resident_action"><button className="household_editBtn" onClick={() => openInPopup(row.resident_id, row.householdHead_id, row.relationshipToHouseholdHead, row.user_id, row.first_name, row.middle_name, row.last_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.contact, row.email, row.citizenship, row.civil_status, row.spouse_name, row.date_resided, row.pwd, row.solo_parent, row.voter, row.occupation, row.date_registered, row.image, row.household_head, row.date_updated, row.street, row.house_no, row.householdhead_id, row.age)} >Edit</button>
                                        </TableCell>
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
        </div >
    )
}