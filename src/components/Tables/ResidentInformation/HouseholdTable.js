import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import './HouseholdTable.css'
import Axios from 'axios';
import ViewEditDialog from '../../Dialog/ViewEditDialog'
import ConfirmDialog from '../../Dialog/ConfirmDialog'
import LoginAuthPop from '../../Dialog/LoginAuthPop';
import SuccessDialog from '../../Dialog/SuccessDialog';
import SuccessRegisterDialog from '../../Dialog/SuccessRegisterDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopUp from '../../Dialog/PopUp';
import PopUp2 from '../../Dialog/PopUp2';
import PopUp3 from '../../Dialog/PopUp3'
import PopUp4 from '../../Dialog/PopUp4';
import Moment from 'react-moment'
import moment from 'moment'
import { saveAs } from 'file-saver';
import { Container, BoxUpload, ImagePreview } from "../../Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
import PopUp5 from '../../Dialog/PopUp5';

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
        fontSize: "15px",
        width: "30%"
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

const HouseholdTable = ({ data }) => {
    Axios.defaults.withCredentials = true;
    const history = useHistory()
    const classes = useStyles();

    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

    const [viewEditDialog, setViewEditDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successRegisterDialog, setSuccessRegisterDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', noButton: '' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [openPopup3, setOpenPopup3] = useState(false);
    const [openPopup4, setOpenPopup4] = useState(false);
    const [openPopup5, setOpenPopup5] = useState(false);
    const [household_id, setHouseholdId] = useState("");
    const [householdRecord, setHouseholdRecord] = useState([]);
    const [individualRecord, setIndividualRecord] = useState([])
    const [barangayInfo, setBrgyInfo] = useState([])
    const [householdList, setHouseholdList] = useState([])
    const [click, setClick] = useState(false);

    const [s, setSearch] = useState("");
    const updatePokeDex = (poke, poke2) => {
        setSearch(poke);
        setHouseholdId(poke2)
        setDisplay(false);
    };

    const [houseSearch, setHouseSearch] = useState("")
    const updatePokeDex2 = (poke3, poke4) => {
        setHouseSearch(poke3);
        setHouseholdId(poke4)
        setDisplay2(false);
    };

    const [houseNoList, setHouseNoList] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    const refresh = () => {
        setSuccessDialog({
            ...successDialog,
            isOpen: false
        })
        history.push("/")
    }
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            setHouseNoList(null)
        } else {
            isMounted.current = true
        }
    }, [])

    useEffect(() => {
        async function fetchHouseholdList() {
            if (s) {
                await Axios.get(`http://localhost:3001/GetHouseholdList/${s}`).then((response) => {
                    setHouseholdList(response.data.result);
                    setHouseNoList(response.data.result2);
                })
            }
            return () => { }
        }
        fetchHouseholdList()
    }, [s])

    const [hhNum, setHHNum] = useState("")

    function openInPopup(hh_id) {
        setHouseholdId(hh_id)
        Axios.get(`http://localhost:3001/GetRecordsByHousehold/${hh_id}`).then((response) => {
            setHouseholdRecord(response.data)
            setHHNum(response.data[0].household_number)

        }, []);
        Axios.get(`http://localhost:3001/GetBarangayHouseholdInfo/${hh_id}`).then((response) => {
            setBrgyInfo(response.data);
        }, [])
        setOpenPopup(true)
        if (openInPopup) {
            setClick(false)
        }
    }

    const [householdInfo, setHouseholdInfo] = useState([])

    function openInPopup2(hh_id) {
        setOpenPopup2(true)
        Axios.get(`http://localhost:3001/GetHouseholdInfo/${hh_id}`).then((response) => {
            setHouseholdInfo(response.data)
        }, [])
        if (openInPopup2) {
            setClick(false)
        }
    }


    function openInPopup3(res_id) {
        Axios.get(`http://localhost:3001/GetRecordsByIndividual/${res_id}`).then((response) => {
            setIndividualRecord(response.data)
        }, []);
        setOpenPopup3(true)
        if (openInPopup3) {
            setClick(false)
        }
    }


    function openInPopup4() {
        setOpenPopup4(true)
        if (openInPopup4) {
            setClick(false)
        }
    }

    const [moveHhId, setMoveHhId] = useState("")

    function openInPopup5(ResId, hhHead, hhId) {
        setOpenPopup5(true)
        setResidentId(ResId)
        setHouseholdHead(hhHead)
        setMoveHhId(hhId)
    }

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

    const [, setImage] = useState("");
    const resImg = ""
    const [, setTypeFile] = useState("");
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

    const [display, setDisplay] = useState(false);
    const wrapperRef = useRef(null);


    const [display2, setDisplay2] = useState(false);
    const wrapperRef2 = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };


    //states for update resident
    const [upFName, setFirstName] = useState("");
    const [upMName, setMiddleName] = useState("");
    const [upLName, setLastName] = useState("");
    const [upSuffix, setSuffix] = useState("");
    const [upPwd, setPwd] = useState("")
    const [upRId, setResidentId] = useState("")
    const [upStreet, setStreet] = useState("");
    const [upHouseNo, setHouseNo] = useState("");
    const [upHouseholdHead, setHouseholdHead] = useState("");
    const [upContact, setContact] = useState("");
    const [upEmail, setEmail] = useState("");
    const [upBirthdate, setBirthdate] = useState("");
    const [upBirthplace, setBirthplace] = useState("");
    const [upCivilStatus, setCivilStatus] = useState("");
    const [upGender, setGender] = useState("");
    const [upNationality, setNationality] = useState("");
    const [upOccupation, setOccupation] = useState("");
    const [upDateResided, setDateResided] = useState("");
    const [upDisabilityKind, setDisabilityKind] = useState("");
    const [upVoter, setIsVoter] = useState("");
    const [upSoloParent, setSoloParent] = useState("");
    const [upRelToHousehold, setRelationshipToHousehold] = useState("");
    const [upSpouse, setSpouse] = useState("");
    const [upAge, setAge] = useState("");

    //states for add resident
    const [add_householdHead, add_setHouseholdHead] = useState("")
    const [add_relationshipToHousehold, add_setRelationshipToHousehold] = useState("")
    const [add_fName, add_setFName] = useState("")
    const [add_mName, add_setMName] = useState("")
    const [add_lName, add_setLName] = useState("")
    const [add_suffix, add_setSuffix] = useState("")
    const [add_gender, add_setGender] = useState("")
    const [add_dob, add_setDob] = useState("")
    const [add_pob, add_setPob] = useState("")
    const [add_contact, add_setContact] = useState("")
    const [add_email, add_setEmail] = useState("")
    const [add_civilStatus, add_setCivilStatus] = useState("")
    const [add_spouseName, add_setSpouseName] = useState("")
    const [add_occupation, add_setOccupation] = useState("")
    const [add_yearsResided, add_setYearsResided] = useState("")
    const [add_religion, add_setReligion] = useState("")
    const [add_citizenship, add_setCitizenship] = useState("")
    const [add_pwd, add_setPwd] = useState("")
    const [add_disabilityKind, add_setDisabilityKind] = useState("")
    const [add_pwdDate, add_setPwdDate] = useState("")
    const [add_pwdId, add_setPwdId] = useState("")
    const [add_isVoter, add_setIsVoter] = useState("")
    const [add_soloParent, add_setSoloParent] = useState("")
    const [add_image, add_setImage] = useState("")

    const add_resident = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Confirmation',
            subtitle: 'Are you sure you want to add Resident to this Household?',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
            yesButton: <button onClick={() => add_resident_confirm()} className="alert_yesBtn"> Yes </button>,
        })
    }

    const add_resident_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        Axios.post("http://localhost:3001/AddResidentByHousehold", {
            hh_id: household_id,
            hh_head: add_householdHead,
            relToHH: add_relationshipToHousehold,
            l_name: add_lName,
            f_name: add_fName,
            m_name: add_mName,
            suffix: add_suffix,
            contactNo: add_contact,
            email: add_email,
            b_place: add_pob,
            b_date: add_dob,
            sex: add_gender,
            c_status: add_civilStatus,
            yearsResided: add_yearsResided,
            spouseName: add_spouseName,
            citizenship: add_citizenship,
            occup: add_occupation,
            religion: add_religion,
            pwd: add_pwd,
            pwdKind: add_disabilityKind,
            isVoter: add_isVoter,
            soloParent: add_soloParent,
            image: add_image,
            dateToday: displaytodaysdate
        }).then((response) => {
            if (response.data.msg1) {
                setErrorDialog({
                    isOpen: true,
                    title: "Add Resident Failed.",
                    subtitle: response.data.msg1,
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else if (response.data.success) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Add Resident",
                    subtitle: response.data.success,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else if (response.data.success2) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Add Resident",
                    subtitle: response.data.success2,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
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

    const update_residentInfo = (ResId, last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, email, civil_status, spouse_name, contact, occupation, date_resided, religion, citizenship, pwd, solo_parent, voter, disability_kind, relToHH) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Update Resident',
            subtitle: 'Are you sure you want to update information of this resident?',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
            yesButton: <button onClick={() => update_residentInfo_confirm(ResId, last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, email, civil_status, spouse_name, contact, occupation, date_resided, religion, citizenship, pwd, solo_parent, voter, disability_kind, relToHH)} className="alert_yesBtn"> Yes </button>,
        })

    }

    const update_residentInfo_confirm = (ResId, last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, email, civil_status, spouse_name, contact, occupation, date_resided, religion, citizenship, pwd, solo_parent, voter, disability_kind, relToHH) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/UpdateIndividualResidentInfo", {
            up_fName: !upFName ? first_name : upFName,
            up_mName: !upMName ? middle_name : upMName,
            up_lName: !upLName ? last_name : upLName,
            up_suffix: !upSuffix ? suffix : upSuffix,
            up_contact: !upContact ? contact : upContact,
            up_gender: !upGender ? gender : upGender,
            up_email: !upEmail ? email : upEmail,
            up_birthdate: !upBirthdate ? moment(birthdate).format('YYYY-MM-DD') : moment(upBirthdate).format('YYYY-MM-DD'),
            up_birthplace: !upBirthplace ? birthplace : upBirthplace,
            up_citizenship: !upNationality ? citizenship : upNationality,
            up_civilStatus: !upCivilStatus ? civil_status : upCivilStatus,
            up_occupation: !upOccupation ? occupation : upOccupation,
            up_pwd: !upPwd ? pwd : upPwd,
            up_dateResided: !upDateResided ? moment(date_resided).format('YYYY-MM-DD') : moment(upDateResided).format('YYYY-MM-DD'),
            up_disabilityKind: !upDisabilityKind ? disability_kind : upDisabilityKind,
            up_soloParent: !upSoloParent ? solo_parent : upSoloParent,
            up_relToHousehold: !upRelToHousehold ? relToHH : upRelToHousehold,
            up_spouse: !upSpouse ? spouse_name : upSpouse,
            up_isVoter: !upVoter ? voter : upVoter,
            up_residentId: ResId,
            up_dateToday: displaytodaysdate,
        }).then((response) => {
            if (response.data.err) {
                setErrorDialog({
                    isOpen: true,
                    title: "Update Failed.",
                    subtitle: response.data.err + " Please contact your administrator.",
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else if (response.data.success) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Update Success.",
                    subtitle: response.data.msg1Successfull,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Connection Error",
                    subtitle: "Please check your connection and try again.",
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            }
        });
    }

    const makeHouseholdhead_confirm = (ResId, HhId) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Set Household Head',
            subtitle: 'The existing household head will be replaced. Are you sure you want to continue setting this as Household Head?',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
            yesButton: <button onClick={() => makeHouseholdHead(ResId, HhId)} className="alert_yesBtn"> Yes </button>,
        })
    }

    const makeHouseholdHead = (ResId, HhId) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/MakeHouseholdHead", {
            hhh_ResId: ResId,
            hhh_HhId: HhId,
            hhh_relToHousehold: !upRelToHousehold ? "Family Member" : upRelToHousehold,
            hhh_dateToday: displaytodaysdate,
        }).then((response) => {
            if (response.data.msg1) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Update Success!",
                    subtitle: "Household head changed successfully.",
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Connection Error",
                    subtitle: "Please check your connection and try again",
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            }
        })
    }

    const move_resident = () => {
        if (!s || !houseSearch) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error.",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else if (upHouseholdHead === "Yes") {
            setErrorDialog({
                isOpen: true,
                title: "Move Failed.",
                subtitle: "This is the current household head. Please assign first a new household head before moving this resident.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else {
            setConfirmDialog({
                isOpen: true,
                title: 'Move Resident',
                subtitle: 'Are you sure you want move this resident to new household?',
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
                yesButton: <button onClick={() => move_resident_confirm()} className="alert_yesBtn"> Yes </button>,
            })
        }
    }

    const move_resident_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/MoveResidentToHousehold", {
            moveRes_resId: upRId,
            moveRes_street: s,
            moveRes_houseNo: houseSearch,
            moveRes_hhHead: upHouseholdHead,
            moveRes_dateToday: displaytodaysdate,
            moveRes_hhId: moveHhId,
        }).then((response) => {
            if (response.data.msg5) {
                setErrorDialog({
                    isOpen: true,
                    title: "Move Failed.",
                    subtitle: response.data.msg5,
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else if (response.data.msg6) {
                setConfirmDialog({
                    isOpen: true,
                    title: 'Move Resident',
                    subtitle: response.data.msg6 + ' Are you sure you want move this resident to new household?',
                    noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
                    yesButton: <button onClick={() => move_resident_as_HHH()} className="alert_yesBtn"> Yes </button>,
                })
            } else if (response.data.msg3) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Resident Moved Successfully!",
                    subtitle: "",
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else if (response.data.msg9) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Resident Moved Successfully!",
                    subtitle: "",
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else {
                setSuccessDialog({
                    isOpen: true,
                    title: "Resident Moved Successfully!",
                    subtitle: "",
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            }
        })
    }

    const move_resident_as_HHH = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/MoveResidentAsHouseholdHead", {
            moveResHHH_resId: upRId,
            moveResHHH_street: s,
            moveResHHH_houseNo: houseSearch,
            moveResHHH_hhHead: upHouseholdHead,
            moveResHHH_dateToday: displaytodaysdate,
            moveResHHH_hhId: moveHhId,
        }).then((response) => {
            if (response.data.msg1) {
                setSuccessDialog({
                    isOpen: true,
                    title: "Moved Successfully!",
                    subtitle: response.data.msg1,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Move Failed.",
                    subtitle: "Something went wrong.",
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            }
        })
    }

    const archive_residentInfo = (ResId) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Archive Resident',
            subtitle: 'Are you sure you want to Archive this Resident? It will be remove from this Household and it will lose its Resident Access in the user account.',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
            yesButton: <button onClick={() => archive_residentInfo_confirm(ResId)} className="alert_yesBtn"> Yes </button>,
        })
    }

    const archive_residentInfo_confirm = (ResId) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/ArchiveResidentByHousehold", {
            arch_resId: ResId,
        }).then((response) => {
            if (response.data.message) {
                setErrorDialog({
                    isOpen: true,
                    title: "Archive Resident Failed",
                    subtitle: response.data.message,
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else if (response.data.message2) {
                setSuccessDialog({
                    isOpen: true,
                    title: 'Archive Resident',
                    subtitle: response.data.message2,
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            } else {
                setErrorDialog({
                    isOpen: true,
                    title: "Connection Error",
                    subtitle: 'Please check your connection and try again.',
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            }
        })
    }

    const [streetName, setStreetName] = useState("")
    const [houseNumber, setHouseNumber] = useState("")

    const edit_householdInfo = (hh_id) => {
        if (!streetName || !houseNumber) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Required fields must not be empty.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else {
            setConfirmDialog({
                isOpen: true,
                title: 'Update Household',
                subtitle: 'Are you sure you want to update the household information?',
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">Back</button>,
                yesButton: <button onClick={() => edit_householdInfo_confirm(hh_id)} className="alert_yesBtn"> Yes </button>,
            })
        }
    }

    const edit_householdInfo_confirm = (hh_id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/UpdateHouseholdInfo", {
            up_hhId: hh_id,
            up_streetName: streetName,
            up_houseNumber: houseNumber
        }).then((response) => {
            if (response.data.errorMessage) {
                setErrorDialog({
                    isOpen: true,
                    title: "Update Error",
                    subtitle: response.data.errorMessage,
                    noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
                })
            } else {
                setSuccessDialog({
                    isOpen: true,
                    title: "Household Updated!",
                    subtitle: "",
                    noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>
                })
            }
        })
    }

    const activate_btn = () => {
        setClick(true)
    }

    const deactivate_btn = () => {
        setClick(false)
    }

    const download_report_confirm = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Generate Report By Household?',
            subtitle: 'Are you sure you want to Generate report?',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>,
            yesButton: <button onClick={() => download_report_household()} className="alert_yesBtn"> Yes </button>,
        })
    }

    const download_report_household = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/create-pdf-byHousehold", {
            household_report: householdRecord,
            hhnumber: hhNum,
        }).then(() => Axios.get("http://localhost:3001/fetch-pdf-byHousehold", { responseType: 'blob' })).then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            saveAs(pdfBlob, `HouseholdRecord-List.pdf`);
        })
        setSuccessDialog({
            isOpen: true,
            title: "Report Generated!",
            subtitle: `Please wait for a few seconds, the report will automatically download.`,
            noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>,
        })
    }

    const dl_indv_rep = (last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, civil_status, contact, occupation, citizenship, household_number, street, house_no) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Generate Report By Household?',
            subtitle: 'Are you sure you want to Generate report?',
            noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn"> No </button>,
            yesButton: <button onClick={() => dl_indv_rep_conf(last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, civil_status, contact, occupation, citizenship, household_number, street, house_no)} className="alert_yesBtn"> Yes </button>,
        })
    }

    const dl_indv_rep_conf = (last_name, first_name, middle_name, suffix, gender, birthdate, birthplace, civil_status, contact, occupation, citizenship, household_number, street, house_no) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        Axios.post("http://localhost:3001/create-pdf-individualRecord", {
            l_name: last_name,
            f_name: first_name,
            m_name: middle_name,
            suffix: suffix,
            house_no: house_no,
            street_name: street,
            zone: "42",
            b_place: birthplace,
            b_date: moment(birthdate).format('LL'),
            sex: gender,
            c_status: civil_status,
            citizenship: citizenship,
            occup: occupation,
            add_region: "National Capital Region",
            add_prov: "NCR, First District",
            add_city: "City Of Manila",
            add_brgy: "Barangay 407",
            hh_num: household_number,
        }).then(() => Axios.get("http://localhost:3001/fetch-pdf-individualRecord", { responseType: 'blob' })).then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            saveAs(pdfBlob, `IndividualRecord-List.pdf`);
        })
        setSuccessDialog({
            isOpen: true,
            title: "Report Generated!",
            subtitle: `Please wait for a few seconds, the report will automatically download.`,
            noButton: <button onClick={() => setSuccessDialog({ ...successDialog, isOpen: false })} className="alert_backBtn">Back</button>,
        })
    }

    const [hhNumber, setHHNumber] = useState("")

    return (
        <div>
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
            <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <SuccessRegisterDialog successRegisterDialog={successRegisterDialog} setSuccessRegisterDialog={setSuccessRegisterDialog} />
            <PopUp title="View / Edit Household" openPopup={openPopup} setOpenPopup={setOpenPopup} maxWidth="xl">
                <div className='view_edit_household_container'>
                    <div className='view_edit_household_title'>
                        <h1>Record of Barangay Inhabitants by Household</h1>
                    </div>
                    <div className='sample-1'>
                        <table className='view_edit_household_upperTable'>
                            <tbody>
                                {barangayInfo.map((row) => (
                                    <>
                                        <tr>
                                            <td>Region:</td>
                                            <td>{row.brgy_region}</td>
                                        </tr>
                                        <tr>
                                            <td>Province:</td>
                                            <td>{row.brgy_province}</td>
                                        </tr>
                                        <tr>
                                            <td>City/Municipality:</td>
                                            <td>{row.brgy_city}</td>
                                        </tr>
                                        <tr>
                                            <td>Barangay:</td>
                                            <td>{row.brgy_barangay}</td>
                                        </tr>
                                        <tr>
                                            <td>Household No:</td>
                                            <td>{row.household_number}</td>
                                        </tr>
                                    </>
                                ))}

                            </tbody>
                        </table>

                    </div>
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
                                <th>Relationship to Household Head</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {householdRecord.map((row) => (
                                <tr style={row.household_head === "Yes" ? { background: "#BDD2B6" } : { background: "White" }}>
                                    <td data-aria-label='Last Name'>{row.last_name}</td>
                                    <td data-aria-label='First Name'>{row.first_name}</td>
                                    <td data-aria-label='Middle Name'>{row.middle_name}</td>
                                    <td data-aria-label='Ext'>{row.suffix}</td>
                                    <td data-aria-label='No.'>{row.house_no}</td>
                                    <td data-aria-label='Street Name'>{row.street}</td>
                                    <td data-aria-label='Birth Place'>{row.birthplace}</td>
                                    <td data-aria-label='Birth Date'><Moment format={"MMMM DD, YYYY"} date={row.birthdate} /></td>
                                    <td data-aria-label='Sex'>{row.gender}</td>
                                    <td data-aria-label='Civil Status'>{row.civil_status}</td>
                                    <td data-aria-label='Citizenship'>{row.citizenship}</td>
                                    <td data-aria-label='Occupation'>{row.occupation}</td>
                                    <td data-aria-label='Relationship to Household Head'>{row.household_head === "Yes" ? "Head of the Family" : "Family Member"}</td>
                                    <td data-aria-label='Occupation'><button className='household_tbl_btn' onClick={() => openInPopup3(row.resident_id)}>View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='add_resident_btn'>
                        <button onClick={() => openInPopup4(household_id)}>Add Resident</button>
                    </div>
                    <div className='add_resident_btn'>
                        <button onClick={() => download_report_confirm()}>Download Report</button>
                    </div>
                </div>

            </PopUp >
            <PopUp2 title="View / Edit Household Information" openPopup2={openPopup2} setOpenPopup2={setOpenPopup2} maxWidth="xl">
                <div className="add_new_resident_container">
                    <div className="wrapper" id="wrapper_profile">
                        <div className="forms" id="inputfields_profile">
                            {householdInfo.map((row) => (
                                <>
                                    {click ? <>
                                        <div className="input_fields">
                                            <label> Street Name:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" defaultValue="" onChange={(e) => setStreetName(e.target.value)} />
                                        </div>
                                        <div className="input_fields">
                                            <label > House No:<span className="text-danger">*</span></label>
                                            <input type="text" className="inputs" autoComplete="off" required defaultValue="" onChange={(e) => setHouseNumber(e.target.value)} />
                                        </div>
                                    </> :
                                        <>
                                            <div className="input_fields">
                                                <label> Street Name:<span className="text-danger">*</span></label>
                                                <input type="text" required className="inputs" autoComplete="off" value={row.street} disabled
                                                />
                                            </div>
                                            <div className="input_fields">
                                                <label > House No:<span className="text-danger">*</span></label>
                                                <input type="text" className="inputs" autoComplete="off" required value={row.house_no} disabled
                                                />
                                            </div>
                                        </>}

                                </>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="add_resident_container_footer">
                    <div className="wrapper" id="wrapper_profile">
                        <div className="forms" id="inputfields_profile">
                            {click ?
                                <>
                                    {householdInfo.map((row) => (
                                        <div className="input_fields" id="mobile_hidden">
                                            <input type="submit" className="editProfile_btn" value="Save Changes" onClick={() => edit_householdInfo(row.household_id)} />
                                        </div>
                                    ))}

                                    <div className="input_fields" id="mobile_hidden">
                                        <input type="submit" className="editProfile_btn" value="Cancel Edit" onClick={deactivate_btn} />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="input_fields" id="mobile_hidden">
                                        <input type="submit" value="Edit" className="btn" onClick={activate_btn} />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </PopUp2>
            <PopUp3 title="View / Edit Resident" openPopup3={openPopup3} setOpenPopup3={setOpenPopup3} maxWidth="xl">
                {individualRecord.map((row) => (
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
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        id="uploaded-image"
                                                                        src={
                                                                            `data:image/jpeg;base64,${Buffer.from(postImage)}`
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
                                        <h1 className="FN">{row.first_name + " " + row.middle_name + " " + row.last_name + " " + row.suffix}</h1>
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
                                            <select className="inputs" autoComplete="off" value={row.household_head} onChange={(e) => setHouseholdHead(e.target.value)} disabled>
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    {row.household_head === "No" ?
                                        <>
                                            {click ? <div className="input_fields">
                                                <label>Relationship To Household:<span className="required_symbol">*</span> </label>
                                                <input type="text" className="inputs" autoComplete="off" onChange={(e) => setRelationshipToHousehold(e.target.value)} defaultValue={row.relationshipToHouseholdHead} />
                                            </div> : <div className="input_fields">
                                                <label>Relationship To Household:<span className="required_symbol">*</span> </label>
                                                <input type="text" className="inputs" autoComplete="off" disabled value="Family Member" />
                                            </div>}
                                        </>
                                        :
                                        ""}
                                    <div className="input_fields">
                                        <label> Last Name:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={row.last_name} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="input_fields">
                                        <label > First Name:<span className="text-danger">*</span></label>
                                        <input type="text" className="inputs" autoComplete="off" required disabled={click ? "" : "disabled"} defaultValue={row.first_name} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>

                                    <div className="input_fields">
                                        <label> Middle Name:</label>
                                        <input type="text" className="inputs" required autoComplete="off" defaultValue={row.middle_name} disabled={click ? "" : "disabled"} onChange={(e) => setMiddleName(e.target.value)} />

                                    </div>

                                    <div className="input_fields">
                                        <label> Suffix:</label>
                                        <input type="text" className="inputs" autoComplete="off" defaultValue={row.suffix} disabled={click ? "" : "disabled"} onChange={(e) => setSuffix(e.target.value)} />

                                    </div>
                                    <div className="input_fields" >
                                        <label>Gender<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <select className="inputs" defaultValue={row.gender} disabled={click ? "" : "disabled"} onChange={(e) => setGender(e.target.value)} >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    {click ? "" : <div className="input_fields">
                                        <label> Age:</label>
                                        <input type="text" className="inputs" autoComplete="off" disabled value={row.age} onChange={(e) => setAge(e.target.value)} />
                                    </div>}

                                    {click ?
                                        <div className="input_fields">
                                            <label> Date Of Birth:<span className="text-danger">*</span></label>
                                            <input type="date" className="inputs" autoComplete="off" disabled={click ? "" : "disabled"} defaultValue={moment(row.birthdate).format('YYYY-MM-DD')} onChange={(e) => setBirthdate(e.target.value)} />
                                        </div>
                                        :
                                        <div className="input_fields">
                                            <label> Date Of Birth:<span className="text-danger">*</span></label>
                                            <Moment format={"MMMM DD, YYYY"} date={row.birthdate} className="inputs" />
                                        </div>
                                    }

                                    <div className="input_fields">
                                        <label> Place Of Birth:<span className="text-danger">*</span></label>
                                        <input type="text" className="inputs" autoComplete="off" defaultValue={row.birthplace} disabled={click ? "" : "disabled"} onChange={(e) => setBirthplace(e.target.value)} />

                                    </div>



                                    <div className="input_fields" >
                                        <label>Civil Status<span className="required_symbol">*</span></label>
                                        <div className="custom_select" >
                                            <select className="inputs" autoComplete="off" defaultValue={row.civil_status} disabled={click ? "" : "disabled"} onChange={(e) => setCivilStatus(e.target.value)} >
                                                <option value="">Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                            </select>

                                        </div>
                                    </div>

                                    {row.civil_status === "Married" || upCivilStatus === "Married" ?
                                        <div className="input_fields">
                                            <label> Spouse Name:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" defaultValue={row.spouse_name} disabled={click ? "" : "disabled"} onChange={(e) => setSpouse(e.target.value)} />

                                        </div>
                                        : ""
                                    }

                                </div>
                            </div>
                            {/* Second Portion */}
                            <div className="wrapper" id="wrapper_profile">
                                <div className="forms" id="inputfields_profile">
                                    <div className="input_fields">
                                        <label> Contact:<span className="text-danger">*</span></label>
                                        <input type="text" maxLength="11" pattern="[1-9]{1}[0-9]{9}" required className="inputs" autoComplete="off" defaultValue={row.contact} disabled={click ? "" : "disabled"} onChange={(e) => setContact(e.target.value)} />

                                    </div>

                                    <div className="input_fields">
                                        <label> Occupation:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" defaultValue={row.occupation} disabled={click ? "" : "disabled"} onChange={(e) => setOccupation(e.target.value)} />

                                    </div>
                                    {click ? <div className="input_fields">
                                        <label> Date Resided in the Brgy:<span className="text-danger">*</span></label>
                                        <input type="date" required className="inputs" autoComplete="off" defaultValue={moment(row.date_resided).format('YYYY-MM-DD')} onChange={(e) => setDateResided(e.target.value)} disabled={click ? "" : "disabled"} />
                                    </div> : <div className="input_fields">
                                        <label> Date Resided in the Brgy:<span className="text-danger">*</span></label>
                                        <Moment format={"MMMM DD, YYYY"} date={row.date_resided} className="inputs" />
                                    </div>}
                                    <div className="input_fields">
                                        <label> Nationality:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" defaultValue={row.citizenship} disabled={click ? "" : "disabled"} onChange={(e) => setNationality(e.target.value)} />

                                    </div>
                                    <div className="input_fields" >
                                        <label>PWD<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <select className="inputs" onChange={(e) => setPwd(e.target.value)} defaultValue={row.pwd} disabled={click ? "" : "disabled"} >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>

                                        </div>
                                    </div>

                                    {row.pwd === "Yes" || upPwd === "Yes" ?
                                        <div className="input_fields">
                                            <label> Disability Kind:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" defaultValue={row.disability_kind} disabled={click ? "" : "disabled"} onChange={(e) => setDisabilityKind(e.target.value)} />

                                        </div>

                                        : ""}

                                    <div className="input_fields" >
                                        <label>Is Voter<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <select className="inputs" defaultValue={row.voter} onChange={(e) => setIsVoter(e.target.value)} disabled={click ? "" : "disabled"}>
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="input_fields" >
                                        <label>Solo Parent<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <select className="inputs" defaultValue={row.solo_parent} onChange={(e) => setSoloParent(e.target.value)} disabled={click ? "" : "disabled"} >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="input_fields">
                                        <label> E-mail:</label>
                                        <input type="text" className="inputs" autoComplete="off" defaultValue={row.email} disabled={click ? "" : "disabled"} onChange={(e) => setEmail(e.target.value)} />

                                    </div>
                                    <div className="input_fields">
                                        <label>Street<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <input type="text" className="inputs" autoComplete="off" disabled defaultValue={row.street} onChange={(e) => setStreet(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="input_fields">
                                        <label>House No.<span className="required_symbol">*</span></label>
                                        <div className="custom_select">
                                            <input type="text" className="inputs" autoComplete="off" disabled defaultValue={row.house_no} onChange={(e) => setHouseNo(e.target.value)} />
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
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" className="btn" value="Save Changes" onClick={() => update_residentInfo(row.ResId, row.last_name, row.first_name, row.middle_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.email, row.civil_status, row.spouse_name, row.contact, row.occupation, row.date_resided, row.religion, row.citizenship, row.pwd, row.solo_parent, row.voter, row.disability_kind, row.relationshipToHouseholdHead)} />
                                            </div>
                                            {row.household_head === "No" ? <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" className="btn" value="Set Household Head" onClick={() => makeHouseholdhead_confirm(row.ResId, row.householdHead_id)} />
                                            </div> : ""}
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" className="btn" value="Cancel Edit" onClick={deactivate_btn} />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" value="Edit Resident Information" className="btn" onClick={activate_btn} />
                                            </div>
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" value="Move Resident" className="btn" onClick={() => openInPopup5(row.ResId, row.household_head, row.householdHead_id)} />
                                            </div>
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" value="Archive Resident" className="btn" onClick={() => archive_residentInfo(row.ResId)} />
                                            </div>
                                            <div className="input_fields" id="mobile_hidden">
                                                <input type="submit" value="Generate Individual Record" className="btn" onClick={() => dl_indv_rep(row.last_name, row.first_name, row.middle_name, row.suffix, row.gender, row.birthdate, row.birthplace, row.civil_status, row.contact, row.occupation, row.citizenship, row.household_number, row.street, row.house_no)} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </PopUp3>

            <PopUp4 title="Add Resident to this Household" openPopup4={openPopup4} setOpenPopup4={setOpenPopup4} maxWidth="xl">
                <div className="resident_tbl_add_resident">
                    <div className="container">
                        <div className="row">
                            <div className="upper_profile">
                                <div className="MyProfile_img_container">
                                    <Container>
                                        <BoxUpload>
                                            <div className="image-upload">
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
                                            </div>
                                        </BoxUpload>
                                    </Container>
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
                                        <select className="inputs" autoComplete="off" onChange={(e) => add_setHouseholdHead(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {add_householdHead === "No" ? <div className="input_fields">
                                    <label>Relationship To Household:<span className="required_symbol">*</span> </label>
                                    <input type="text" className="inputs" autoComplete="off" onChange={(e) => add_setRelationshipToHousehold(e.target.value)} />
                                </div> : ""}

                                <div className="input_fields">
                                    <label> Last Name:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setLName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label > First Name:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" required onChange={(e) => add_setFName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Middle Name:</label>
                                    <input type="text" className="inputs" required autoComplete="off" onChange={(e) => add_setMName(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Suffix:</label>
                                    <input type="text" className="inputs" autoComplete="off" onChange={(e) => add_setSuffix(e.target.value)} />
                                </div>
                                <div className="input_fields" >
                                    <label>Gender<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => add_setGender(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields">
                                    <label> Date Of Birth:<span className="text-danger">*</span></label>
                                    <input type="date" className="inputs" max={moment().format('YYYY-MM-DD')} autoComplete="off" onChange={(e) => add_setDob(e.target.value)} />
                                </div>

                                <div className="input_fields">
                                    <label> Place Of Birth:<span className="text-danger">*</span></label>
                                    <input type="text" className="inputs" autoComplete="off" onChange={(e) => add_setPob(e.target.value)} />
                                </div>

                                <div className="input_fields">
                                    <label> Contact No:<span className="text-danger">*</span></label>
                                    <input type="text" maxLength="11" pattern="[1-9]{1}[0-9]{9}" required className="inputs" autoComplete="off" onChange={(e) => add_setContact(e.target.value)} placeholder="09XXXXXXXXX" />
                                </div>
                                <div className="input_fields">
                                    <label> E-mail:</label>
                                    <input type="email" className="inputs" autoComplete="off" onChange={(e) => add_setEmail(e.target.value)} />
                                </div>

                                <div className="input_fields" >
                                    <label>Civil Status<span className="required_symbol">*</span></label>
                                    <div className="custom_select" >
                                        <select className="inputs" autoComplete="off" onChange={(e) => add_setCivilStatus(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Separated">Separated</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>
                                {add_civilStatus === "Married" ?
                                    <div className="input_fields">
                                        <label> Spouse Name:<span className="text-danger">*</span></label>
                                        <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setSpouseName(e.target.value)} />
                                    </div>

                                    : ""
                                }

                            </div>
                        </div>
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields">
                                    <label> Occupation:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setOccupation(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Citizenship:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setCitizenship(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Residence Years:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setYearsResided(e.target.value)} />
                                </div>
                                <div className="input_fields">
                                    <label> Religion:<span className="text-danger">*</span></label>
                                    <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setReligion(e.target.value)} />
                                </div>
                                <div className="input_fields" >
                                    <label>PWD<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => add_setPwd(e.target.value)} >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                {add_pwd === "Yes" ?
                                    <>
                                        <div className="input_fields">
                                            <label> Disability Kind:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setDisabilityKind(e.target.value)} />
                                        </div>
                                        <div className="input_fields">
                                            <label> PWD ID:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setPwdId(e.target.value)} />
                                        </div>
                                        <div className="input_fields">
                                            <label> Date Issued:<span className="text-danger">*</span></label>
                                            <input type="text" required className="inputs" autoComplete="off" onChange={(e) => add_setPwdDate(e.target.value)} />
                                        </div>
                                    </>
                                    : ""}
                                <div className="input_fields" >
                                    <label>Is Voter<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => add_setIsVoter(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input_fields" >
                                    <label>Solo Parent<span className="required_symbol">*</span></label>
                                    <div className="custom_select">
                                        <select className="inputs" onChange={(e) => add_setSoloParent(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add_resident_container_footer">
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div className="input_fields" id="mobile_hidden">
                                    <input type="submit" className="editProfile_btn" value="Save Changes" onClick={() => add_resident()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp4>

            <PopUp5 title="Move Resident" openPopup5={openPopup5} setOpenPopup5={setOpenPopup5} maxWidth="xl">
                <div className='resident_tbl_add_resident'>
                    <div className='add_new_resident_container'>
                        <div className="wrapper" id="wrapper_profile">
                            <div className="forms" id="inputfields_profile">
                                <div ref={wrapperRef} className="input_fields" id="input_field_hh">
                                    <div className="search_auto">
                                        <div className="input_fields">
                                            <label>Street<span className="required_symbol">*</span></label>
                                            <input
                                                id="auto"
                                                onClick={() => setDisplay(!display)}
                                                placeholder="Type to search"
                                                value={s}
                                                onChange={event => setSearch(event.target.value)}
                                                autoComplete="off"
                                                className="inputs"
                                            />
                                        </div>
                                        {display && (
                                            <div className="autoContainer">
                                                {householdList
                                                    .filter((row) => row.street.toLowerCase().indexOf(s.toLowerCase()) > -1)
                                                    .map((value, i) => {
                                                        return (
                                                            <div className="hh2">
                                                                <div
                                                                    onClick={() => updatePokeDex(value.street, value.household_id)}
                                                                    className="option"
                                                                    key={i}
                                                                    tabIndex="0"
                                                                >
                                                                    <span className="last_name_hh">{value.street}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div ref={wrapperRef2} className="input_fields" id="input_field_hh">
                                    <div className="search_auto">
                                        <div className="input_fields">
                                            <label>House No.<span className="required_symbol">*</span></label>
                                            <input
                                                id="auto"
                                                onClick={() => setDisplay2(!display2)}
                                                placeholder="Type to search"
                                                value={houseSearch}
                                                onChange={event => setHouseSearch(event.target.value)}
                                                autoComplete="off"
                                                className="inputs"
                                            />
                                        </div>
                                        {display2 && (
                                            <div className="autoContainer">
                                                {houseNoList
                                                    .filter((row) => row.house_no.indexOf(houseSearch) > -1)
                                                    .map((value, i) => {
                                                        return (

                                                            <div className="hh2">
                                                                <div
                                                                    onClick={() => updatePokeDex2(value.house_no, value.household_id)}
                                                                    className="option"
                                                                    key={i}
                                                                    tabIndex="0"
                                                                >
                                                                    <span className="last_name_hh">{value.house_no}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="input_fields" id="mobile_hidden">
                                    <input type="submit" value="Submit" className="btn" onClick={move_resident} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </PopUp5>

            <div className="resident_tbl_add_resident">
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Grid item xs={12}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow className={classes.tableRow}>
                                    <TableCell className={classes.tableHeaderCell}>Address</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Total Household Members</TableCell>
                                    <TableCell className={classes.tableHeaderCell} id="resident_action" >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody} >
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow>
                                            <TableCell className={classes.tableCell} id="last_name" onClick={() => openInPopup(row.household_id)}>
                                                <Grid container>
                                                    <Grid item lg={10} >
                                                        <Typography className={classes.name}> {row.street + ", " + row.house_no}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                            <TableCell className={classes.tableCell}>
                                                <Grid container>
                                                    <Grid item lg={10} >
                                                        <Typography className={classes.name}> {row.totalMembers}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                            <TableCell className={classes.tableCell} id="resident_action"><button className="household_viewBtn" onClick={() => openInPopup(row.household_id)} >View</button> <button className="household_editBtn" onClick={() => openInPopup2(row.household_id)} >Edit</button>
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
            </div>
        </div >
    )
}

export default HouseholdTable