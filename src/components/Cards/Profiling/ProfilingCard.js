import React from 'react'
const ProfilingCard = ({ icon, title, data, id, onclick }) => {
    return (
        <div className="adminCard" onClick={() => onclick(id)}>
            <i className={icon}></i>
            <div className="adminCard_inner">
                <p className="text-primary-p">{title}</p>
                <span className="font-bold text-title">{data}</span>
            </div>
        </div>
    )
}
export default ProfilingCard