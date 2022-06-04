import React, { useState, useEffect } from 'react'
import axios from 'axios';
import QuestionContainer from './QuestionContainer';
const FAQsList = () => {
    const [faqs, setFaqs] = useState([]), [active,] = useState(true)
    function toggleFaq(id) { setFaqs(faqs.map((row, index) => (row.faq_id === id ? { ...row, active: !row.active } : { ...row, active: false }))) }
    useEffect(() => { axios.get("http://localhost:3001/GetFaqs").then((response) => { setFaqs(response.data); }) }, [])
    return (
        <div className="general" >{faqs.map((row, index) => (<QuestionContainer active={active} key={index} id={row.faq_id} question={row.question} answer={row.answer} onClick={toggleFaq} />))}</div>
    )
}
export default FAQsList