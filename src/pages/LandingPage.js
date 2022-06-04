import React, { useState, useEffect } from 'react'
import mobweb from '../assets/mobweb.png'
import Footer from '../components/Footer/Footer'
import Axios from 'axios'
import qr from '../assets/icons/adr_dl_qr.png'
import './LandingPage.css'
import ob_icon from '../images/ob_icon.png'
const LandingPage = () => {
    const [brgyInfo, setBrgyInfo] = useState([]), [, setFetched] = useState(false)
    useEffect(() => { const ac = new AbortController(); setFetched(!0); Promise.all([Axios.get("http://localhost:3001/GetBarangayInformation").then((response) => { setBrgyInfo(response.data) })]).then(() => setFetched(!1)).catch(ex => console.error(ex)); return () => ac.abort() }, [])
    return (
        <div className='landingPage_container'>
            <section className='landingPage_section'> <header className='landingPage_header'>{brgyInfo.map((row, index) => (<><img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.brgy_image)}`} draggable={false} alt="uploaded-img" className="brgy407_header" key={index[0]} /><img src={ob_icon} alt={ob_icon} className="brgy407_header" /> </>))}</header> <div className="landingPage_content"> <div className="landingPage_info"> <h2>Barangay Management <br /><span>Made Convenient!</span></h2> <p>When Barangay Resident needs a service, request a document, reserve facilities, track programs & events of the Barangay, and even manage your profile, One Barangay got it for you.</p><a href="/home" className="landingPage_info-btn">Continue to Web</a> </div><div className='homeIntro_col-1'> <img src={mobweb} alt={mobweb} className="homeIntro_img" /> </div></div></section>
            <section className='landingPage_section_2'> <div className="landingPage_content_2"> <div className='mob_qr_container'> <img src={qr} alt={qr} className="mob_qr_img" /> </div><div className="landingPage_info_2"> <h2>Mobile App <br /><span>is Here!</span></h2> <p>Click the download button or scan the QR Code to download One Barangay APK. Enjoy a more convenient Barangay services using your android devices.</p><a href="https://www.mediafire.com/file/m5lxmhy5wpm82ou/app-release.apk/file" className="landingPage_info-btn_2">Download</a> </div></div></section>
            <Footer />
        </div>
    )
}
export default LandingPage