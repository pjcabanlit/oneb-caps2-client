/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Footer.css'
import ob_icon from './../../images/ob_icon.png';
export default function Footer() {
    const year = new Date().getFullYear(), [brgyinfo, setBrgyInfo] = useState([]), [fetched, setFetched] = useState(false);
    useEffect(() => { const ac = new AbortController(); Promise.all([Axios.get("http://localhost:3001/GetBarangayInformation").then((response) => { setBrgyInfo(response.data); })]).then(() => setFetched(true)).catch(ex => console.error(ex)); return () => ac.abort() }, [])
    return (
        <div>
            {fetched ? <>{brgyinfo.map((row) => (<footer className="home_footer"> <div className="home_footer_left"> <img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.brgy_image)}`} draggable={false} alt="uploaded-img" /> <img src={ob_icon} alt={ob_icon} /> <p>One Barangay: A Multipuprose Barangay Management System in Mobile and Web Application.</p></div><ul className="home_footer_right"> <li> <h2>About</h2> <ul className="box"> <li><a href="/About">About Us</a></li><li><a href="/announcements">Announcements</a></li><li><a href="/brgy-programs&events">Programs & Events</a></li><li><a href="/privacy-policy">Privacy Policy</a></li><li><a href="/terms-of-use">Terms of Use</a></li></ul> </li><li className="features"> <h2>Process & Guidelines</h2> <ul className="box"> <li><a href="/ApplicationModule">Request Documents</a></li><li><a href="/CIEModule">Emergency & Reports</a></li><li><a href="/Reservation-Module">Facilities</a></li><li><a href="/FAQs">FAQs</a></li></ul> </li><li> <h2>Socials</h2> <ul className="box"> <li><a href={`https://www.facebook.com/${row.brgy_facebook}`}>Facebook</a> <a href={`https://www.facebook.com/${row.brgy_facebook}`}> <i className="fa fa-facebook"></i></a></li><li><a href={`https://www.instagram.com/${row.brgy_ig}`}>Instagram</a> <a href={`https://www.instagram.com/${row.brgy_ig}`}> <i className="fa fa-instagram"></i></a> </li><li><a href={`https://www.twitter.com/${row.brgy_twitter}`}>Twitter</a> <a href={`https://www.twitter.com/${row.brgy_twitter}`}><i className="fa fa-twitter"></i></a></li></ul> <div className="brgy_socials"> </div></li></ul> <div className="home_footer_bottom"> <p>One Barangay</p><p>Copyright{year}©.{row.brgy_barangay + " " + row.brgy_zone + " " + row.brgy_city}. All Rights Reserved.</p></div></footer>))}</> : ""}
        </div>
    )
}