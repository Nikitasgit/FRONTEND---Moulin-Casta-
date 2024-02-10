import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePicture,
  fetchAccommodations,
} from "../feature/accommodationsSlice";
import axios from "axios";
const PicturesEditor = ({ accommodationId, images }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    const files = event.target.files;

    const selectedFilesArray = Array.from(files);
    setSelectedFiles(selectedFilesArray);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(
        `http://localhost:3010/api/v1/accommodations/${accommodationId}/pictures`,
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

  return (
    <div className="pictures-editor">
      <div className="images-editor-container">
        {images.map((image) => (
          <div className="image-container">
            <img className="image-editor" src={image.url} alt="" />
            <button
              className="delete-picture-button"
              onClick={() =>
                dispatch(
                  deletePicture({
                    accommodationId: accommodationId,
                    pictureId: image._id,
                  })
                )
              }
            >
              supprimer
            </button>
          </div>
        ))}
      </div>

      <form className="add-pictures-form" onSubmit={handleSubmit}>
        <label>
          Ajouter des photos:{" "}
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PicturesEditor;
