import one from "../assets/img/one.svg";
import two from "../assets/img/two.svg";
import three from "../assets/img/three.svg";
import four from "../assets/img/four.svg";
import five from "../assets/img/five.svg";
import six from "../assets/img/six.svg";
import seven from "../assets/img/seven.svg";
import eight from "../assets/img/eight.svg";
import nine from "../assets/img/nine.svg";
import ten from "../assets/img/ten.svg";
import eleven from "../assets/img/eleven.svg";
import twelve from "../assets/img/twelve.svg";
import thirteen from "../assets/img/thirteen.svg";
import fourteen from "../assets/img/fourteen.svg";
import Marquee from "react-fast-marquee";

const TrustedCompany = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center mt-8 md:mt-20 md:text-3xl">Trusted By 15,000+ Companies</h2>
      <Marquee direction="right" pauseOnHover={true} speed={80}>
        <div className="flex mt-10 gap-14 ml-14">
          <img src={two} alt="" />
          <img src={three} alt="" />
          <img src={four} alt="" />
          <img src={five} alt="" />
          <img src={six} alt="" />
          <img src={seven} alt="" />
          <img src={eight} alt="" />
          <img src={one} alt="" />
          <img src={nine} alt="" />
          <img src={ten} alt="" />
          <img src={eleven} alt="" />
          <img src={twelve} alt="" />
          <img src={thirteen} alt="" />
          <img src={fourteen} alt="" />
        </div>
      </Marquee>
    </div>
  );
};

export default TrustedCompany;
