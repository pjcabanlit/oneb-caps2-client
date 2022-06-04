/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    TablePagination,
    TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaEdit } from "react-icons/fa";
import Axios from "axios";
import Notification from "../../Dialog/Notification";
import ConfirmDialog from "../../Dialog/ConfirmDialog";
import ViewEditDialog from "../../Dialog/ViewEditDialog";
import SuccessDialog from "../../Dialog/SuccessDialog";
import LoginAuthPop from "../../Dialog/LoginAuthPop";
import SuccessRegisterDialog from "../../Dialog/SuccessRegisterDialog";
import PopUp from "../../Dialog/PopUp";
import Moment from "react-moment";
import { saveAs } from "file-saver";
const useStyles = makeStyles((theme) => ({
    table: { minWidth: 200 },
    tableContainer: {
        maxWidth: 1175,
        borderRadius: 0,
        border: "0.5px solid #d5dbd9",
    },
    tableHeaderCell: {
        fontWeight: "bold",
        backgroundColor: "#0061a8",
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        fontFamily: "Montserrat, sans-serif",
        cursor: "pointer",
        lineHeight: "1.43",
        paddingTop: "15px",
        paddingBottom: "15px",
    },
    tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer" },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    name: {
        cursor: "pointer",
        fontWeight: "bold",
        color: "#2e4a56",
        fontFamily: "Montserrat, sans-serif",
    },
    residentIdTitle: { fontSize: "15px" },
    status: {
        fontWeight: "bold",
        fontSize: "0.75rem",
        color: "white",
        backgroundColor: "grey",
        borderRadius: 5,
        padding: "3px 10px",
        display: "inline-block",
        fontFamily: "Montserrat, sans-serif",
    },
    tablePagination: { overflow: "hidden" },
}));
export default function MyDocumentTable({ data }) {
    Axios.defaults.withCredentials = true;
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: !1,
        title: "",
        subtitle: "",
        yesButton: "",
        noButton: "",
    }),
        [successRegisterDialog, setSuccessRegisterDialog] = useState({
            isOpen: !1,
            title: "",
            subtitle: "",
            yesButton: "",
            noButton: "",
        }),
        [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }),
        [viewEditDialog, setViewEditDialog] = useState({
            isOpen: !1,
            title: "",
            subtitle: "",
            yesButton: "",
            noButton: "",
        }),
        [errorDialog, setErrorDialog] = useState({
            isOpen: !1,
            title: "",
            subtitle: "",
            noButton: "",
        }),
        [successDialog, setSuccessDialog] = useState({
            isOpen: !1,
            title: "",
            subtitle: "",
            yesButton: "",
            noButton: "",
        }),
        classes = useStyles(),
        [request_id, setRequestId] = useState(""),
        [document_type, setDocumentType] = useState(""),
        [date_requested, setDateRequested] = useState(""),
        [purpose, setPurpose] = useState(""),
        [first_name, setFirstName] = useState(""),
        [middle_name, setMiddleName] = useState(""),
        [last_name, setLastName] = useState(""),
        [suffix, setSuffix] = useState(""),
        [complete_address, setCompleteAddress] = useState(""),
        [sex, setSex] = useState(""),
        [years_resided, setYearsResided] = useState(""),
        [birthdate, setBirthdate] = useState(""),
        [contact_person, setContactPerson] = useState(""),
        [contact_address, setContactAddress] = useState(""),
        [contact_contact, setContactContact] = useState(""),
        [business_name, setBusinessName] = useState(""),
        [business_address, setBusinessAddress] = useState(""),
        [business_type, setBusinessType] = useState(""),
        [business_status, setBusinessStatus] = useState(""),
        [vehicle, setVehicle] = useState(""),
        [vehicle_type, setVehicleType] = useState(""),
        [plate_no, setPlateNo] = useState(""),
        [destination, setDestination] = useState(""),
        [departure_date, setDepartureDate] = useState(""),
        [openPopup, setOpenPopup] = useState(!1),
        [date_processed, setDateProcessed] = useState(""),
        [currentStatus, setStatus] = useState(""),
        [date_declined, setDateDeclined] = useState(""),
        [page, setPage] = useState(0),
        [rowsPerPage, setRowsPerPage] = useState(5),
        [birthplace, setBirthplace] = useState(""),
        [civil_status, setCivilStatus] = useState(""),
        [tin, setTin] = useState(""),
        [sss, setSss] = useState(""),
        handleChangePage = (event, newPage) => {
            setPage(newPage);
        },
        handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        },
        refresh = () => {
            setSuccessDialog({ ...successDialog, isOpen: false });
            window.location.reload();
        };
    const str1 = date_processed
    const str2 = str1.slice(0, 2)
    const str3 = str1.slice(3, 5)
    const str4 = str1.slice(6, 10);
    const newDate_processed = str3 + " " + str2 + " " + str4;
    function openInPopup(
        status,
        request_id,
        document_type,
        DateRequested,
        DateProcessed,
        purpose,
        first_name,
        middle_name,
        last_name,
        suffix,
        address,
        gender,
        years_resided,
        birthdate,
        contact_person,
        contact_address,
        contact_contact,
        business_name,
        business_address,
        business_type,
        business_status,
        vehicle,
        vehicle_type,
        plate_no,
        destination,
        departure_date,
        birthplace,
        civil_status,
        SSS,
        TIN
    ) {
        setStatus(status);
        setDateProcessed(DateProcessed);
        setOpenPopup(true);
        setRequestId(request_id);
        setDocumentType(document_type);
        setDateRequested(DateRequested);
        setPurpose(purpose);
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setCompleteAddress(address);
        setSex(gender);
        setYearsResided(years_resided);
        setBirthdate(birthdate);
        setContactPerson(contact_person);
        setContactAddress(contact_address);
        setContactContact(contact_contact);
        setBusinessName(business_name);
        setBusinessAddress(business_address);
        setBusinessType(business_type);
        setBusinessStatus(business_status);
        setVehicle(vehicle);
        setVehicleType(vehicle_type);
        setPlateNo(plate_no);
        setDestination(destination);
        setDepartureDate(departure_date);
        setBirthplace(birthplace);
        setCivilStatus(civil_status);
        setSss(SSS);
        setTin(TIN);
    }
    function openPendingPopup(
        status,
        request_id,
        document_type,
        DateRequested,
        purpose,
        first_name,
        middle_name,
        last_name,
        suffix,
        address,
        gender,
        years_resided,
        birthdate,
        contact_person,
        contact_address,
        contact_contact,
        business_name,
        business_address,
        business_type,
        business_status,
        vehicle,
        vehicle_type,
        plate_no,
        destination,
        departure_date,
        birthplace,
        civil_status,
        SSS,
        TIN
    ) {
        setStatus(status);
        setOpenPopup(true);
        setRequestId(request_id);
        setDocumentType(document_type);
        setDateRequested(DateRequested);
        setPurpose(purpose);
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setCompleteAddress(address);
        setSex(gender);
        setYearsResided(years_resided);
        setBirthdate(birthdate);
        setContactPerson(contact_person);
        setContactAddress(contact_address);
        setContactContact(contact_contact);
        setBusinessName(business_name);
        setBusinessAddress(business_address);
        setBusinessType(business_type);
        setBusinessStatus(business_status);
        setVehicle(vehicle);
        setVehicleType(vehicle_type);
        setPlateNo(plate_no);
        setDestination(destination);
        setDepartureDate(departure_date);
        setBirthplace(birthplace);
        setCivilStatus(civil_status);
        setSss(SSS);
        setTin(TIN);
    }
    function openDeclinedPopup(
        status,
        request_id,
        document_type,
        DateRequested,
        DateDeclined,
        purpose,
        first_name,
        middle_name,
        last_name,
        suffix,
        address,
        gender,
        years_resided,
        birthdate,
        contact_person,
        contact_address,
        contact_contact,
        business_name,
        business_address,
        business_type,
        business_status,
        vehicle,
        vehicle_type,
        plate_no,
        destination,
        departure_date,
        birthplace,
        civil_status,
        SSS,
        TIN
    ) {
        setStatus(status);
        setDateDeclined(DateDeclined);
        setOpenPopup(true);
        setRequestId(request_id);
        setDocumentType(document_type);
        setDateRequested(DateRequested);
        setPurpose(purpose);
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setCompleteAddress(address);
        setSex(gender);
        setYearsResided(years_resided);
        setBirthdate(birthdate);
        setContactPerson(contact_person);
        setContactAddress(contact_address);
        setContactContact(contact_contact);
        setBusinessName(business_name);
        setBusinessAddress(business_address);
        setBusinessType(business_type);
        setBusinessStatus(business_status);
        setVehicle(vehicle);
        setVehicleType(vehicle_type);
        setPlateNo(plate_no);
        setDestination(destination);
        setDepartureDate(departure_date);
        setBirthplace(birthplace);
        setCivilStatus(civil_status);
        setSss(SSS);
        setTin(TIN);
    }
    const delete_tp_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        Axios.delete(`http://localhost:3001/deleteTp/${request_id}`);
        setSuccessDialog({
            isOpen: true,
            title: "Request Deleted Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    };
    const delete_tp_request = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to delete this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button onClick={() => delete_tp_confirm()} className="alert_yesBtn">

                    Yes
                </button>
            ),
        });
    };
    const delete_gm_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        Axios.delete(`http://localhost:3001/deleteGm/${request_id}`);
        setSuccessDialog({
            isOpen: true,
            title: "Request Deleted Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    };
    const delete_gm_request = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to delete this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button onClick={() => delete_gm_confirm()} className="alert_yesBtn">

                    Yes
                </button>
            ),
        });
    };
    const delete_brgyid_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        Axios.delete(`http://localhost:3001/deleteBrgyId/${request_id}`);
        setSuccessDialog({
            isOpen: true,
            title: "Request Deleted Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    };
    const delete_brgyid_request = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to delete this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button
                    onClick={() => delete_brgyid_confirm()}
                    className="alert_yesBtn"
                >

                    Yes
                </button>
            ),
        });
    };
    const delete_busclearance_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        Axios.delete(`http://localhost:3001/deleteBusClearance/${request_id}`);
        setSuccessDialog({
            isOpen: true,
            title: "Request Deleted Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    };
    const delete_busclearance_request = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to delete this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button
                    onClick={() => delete_busclearance_confirm()}
                    className="alert_yesBtn"
                >

                    Yes
                </button>
            ),
        });
    };
    const delete_coi_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        Axios.delete(`http://localhost:3001/deleteCOI/${request_id}`);
        setSuccessDialog({
            isOpen: true,
            title: "Request Deleted Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    };
    const delete_coi_request = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to delete this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button onClick={() => delete_coi_confirm()} className="alert_yesBtn">

                    Yes
                </button>
            ),
        });
    };
    function download_cert(
        status,
        request_id,
        document_type,
        DateRequested,
        DateProcessed,
        purpose,
        first_name,
        middle_name,
        last_name,
        suffix,
        address,
        gender,
        years_resided,
        birthdate,
        contact_person,
        contact_address,
        contact_contact,
        business_name,
        business_address,
        business_type,
        business_status,
        vehicle,
        vehicle_type,
        plate_no,
        destination,
        departure_date
    ) {
        setStatus(status);
        setRequestId(request_id);
        setDocumentType(document_type);
        setDateRequested(DateRequested);
        setDateProcessed(DateProcessed);
        setPurpose(purpose);
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setSuffix(suffix);
        setCompleteAddress(address);
        setSex(gender);
        setYearsResided(years_resided);
        setBirthdate(birthdate);
        setContactPerson(contact_person);
        setContactAddress(contact_address);
        setContactContact(contact_contact);
        setBusinessName(business_name);
        setBusinessAddress(business_address);
        setBusinessType(business_type);
        setBusinessStatus(business_status);
        setVehicle(vehicle);
        setVehicleType(vehicle_type);
        setPlateNo(plate_no);
        setDestination(destination);
        setDepartureDate(departure_date);
        setConfirmDialog({
            isOpen: true,
            title: "Confirmation",
            subtitle: "Are you sure you want to download this Request?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button
                    onClick={() => download_cert_confirm(document_type)}
                    className="alert_yesBtn"
                >

                    Yes
                </button>
            ),
        });
    }
    const download_cert_confirm = (document_type) => {
        if (document_type === 1) {
            download_coi();
        } else if (document_type === 2) {
            download_businessClearance();
        } else if (document_type === 4) {
            download_goodMoral();
        } else if (document_type === 5) {
            download_travelPass();
        }
    };
    function download_coi() {
        Axios.post(
            "http://localhost:3001/create-pdf-coi",
            {
                COI_firstName: first_name,
                COI_middleName: middle_name == null ? "" : middle_name,
                COI_lastName: last_name,
                COI_suffix: suffix == null ? "" : suffix,
                COI_address: complete_address,
                COI_yearsResided: years_resided,
                COI_purpose: purpose,
                COI_processed_date: newDate_processed,
            },
            setSuccessDialog({
                isOpen: true,
                title: "Certificate of Indigency Download",
                subtitle:
                    "Please wait a few seconds your document will automatically download.",
                noButton: (
                    <button onClick={() => refresh()} className="alert_backBtn">
                        Back
                    </button>
                ),
            })
        )
            .then(() =>
                Axios.get("http://localhost:3001/fetch-pdf-coi", {
                    responseType: "blob",
                })
            )
            .then((response) => {
                const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                saveAs(
                    pdfBlob,
                    `Certificate-of-Indigency-${first_name +
                    "_" +
                    (middle_name == null ? "" : middle_name) +
                    "_" +
                    last_name +
                    "" +
                    (suffix == null ? "" : suffix)
                    }.pdf`
                );
            });
        setOpenPopup(false);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
    function download_goodMoral() {
        Axios.post("http://localhost:3001/create-pdf-goodMoral", {
            gm_firstName: first_name,
            gm_middleName: middle_name == null ? "" : middle_name,
            gm_lastName: last_name,
            gm_suffix: suffix == null ? "" : suffix,
            gm_address: complete_address,
            gm_gender: sex,
            gm_purpose: purpose,
            gm_processed_date: newDate_processed,
        })
            .then(
                () =>
                    Axios.get("http://localhost:3001/fetch-pdf-goodMoral", {
                        responseType: "blob",
                    }),
                setSuccessDialog({
                    isOpen: true,
                    title: "Good Moral Download",
                    subtitle:
                        "Please wait a few seconds your document will automatically download.",
                    noButton: (
                        <button onClick={() => refresh()} className="alert_backBtn">
                            Back
                        </button>
                    ),
                })
            )
            .then((response) => {
                const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                saveAs(
                    pdfBlob,
                    `Good-Moral-${first_name +
                    "_" +
                    (middle_name == null ? "" : middle_name) +
                    "_" +
                    last_name +
                    "" +
                    (suffix == null ? "" : suffix)
                    }.pdf`
                );
            });
        setOpenPopup(false);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
    function download_travelPass() {
        if (vehicle === "Yes") {
            Axios.post("http://localhost:3001/create-pdf-travelPass", {
                tp_firstName: first_name,
                tp_middleName: middle_name == null ? "" : middle_name,
                tp_lastName: last_name,
                tp_suffix: suffix == null ? "" : suffix,
                tp_address: complete_address,
                tp_vehicleType: vehicle_type,
                tp_plateNo: plate_no,
                tp_destination: destination,
                tp_departureDate: departure_date,
                tp_purpose: purpose,
                tp_processed_date: newDate_processed,
            })
                .then(
                    () =>
                        Axios.get("http://localhost:3001/fetch-pdf-travelPass", {
                            responseType: "blob",
                        }),
                    setSuccessDialog({
                        isOpen: true,
                        title: "Travel Pass Download",
                        subtitle:
                            "Please wait a few seconds your document will automatically download.",
                        noButton: (
                            <button onClick={() => refresh()} className="alert_backBtn">
                                Back
                            </button>
                        ),
                    })
                )
                .then((response) => {
                    const pdfBlob = new Blob([response.data], {
                        type: "application/pdf",
                    });
                    saveAs(
                        pdfBlob,
                        `Travel-Pass-${first_name +
                        "_" +
                        (middle_name == null ? "" : middle_name) +
                        "_" +
                        last_name +
                        "" +
                        (suffix == null ? "" : suffix)
                        }.pdf`
                    );
                });
            setOpenPopup(false);
        } else {
            Axios.post("http://localhost:3001/create-pdf-travelPassNoVehicle", {
                tp_firstName: first_name,
                tp_middleName: middle_name,
                tp_lastName: last_name,
                tp_suffix: suffix == null ? "" : suffix,
                tp_address: complete_address,
                tp_vehicle: vehicle,
                tp_destination: destination,
                tp_departureDate: departure_date,
                tp_purpose: purpose,
                tp_processed_date: newDate_processed,
            })
                .then(() =>
                    Axios.get("http://localhost:3001/fetch-pdf-travelPassNoVehicle", {
                        responseType: "blob",
                    })
                )
                .then((response) => {
                    const pdfBlob = new Blob([response.data], {
                        type: "application/pdf",
                    });
                    saveAs(
                        pdfBlob,
                        `Travel-Pass-${first_name +
                        "_" +
                        middle_name +
                        "_" +
                        last_name +
                        "" +
                        (suffix == null ? "" : suffix)
                        }.pdf`
                    );
                });
            setOpenPopup(false);
        }
    }
    function download_businessClearance() {
        Axios.post(
            "http://localhost:3001/create-pdf-businessClearance",
            {
                busC_firstName: first_name,
                busC_middleName: middle_name,
                busC_lastName: last_name,
                busC_suffix: suffix == null ? "" : suffix,
                busC_businessName: business_name,
                busC_businessAddress: business_address,
                busC_businessType: business_type,
                busC_businessStatus: business_status,
                busC_processed_date: newDate_processed,
            },
            setSuccessDialog({
                isOpen: true,
                title: "Business Clearance Download",
                subtitle:
                    "Please wait a few seconds your document will automatically download.",
                noButton: (
                    <button onClick={() => refresh()} className="alert_backBtn">
                        Back
                    </button>
                ),
            })
        )
            .then(() =>
                Axios.get("http://localhost:3001/fetch-pdf-businessClearance", {
                    responseType: "blob",
                })
            )
            .then((response) => {
                const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                saveAs(
                    pdfBlob,
                    `Business-Clearance-${first_name +
                    "_" +
                    middle_name +
                    "_" +
                    last_name +
                    "" +
                    (suffix == null ? "" : suffix)
                    }.pdf`
                );
            });
        setOpenPopup(false);
    }
    return (
        <div>
            <SuccessDialog
                successDialog={successDialog}
                setSuccessDialog={setSuccessDialog}
            />
            <SuccessRegisterDialog
                successRegisterDialog={successRegisterDialog}
                setSuccessRegisterDialog={setSuccessRegisterDialog}
            />
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ViewEditDialog
                viewEditDialog={viewEditDialog}
                setViewEditDialog={setViewEditDialog}
            />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <PopUp
                title="Document Information"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <div className="generate-certificate-body">

                    <div className="generate-certificate-container">

                        <div className="wrapper" id="wrapper_profile">
                            {document_type === 1 ? (
                                <>

                                    <div className="generate_certificate_title">

                                        <h1> Certificate Of Indigency </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={last_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={middle_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={suffix}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={complete_address}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Gender<span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select className="inputs" disabled value={sex}>

                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input_fields">

                                            <label>Years Resided in the Barangay</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={years_resided}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Purpose <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select className="inputs" value={purpose} disabled>

                                                    <option value="">Select</option>
                                                    <option value="All Legal Intents and Purposes">
                                                        All Legal Intents and Purposes
                                                    </option>
                                                    <option value="Applying A Job">Applying A Job</option>
                                                    <option value="Applying A Bank Account">
                                                        Applying A Bank Account
                                                    </option>
                                                    <option value="Certify Residency">
                                                        Certify Residency
                                                    </option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                        {purpose === "Others" ? (
                                            <div className="input_fields">

                                                <label>
                                                    Please Specify Purpose
                                                    <span className="required_symbol">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="inputs"
                                                    autoComplete="off"
                                                    disabled
                                                    value={purpose}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <label>Date Requested</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={date_requested}
                                                />
                                            </p>
                                        </div>
                                        {currentStatus === "Processed" ? (
                                            <>
                                                <div className="input_fields">

                                                    <label>Date Processed</label>
                                                    <p className="inputs">
                                                        <Moment
                                                            format={"MMMM DD, YYYY"}
                                                            date={date_processed}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        value="Download"
                                                        className="editProfile_btn"
                                                        onClick={() => download_cert(currentStatus, request_id, document_type, date_requested, date_processed, purpose, first_name, middle_name, last_name, suffix, complete_address, sex, years_resided, birthdate, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, vehicle, vehicle_type, plate_no, destination, departure_date)}
                                                    />
                                                </div>
                                            </>
                                        ) : currentStatus === "Declined" ? (
                                            <div className="input_fields">

                                                <label>Date Declined</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_declined}
                                                    />
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="editProfile_btn"
                                                onClick={delete_coi_request}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                            {document_type === 2 ? (
                                <>

                                    <div className="generate_certificate_title">

                                        <h1> Business Clearance </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={last_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={middle_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={suffix}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Business Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={business_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Business Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={business_address}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>Business Type</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={business_type}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Business Status</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={business_status}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Date Requested</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={date_requested}
                                                />
                                            </p>
                                        </div>
                                        {currentStatus === "Processed" ? (
                                            <>
                                                <div className="input_fields">

                                                    <label>Date Processed</label>
                                                    <p className="inputs">
                                                        <Moment
                                                            format={"MMMM DD, YYYY"}
                                                            date={date_processed}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        value="Download"
                                                        className="editProfile_btn"
                                                        onClick={() => download_cert(currentStatus, request_id, document_type, date_requested, date_processed, purpose, first_name, middle_name, last_name, suffix, complete_address, sex, years_resided, birthdate, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, vehicle, vehicle_type, plate_no, destination, departure_date)}
                                                    />
                                                </div>
                                            </>
                                        ) : currentStatus === "Declined" ? (
                                            <div className="input_fields">

                                                <label>Date Declined</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_declined}
                                                    />
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="editProfile_btn"
                                                onClick={delete_busclearance_request}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                            {document_type === 3 ? (
                                <>

                                    <div className="generate_certificate_title">

                                        <h1> Barangay ID </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={last_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={middle_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={suffix}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={complete_address}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>Gender</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={sex}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Birthdate</label>
                                            <p className="inputs">
                                                <Moment format={"MMMM DD, YYYY"} date={birthdate} />
                                            </p>
                                        </div>
                                        <div className="input_fields">

                                            <label>Birthplace</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={birthplace}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Civil Status</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={civil_status}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>SSS No.</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={sss}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>TIN No.</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={tin}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Purpose</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={purpose}
                                            />
                                        </div>
                                        <p style={{ paddingTop: "10px", paddingBottom: "10px", textTransform: "uppercase" }}>Person to contact in case of Emergency</p>
                                        <div className="input_fields">

                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={contact_person}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={contact_address}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Contact No.</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={contact_contact}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Date Requested</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={date_requested}
                                                />
                                            </p>
                                        </div>
                                        {currentStatus === "Processed" ? (
                                            <>
                                                <div className="input_fields">

                                                    <label>Date Processed</label>
                                                    <p className="inputs">
                                                        <Moment
                                                            format={"MMMM DD, YYYY"}
                                                            date={date_processed}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        value="Download"
                                                        className="editProfile_btn"
                                                        onClick={() => download_cert(currentStatus, request_id, document_type, date_requested, date_processed, purpose, first_name, middle_name, last_name, suffix, complete_address, sex, years_resided, birthdate, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, vehicle, vehicle_type, plate_no, destination, departure_date)}
                                                    />
                                                </div>
                                            </>
                                        ) : currentStatus === "Declined" ? (
                                            <div className="input_fields">

                                                <label>Date Declined</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_declined}
                                                    />
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="editProfile_btn"
                                                onClick={delete_brgyid_request}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                            {document_type === 4 ? (
                                <>

                                    <div className="generate_certificate_title">

                                        <h1> Good Moral </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={last_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={middle_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={suffix}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Complete Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={complete_address}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>Gender</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={sex}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Purpose</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={purpose}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Date Requested</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={date_requested}
                                                />
                                            </p>
                                        </div>
                                        {currentStatus === "Processed" ? (
                                            <>
                                                <div className="input_fields">

                                                    <label>Date Processed</label>
                                                    <p className="inputs">
                                                        <Moment
                                                            format={"MMMM DD, YYYY"}
                                                            date={date_processed}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        value="Download"
                                                        className="editProfile_btn"
                                                        onClick={() => download_cert(currentStatus, request_id, document_type, date_requested, date_processed, purpose, first_name, middle_name, last_name, suffix, complete_address, sex, years_resided, birthdate, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, vehicle, vehicle_type, plate_no, destination, departure_date)}
                                                    />
                                                </div>
                                            </>
                                        ) : currentStatus === "Declined" ? (
                                            <div className="input_fields">

                                                <label>Date Declined</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_declined}
                                                    />
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="editProfile_btn"
                                                onClick={delete_gm_request}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                            {document_type === 5 ? (
                                <>

                                    <div className="generate_certificate_title">

                                        <h1> Travel Pass </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={last_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={middle_name}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={suffix}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Complete Address</label>
                                            <textarea
                                                className="textarea"
                                                disabled
                                                value={complete_address}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>Do you have a vehicle</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={vehicle}
                                            />
                                        </div>
                                        {vehicle === "Yes" ? (
                                            <>

                                                <div className="input_fields">

                                                    <label>Vehicle Type</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        disabled
                                                        value={vehicle_type}
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Plate No.</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        disabled
                                                        value={plate_no}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <label>Destination</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={destination}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Departure Date</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={departure_date}
                                                />
                                            </p>
                                        </div>
                                        <div className="input_fields">

                                            <label>Purpose</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled
                                                value={purpose}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Date Requested</label>
                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={date_requested}
                                                />
                                            </p>
                                        </div>
                                        {currentStatus === "Processed" ? (
                                            <>
                                                <div className="input_fields">

                                                    <label>Date Processed</label>
                                                    <p className="inputs">
                                                        <Moment
                                                            format={"MMMM DD, YYYY"}
                                                            date={date_processed}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="input_fields">

                                                    <input
                                                        type="submit"
                                                        value="Download"
                                                        className="editProfile_btn"
                                                        onClick={() => download_cert(currentStatus, request_id, document_type, date_requested, date_processed, purpose, first_name, middle_name, last_name, suffix, complete_address, sex, years_resided, birthdate, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, vehicle, vehicle_type, plate_no, destination, departure_date)}
                                                    />
                                                </div>
                                            </>
                                        ) : currentStatus === "Declined" ? (
                                            <div className="input_fields">

                                                <label>Date Declined</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_declined}
                                                    />
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="editProfile_btn"
                                                onClick={delete_tp_request}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}>

                <Table className={classes.table} aria-label="simple table">

                    <TableHead>

                        <TableRow className={classes.tableRow}>

                            <TableCell className={classes.tableHeaderCell}>
                                Document Type
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                Date Requested
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                            <TableCell className={classes.tableHeaderCell} id="mobile_hidden">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => {
                            return (
                                <TableRow>
                                    {row.status === "Pending" ? (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openPendingPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Grid container>

                                                <Grid item lg={10}>

                                                    <Typography className={classes.name}>
                                                        {row.document_type === 1
                                                            ? "Certificate Of Indigency"
                                                            : ""}
                                                        {row.document_type === 2
                                                            ? "Business Clearance"
                                                            : ""}
                                                        {row.document_type === 3 ? "Barangay ID" : ""}
                                                        {row.document_type === 4 ? "Good Moral" : ""}
                                                        {row.document_type === 5 ? "Travel Pass" : ""}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    ) : row.status === "Processed" ? (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openInPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateProcessed,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Grid container>

                                                <Grid item lg={10}>

                                                    <Typography className={classes.name}>
                                                        {row.document_type === 1
                                                            ? "Certificate Of Indigency"
                                                            : ""}
                                                        {row.document_type === 2
                                                            ? "Business Clearance"
                                                            : ""}
                                                        {row.document_type === 3 ? "Barangay ID" : ""}
                                                        {row.document_type === 4 ? "Good Moral" : ""}
                                                        {row.document_type === 5 ? "Travel Pass" : ""}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openDeclinedPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateDeclined,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Grid container>

                                                <Grid item lg={10}>

                                                    <Typography className={classes.name}>
                                                        {row.document_type === 1
                                                            ? "Certificate Of Indigency"
                                                            : ""}
                                                        {row.document_type === 2
                                                            ? "Business Clearance"
                                                            : ""}
                                                        {row.document_type === 3 ? "Barangay ID" : ""}
                                                        {row.document_type === 4 ? "Good Moral" : ""}
                                                        {row.document_type === 5 ? "Travel Pass" : ""}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    )}
                                    {row.status === "Pending" ? (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openPendingPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={row.DateRequested}
                                                />
                                            </p>
                                        </TableCell>
                                    ) : row.status === "Processed" ? (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openInPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateProcessed,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={row.DateRequested}
                                                />
                                            </p>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            className={classes.tableCell}
                                            onClick={() =>
                                                openDeclinedPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateDeclined,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <p className="inputs">
                                                <Moment
                                                    format={"MMMM DD, YYYY"}
                                                    date={row.DateRequested}
                                                />
                                            </p>
                                        </TableCell>
                                    )}
                                    {row.status === "Pending" ? (
                                        <TableCell
                                            onClick={() =>
                                                openPendingPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Typography
                                                className={classes.status}
                                                style={{
                                                    backgroundColor:
                                                        (row.status === "Processed" && "green") ||
                                                        (row.status === "Pending" && "red"),
                                                }}
                                            >
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                    ) : row.status === "Processed" ? (
                                        <TableCell
                                            onClick={() =>
                                                openInPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateProcessed,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Typography
                                                className={classes.status}
                                                style={{
                                                    backgroundColor:
                                                        (row.status === "Processed" && "green") ||
                                                        (row.status === "Pending" && "red"),
                                                }}
                                            >
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            onClick={() =>
                                                openDeclinedPopup(
                                                    row.status,
                                                    row.Req_Id,
                                                    row.document_type,
                                                    row.DateRequested,
                                                    row.DateDeclined,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.years_resided,
                                                    row.birthdate,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.vehicle,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.birthplace,
                                                    row.civil_status,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Typography
                                                className={classes.status}
                                                style={{
                                                    backgroundColor:
                                                        (row.status === "Processed" && "green") ||
                                                        (row.status === "Pending" && "red"),
                                                }}
                                            >
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                    )}
                                    {row.status === "Pending" ? (
                                        <TableCell id="mobile_hidden">

                                            <button
                                                className="view_edit"
                                                onClick={() =>
                                                    openPendingPopup(
                                                        row.status,
                                                        row.Req_Id,
                                                        row.document_type,
                                                        row.DateRequested,
                                                        row.purpose,
                                                        row.first_name,
                                                        row.middle_name,
                                                        row.last_name,
                                                        row.suffix,
                                                        row.address,
                                                        row.gender,
                                                        row.years_resided,
                                                        row.birthdate,
                                                        row.contact_person,
                                                        row.contact_address,
                                                        row.contact_contact,
                                                        row.business_name,
                                                        row.business_address,
                                                        row.business_type,
                                                        row.business_status,
                                                        row.vehicle,
                                                        row.vehicle_type,
                                                        row.plate_no,
                                                        row.destination,
                                                        row.departure_date,
                                                        row.birthplace,
                                                        row.civil_status,
                                                        row.SSS,
                                                        row.TIN
                                                    )
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                        </TableCell>
                                    ) : (
                                        <TableCell id="mobile_hidden">

                                            <button
                                                className="view_edit"
                                                id="mobile_hidden"
                                                onClick={() => {
                                                    row.status === "Pending" ? openDeclinedPopup(
                                                        row.status,
                                                        row.Req_Id,
                                                        row.document_type,
                                                        row.DateRequested,
                                                        row.DateDeclined,
                                                        row.purpose,
                                                        row.first_name,
                                                        row.middle_name,
                                                        row.last_name,
                                                        row.suffix,
                                                        row.address,
                                                        row.gender,
                                                        row.remarks,
                                                        row.years_resided,
                                                        row.birthdate,
                                                        row.contact_person,
                                                        row.contact_address,
                                                        row.contact_contact,
                                                        row.business_name,
                                                        row.business_address,
                                                        row.business_type,
                                                        row.business_status,
                                                        row.vehicle,
                                                        row.vehicle_type,
                                                        row.plate_no,
                                                        row.destination,
                                                        row.departure_date,
                                                        row.birthplace,
                                                        row.civil_status,
                                                        row.SSS,
                                                        row.TIN
                                                    ) : row.status === "Processed" ? openInPopup(
                                                        row.status,
                                                        row.Req_Id,
                                                        row.document_type,
                                                        row.DateRequested,
                                                        row.DateProcessed,
                                                        row.purpose,
                                                        row.first_name,
                                                        row.middle_name,
                                                        row.last_name,
                                                        row.suffix,
                                                        row.address,
                                                        row.gender,
                                                        row.years_resided,
                                                        row.birthdate,
                                                        row.contact_person,
                                                        row.contact_address,
                                                        row.contact_contact,
                                                        row.business_name,
                                                        row.business_address,
                                                        row.business_type,
                                                        row.business_status,
                                                        row.vehicle,
                                                        row.vehicle_type,
                                                        row.plate_no,
                                                        row.destination,
                                                        row.departure_date,
                                                        row.birthplace,
                                                        row.civil_status,
                                                        row.SSS,
                                                        row.TIN
                                                    ) : openDeclinedPopup(
                                                        row.status,
                                                        row.Req_Id,
                                                        row.document_type,
                                                        row.DateRequested,
                                                        row.DateDeclined,
                                                        row.purpose,
                                                        row.first_name,
                                                        row.middle_name,
                                                        row.last_name,
                                                        row.suffix,
                                                        row.address,
                                                        row.gender,
                                                        row.years_resided,
                                                        row.birthdate,
                                                        row.contact_person,
                                                        row.contact_address,
                                                        row.contact_contact,
                                                        row.business_name,
                                                        row.business_address,
                                                        row.business_type,
                                                        row.business_status,
                                                        row.vehicle,
                                                        row.vehicle_type,
                                                        row.plate_no,
                                                        row.destination,
                                                        row.departure_date,
                                                        row.birthplace,
                                                        row.civil_status,
                                                        row.SSS,
                                                        row.TIN
                                                    )
                                                }
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>

                        <TablePagination
                            className={classes.tablePagination}
                            rowsPerPageOptions={[5, 10, 15]}
                            component="span"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}
