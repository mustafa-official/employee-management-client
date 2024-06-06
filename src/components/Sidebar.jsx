import { useState } from "react";
import { GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
import { BsFillHouseAddFill } from "react-icons/bs";
// import { BsGraphUp } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  MdClose,
  MdOutlineAddTask,
  MdOutlineHistoryToggleOff,
} from "react-icons/md";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../hooks/useRole";
import { FaListUl } from "react-icons/fa";
import { FaPeopleRoof, FaRegMessage } from "react-icons/fa6";
import logo from "../assets/img/logo.png";
import { RiMenu3Fill } from "react-icons/ri";

const Sidebar = () => {
  const { logoutUser } = useAuth();
  const [isActive, setActive] = useState(true);
  const navigate = useNavigate();
  const [role] = useRole();
  // console.log(role);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img className="w-32" src={logo} alt="" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none"
        >
          {isActive ? (
            <RiMenu3Fill className="text-[18px]"></RiMenu3Fill>
          ) : (
            <MdClose className="text-xl"></MdClose>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 justify-start items-center  mx-auto">
              <Link to="/">
                <img className="w-32 md:w-36" src={logo} alt="" />
              </Link>
            </div>
          </div>
          {/* TODO */}
          {/* Nav Items */}
          <div className="flex  flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Employee */}
              {role === "employee" && (
                <>
                  <NavLink
                    end
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-md hover:text-[#2461E9]  transition-colors duration-300 transform  hover:bg-gray-300 ${
                        isActive
                          ? "bg-[#3a89ff42]  text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <BsFillHouseAddFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add Work</span>
                  </NavLink>
                  {/* My Listing */}
                  <NavLink
                    to="payment-history"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-md hover:text-[#2461E9] transition-colors duration-300 transform  hover:bg-gray-300 ${
                        isActive
                          ? "bg-[#3a89ff42] text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    {/* <MdHomeWork  /> */}
                    <MdOutlineHistoryToggleOff className="w-5 h-5"></MdOutlineHistoryToggleOff>

                    <span className="mx-4 font-medium">Payment History</span>
                  </NavLink>
                </>
              )}

              {/* hr role */}

              {role === "hr" && (
                <>
                  <NavLink
                    to="/dashboard/employee-list"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-md hover:text-[#2461E9] transition-colors duration-300 transform  hover:bg-gray-300  ${
                        isActive
                          ? "bg-[#3a89ff42]  text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaListUl className="w-5 h-5"></FaListUl>

                    <span className="mx-4 font-medium">Employee List</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/progress"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-md hover:text-[#2461E9]  transition-colors duration-300 transform  hover:bg-gray-300 ${
                        isActive
                          ? "bg-[#3a89ff42]  text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineAddTask className="w-5 h-5"></MdOutlineAddTask>

                    <span className="mx-4 font-medium">Progress</span>
                  </NavLink>
                </>
              )}

              {role === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/admin/all-employee"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-md hover:text-[#2461E9] transition-colors duration-300 transform  hover:bg-gray-300 ${
                        isActive
                          ? "bg-gray-300  bg-[#3a89ff42]  text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaPeopleRoof className="w-5 h-5"></FaPeopleRoof>

                    <span className="mx-4 font-medium">All Employee</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/messages"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   rounded-md hover:text-[#2461E9] ${
                        isActive
                          ? "bg-[#3a89ff42]  text-[#2461E9]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaRegMessage className="w-5 h-5"></FaRegMessage>
                    <span className="mx-4 font-medium">Messages</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          {/* <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink> */}
          <button
            onClick={() => {
              logoutUser();
              navigate("/login");
              toast.success("Logout Successfull");
            }}
            className="flex w-full items-center px-4 py-2 mt-5 hover:bg-[#3a89ff42]  hover:text-[#2461E9] hover:bg-gray-300 rounded-md transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
