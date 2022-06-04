import React, { useState, useRef } from "react";
import PopUp from "../../components/Dialog/PopUp";
import { useHistory } from "react-router-dom";
import Helm from "../../components/Helmet/Helmet";
import SuccessDialog from "../../components/Dialog/SuccessDialog";
import LoginAuthPop from "../../components/Dialog/LoginAuthPop";
import "./ForgotAccount.css";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Grid,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import Decline from "../../components/Dialog/Decline";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_fkY78MeKQHllD5wrTnSOv");
const useStyles = makeStyles((theme) => ({
    table: { minWidth: 200 },
    tableContainer: { maxWidth: 1175, borderRadius: 0 },
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
    tableCell: {
        fontFamily: "Montserrat, sans-serif",
        cursor: "pointer",
        fontSize: "15px",
    },
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
    pagination: { overflow: "hidden" },
}));
const ForgotPassword = () => {
    const history = useHistory(),
        classes = useStyles(),
        [confirmDialog, setConfirmDialog] = useState({
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
            noButton: "",
        }),
        [email, setEmail] = useState(""),
        [openPopup, setOpenPopup] = useState(!1),
        [decline, setDecline] = useState(!1),
        [username, setUsername] = useState([]),
        [accountId, setAccountId] = useState(""),
        [changePass, setChangePass] = useState(!1),
        [recoveryCode, setRecoveryCode] = useState(""),
        [gg, setGG] = useState(makeid(5)),
        form = useRef(),
        [newPass, setNewPass] = useState(""),
        [confPass, setConfPass] = useState(""),
        backToLogin = () => {
            history.push("/login");
        },
        email_format =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        pswrdValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const onSubmit = () => {
        if (!email) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Please enter your email.",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else if (!email_format.test(String(email).toLowerCase())) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Incorrect E-mail format.",
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
            axios
                .get(`http://localhost:3001/findAccount/${email}`)
                .then((response) => {
                    if (response.data.foundAcc) {
                        setOpenPopup(true);
                        setUsername(response.data.result);
                    } else {
                        setErrorDialog({
                            isOpen: true,
                            title: "Not Found.",
                            subtitle: "Account Doesn't Exist. Please try again.",
                            noButton: (
                                <button
                                    onClick={() =>
                                        setErrorDialog({ ...errorDialog, isOpen: false })
                                    }
                                    className="alert_backBtn"
                                >
                                    Back
                                </button>
                            ),
                        });
                    }
                });
        }
    };
    const sendEmail = (account_id) => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        emailjs
            .sendForm(
                "service_aqwlsrn",
                "template_1m26mcc",
                form.current,
                "user_fkY78MeKQHllD5wrTnSOv"
            )
            .then(
                (result) => { },
                (error) => { }
            );
        axios
            .post("http://localhost:3001/sendCodes", {
                code: gg,
                account_id: account_id,
            })
            .then((response) => { });
        setOpenPopup(false);
        setDecline(true);
    };
    const myAccount = (account_id) => {
        setAccountId(account_id);
        setConfirmDialog({
            isOpen: true,
            title: "Send Recovery Code",
            subtitle: "Are you sure you want to send recovery code for this account?",
            noButton: (
                <button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    className="alert_noBtn"
                >
                    No
                </button>
            ),
            yesButton: (
                <button onClick={() => sendEmail(account_id)} className="alert_yesBtn">

                    Yes
                </button>
            ),
        });
    };
    function makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const recover_account = () => {
        axios
            .post("http://localhost:3001/CompareRecoveryCode", {
                account_id: accountId,
                hashCode: recoveryCode,
            })
            .then((response) => {
                if (response.data.recovered) {
                    setChangePass(true);
                    axios
                        .delete(`http://localhost:3001/DeleteSafeCode/${accountId}`)
                        .then((response) => { });
                } else {
                    setErrorDialog({
                        isOpen: true,
                        title: "Error",
                        subtitle: "Code Doesn't Match.",
                        noButton: (
                            <button
                                onClick={() =>
                                    setErrorDialog({ ...errorDialog, isOpen: false })
                                }
                                className="alert_backBtn"
                            >
                                Back
                            </button>
                        ),
                    });
                }
            });
    };
    const change_password = () => {
        if (!newPass || !confPass) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error",
                subtitle: "Required fields must not be empty.",
                noButton: (
                    <button
                        onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })}
                        className="alert_backBtn"
                    >
                        Back
                    </button>
                ),
            });
        } else if (!pswrdValidation.test(String(newPass))) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle:
                    "Password minimum of 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
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
                title: "Input Error!",
                subtitle: "Password doesn't match.",
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
                title: "Change Password",
                subtitle: "Are you sure you want to change your password?",
                noButton: (
                    <button
                        onClick={() =>
                            setConfirmDialog({ ...confirmDialog, isOpen: false })
                        }
                        className="alert_noBtn"
                    >
                        No
                    </button>
                ),
                yesButton: (
                    <button
                        onClick={() => change_password_confirm()}
                        className="alert_yesBtn"
                    >

                        Yes
                    </button>
                ),
            });
        }
    };
    const change_password_confirm = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        axios
            .put("http://localhost:3001/RecoverChangePassword", {
                chngPw: newPass,
                accId: accountId,
            })
            .then((response) => { });
        setDecline(false);
        setSuccessDialog({
            isOpen: true,
            title: "Password Changed Successfully.",
            subtitle: "",
            noButton: (
                <button onClick={() => backToLogin()} className="alert_noBtn">
                    Back to Login
                </button>
            ),
        });
    };
    return (
        <div className="login_body_forgotAcc">
            <Helm title={`Forgot Account | One Barangay`} />
            <Decline
                title={changePass ? `Change Password` : `Enter Recovery Code`}
                openPopup={decline}
                setOpenPopup={setDecline}
            >
                {changePass ? (
                    <>

                        <div className="wrapper" id="login_body_wrapper">

                            <div className="verify_title">

                                <p style={{ marginBottom: "1rem" }}>
                                    Please enter your new password:
                                </p>
                            </div>
                            <div className="forms">

                                <div className="input_fields">

                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setNewPass(e.target.value)}
                                    />
                                </div>
                                <div className="input_fields">

                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setConfPass(e.target.value)}
                                    />
                                </div>
                                <div className="input_fields">

                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn"
                                        onClick={change_password}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>

                        <div className="wrapper" id="login_body_wrapper">

                            <div className="verify_title">

                                <p style={{ marginBottom: "1rem" }}>
                                    Please check your e-mail for the recovery code.
                                </p>
                            </div>
                            <div className="forms">

                                <div className="input_fields">

                                    <label>Enter Code:</label>
                                    <input
                                        type="text"
                                        className="inputs"
                                        autoComplete="off"
                                        onChange={(e) => setRecoveryCode(e.target.value)}
                                    />
                                </div>
                                <div className="input_fields">

                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn"
                                        onClick={recover_account}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Decline>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <PopUp
                title="Account Found!"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                maxWidth="xl"
            >
                <div className="forms">
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Grid item xs={12}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody className={classes.tableBody}>
                                    {username.map((row) => (
                                        <TableRow>

                                            <TableCell>

                                                <Grid container>

                                                    <Grid item lg={10}>

                                                        <Typography className={classes.name}>
                                                            {row.username}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                <button
                                                    className="account_btn"
                                                    onClick={() => myAccount(row.account_id)}
                                                >
                                                    This Is My Account
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </TableContainer>
                </div>
            </PopUp>
            <SuccessDialog
                successDialog={successDialog}
                setSuccessDialog={setSuccessDialog}
            />
            <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />
            <div>
                <div className="bg">

                    <div className="login_pad">

                        <div className="login_container">

                            <div className="login_wrapper">

                                <div className="login_title">
                                    <span>Find Your Account</span>
                                </div>
                                <div className="login_form">

                                    <p style={{ marginBottom: "1rem" }}>
                                        Please enter your e-mail to find your account.
                                    </p>
                                    <form ref={form}>

                                        <div className="login_row">

                                            <input
                                                type="text"
                                                placeholder="E-mail"
                                                name="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            className="inputs"
                                            hidden
                                            autoComplete="off"
                                            name="message"
                                            defaultValue={gg}
                                        />
                                    </form>
                                    <div className="login_row button">

                                        <input
                                            type="submit"
                                            value="Submit"
                                            onClick={onSubmit}
                                        />
                                    </div>
                                    <div className="login_row button">

                                        <input
                                            type="submit"
                                            value="Back"
                                            onClick={backToLogin}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;
