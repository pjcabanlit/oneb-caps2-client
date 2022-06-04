import React from 'react'
import './AnnouncementCard.css'
import LinesEllipsis from "react-lines-ellipsis";
import Moment from 'react-moment';

const AnnouncementCards = ({ img, title, date_created, description, onclick, id }) => {
    return (
        <div className="card" data-aos="fade-up" data-aos-easing="linear"
            data-aos-duration="1000" >
            <div className="card_header">
                {img != null ? (
                    <img src={`data:image/jpeg;base64,${Buffer.from(img)}`} draggable={false} alt="uploaded-img" />) : (null)
                }
            </div>
            <div className="card_body">
                <h3 className="announcement_title">{title}</h3>
                <p className="subtitle"><Moment format={"MMMM DD YYYY"} date={date_created} /> </p>
                <LinesEllipsis className="description" maxLine="7" ellipsis="..." trimRight basedOn="letters" text={description} />

                <button className="secondary outline" onClick={() => onclick(id)}>Read more</button>
            </div>
        </div>
    )
}

export default AnnouncementCards