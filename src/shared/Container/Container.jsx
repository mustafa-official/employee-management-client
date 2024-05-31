import PropTypes from "prop-types";
const Container = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-14 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
Container.propTypes = {
  children: PropTypes.node,
};
