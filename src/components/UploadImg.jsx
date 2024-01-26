import axios from "axios";
import React, { useEffect, useState } from "react";

const UploadImg = () => {
  const [files, setFiles] = useState(null);

  const [images, setImages] = useState(null);
  const handleUpload = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    let newArr = [];
    for (let i = 0; i < files.length; i++) {
      formdata.append("images", files[i]);
    }

    axios
      .post("http://localhost:5010/upload", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5010/img")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit">submit</button>
      </form>
      {/* 
      {images &&
        images.map((image) => (
          <img src={"http://localhost:5010/images/" + image.img} alt="" />
        ))} */}
    </div>
  );
};

export default UploadImg;
