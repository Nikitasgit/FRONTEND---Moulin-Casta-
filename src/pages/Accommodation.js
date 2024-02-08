import React, { useRef, useState } from "react";
import Footer from "../components/Footer";
import ImgSlider from "../components/ImgSlider";
import { BsExclamationTriangle } from "react-icons/bs";
import BookingRequest from "../components/BookingRequest";
import videoBg from "../assets/video/beach-corsica-drone.mp4";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { changeViewMode } from "../feature/loginSlice";
import Amenities from "../components/Amenities";
import Share from "../components/Share";
import CalendarEditing from "../components/CalendarEditing";
const Accommodation = ({ data }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loginStatus);
  const viewClient = useSelector((state) => state.login.viewClient);
  const videoRef = useRef();
  const [videoPlay, setVideoPlay] = useState(true);
  const handleVideo = () => {
    setVideoPlay(!videoPlay);
    if (videoPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div className="accommodation">
      <div className="accommodation-main">
        <div className="header-flex">
          <div className="title-share-accommodation">
            <div className="title">
              <h1>{data.name}</h1>
              <h3>{data.location}</h3>
            </div>
            <Share
              title={data.name}
              url={encodeURI(window.location.href)}
              message={`${data.description.substring(0, 80)}...`}
            />
          </div>
        </div>
        <ImgSlider images={data.pictures} />
        {login && (
          <button
            className="switch-mode"
            onClick={() => dispatch(changeViewMode(!viewClient))}
          >
            Passer en vue {viewClient ? "hôte" : "client"}
            <HiOutlineSwitchHorizontal />
          </button>
        )}
        {login && !viewClient ? (
          <div className="edit-calendar-wrapper">
            <CalendarEditing id={data._id} open={true} login={login} />
          </div>
        ) : (
          <div className="description-booking">
            <div className="descr-video">
              <div className="description">
                <p>{data.description}</p>
                {data.extraInfo && (
                  <div className="important-message">
                    <BsExclamationTriangle />
                    <h4>{data.extraInfo}</h4>
                  </div>
                )}
                <div className="check-inOut">
                  <h4>Check-in: {data.hours.checkIn}</h4>
                  <h4>Check-out: {data.hours.checkOut}</h4>
                </div>
                <Amenities
                  amenities={data.amenities}
                  travelers={data.capacity}
                />
                <div
                  onClick={(e) => handleVideo(e)}
                  className="video-accomodation-container skeleton"
                >
                  <video
                    className=" video-accomodation"
                    loading="lazy"
                    ref={videoRef}
                    src={videoBg}
                    loop
                    playsInline
                    autoPlay
                    muted
                  />
                </div>
              </div>
            </div>
            <BookingRequest
              id={data._id}
              name={data.name}
              capacity={data.capacity}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Accommodation;
