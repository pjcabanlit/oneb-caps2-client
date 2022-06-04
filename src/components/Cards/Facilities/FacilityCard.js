import React from "react";
const FacilityCard = ({ id, img, title, quantity, onClickDownload }) => {
    return (
        <div className="card" data-aos="fade-up" data-aos-duration="500" data-aos-once="true" > <div className="card_header">{img?.data ? (<img src={`data:image/jpeg;base64,${Buffer.from(img?.data)}`} alt={img} />) : (<img src={img} alt={img} />)}{" "}</div><div className="card_body"> <h3 className="facility_title">{title}</h3> <h4 style={{ marginBottom: 10 + "px", fontWeight: 500 }}>{" "}<span style={{ fontSize: 14 + "px", fontStyle: "italic" }}>{" "}Available:{" "}</span>{" "}{quantity}{" "}</h4> <button className="secondary outline" onClick={(e) => onClickDownload(e, id)}> Request Now </button> </div></div>
    );
};
export default FacilityCard;
FacilityCard.defaultProps = {
    img: "https://i.stack.imgur.com/y9DpT.jpg",
};
