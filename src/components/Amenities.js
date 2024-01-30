import React from "react";
import acIcon from "../assets/icons/air-conditioner.png";
import bedroomIcon from "../assets/icons/bedroom.png";
import coffeeIcon from "../assets/icons/coffee.png";
import riverIcon from "../assets/icons/creek.png";
import dishwasherIcon from "../assets/icons/dishwasher.png";
import doubleBedIcon from "../assets/icons/double-bed.png";
import fireplaceIcon from "../assets/icons/fireplace.png";
import gardenIcon from "../assets/icons/garden.png";
import barbecueIcon from "../assets/icons/grill.png";
import hairdryerIcon from "../assets/icons/hairdryer.png";
import houseIcon from "../assets/icons/home.png";
import jacuzziIcon from "../assets/icons/jacuzzi.png";
import loungeIcon from "../assets/icons/lounge.png";
import petanqueIcon from "../assets/icons/medicine-ball.png";
import microwaveIcon from "../assets/icons/microwave.png";
import mountainViewIcon from "../assets/icons/mountain.png";
import ovenIcon from "../assets/icons/oven.png";
import parkingIcon from "../assets/icons/parking.png";
import showerIcon from "../assets/icons/shower.png";
import singleBedIcon from "../assets/icons/single-bed.png";
import babyBedIcon from "../assets/icons/smiling-baby.png";
import seaViewIcon from "../assets/icons/sunset.png";
import swimmingPoolIcon from "../assets/icons/swimming-pool.png";
import toiletIcon from "../assets/icons/toilet.png";
import towelsIcon from "../assets/icons/towel.png";
import petIcon from "../assets/icons/track.png";
import travelerIcon from "../assets/icons/user.png";
import laundryIcon from "../assets/icons/washer.png";
import wifiIcon from "../assets/icons/wifi.png";

