import React, { useState, useRef } from 'react'
import './Accordion2.css'
import Chevron from '../../svg/Chevron'

const Accordion2 = (props) => {
    const [setActive, setActiveState] = useState(""), [setHeight, setHeightState] = useState("0px"), [setRotate, setRotateState] = useState("accordion__icon"), content = useRef(null);
    function toggleAccordion() {
        setActiveState(setActive === "" ? "profile_active2" : "");
        setHeightState(
            setActive === "profile_active2"
                ? "0px"
                : `${content.current.scrollHeight}px`
        );
        setRotateState(
            setActive === "profile_active2"
                ? "accordion__icon2"
                : "accordion__icon rotate2"
        );
    }
    return (
        <div className="accordion__section2">
            <button className={`accordion2 ${setActive}`} onClick={toggleAccordion}> <p className="accordion__title2">{props.title}</p><Chevron className={`${setRotate}`} width={10} fill={"#fff"} /> </button> <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content2"> <div className="accordion__text2">{props.children}</div></div>
        </div>
    )
}
export default Accordion2