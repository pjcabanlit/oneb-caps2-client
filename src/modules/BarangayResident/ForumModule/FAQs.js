import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './FAQs.css'
import Helm from '../../../components/Helmet/Helmet';
import Navbar from './../../../components/Navbar/Navbar';
import Footer from './../../../components/Footer/Footer';
import loading from '../../../assets/icons/loading.png';
import QuestionContainer from '../../../components/FAQs/QuestionContainer';
const FAQs = () => {
    const [isLoading, setIsLoading] = useState(!1), [faqs, setFaqs] = useState([]), [active, setActive] = useState(!0);
    function toggleFaq(id) { setFaqs(faqs.map((row, index) => (row.faq_id === id ? { ...row, active: !row.active } : { ...row, active: false }))) }
    useEffect(() => { async function fetchLoading() { setIsLoading(!0); await Axios.get("http://localhost:3001/GetFaqs").then((response) => { setFaqs(response.data); setIsLoading(!1) }); return () => { } } fetchLoading() }, [])
    return (
        <div className="faqs">
            <Helm title={`Frequently Asked Questions (FAQs) | One Barangay`} />
            <Navbar />
            <div className='faqs_section'> <div className="container"> <div className="container" > <div className="faqs_container"> <h1> Frequently Asked Questions (FAQs) </h1> <div className="folder" style={{ marginTop: "1.5rem" }}> <div className="folder_question"> <div className="general" >{faqs.map((row, index) => (<QuestionContainer active={active} key={index} id={row.faq_id} question={row.question} answer={row.answer} onClick={toggleFaq} />))}</div></div></div><div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div></div></div></div></div>
            {window.innerWidth <= 600 ? "" : <Footer />}</div>
    )
}
export default FAQs;