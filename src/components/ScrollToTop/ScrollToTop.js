import React, { useState, useEffect } from 'react'
import './ScrollToTop.css';
import { useWindowScroll } from 'react-use'
import { FaChevronUp } from 'react-icons/fa'
export default function ScrollToTop() {
    const { y: pageYOffset } = useWindowScroll(), [visibility, setVisibility] = useState(false), scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
    useEffect(() => { if (pageYOffset > 400) { setVisibility(false); } else { setVisibility(true); } }, [pageYOffset]);
    if (visibility) { return false; }
    return (
        <div className="scroll-to-top" onClick={scrollToTop}><i className="icon"> <FaChevronUp className='icon' /></i></div>
    )
}