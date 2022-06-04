import React from 'react'
import { Link } from 'react-router-dom'
import './../../modules/BarangayResident/ProgramModule/Programs&Events.css'

const BarangayActivities = ({ id, img, title, onClick }) => {
    return (
        <div>
            <div className="news_column">
                <div className="news_card">
                    <div className="news_card_top">
                        <div className="news_card_clip">
                            <img src={img} alt={img} />
                        </div>
                    </div>
                    <div className="news_card_body">
                        <h3><Link onClick={() => onClick(id)}>{title}</Link></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarangayActivities
