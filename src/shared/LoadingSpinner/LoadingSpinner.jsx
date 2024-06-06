import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={40} color="#2461E9" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};
export default LoadingSpinner;
