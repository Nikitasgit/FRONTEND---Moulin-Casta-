import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const variants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
    };
  },
};
const Slideshow = ({ id, images }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const nextStep = (images) => {
    setDirection(1);
    if (index === images.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };
  const prevStep = (images) => {
    setDirection(-1);
    if (index === 0) {
      setIndex(images.length - 1);
      return;
    }
    setIndex(index - 1);
  };
  /*   useEffect(() => {
    //preloading image
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []); */
  return (
    <div className="slideshow">
      <AnimatePresence initial={false} custom={direction}>
        {images.length > 0 && (
          <motion.img
            variants={variants}
            animate="animate"
            initial="initial"
            exit="exit"
            className="slides skeleton"
            src={images[index].url}
            alt=""
            key={images[index].imageName}
            custom={direction}
          />
        )}
      </AnimatePresence>
      <button className="prevButton" onClick={() => prevStep(images)}>
        <BiChevronLeft />
      </button>
      <button className="nextButton" onClick={() => nextStep(images)}>
        <BiChevronRight />
      </button>
      <NavLink to={`/${id}`}>
        <button className="more-button">Voir plus</button>
      </NavLink>
    </div>
  );
};

export default Slideshow;
