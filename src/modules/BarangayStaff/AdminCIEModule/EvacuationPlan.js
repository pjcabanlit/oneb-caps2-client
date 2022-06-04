import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { IoIosAdd } from 'react-icons/io';
import PopUp from '../../../components/Dialog/PopUp';
import { Container, BoxUpload, ImagePreview } from "../../../components/Styled/ImageStyle";
import FolderIcon from "../../../images/folder_icon_transparent.png";
import CloseIcon from "../../../svg/CloseIcon.svg";
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog'
import SuccessDialog from '../../../components/Dialog/SuccessDialog'
import LoginAuthPop from '../../../components/Dialog/LoginAuthPop'
import ViewEditDialog from '../../../components/Dialog/ViewEditDialog'
import AdminNavbar from '../AdminHome/AdminNavbar';
import AdminSidebar from '../AdminHome/AdminSidebar';
import "./EvacuationPlan.css"

function EvacuationPlan() {
    Axios.defaults.withCredentials = true;
    const [viewEditDialog, setViewEditDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', subtitle: '', yesButton: '', noButton: '' });
    const [openPopup, setOpenPopup] = useState("")

    const [sideBarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const [click, setClick] = useState(false);

    const back = () => {
        setClick(false)

    }

    const refresh = () => {
        setSuccessDialog({
            ...successDialog,
            isOpen: false,
        });
        window.location.reload()
    };

    const [isUploaded, setIsUploaded] = useState(true);
    const [postImage, setPostImage] = useState("");
    const [evacPlan, setEvacPlan] = useState([]);
    const [erase, setErase] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/GetBrgyEvacuationPlan").then((response) => {
            setEvacPlan(response.data);
        })
    }, [])

    const openInPopup = () => {
        setOpenPopup(true)
    }

    function insertData(image) {
        setPostImage(image)
    }

    const edit = () => {
        setClick(true)
        evacPlan.map((row) => (
            insertData(row.evac_image)))
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

    const handleFileUpload = async (e) => {
        if (!isUploaded) {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            setPostImage(base64);
            setIsUploaded(true);
        }
    };

    const add_evacuation_confirm = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        Axios.put("http://localhost:3001/UpdateEvacuationPlan", {
            uep_evacPlan: postImage,

        }).then((response) => {

        });
        setSuccessDialog({
            isOpen: true,
            title: "Updated Success!",
            subtitle: "Official Information updated successfully.",
            noButton: (
                <button onClick={() => refresh()} className="alert_backBtn">
                    Back
                </button>
            ),
        });
    }

    const add_evacuation = () => {
        if (!postImage) {
            setErrorDialog({
                isOpen: true,
                title: "Input Error!",
                subtitle: "Please insert evacuation map.",
                noButton: <button onClick={() => setErrorDialog({ ...errorDialog, isOpen: false })} className="alert_backBtn">Back</button>
            })
        } else {
            setConfirmDialog({
                isOpen: true,
                title: "Confirmation",
                subtitle: "Are you sure you want edit to Evacuation Map?",
                noButton: <button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} className="alert_noBtn">No</button>,
                yesButton: <button onClick={() => add_evacuation_confirm()} className="alert_yesBtn"> Yes </button>
            })
        }
    }

    return (
        <div className="adminHome_container">
            <AdminNavbar sidebarOpen={sideBarOpen} openSidebar={openSidebar} />
            <AdminSidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
            <main>
                <ViewEditDialog viewEditDialog={viewEditDialog} setViewEditDialog={setViewEditDialog} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                <SuccessDialog successDialog={successDialog} setSuccessDialog={setSuccessDialog} />
                <LoginAuthPop errorDialog={errorDialog} setErrorDialog={setErrorDialog} />

                <PopUp title="Edit Evacuation Map" maxWidth="xl" openPopup={openPopup} setOpenPopup={setOpenPopup}  >
                    {evacPlan.map((row) => (
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
                                                onClick={() => {
                                                    setIsUploaded(false);
                                                    setErase(true);

                                                }}
                                            /> :
                                                ""
                                            }


                                            {!erase && row.evac_image != null ? (
                                                <img
                                                    id="uploaded-image"
                                                    src={
                                                        `data:image/jpeg;base64,${Buffer.from(
                                                            row.evac_image
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
                                            )}

                                        </ImagePreview>
                                    )}
                                </div>
                            </BoxUpload>
                        </Container>
                    ))}

                    {click ?
                        <>
                            <br />
                            <div className="add_resident_container_footer" id="mobile_hidden">
                                <div className="forms" id="inputfields_profile">
                                    <div className="input_fields" >
                                        <input type="submit" value="Submit" className="btn" onClick={add_evacuation} />
                                    </div>
                                </div>
                            </div>
                            <div className="add_resident_container_footer" id="mobile_hidden">
                                <div className="forms" id="inputfields_profile">
                                    <div className="input_fields" >
                                        <input type="submit" className="btn" value="Back" onClick={back} />
                                    </div>
                                </div>
                            </div>

                        </>
                        :
                        <>
                            <br />
                            <div className="add_resident_container_footer" id="mobile_hidden">
                                <div className="forms" id="inputfields_profile">
                                    <div className="input_fields" >
                                        <input type="submit" value="Edit" className="btn" onClick={edit} />
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </PopUp>
                <div className="evacuation_plan">
                    <div className="certificate_request">
                        <div className="process_request_container">
                            <div className="adminhome_titles">
                                <h1>Manage Evacuation Plan</h1>
                                <hr />
                            </div>
                            <div className="resident_tbl_header">

                                <div className="new_resident_btn_container">
                                    <button className="new_resident_btn" onClick={openInPopup} ><IoIosAdd className="btn_icon" />Edit Evacuation Map</button>
                                </div>

                                {evacPlan.map((row) => (
                                    <div className="evac_image">
                                        <img
                                            id="uploaded-image"
                                            src={
                                                `data:image/jpeg;base64,${Buffer.from(row.evac_image)}`
                                            }
                                            draggable={false}
                                            alt="uploaded-img"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div>
    )
}

export default EvacuationPlan