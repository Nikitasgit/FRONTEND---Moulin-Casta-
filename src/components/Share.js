import React, { useEffect, useState } from "react";
import shareIcon from "../assets/icons/share.png";
import fbIcon from "../assets/icons/facebook.png";
import twitterIcon from "../assets/icons/twitter.png";
import xMark from "../assets/icons/circle-xmark.png";
const Share = ({ url, title, message }) => {
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (showShare) {
      const scrollBarWidth = getScrollbarWidth();
      document.body.style.marginRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.marginRight = ``;
    }
  }, [showShare]);
  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }
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
    <div className="share-container">
      <img
        src={shareIcon}
        className="share-icon"
        alt="share"
        onClick={() => shareLink()}
      />
      {showShare && (
        <div className="share-modal">
          <h3>Partager sur:</h3>
          <div className="icons-share">
            <img
              src={xMark}
              className="close-modal"
              onClick={() => setShowShare(false)}
            />
            <a
              href={`https://www.facebook.Com/share.php?u=${url}`}
              target="blank"
            >
              <img src={fbIcon} alt="facebook" />
            </a>
            <a
              href={`http://twitter.com/share?&url=${url}&text=${message}&hashtags=holidays`}
              target="blank"
            >
              <img src={twitterIcon} alt="twitter" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
