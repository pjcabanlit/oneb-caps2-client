import React, { useState, useRef } from 'react'
import './Accordion.css'
import Chevron from '../../svg/Chevron'

const Accordion = (props) => {
    const [setActive, setActiveState] = useState(""), [setHeight, setHeightState] = useState("0px"), [setRotate, setRotateState] = useState("accordion__icon"), content = useRef(null);
    function toggleAccordion() { setActiveState(setActive === "" ? "profile_active" : ""); setHeightState(setActive === "profile_active" ? "0px" : `${content.current.scrollHeight}px`); setRotateState(setActive === "profile_active" ? "accordion__icon" : "accordion__icon rotate"); }
    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}> <p className="accordion__title">{props.title}</p><Chevron className={`${setRotate}`} width={10} fill={"#777"} /> </button> <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content"> <div className="accordion__text">{props.children}</div></div>
        </div>
    )
}
export default Accordion