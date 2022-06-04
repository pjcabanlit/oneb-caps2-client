import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './MyProfile.css';
import Footer from './../../../components/Footer/Footer';
import Navbar from './../../../components/Navbar/Navbar';
import Helm from '../../../components/Helmet/Helmet';
import Accordion from '../../../components/Accordion/Accordion';
import { Container, BoxUpload, ImagePreview } from "./../../../components/Styled/ImageStyle";
import loading from '../../../assets/icons/loading.png';
import Moment from 'react-moment'
function MyProfile() {
    Axios.defaults.withCredentials = true;
    const [username, setUsername] = useState(""), [, setHouseholdId] = useState(""), [first_name, setFirstName] = useState(""), [middle_name, setMiddleName] = useState(""), [last_name, setLastName] = useState(""), [suffix, setPrefix] = useState(""), [contact, setContact] = useState(""), [gender, setSex] = useState(""), [email, setEmail] = useState(""), [BirthDate, setBirthdate] = useState(""), [birthplace, setPlaceOfBirth] = useState(""), [civil_status, setCivilStatus] = useState(""), [nationality, setNationality] = useState(""), [date_resided, setDateResided] = useState(""), [household_head, setHouseHoldHead] = useState(""), [rel_to_household, setRelationshipToHousehold] = useState(""), [disable, setDisable] = useState(""), [disable_kind, setDisableKind] = useState(""), [is_voter, setIsVoter] = useState(""), [occupation, setOccupation] = useState(""), [region, setRegion] = useState(""), [province, setProvince] = useState(""), [city, setCity] = useState(""), [city_district, setCityDistrict] = useState(""), [barangay, setBarangay] = useState(""), [street, setStreet] = useState(""), [number, setNumber] = useState(""), [postal, setPostal] = useState(""), [nameOfHouseholdHead, setNameOfHouseholdHead] = useState(""), [img, setProfileImage] = useState(""), [resident_id, setResidentId] = useState(""), postImage = "", [isLoading, setIsLoading] = useState(!1), history = useHistory(), [residence_years, setResidenceYears] = useState(""), edit_personalInfo = () => { history.push("/Edit-Personal-Information"); }, edit_address = () => { history.push("/Edit-Address-Information"); }, edit_account = () => { history.push("/EditAccount") }
    useEffect(() => {
        async function fetchLoading() { setIsLoading(!0); await Axios.get("http://localhost:3001/login").then((response) => { if (response.data.loggedIn === !0) { setResidentId(response.data.user[0].resident_id); setHouseholdId(response.data.user[0].household_id); setFirstName(response.data.user[0].first_name); setMiddleName(response.data.user[0].middle_name); setLastName(response.data.user[0].last_name); setPrefix(response.data.user[0].suffix); setContact(response.data.user[0].contact); setSex(response.data.user[0].gender); setEmail(response.data.user[0].email); setBirthdate(response.data.user[0].birthdate); setPlaceOfBirth(response.data.user[0].birthplace); setCivilStatus(response.data.user[0].civil_status); setNationality(response.data.user[0].nationality); setDateResided(response.data.user[0].date_resided); setHouseHoldHead(response.data.user[0].household_head); setRelationshipToHousehold(response.data.user[0].rel_to_household); setDisable(response.data.user[0].disable); setDisableKind(response.data.user[0].disability_kind); setIsVoter(response.data.user[0].is_voter); setOccupation(response.data.user[0].occupation); setRegion(response.data.user[0].region); setProvince(response.data.user[0].province); setCity(response.data.user[0].city); setBarangay(response.data.user[0].barangay); setPostal(response.data.user[0].postal); setUsername(response.data.user[0].username); setStreet(response.data.user[0].street_name); setResidenceYears(response.data.user[0].years_resided); setNumber(response.data.user[0].number); setCityDistrict(response.data.user[0].city_district); setNameOfHouseholdHead(response.data.user[0].householdhead_name); setProfileImage(response.data.user[0].image); setIsLoading(!1) } }); return () => { } }
        fetchLoading()
    }, [])
    return (
        <div className="MyProfile_container">
            <Helm title={`My Profile | One Barangay`} />
            <Navbar />
            <div>
                <div className="container">
                    <div className="loading_container">
                        {isLoading && (
                            <img src={loading} alt={loading} className="loading_icon" />
                        )}
                    </div>
                    {!resident_id ? (
                        <>

                            <div className="myprofile_notice_verification">

                                <p>
                                    Note: Fill up all the necessary information in your Profile
                                    for Barangay Resident verification.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>

                            <div className="myprofile_notice_verification">

                                <p>You are a verified Barangay Resident!</p>
                            </div>
                        </>
                    )}
                    <div className="row">

                        <div className="upper_profile" style={{ marginTop: "30px" }}>

                            <div className="MyProfile_img_container">

                                <Container>

                                    <BoxUpload>

                                        <div className="image-upload">

                                            <ImagePreview>
                                                {img != null ? (
                                                    <img
                                                        id="uploaded-image"
                                                        src={`data:image/jpeg;base64,${Buffer.from(img)}`}
                                                        draggable={false}
                                                        alt="uploaded-img"
                                                        className="img_content"
                                                    />
                                                ) : (
                                                    <img
                                                        id="uploaded-image"
                                                        src={`data:image/jpeg;base64,${Buffer.from(
                                                            postImage
                                                        )}`}
                                                        draggable={false}
                                                        alt="uploaded-img"
                                                    />
                                                )}
                                            </ImagePreview>
                                        </div>
                                    </BoxUpload>
                                </Container>
                            </div>
                            <div className="MyProfile_fullname">

                                <h1 className="FN" id="profile_name">
                                    {first_name}
                                </h1>
                                <h1 className="FN" id="profile_name">
                                    {middle_name}
                                </h1>
                                <h1 className="FN" id="profile_name">
                                    {last_name + " " + (suffix ? suffix : "")}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <Accordion title="Account Information">

                        <div className="personal_info">

                            <form>

                                <div className="container_fluid">

                                    <fieldset className="fieldset_container">

                                        <legend>

                                            <i className="fa fa-info-circle"></i> Account
                                            Information
                                        </legend>
                                        <div className="wrapper" id="wrapper_myprofile">

                                            <div className="forms" id="inputfields_profile">

                                                <div className="input_fields">

                                                    <label>Username:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={username}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </form>
                            <div className="editProfile_container">

                                <input
                                    type="submit"
                                    className="editProfile_btns"
                                    value="Edit"
                                    onClick={edit_account}
                                />
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Personal Information">

                        <div className="personal_info">

                            <form>

                                <div className="container_fluid">

                                    <fieldset className="fieldset_container">

                                        <legend>

                                            <i className="fa fa-info-circle"></i> Personal
                                            Information
                                        </legend>
                                        <div className="wrapper" id="wrapper_myprofile">

                                            <div className="forms" id="inputfields_profile">

                                                <div className="input_fields">

                                                    <label> First Name: </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        value={first_name}
                                                        required
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Middle Name: </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        value={middle_name}
                                                        required
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Last Name: </label>
                                                    <input
                                                        type="text"
                                                        value={last_name}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Suffix: </label>
                                                    <input
                                                        type="text"
                                                        value={suffix}
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Gender: </label>
                                                    <input
                                                        type="text"
                                                        value={gender}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Contact: </label>
                                                    <input
                                                        type="text"
                                                        value={contact}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> E-mail: </label>
                                                    <input
                                                        type="text"
                                                        value={email}
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Date Of Birth: </label>
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={BirthDate}
                                                        className="inputs"
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Place Of Birth: </label>
                                                    <input
                                                        type="text"
                                                        value={birthplace}
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Nationality: </label>
                                                    <input
                                                        type="text"
                                                        value={nationality}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Civil Status: </label>
                                                    <input
                                                        type="text"
                                                        value={civil_status}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Occupation: </label>
                                                    <input
                                                        type="text"
                                                        value={occupation}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="input_fields">
                                                    <label> Date Resided in the Brgy: </label>
                                                    <Moment
                                                        format={"MMMM DD, YYYY"}
                                                        date={date_resided}
                                                        className="inputs"
                                                    />
                                                </div>
                                                <div className="input_fields">
                                                    <label> Total Years Residing in the Brgy: </label>
                                                    <input
                                                        type="text"
                                                        value={residence_years}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Person With Disability: </label>
                                                    <input
                                                        type="text"
                                                        value={disable}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                {disable === "Yes" ? (
                                                    <div>

                                                        <div className="input_fields">

                                                            <label> Type of Disability: </label>
                                                            <input
                                                                type="text"
                                                                value={disable_kind}
                                                                required
                                                                className="inputs"
                                                                autoComplete="off"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="input_fields">

                                                    <label> Is Voter: </label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        value={is_voter}
                                                        required
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label> Household Head: </label>
                                                    <input
                                                        type="text"
                                                        value={household_head}
                                                        required
                                                        className="inputs"
                                                        autoComplete="off"
                                                        disabled
                                                    />
                                                </div>
                                                {household_head === "No" ? (
                                                    <div>

                                                        <div className="input_fields">

                                                            <label> Name of Household Head: </label>
                                                            <input
                                                                type="text"
                                                                value={nameOfHouseholdHead}
                                                                required
                                                                className="inputs"
                                                                autoComplete="off"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="input_fields">

                                                            <label> Relationship to Household: </label>
                                                            <input
                                                                type="text"
                                                                value={rel_to_household}
                                                                required
                                                                className="inputs"
                                                                autoComplete="off"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </form>
                            <div className="editProfile_container">

                                <input
                                    type="submit"
                                    className="editProfile_btns"
                                    value="Edit"
                                    onClick={edit_personalInfo}
                                />
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Address">

                        <div className="personal_info">

                            <form>

                                <div className="container_fluid">

                                    <fieldset className="fieldset_container">

                                        <legend>

                                            <i className="fa fa-info-circle"></i> Address
                                        </legend>
                                        <div className="wrapper" id="wrapper_myprofile">

                                            <div className="forms" id="inputfields_profile">

                                                <div className="input_fields">

                                                    <label>Region:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={region}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Province:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={province}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>City:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={city}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>City District:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={city_district}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Barangay:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={barangay}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Street:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={street}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Number:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={number}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="input_fields">

                                                    <label>Postal:</label>
                                                    <input
                                                        type="text"
                                                        className="inputs"
                                                        autoComplete="off"
                                                        value={postal}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </form>
                            <div className="editProfile_container">

                                <input
                                    type="submit"
                                    className="editProfile_btns"
                                    value="Edit"
                                    onClick={edit_address}
                                />
                            </div>
                        </div>
                    </Accordion>
                </div>
            </div>
            {window.innerWidth <= 600 ? "" : <Footer />}
        </div>
    );
}
export default MyProfile;