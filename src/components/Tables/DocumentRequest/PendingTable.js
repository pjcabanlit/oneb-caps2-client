/* eslint-disable no-lone-blocks */
import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';
import { FaEdit, FaArchive } from 'react-icons/fa';
import Axios from 'axios'
import './PendingTable.css'
import Notification from '../../Dialog/Notification';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import ViewEditDialog from '../../Dialog/ViewEditDialog';
import SuccessDialog from '../../Dialog/SuccessDialog';
import LoginAuthPop from '../../Dialog/LoginAuthPop';
import PopUp from '../../Dialog/PopUp'
import Moment from "react-moment";
import Decline from '../../Dialog/Decline';
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com';
import moment from 'moment'
init("user_fkY78MeKQHllD5wrTnSOv");
const useStyles = makeStyles((theme) => ({ table: { minWidth: 200, }, tableContainer: { maxWidth: 1175, borderRadius: 0, border: "0.5px solid #d5dbd9" }, tableHeaderCell: { fontWeight: 'bold', backgroundColor: '#0061a8', color: theme.palette.getContrastText(theme.palette.primary.dark), fontFamily: "Montserrat, sans-serif", cursor: "pointer", lineHeight: "1.43", paddingTop: "15px", paddingBottom: "15px" }, tableCell: { fontFamily: "Montserrat, sans-serif", cursor: "pointer", }, avatar: { backgroundColor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light) }, name: { cursor: "pointer", fontWeight: 'bold', color: "#2e4a56", fontFamily: "Montserrat, sans-serif" }, residentIdTitle: { fontSize: "15px" }, status: { fontWeight: 'bold', fontSize: '0.75rem', color: 'white', backgroundColor: 'grey', borderRadius: 5, padding: '3px 10px', display: 'inline-block', fontFamily: "Montserrat, sans-serif", }, tablePagination: { overflow: "hidden" } }))
function PendingTable({ data }) {
    Axios.defaults.withCredentials = true;
    const history = useHistory(), [confirmDialog, setConfirmDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [notify, setNotify] = useState({ isOpen: !1, message: "", type: "" }), [viewEditDialog, setViewEditDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), [errorDialog, setErrorDialog] = useState({ isOpen: !1, title: "", subtitle: "", noButton: "" }), [successDialog, setSuccessDialog] = useState({ isOpen: !1, title: "", subtitle: "", yesButton: "", noButton: "" }), classes = useStyles(), [request_id, setRequestId] = useState(""), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setSuffix] = useState(""), [complete_address, setCompleteAddress] = useState(""), [sex, setSex] = useState(""), [birthdate, setBirthdate] = useState(""), [purpose, setPurpose] = useState(""), [years_resided, setYearsResided] = useState(""), [document_type, setDocumentType] = useState(""), [contact_person, setContactPerson] = useState(""), [contact_address, setContactAddress] = useState(""), [contact_contact, setContactContact] = useState(""), [business_name, setBusinessName] = useState(""), [business_address, setBusinessAddress] = useState(""), [business_type, setBusinessType] = useState(""), [business_status, setBusinessStatus] = useState(""), [vehicle, setVehicle] = useState(""), [vehicle_type, setVehicleType] = useState(""), [plate_no, setPlateNo] = useState(""), [destination, setDestination] = useState(""), [departure_date, setDepartureDate] = useState(""), [date_requested, setDateRequested] = useState(""), [remarks, setRemarks] = useState(""), [openPopup, setOpenPopup] = useState(!1), [decline, setDecline] = useState(!1), [email, setEmail] = useState(""), [otherPurpose, setOtherPurpose] = useState(""), [page, setPage] = useState(0); const [rowsPerPage, setRowsPerPage] = useState(5), handleChangePage = (event, newPage) => { setPage(newPage) }, handleChangeRowsPerPage = (event) => { setRowsPerPage(+event.target.value); setPage(0) }, refresh = () => { setSuccessDialog({ ...successDialog, isOpen: !1 }); history.push("/document-requests") }, [click, setClick] = useState(!1), edit = () => { setClick(!0) }, back = () => { setClick(!1) }, decline_popup = () => { setDecline(true); }, form = useRef(), [birthplace, setBirthplace] = useState(""), [civilStatus, setCivilStatus] = useState(""), [tin, setTIN] = useState(""), [sss, setSSS] = useState("")
    var showdate = new Date(), displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    let str1 = date_requested; let str2 = str1.slice(0, 2); let str3 = str1.slice(3, 5); let str4 = str1.slice(6, 10); const newDate_processed = str3 + "/" + str2 + "/" + str4
    function openInPopup(vehicle, request, document_type, date_requested, purpose, first_name, middle_name, last_name, suffix, address, gender, birthdate, civil_status, contact_person, contact_address, contact_contact, business_name, business_address, business_type, business_status, years_resided, vehicle_type, plate_no, destination, departure_date, email, birthplace, SSS, TIN) { if (document_type === 1) { setDocumentType("Certificate Of Indigency") } else if (document_type === 2) { setDocumentType("Business Clearance") } else if (document_type === 3) { setDocumentType("Barangay ID") } else if (document_type === 4) { setDocumentType("Good Moral") } else if (document_type === 5) { setDocumentType("Travel Pass") } setOpenPopup(true); setVehicle(vehicle); setRequestId(request); setDateRequested(date_requested); setPurpose(purpose); setFirstName(first_name); setMiddleName(middle_name); setLastName(last_name); setSuffix(suffix); setCompleteAddress(address); setSex(gender); setBirthdate(birthdate); setContactPerson(contact_person); setContactAddress(contact_address); setContactContact(contact_contact); setBusinessName(business_name); setBusinessAddress(business_address); setBusinessType(business_type); setBusinessStatus(business_status); setYearsResided(years_resided); setVehicleType(vehicle_type); setPlateNo(plate_no); setDestination(destination); setDepartureDate(departure_date); setEmail(email); setBirthplace(birthplace); setCivilStatus(civil_status); setTIN(TIN); setSSS(SSS); if (!openPopup) { setClick(false) }; }
    const setDelete = (request_id, document_type) => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.delete(`http://localhost:3001/deletedocumentrequest/${request_id}/${document_type}`).then((response) => { if (response.data.delBrgyId) { setSuccessDialog({ isOpen: true, title: "Delete Request", subtitle: response.data.delBrgyId, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else if (response.data.delIndigency) { setSuccessDialog({ isOpen: true, title: "Delete Request", subtitle: response.data.delIndigency, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else if (response.data.delBusClearance) { setSuccessDialog({ isOpen: true, title: "Delete Request", subtitle: response.data.delBusClearance, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else if (response.data.delGoodMoral) { setSuccessDialog({ isOpen: true, title: "Delete Request", subtitle: response.data.delGoodMoral, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else if (response.data.delTravelPass) { setSuccessDialog({ isOpen: true, title: "Delete Request", subtitle: response.data.delTravelPass, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Something went wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const deleteDialog = (request_id, document_type) => { setConfirmDialog({ isOpen: true, title: "Delete Confirmation", subtitle: "Are you sure you want to delete this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => setDelete(request_id, document_type)} className="alert_yesBtn"> Yes </button> }) }
    const download_coi = () => { const numberOnly_format = /^\d+$/; const stringOnly_format = /^[a-zA-Z\s]*$/; if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!numberOnly_format.test(String(years_resided))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Years Resided should be a year.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!first_name || !last_name || !complete_address || !years_resided || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Generate Document", subtitle: "Are you sure you want to Generate this document? This request will be mark as processed.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_coi_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const download_coi_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.post("http://localhost:3001/create-pdf-coi", { COI_firstName: first_name, COI_middleName: middle_name == null ? "" : middle_name, COI_lastName: last_name, COI_suffix: suffix == null ? "" : suffix, COI_address: complete_address, COI_yearsResided: years_resided, COI_purpose: purpose, COI_processed_date: newDate_processed, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-coi", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Certificate-of-Indigency-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`) }); setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a seconds. The certificate will automatically download.`, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }); Axios.put("http://localhost:3001/UpdateDocumentRequests", { update_requestId: request_id, update_documentType: document_type, update_dateToday: displaytodaysdate, }); emailjs.sendForm('service_aqwlsrn', 'template_mevjmdp', form.current, 'user_fkY78MeKQHllD5wrTnSOv').then((result) => { }, (error) => { }); }
    const download_goodMoral = () => { const stringOnly_format = /^[a-zA-Z\s]*$/; if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!first_name || !last_name || !complete_address || !sex || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Generate Document", subtitle: "Are you sure you want to Generate this document? This request will be mark as processed.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_goodMoral_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const download_goodMoral_confirm = (e) => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.post("http://localhost:3001/create-pdf-goodMoral", { gm_firstName: first_name, gm_middleName: middle_name == null ? "" : middle_name, gm_lastName: last_name, gm_suffix: suffix == null ? "" : suffix, gm_address: complete_address, gm_gender: years_resided, gm_purpose: purpose, gm_processed_date: newDate_processed, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-goodMoral", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Good-Moral-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`) }); setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a seconds. The certificate will automatically download.`, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }); Axios.put("http://localhost:3001/UpdateDocumentRequests", { update_requestId: request_id, update_documentType: document_type, update_dateToday: displaytodaysdate, }); emailjs.sendForm('service_aqwlsrn', 'template_mevjmdp', form.current, 'user_fkY78MeKQHllD5wrTnSOv').then((result) => { }, (error) => { }); }
    const download_travelPass = () => { const stringOnly_format = /^[a-zA-Z\s]*$/; if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!first_name || !last_name || !complete_address || !vehicle || !destination || !departure_date || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (vehicle === "Yes" && (!vehicle_type || !plate_no)) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Generate Document", subtitle: "Are you sure you want to Generate this document? This request will be mark as processed.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_tp_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const download_tp_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); if (vehicle === "Yes") { Axios.post("http://localhost:3001/create-pdf-travelPass", { tp_firstName: first_name, tp_middleName: middle_name == null ? "" : middle_name, tp_lastName: last_name, tp_suffix: suffix == null ? "" : suffix, tp_address: complete_address, tp_vehicleType: vehicle_type, tp_plateNo: plate_no, tp_destination: destination, tp_departureDate: departure_date, tp_purpose: purpose, tp_processed_date: newDate_processed, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-travelPass", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Travel-Pass-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds. The certificate will automatically download.`, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }); Axios.put("http://localhost:3001/UpdateDocumentRequests", { update_requestId: request_id, update_documentType: document_type, update_dateToday: displaytodaysdate, }).then((response) => { }); emailjs.sendForm('service_aqwlsrn', 'template_mevjmdp', form.current, 'user_fkY78MeKQHllD5wrTnSOv').then((result) => { }, (error) => { }); } else { Axios.post("http://localhost:3001/create-pdf-travelPassNoVehicle", { tp_firstName: first_name, tp_middleName: middle_name == null ? "" : middle_name, tp_lastName: last_name, tp_suffix: suffix == null ? "" : suffix, tp_address: complete_address, tp_vehicle: vehicle, tp_destination: destination, tp_departureDate: departure_date, tp_purpose: purpose, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-travelPassNoVehicle", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Travel-Pass-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a few seconds. The certificate will automatically download.`, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }); Axios.put("http://localhost:3001/UpdateDocumentRequests", { update_requestId: request_id, update_documentType: document_type, update_dateToday: displaytodaysdate, }).then((response) => { }); emailjs.sendForm('service_aqwlsrn', 'template_mevjmdp', form.current, 'user_fkY78MeKQHllD5wrTnSOv').then((result) => { }, (error) => { }); } }
    const download_businessClearance = () => { const stringOnly_format = /^[a-zA-Z\s]*$/; if (!first_name || !last_name || !business_name || !business_address || !business_type || !business_status) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Generate Document", subtitle: "Are you sure you want to Generate this document? This request will be mark as processed.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => download_businessClearance_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const download_businessClearance_confirm = () => { setConfirmDialog({ ...confirmDialog, isOpen: !1 }); Axios.post("http://localhost:3001/create-pdf-businessClearance", { busC_firstName: first_name, busC_middleName: middle_name == null ? "" : middle_name, busC_lastName: last_name, busC_suffix: suffix == null ? "" : suffix, busC_businessName: business_name, busC_businessAddress: business_address, busC_businessType: business_type, busC_businessStatus: business_status, busC_processed_date: newDate_processed, }).then(() => Axios.get("http://localhost:3001/fetch-pdf-businessClearance", { responseType: 'blob' })).then((response) => { const pdfBlob = new Blob([response.data], { type: 'application/pdf' }); saveAs(pdfBlob, `Business-Clearance-${first_name + "_" + (middle_name == null ? "" : middle_name) + "_" + last_name + "" + (suffix == null ? "" : suffix)}.pdf`); }); setOpenPopup(false); setSuccessDialog({ isOpen: true, title: "Certificate Generated!", subtitle: `Please wait for a seconds. The certificate will automatically download.`, noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button>, }); Axios.put("http://localhost:3001/UpdateDocumentRequests", { update_requestId: request_id, update_documentType: document_type, update_dateToday: displaytodaysdate, }).then((response) => { }); emailjs.sendForm('service_aqwlsrn', 'template_mevjmdp', form.current, 'user_fkY78MeKQHllD5wrTnSOv').then((result) => { }, (error) => { }); }
    const update_coi = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/adminUpdateCOI", { updateCOI_firstName: first_name, updateCOI_middleName: middle_name, updateCOI_lastName: last_name, updateCOI_suffix: suffix, updateCOI_requestId: request_id, updateCOI_address: complete_address, updateCOI_yearsResided: years_resided, updateCOI_gender: sex, updateCOI_purpose: purpose === "Others" ? otherPurpose : purpose, }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Updated Success!", subtitle: "Request updated successfully.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }); setOpenPopup(false) } else { setErrorDialog({ isOpen: true, title: "Something Went Wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const update_bc = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/adminUpdateBC", { updateBC_firstName: first_name, updateBC_middleName: middle_name, updateBC_lastName: last_name, updateBC_suffix: suffix, updateBC_requestId: request_id, updateBC_businessName: business_name, updateBC_businessAddress: business_address, updateBC_businessType: business_type, updateBC_businessStatus: business_status, }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Updated Success!", subtitle: "Request updated successfully.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }); setOpenPopup(false) } else { setErrorDialog({ isOpen: true, title: "Something Went Wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const update_brgyid = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/adminUpdateBrgyID", { updateBID_firstName: first_name, updateBID_middleName: middle_name, updateBID_lastName: last_name, updateBID_suffix: suffix, updateBID_address: complete_address, updateBID_gender: sex, updateBID_purpose: purpose === "Others" ? otherPurpose : purpose, updateBID_requestId: request_id, updateBID_birthdate: moment(birthdate).format('YYYY-MM-DD'), updateBID_contactPerson: contact_person, updateBID_contactAddress: contact_address, updateBID_contactContact: contact_contact }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Updated Success!", subtitle: "Request updated successfully.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }); setOpenPopup(false) } else { setErrorDialog({ isOpen: true, title: "Something Went Wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const update_gm = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.post("http://localhost:3001/adminUpdateGM", { updateGM_firstName: first_name, updateGM_middleName: middle_name, updateGM_lastName: last_name, updateGM_suffix: suffix, updateGM_address: complete_address, updateGM_gender: sex, updateGM_purpose: purpose === "Others" ? otherPurpose : purpose, updateGM_requestId: request_id, }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Updated Success!", subtitle: "Request updated successfully.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Something Went Wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const update_tp = () => { setConfirmDialog({ ...confirmDialog, isOpen: false }); Axios.put("http://localhost:3001/adminUpdateTP", { updateTP_firstName: first_name, updateTP_middleName: middle_name, updateTP_lastName: last_name, updateTP_suffix: suffix, updateTP_address: complete_address, updateTP_gender: sex, updateTP_vehicle: vehicle, updateTP_vehicleType: vehicle_type, updateTP_plateNo: plate_no, updateTP_destination: destination, updateTP_departureDate: departure_date, updateTP_purpose: purpose === "Others" ? otherPurpose : purpose, updateTP_requestID: request_id, }).then((response) => { if (response.data.msg) { setSuccessDialog({ isOpen: true, title: "Updated Success!", subtitle: "Request updated successfully.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Something Went Wrong.", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) }
    const save_changes = () => { const numberOnly_format = /^\d+$/; const stringOnly_format = /^[a-zA-Z\s]*$/; const contact_format = /^(09|\+639)\d{9}$/; if (document_type === "Certificate Of Indigency") { if (!first_name || !last_name || !complete_address || !years_resided || !purpose || !date_requested) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!numberOnly_format.test(String(years_resided))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Years Resided should be a Number.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want update the information of this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_coi()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Business Clearance") { if (!last_name || !first_name || !business_name || !business_address || !business_type || !business_status || !date_requested) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "All required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want update the information of this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_bc()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Barangay ID") { if (!last_name || !first_name || !complete_address || !sex || !birthdate || !purpose || !contact_person || !contact_address || !contact_contact) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase()) || !stringOnly_format.test(String(contact_person).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!contact_format.test(String(contact_contact))) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Incorrect Contact Number format.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want update the information of this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_brgyid()} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Good Moral") { if (!last_name || !first_name || !complete_address || !sex || !purpose || !date_requested) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want update the information of this request? Hotdog", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={update_gm} className="alert_yesBtn"> Yes </button> }) } } else if (document_type === "Travel Pass") { if (!last_name || !first_name || !complete_address || !vehicle || !destination || !departure_date || !purpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (!stringOnly_format.test(String(first_name).toLowerCase()) || !stringOnly_format.test(String(middle_name).toLowerCase()) || !stringOnly_format.test(String(last_name).toLowerCase()) || !stringOnly_format.test(String(suffix).toLowerCase())) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Name should contain alphabets only.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else if (purpose === "Others" && !otherPurpose) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Required fields must not be empty.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Confirmation", subtitle: "Are you sure you want update the information of this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => update_tp()} className="alert_yesBtn"> Yes </button> }) } } }
    const decline_request = () => { if (!remarks) { setErrorDialog({ isOpen: true, title: "Input Error!", subtitle: "Please state the reason why you want to decline this request.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setConfirmDialog({ isOpen: true, title: "Decline Request", subtitle: "Are you sure you want decline this request?", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => decline_request_confirm()} className="alert_yesBtn"> Yes </button> }) } }
    const decline_request_confirm = () => { if (document_type === "Good Moral") { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/declineGM", { declineGM_id: request_id, declineGM_date: displaytodaysdate, declineGM_remarks: remarks }).then((response) => { if (response.data.success) { setOpenPopup(false); setDecline(false); setSuccessDialog({ isOpen: true, title: "Decline Request", subtitle: "Document successfully declined.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connnection Error", subtitle: "Please reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) } else if (document_type === "Certificate Of Indigency") { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/declineCOI", { declineCOI_id: request_id, declineCOI_date: displaytodaysdate, declineCOI_remarks: remarks }).then((response) => { if (response.data.msg) { setOpenPopup(false); setDecline(false); setSuccessDialog({ isOpen: true, title: "Decline Request", subtitle: "Document successfully declined.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connnection Error", subtitle: "Please reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) } else if (document_type === "Travel Pass") { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/declineTP", { declineTP_id: request_id, declineTP_date: displaytodaysdate, declineTP_remarks: remarks }).then((response) => { if (response.data.msg) { setOpenPopup(false); setDecline(false); setSuccessDialog({ isOpen: true, title: "Decline Request", subtitle: "Document successfully declined.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connnection Error", subtitle: "Please reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) } else if (document_type === "Business Clearance") { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/declineBC", { declineBC_id: request_id, declineBC_date: displaytodaysdate, declineBC_remarks: remarks }).then((response) => { }); setOpenPopup(false); setDecline(false); setSuccessDialog({ isOpen: true, title: "Success.", subtitle: "Document successfully declined.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> }) } else if (document_type === "Barangay ID") { setConfirmDialog({ ...confirmDialog, isOpen: false, }); Axios.put("http://localhost:3001/declineBrgyId", { declineBrgyId: request_id, declineBrgyId_date: displaytodaysdate, declineBrgyId_remarks: remarks }).then((response) => { if (response.data.success) { setOpenPopup(false); setDecline(false); setSuccessDialog({ isOpen: true, title: "Decline Request", subtitle: "Document successfully declined.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> },) } else if (response.data.err) { setErrorDialog({ isOpen: true, title: "Something went wrong", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } else { setErrorDialog({ isOpen: true, title: "Connnection Error", subtitle: "Please reconnect again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> }) } }) } }


    const approve_brgyId = () => {
        setConfirmDialog({ isOpen: true, title: "Approve Request", subtitle: "Are you sure you want to approve this Barangay ID request.", noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>, yesButton: <button onClick={() => approve_brgyId_confirmed()} className="alert_yesBtn"> Yes </button> })
    }
    const approve_brgyId_confirmed = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false, });
        Axios.put("http://localhost:3001/ApproveBrgyId", {
            approve_brgyId: request_id,
            approve_date: displaytodaysdate
        }).then((response) => {
            if (response.data.success) {
                setSuccessDialog({ isOpen: true, title: "Success.", subtitle: "Document successfully approved.", noButton: <button onClick={() => refresh()} className="alert_backBtn">Back</button> })
            } else if (response.data.err) {
                setErrorDialog({ isOpen: true, title: response.data.err, subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> })
            } else {
                setErrorDialog({ isOpen: true, title: "Connnection Error", subtitle: "Please check your connection and try again.", noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button> })
            }
        })
    }
    return (
        <div>
            <SuccessDialog
                successDialog={successDialog}
                setSuccessDialog={setSuccessDialog}
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
            <LoginAuthPop
                errorDialog={errorDialog}
                setErrorDialog={setErrorDialog}
            />
            <Decline
                title="Decline Request"
                openPopup={decline}
                setOpenPopup={setDecline}
            >

                <div className="wrapper" id="wrapper_profile">

                    <div className="generate_certificate_title">

                        <h1>Decline Request</h1>
                    </div>
                    <div className="forms">

                        <div className="input_fields">

                            <label>
                                Remarks<span className="text-danger">*</span>
                            </label>
                            <textarea
                                type="text"
                                className="textarea"
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                        <div className="input_fields" id="mobile_hidden">

                            <input
                                type="submit"
                                value="Confirm Decline"
                                className="editProfile_btn"
                                onClick={decline_request}
                            />
                        </div>
                    </div>
                </div>
            </Decline>
            <PopUp
                title="Generate Document"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <div className="generate-certificate-body">

                    <div className="generate-certificate-container">
                        {document_type === "Certificate Of Indigency" ? (
                            <div>

                                <div className="wrapper" id="wrapper_profile">

                                    <div className="generate_certificate_title">

                                        <h1> Certificate Of Indigency Request </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                First Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={middle_name}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={complete_address}
                                                onChange={(e) => setCompleteAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Gender<span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={sex}
                                                    onChange={(e) => {
                                                        setSex(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Years Resided in the Barangay
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={years_resided}
                                                onChange={(e) => setYearsResided(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Purpose <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    defaultValue={purpose}
                                                    disabled={click ? "" : "disabled"}
                                                    onChange={(e) => {
                                                        setPurpose(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="All Legal Intents and Purposes">
                                                        All Legal Intents and Purposes
                                                    </option>
                                                    <option value="Applying A Job">
                                                        Applying A Job
                                                    </option>
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
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={purpose}
                                                    onChange={(e) => {
                                                        setOtherPurpose(e.target.value);
                                                    }}
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
                                        <div className="input_fields">

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                disabled
                                                defaultValue={date_requested}
                                                onChange={(e) => setDateRequested(e.target.value)}
                                            />
                                        </div>
                                        <form ref={form}>

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                value={email}
                                                name="email"
                                            />
                                        </form>
                                        {click ? (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Save Changes"
                                                        className="editProfile_btn"
                                                        onClick={save_changes}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Back"
                                                        className="editProfile_btn"
                                                        onClick={back}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Generate Document"
                                                        className="editProfile_btn"
                                                        onClick={download_coi}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Decline Request"
                                                        className="editProfile_btn"
                                                        onClick={decline_popup}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Edit Request"
                                                        className="editProfile_btn"
                                                        onClick={edit}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {document_type === "Barangay ID" ? (
                            <div>

                                <div className="wrapper" id="wrapper_profile">

                                    <div className="generate_certificate_title">

                                        <h1> Barangay ID Request </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                First Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={middle_name}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={complete_address}
                                                onChange={(e) => setCompleteAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Gender<span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={sex}
                                                    onChange={(e) => {
                                                        setSex(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        {click ? (
                                            <div className="input_fields">

                                                <label>
                                                    Birthdate<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={moment(birthdate).format('YYYY-MM-DD')}
                                                    onChange={(e) => setBirthdate(e.target.value)}
                                                    max={moment().format('YYYY-MM-DD')}
                                                />
                                            </div>
                                        ) : (
                                            <div className="input_fields">

                                                <label>Birthdate</label>
                                                <p className="inputs">
                                                    <Moment format={"MMMM DD, YYYY"} date={birthdate} />
                                                </p>
                                            </div>
                                        )}
                                        <div className="input_fields">
                                            <label>
                                                Birthplace
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={birthplace}
                                                onChange={(e) => {
                                                    setBirthplace(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Civil Status
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}

                                                defaultValue={civilStatus}
                                                onChange={(e) => {
                                                    setCivilStatus(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                SSS No.
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                defaultValue={sss}
                                                disabled={click ? "" : "disabled"}

                                                onChange={(e) => {
                                                    setSSS(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                TIN No.
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                defaultValue={tin}
                                                disabled={click ? "" : "disabled"}
                                                onChange={(e) => {
                                                    setTIN(e.target.value);
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="input_fields">
                                            <label>
                                                Purpose <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    defaultValue={purpose}
                                                    disabled={click ? "" : "disabled"}
                                                    onChange={(e) => {
                                                        setPurpose(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="All Legal Intents and Purposes">
                                                        All Legal Intents and Purposes
                                                    </option>
                                                    <option value="Applying A Job">
                                                        Applying A Job
                                                    </option>
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
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={purpose}
                                                    onChange={(e) => {
                                                        setOtherPurpose(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <p className="person_to_contact">

                                            Person to contact in case of emergency
                                        </p>
                                        <div className="input_fields">

                                            <label>
                                                Full Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={contact_person}
                                                onChange={(e) => setContactPerson(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={contact_address}
                                                onChange={(e) => setContactAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Contact No<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={contact_contact}
                                                onChange={(e) => setContactContact(e.target.value)}
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
                                        <div className="input_fields">

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                disabled
                                                defaultValue={date_requested}
                                                onChange={(e) => setDateRequested(e.target.value)}
                                            />
                                        </div>
                                        <form ref={form}>

                                            <input
                                                type="text"
                                                className="inputs"
                                                value={email}
                                                hidden
                                                name="email"
                                            />
                                        </form>
                                        {click ? (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Save Changes"
                                                        className="editProfile_btn"
                                                        onClick={save_changes}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Back"
                                                        className="editProfile_btn"
                                                        onClick={back}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Approve Request"
                                                        onClick={approve_brgyId}
                                                        className="editProfile_btn"
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Decline Request"
                                                        className="editProfile_btn"
                                                        onClick={decline_popup}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Edit Request"
                                                        className="editProfile_btn"
                                                        onClick={edit}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {document_type === "Good Moral" ? (
                            <div>

                                <div className="wrapper" id="wrapper_profile">

                                    <div className="generate_certificate_title">

                                        <h1> Good Moral Request </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                First Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={middle_name}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={complete_address}
                                                onChange={(e) => setCompleteAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Gender<span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={sex}
                                                    onChange={(e) => {
                                                        setSex(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Purpose <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    defaultValue={purpose}
                                                    disabled={click ? "" : "disabled"}
                                                    onChange={(e) => {
                                                        setPurpose(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="All Legal Intents and Purposes">
                                                        All Legal Intents and Purposes
                                                    </option>
                                                    <option value="Applying A Job">
                                                        Applying A Job
                                                    </option>
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
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={purpose}
                                                    onChange={(e) => {
                                                        setOtherPurpose(e.target.value);
                                                    }}
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
                                        <div className="input_fields">

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                disabled
                                                defaultValue={date_requested}
                                                onChange={(e) => setDateRequested(e.target.value)}
                                            />
                                        </div>
                                        <form ref={form}>

                                            <input
                                                type="text"
                                                className="inputs"
                                                value={email}
                                                hidden
                                                name="email"
                                            />
                                        </form>
                                        {click ? (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Save Changes"
                                                        className="editProfile_btn"
                                                        onClick={save_changes}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Back"
                                                        className="editProfile_btn"
                                                        onClick={back}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Generate Document"
                                                        className="editProfile_btn"
                                                        onClick={download_goodMoral}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Decline Request"
                                                        className="editProfile_btn"
                                                        onClick={decline_popup}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Edit Request"
                                                        className="editProfile_btn"
                                                        onClick={edit}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {document_type === "Business Clearance" ? (
                            <div>

                                <div className="wrapper" id="wrapper_profile">

                                    <div className="generate_certificate_title">

                                        <h1> Business Clearance Request </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                First Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={middle_name}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Name of Business<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={business_name}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Business Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={business_address}
                                                onChange={(e) => setBusinessAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Type of Business<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={business_type}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Business Status
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={business_status}
                                                    onChange={(e) => {
                                                        setBusinessStatus(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="New">New</option>
                                                    <option value="Renewal">Renewal</option>
                                                </select>
                                            </div>
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
                                        <div className="input_fields">

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                disabled
                                                defaultValue={date_requested}
                                                onChange={(e) => setDateRequested(e.target.value)}
                                            />
                                        </div>
                                        <form ref={form}>

                                            <input
                                                type="text"
                                                className="inputs"
                                                value={email}
                                                hidden
                                                name="email"
                                            />
                                        </form>
                                        {click ? (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Save Changes"
                                                        className="editProfile_btn"
                                                        onClick={save_changes}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Back"
                                                        className="editProfile_btn"
                                                        onClick={back}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Generate Document"
                                                        className="editProfile_btn"
                                                        onClick={download_businessClearance}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Decline Request"
                                                        className="editProfile_btn"
                                                        onClick={decline_popup}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Edit Request"
                                                        className="editProfile_btn"
                                                        onClick={edit}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {document_type === "Travel Pass" ? (
                            <div>

                                <div className="wrapper" id="wrapper_profile">

                                    <div className="generate_certificate_title">

                                        <h1> Travel Pass Request </h1>
                                    </div>
                                    <div className="forms">

                                        <div className="input_fields">

                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                First Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={middle_name}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>Suffix</label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                            />
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="textarea"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={complete_address}
                                                onChange={(e) => setCompleteAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="input_fields">

                                            <label>
                                                Do you have a vehicle?
                                                <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={vehicle}
                                                    onChange={(e) => {
                                                        setVehicle(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        {vehicle === "Yes" ? (
                                            <>

                                                <div className="input_fields">

                                                    <label>
                                                        Vehicle Type<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        disabled={click ? "" : "disabled"}
                                                        defaultValue={vehicle_type}
                                                        onChange={(e) => setVehicleType(e.target.value)}
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>
                                                        Plate No.<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        disabled={click ? "" : "disabled"}
                                                        defaultValue={plate_no}
                                                        onChange={(e) => setPlateNo(e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        <div className="input_fields">

                                            <label>
                                                Destination<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="inputs"
                                                disabled={click ? "" : "disabled"}
                                                defaultValue={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                            />
                                        </div>
                                        {click ? (
                                            <div className="input_fields">

                                                <label>
                                                    Departure Date<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="inputs"
                                                    disabled={click ? "" : "disabled"}
                                                    min={moment().format("YYYY-MM-DD")}
                                                    defaultValue={departure_date}
                                                    onChange={(e) => setDepartureDate(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="input_fields">

                                                <label>Date Created</label>
                                                <p className="inputs">
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={departure_date}
                                                    />
                                                </p>
                                            </div>
                                        )}
                                        <div className="input_fields">

                                            <label>
                                                Purpose <span className="required_symbol">*</span>
                                            </label>
                                            <div className="custom_select">

                                                <select
                                                    className="inputs"
                                                    defaultValue={purpose}
                                                    disabled={click ? "" : "disabled"}
                                                    onChange={(e) => {
                                                        setPurpose(e.target.value);
                                                    }}
                                                >

                                                    <option value="">Select</option>
                                                    <option value="All Legal Intents and Purposes">
                                                        All Legal Intents and Purposes
                                                    </option>
                                                    <option value="Applying A Job">
                                                        Applying A Job
                                                    </option>
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
                                                    disabled={click ? "" : "disabled"}
                                                    defaultValue={purpose}
                                                    onChange={(e) => {
                                                        setOtherPurpose(e.target.value);
                                                    }}
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
                                        <div className="input_fields">

                                            <input
                                                type="text"
                                                className="inputs"
                                                hidden
                                                disabled
                                                defaultValue={date_requested}
                                                onChange={(e) => setDateRequested(e.target.value)}
                                            />
                                        </div>
                                        <form ref={form}>

                                            <input
                                                type="text"
                                                className="inputs"
                                                value={email}
                                                hidden
                                                name="email"
                                            />
                                        </form>
                                        {click ? (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Save Changes"
                                                        className="editProfile_btn"
                                                        onClick={save_changes}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Back"
                                                        className="editProfile_btn"
                                                        onClick={back}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Generate Document"
                                                        className="editProfile_btn"
                                                        onClick={download_travelPass}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Decline Request"
                                                        className="editProfile_btn"
                                                        onClick={decline_popup}
                                                    />
                                                </div>
                                                <div className="input_fields" id="mobile_hidden">

                                                    <input
                                                        type="submit"
                                                        value="Edit Request"
                                                        className="editProfile_btn"
                                                        onClick={edit}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </PopUp>
            <TableContainer component={Paper} className={classes.tableContainer}>

                <Table className={classes.table} aria-label="simple table">

                    <TableHead>

                        <TableRow className={classes.tableRow}>

                            <TableCell className={classes.tableHeaderCell}>
                                Last Name
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                First Name
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                Middle Name
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                Type of Document
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                Status
                            </TableCell>
                            <TableCell
                                className={classes.tableHeaderCell}
                                id="mobile_hidden"
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow>

                                        <TableCell
                                            key={index[0]}
                                            onClick={() =>
                                                openInPopup(
                                                    row.vehicle,
                                                    row.request,
                                                    row.document_type,
                                                    row.date_requested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.bdate,
                                                    row.civil_status,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.years_resided,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.email,
                                                    row.birthplace,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                            id="last_name"
                                        >

                                            <Typography key={index[1]} className={classes.name}>
                                                {row.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            key={index[2]}
                                            onClick={() =>
                                                openInPopup(
                                                    row.vehicle,
                                                    row.request,
                                                    row.document_type,
                                                    row.date_requested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.bdate,
                                                    row.civil_status,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.years_resided,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.email,
                                                    row.birthplace,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Typography key={index[3]} className={classes.name}>
                                                {row.first_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            key={index[4]}
                                            onClick={() =>
                                                openInPopup(
                                                    row.vehicle,
                                                    row.request,
                                                    row.document_type,
                                                    row.date_requested,
                                                    row.purpose,
                                                    row.first_name,
                                                    row.middle_name,
                                                    row.last_name,
                                                    row.suffix,
                                                    row.address,
                                                    row.gender,
                                                    row.bdate,
                                                    row.civil_status,
                                                    row.contact_person,
                                                    row.contact_address,
                                                    row.contact_contact,
                                                    row.business_name,
                                                    row.business_address,
                                                    row.business_type,
                                                    row.business_status,
                                                    row.years_resided,
                                                    row.vehicle_type,
                                                    row.plate_no,
                                                    row.destination,
                                                    row.departure_date,
                                                    row.email,
                                                    row.birthplace,
                                                    row.SSS,
                                                    row.TIN
                                                )
                                            }
                                        >

                                            <Typography key={index[5]} className={classes.name}>
                                                {row.middle_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell key={index[6]} className={classes.tableCell}>
                                            {row.document_type === 5
                                                ? "Travel Pass"
                                                : "" || row.document_type === 4
                                                    ? "Good Moral"
                                                    : "" || row.document_type === 3
                                                        ? "Barangay ID"
                                                        : "" || row.document_type === 2
                                                            ? "Business Clearance"
                                                            : "" || row.document_type === 1
                                                                ? "Certificate Of Indigency"
                                                                : ""}
                                        </TableCell>
                                        <TableCell>

                                            <Typography
                                                key={index[7]}
                                                className={classes.status}
                                                style={{
                                                    backgroundColor:
                                                        (row.status === "Processed" && "green") ||
                                                        (row.status === "Pending" && "#F29339") ||
                                                        (row.status === "Declined" && "red"),
                                                }}
                                            >
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell key={index[8]} id="mobile_hidden">

                                            <button
                                                className="view_edit"
                                                onClick={() =>
                                                    openInPopup(
                                                        row.vehicle,
                                                        row.request,
                                                        row.document_type,
                                                        row.date_requested,
                                                        row.purpose,
                                                        row.first_name,
                                                        row.middle_name,
                                                        row.last_name,
                                                        row.suffix,
                                                        row.address,
                                                        row.gender,
                                                        row.bdate,
                                                        row.civil_status,
                                                        row.contact_person,
                                                        row.contact_address,
                                                        row.contact_contact,
                                                        row.business_name,
                                                        row.business_address,
                                                        row.business_type,
                                                        row.business_status,
                                                        row.years_resided,
                                                        row.vehicle_type,
                                                        row.plate_no,
                                                        row.destination,
                                                        row.departure_date,
                                                        row.email,
                                                        row.birthplace,
                                                        row.SSS,
                                                        row.TIN
                                                    )
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="view_edit"
                                                style={{ background: "#0061a8" }}
                                                onClick={() =>
                                                    deleteDialog(row.request, row.document_type)
                                                }
                                            >

                                                <FaArchive />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                    <TableFooter>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="span"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            className={classes.tablePagination}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PendingTable