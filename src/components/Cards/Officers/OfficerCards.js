import React from 'react'
import './OfficerCards.css'
export default function OfficerCards({ img, name, position }) {
    return (
        <div className="officerCard_grid-item"> <div className="officerCard_card"> <img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(img)}`} draggable={false} alt="uploaded-img" className="officerCard_card-img" /> <div className="officerCard_card-content"> <h1 className="officerCard_card-header">{name}</h1> <p className="officerCard_card-text">{position}</p></div></div></div>
    )
}