import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
const variants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: "ease-in",
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: "ease-in",
    };
  },
};
const ImgSlider = ({ images }) => {
  const [direction, setDirection] = useState(0);
  const [toggleSlider, setToggleSlider] = useState(false);
  const [count, setCount] = useState(0);
  const nextStep = (images) => {
    setDirection(1);
    if (count === images.length - 1) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };
  const prevStep = (images) => {
    setDirection(-1);
    if (count === 0) {
      setCount(images.length - 1);
      return;
    }
    setCount(count - 1);
  };
  const handleImgClick = () => {
    setToggleSlider(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape);
  }, []);
  /*   useEffect(() => {
    //preloading image
    images.forEach((image) => {
      const img = new Image();
      img.src = image.url;
    });
  }, []); */
  useEffect(() => {
    if (toggleSlider) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggleSlider]);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setToggleSlider(false);
    }
  };

  /*   const nextOnArrow = (e) => {
    if (e.keyCode === 37) {
      prevStep(images);
    } else if (e.keyCode === 39) {
      nextStep(images);
    }
    window.removeEventListener("keydown", nextOnArrow);
  };
  useEffect(() => {
    window.addEventListener("keydown", nextOnArrow);
  }, [count, toggleSlider]); */
  return (
    <div className="imgSlider">
      {toggleSlider && (
        <div className="slider ">
          <span
            className="close-slider"
            onClick={() => {
              setToggleSlider(false);
            }}
          >
            <AiOutlineCloseCircle />
          </span>

          <span onClick={() => prevStep(images)} className="left-chevron">
            <BsChevronLeft />
          </span>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              key={count}
              src={images[count].url}
              alt="image"
              custom={direction}
            />
          </AnimatePresence>
          <span onClick={() => nextStep(images)} className="right-chevron">
            <BsChevronRight />
          </span>
        </div>
      )}
      <div className="grid">
        {images &&
          images.map(
            (image, index) =>
              index < 5 && (
                <div
                  key={image.imageName}
                  className={
                    image == images[0]
                      ? "main img-container skeleton"
                      : "img-container skeleton"
                  }
                >
                  <img
                    loading="lazy"
                    key={image.imageName}
                    className="img-slider"
                    src={image.url}
                    alt=""
                    onClick={() => {
                      setCount(images.indexOf(image));
                      handleImgClick();
                    }}
                  />
                </div>
              )
          )}
        <button
          onClick={() => {
            handleImgClick();
          }}
          className="button"
        >
          Voir toutes les photos
        </button>
      </div>
    </div>
  );
};

export default ImgSlider;
