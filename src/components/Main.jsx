import videoBg from "../assets/video/moulin-casta-video.mp4";

const Main = () => {
  return (
    <div className="main skeleton">
      <video loading="lazy" src={videoBg} loop autoPlay muted playsInline />

      <div className="content">
        <h1>Une expérience unique</h1>
        <p>En pleine nature et à seulement 20 minutes de Saint-Florent</p>
      </div>
    </div>
  );
};

export default Main;