const Amenities = ({ amenities, travelers }) => {
  const amenitiesList = [];

  amenitiesList.push(
    <div>
      <img src={travelerIcon} alt="" />
      <h5>{travelers}</h5> <h5>{travelers <= 1 ? "voyageur" : "voyageurs"}</h5>
    </div>
  );
  const amenitiesDisplay = () => {
    for (const [key, value] of Object.entries(amenities)) {
      switch (key) {
        case "bedrooms":
          amenitiesList.push(
            <div>
              <img src={bedroomIcon} alt="" />
              <h5>{value}</h5> <h5>chambres</h5>
            </div>
          );
          break;
        case "surface":
          amenitiesList.push(
            <div>
              <img src={houseIcon} alt="" />
              <h5>{value}</h5> <h5>m²</h5>
            </div>
          );
          break;
        case "singleBed":
          amenitiesList.push(
            <div>
              <img src={singleBedIcon} alt="" />
              <h5>{value}</h5>
              <h5>{value <= 1 ? "lit simple" : "lits simples"}</h5>
            </div>
          );
          break;
        case "doubleBed":
          amenitiesList.push(
            <div>
              <img src={doubleBedIcon} alt="" />
              <h5>{value}</h5>
              <h5>{value <= 1 ? "lit double" : "lits doubles"}</h5>
            </div>
          );
          break;
        case "bathRoom":
          amenitiesList.push(
            <div>
              <img src={showerIcon} alt="" />
              <h5>{value}</h5>
              <h5>{value <= 1 ? "salle de bain" : "salles de bains"}</h5>
            </div>
          );
          break;
        case "toilet":
          amenitiesList.push(
            <div>
              <img src={toiletIcon} alt="" />
              <h5>{value}</h5>
              <h5>wc</h5>
            </div>
          );
          break;
        case "garden":
          value &&
            amenitiesList.push(
              <div>
                <img src={gardenIcon} alt="" />
                <h5>jardin</h5>
              </div>
            );
          break;
        case "parking":
          value &&
            amenitiesList.push(
              <div>
                <img src={parkingIcon} alt="" />
                <h5>parking</h5>
              </div>
            );
          break;

        case "seaView":
          value &&
            amenitiesList.push(
              <div>
                <img src={seaViewIcon} alt="" />
                <h5>vue mer</h5>
              </div>
            );
          break;
        case "towels":
          value &&
            amenitiesList.push(
              <div>
                <img src={towelsIcon} alt="" />
                <h5>Draps et serviettes inclus</h5>
              </div>
            );
          break;
        case "mountainView":
          value &&
            amenitiesList.push(
              <div>
                <img src={mountainViewIcon} alt="" />
                <h5>vue montagne</h5>
              </div>
            );
          break;
        case "laundry":
          value &&
            amenitiesList.push(
              <div>
                <img src={dishwasherIcon} alt="" />
                <h5>machine à laver</h5>
              </div>
            );
          break;
        case "dishwasher":
          value &&
            amenitiesList.push(
              <div>
                <img src={laundryIcon} alt="" />
                <h5>lave linge</h5>
              </div>
            );
          break;
        case "microwave":
          value &&
            amenitiesList.push(
              <div>
                <img src={microwaveIcon} alt="" />
                <h5>micro-ondes</h5>
              </div>
            );
          break;
        case "coffee":
          value &&
            amenitiesList.push(
              <div>
                <img src={coffeeIcon} alt="" />
                <h5>cafetière</h5>
              </div>
            );
          break;
        case "hairdryer":
          value &&
            amenitiesList.push(
              <div>
                <img src={hairdryerIcon} alt="" />
                <h5>sèche-cheveux</h5>
              </div>
            );
          break;
        case "barbecue":
          value &&
            amenitiesList.push(
              <div>
                <img src={barbecueIcon} alt="" />
                <h5>barbecue</h5>
              </div>
            );
          break;
        case "river":
          value &&
            amenitiesList.push(
              <div>
                <img src={riverIcon} alt="" />
                <h5>rivière</h5>
              </div>
            );
          break;
        case "swimmingPool":
          value &&
            amenitiesList.push(
              <div>
                <img src={swimmingPoolIcon} alt="" />
                <h5>piscine</h5>
              </div>
            );
          break;
        case "wifi":
          value &&
            amenitiesList.push(
              <div>
                <img src={wifiIcon} alt="" />
                <h5>wifi</h5>
              </div>
            );
          break;
        case "babyBed":
          value &&
            amenitiesList.push(
              <div>
                <img src={babyBedIcon} alt="" />
                <h5>lit bébé</h5>
              </div>
            );
          break;
        case "jacuzzi":
          value &&
            amenitiesList.push(
              <div>
                <img src={jacuzziIcon} alt="" />
                <h5>jacuzzi</h5>
              </div>
            );
          break;
        case "fireplace":
          value &&
            amenitiesList.push(
              <div>
                <img src={fireplaceIcon} alt="" />
                <h5>cheminée</h5>
              </div>
            );
          break;
        case "petFriendly":
          value &&
            amenitiesList.push(
              <div>
                <img src={petIcon} alt="" />
                <h5>pet friendly</h5>
              </div>
            );
          break;
        case "ac":
          value &&
            amenitiesList.push(
              <div>
                <img src={acIcon} alt="" />
                <h5>climatisation</h5>
              </div>
            );
          break;
        case "oven":
          value &&
            amenitiesList.push(
              <div>
                <img src={ovenIcon} alt="" />
                <h5>four</h5>
              </div>
            );
          break;
        case "gardenLounge":
          value &&
            amenitiesList.push(
              <div>
                <img src={loungeIcon} alt="" />
                <h5>salon de jardin</h5>
              </div>
            );
          break;
        case "petanque":
          value &&
            amenitiesList.push(
              <div>
                <img src={petanqueIcon} alt="" />
                <h5>pétanque</h5>
              </div>
            );
          break;
        default:
          console.log(key);
      }
    }
    return amenitiesList;
  };
  return <div className="amenities">{amenitiesDisplay()}</div>;
};

export default Amenities;
