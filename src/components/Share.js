import React, { useState } from "react";
import shareIcon from "../assets/icons/share.png";
const Share = ({ url, title, message }) => {
  const [showShare, setShowShare] = useState(false);

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title}`,
          url: `${url}`,
        })
        .catch(console.error);
    } else {
      return setShowShare(true);
    }
  };
  return (
    <div>
      <img
        src={shareIcon}
        className="share-icon"
        alt=""
        onClick={() => shareLink()}
      />
      {showShare && (
        <div>
          <a
            href={`https://www.facebook.Com/share.php?u=${url}`}
            target="blank"
          >
            <button>F</button>
          </a>
          <a
            href={`http://twitter.com/share?&url=${url}&text=${message}&hashtags=holidays`}
            target="blank"
          >
            <button>T</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Share;
