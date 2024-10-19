import VideoHomePage from "../../assets/home-page.mp4";

const HomePage = (props) => {
  return (
    <div className="home-page_container">
      <div className="Video-Content">
        <div className="Video">
          <video autoPlay muted loop>
            <source src={VideoHomePage} type="video/mp4"></source>
          </video>
        </div>
        <div className="Content">
          <h1 className="heading-lv1">Make forms worth filling out</h1>
          <p className="desc-content">
            Get more data—like signups, feedback, and anything else—with forms
            designed to be <span>refreshingly different.</span>
          </p>
          <button className="btn-started">Get started—it's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
