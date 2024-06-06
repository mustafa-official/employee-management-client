import { BsPersonWorkspace } from "react-icons/bs";
import { TbUserStar } from "react-icons/tb";
import PropTypes from "prop-types";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="w-full px-8 py-4 mt-16 bg-white rounded-lg border-b-4 border border-b-[#2461E9] border-gray-300  dark:bg-gray-800">
      <div className="flex justify-center -mt-16">
        <img
          className="object-cover w-16 h-16 border-2 border-blue-500 rounded-full dark:border-blue-400"
          alt="Testimonial avatar"
          src={employee?.photo}
        />
      </div>

      <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
        {employee?.name}
      </h2>

      <h2 className="flex items-center  gap-2 mt-4 text-[16px] capitalize">
        <TbUserStar className="text-2xl text-[#2461E9]"></TbUserStar>{" "}
        {employee?.role}
      </h2>
      <h2 className="flex items-center gap-2 ml-1 mt-2 text-[16px] capitalize">
        <BsPersonWorkspace className="text-xl text-[#2461E9]"></BsPersonWorkspace>{" "}
        {employee?.designation}
      </h2>
    </div>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.object,
};
export default EmployeeCard;
