import PropTypes from "prop-types";
const ServicesCard = ({ bgColor, heading, description, icon }) => {
  return (
    <div className="w-full px-8 py-5 mt-16 bg-[#f8faff] rounded-xl border ">
      <div className="flex justify-center -mt-12">
        <div
          style={{ backgroundColor: bgColor }}
          className="w-16 h-16 flex justify-center items-center   rounded-full "
        >
          {icon}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="mt-2 text-xl md:text-2xl text-center font-semibold text-gray-800  md:my-4">
          {heading}
        </h2>
        <p className="mt-2 text-[14px] md:text-[16px] text-center  text-gray-700 ">
          {description}
        </p>
      </div>
    </div>
  );
};

ServicesCard.propTypes = {
  bgColor: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
};
export default ServicesCard;
