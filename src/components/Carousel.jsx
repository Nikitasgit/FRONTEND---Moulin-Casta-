import { useState } from "react";
import { CgChevronLeftR } from "react-icons/cg";
import { CgChevronRightR } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const Carousel = ({ images, accommodation }) => {
  const array = Object.keys(images).slice(0, 5);
  const [count, setCount] = useState(0);
  return (
    <div className="carousel">
      <span className="chevron-carousel left">
        <CgChevronLeftR
          onClick={() =>
            count == 0 ? setCount(array.length - 1) : setCount(count - 1)
          }
        />
      </span>
      <div className="img-carousel-container">
        {array.map((image, index) => {
          {
            <img
              loading="lazy"
              key={index}
              src={`../assets/img/img-bergerie/${image}`}
              alt=""
              onClick={() => {
                count < array.length - 1 ? setCount(count + 1) : setCount(0);
              }}
            />;
          }
        })}
      </div>
      <NavLink
        to={accommodation == "moulin" ? "/accomodation-1" : "/accomodation-2"}
      >
        <button>Voir plus</button>
      </NavLink>
      <span
        className="chevron-carousel right"
        onClick={() => {
          count < array.length - 1 ? setCount(count + 1) : setCount(0);
        }}
      >
        <CgChevronRightR />
      </span>
    </div>
  );
};
export default Carousel;
