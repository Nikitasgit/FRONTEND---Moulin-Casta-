import React from "react";
import { deletePicture } from "../feature/accommodationsSlice";
import { useDispatch } from "react-redux";
import xMark from "../assets/icons/circle-xmark.png";
const PicturesEditor = ({ accommodationId, images }) => {
  const dispatch = useDispatch();
  return (
    <div className="pictures-editor">
      <div className="images-editor-container">
        {images.map((image) => (
          <div className="image-container skeleton">
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
    </div>
  );
};

export default PicturesEditor;
