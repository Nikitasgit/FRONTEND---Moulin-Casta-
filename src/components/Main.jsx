import videoBg from "../assets/video/moulin-casta-video.mp4";

const Main = () => {
  return (
    <div className="main skeleton main-bg-img">
      <video loading="lazy" src={videoBg} loop autoPlay muted playsInline />

      <div className="hearder-main-container">
        <h1>Venez vivre une expérience unique en Haute-Corse</h1>
        <p>En pleine nature et à seulement 20 minutes de Saint-Florent</p>
      </div>
    </div>
  );
};

export default Main;
