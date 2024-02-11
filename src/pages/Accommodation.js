import React, { useRef, useState } from "react";
import Footer from "../components/Footer";
import ImgSlider from "../components/ImgSlider";
import addIcon from "../assets/icons/add.png";
import { BsExclamationTriangle } from "react-icons/bs";
import BookingRequest from "../components/BookingRequest";
import videoBg from "../assets/video/beach-corsica-drone.mp4";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { changeViewMode } from "../feature/loginSlice";
import Amenities from "../components/Amenities";
import Share from "../components/Share";
import CalendarEditing from "../components/CalendarEditing";
import PicturesEditor from "../components/PicturesEditor";
import {
  fetchAccommodations,
  setLoading,
} from "../feature/accommodationsSlice";
import axios from "axios";
import Loading from "../components/Loading";
const Accommodation = ({ data }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const login = useSelector((state) => state.login.loginStatus);
  const viewClient = useSelector((state) => state.login.viewClient);
  const videoRef = useRef();
  const [videoPlay, setVideoPlay] = useState(true);
  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedFilesArray = Array.from(files);
    setSelectedFiles(selectedFilesArray);
  };
  const loading = useSelector((state) => state.accommodations.isLoading);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(
        `http://localhost:3010/api/v1/accommodations/${data._id}/pictures`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(fetchAccommodations());
    } catch (error) {
      throw error;
    }
  };

  const handleVideo = () => {
    setVideoPlay(!videoPlay);
    if (videoPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  if (loading) {
    return <Loading />;
  }
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
          {login && !viewClient && (
            <form className="add-pictures-form" onSubmit={handleSubmit}>
              <h3 className="header-edit-panel">Ajoutez des photos:</h3>
              <div className="pictures-form-inputs">
                <label className="add-pictures-btn">
                  <img src={addIcon} alt="" />
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                <div className="submit-pictures">
                  <p>{selectedFiles.length} image(s)</p>
                  <input type="submit" value="Ajouter" />
                </div>
              </div>
            </form>
          )}
        </div>
        {login && !viewClient ? (
          <PicturesEditor images={data.pictures} accommodationId={data._id} />
        ) : (
          <ImgSlider images={data.pictures} />
        )}
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
