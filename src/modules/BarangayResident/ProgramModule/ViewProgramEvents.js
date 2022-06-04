import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import Helm from "../../../components/Helmet/Helmet";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Container, BoxUpload, ImagePreview } from "./../../../components/Styled/ImageStyle";
import './Announcement.css'
import loading from '../../../assets/icons/loading.png'
const ViewProgramsEvents = () => {
    const [progEvList, setProgEvList] = useState([]), [announcement, setAnnouncement] = useState([]), { id: id } = useParams(), newId = parseInt(id), [postImage,] = useState(""), [isLoading, setIsLoading] = useState(false)
    useEffect(() => { const controller = new AbortController(); setIsLoading(true); Promise.all([Axios.get(`http://localhost:3001/GetProgEvById/${newId}`).then((response) => { setProgEvList(response.data); }), Axios.get(`http://localhost:3001/GetAnnouncementById/${newId}`).then((response) => { setAnnouncement(response.data); })]).then(() => setIsLoading(false)).catch(ex => console.error(ex)); return () => controller.abort() }, [newId]);
    return (
        <div>
            <Navbar />
            <div className="viewnewsletter"> <div className="loading_container">{isLoading && <img src={loading} alt={loading} className="loading_icon" />}</div>{progEvList.map((row) => (<> <Helm title={`${row.prog_evt_title}| One Barangay`} /> <div className="container"> <div className="content" data-aos="fade-up" data-aos-duration="500" data-aos-once="true" > <div className="news_content"> <h1 className="title">{row.prog_evt_title}</h1> <p className="subtitle"> <Moment format={"MMMM DD, YYYY"} date={row.date_created} /> </p><p className="description"> <Container> <BoxUpload> <div className="image-upload"> <ImagePreview>{row.prog_ev_img != null ? (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.prog_ev_img)}`} draggable={false} alt="uploaded-img" className="img_content" />) : (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(postImage)}`} draggable={false} alt="uploaded-img" />)}</ImagePreview> </div></BoxUpload> </Container> <div className="progev_lower"> <p className="prog_ev_titles"><span className="reminder_pe">What: </span>{row.prog_evt_title}</p><p className="prog_ev_titles">{row.status === "Cancelled" ? row.remarks : ""}</p><p className="prog_ev_titles"><span className="reminder_pe">When: </span>{<Moment format={"MMMM DD, YYYY"} date={row.prog_ev_date} />}{row.prog_ev_end_date ? " to " + (<Moment format={"MMMM DD, YYYY"} date={row.prog_ev_date} />) : ""}{row.prog_ev_time ? ` at ${row.prog_ev_time}` : ""}</p><p className="prog_ev_titles"> <span className="reminder_pe">{row.prog_ev_location ? `Where: ` : ""}</span>{row.prog_ev_location ? row.prog_ev_location : ""}</p><p className="prog_ev_desc">{row.prog_ev_desc}</p></div></p></div></div></div></>))}{announcement.map((row) => (<> <Helm title={`${row.announcement_title}| One Barangay`} /> <div className="container"> <div className="content" data-aos="fade-up" data-aos-duration="500" data-aos-once="true" > <div className="news_content"> <h1 className="title">{row.announcement_title}</h1> <p className="subtitle"> <Moment format={"MMMM DD, YYYY"} date={row.date_submitted} /> </p><p>{row.date_updated ? <> <p>Updated at</p><p> <Moment format={"MMMM DD, YYYY"} date={row.date_updated} /> </p></> : ""}</p><p className="description"> <Container> <BoxUpload> <div className="image-upload"> <ImagePreview>{row.announcement_img != null ? (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(row.announcement_img)}`} draggable={false} alt="uploaded-img" className="img_content" />) : (<img id="uploaded-image" src={`data:image/jpeg;base64,${Buffer.from(postImage)}`} draggable={false} alt="uploaded-img" />)}</ImagePreview> </div></BoxUpload> </Container> <div className="progev_lower"> <p className="prog_ev_desc">{row.announcement_desc}</p></div></p></div></div></div></>))}</div>
            <Footer />
        </div>
    );
};
export default ViewProgramsEvents;
