import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Container from "../Container/Container";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import logo from "../../assets/img/logo.png";
import { RiCloseLargeFill, RiMenu3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [role] = useRole();
  // console.log(role);
  const navLinks = (
    <>
      {user && (
        <NavLink
          to={`${
            role === "admin"
              ? "dashboard/admin/all-employee"
              : role === "hr"
              ? "dashboard/employee-list"
              : "dashboard/add-work"
          }`}
          className={({ isActive }) =>
            isActive ? "  font-bold text-[#2461E9]" : ""
          }
        >
          Dashboard
        </NavLink>
      )}
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "  font-bold text-[#2461E9]" : ""
        }
      >
        Contact Us
      </NavLink>
    </>
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <nav className="relative backdrop-blur-md z-50  ">
      <Container>
        <div className="py-3">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                <Link to="/">
                  <img className="w-32 md:w-36" src={logo} alt="" />
                </Link>
              </h2>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-900  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
                  aria-label="toggle menu"
                >
                  {!isOpen ? (
                    <RiMenu3Line className="text-[18px]"></RiMenu3Line>
                  ) : (
                    <RiCloseLargeFill className="text-[16px]"></RiCloseLargeFill>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 lg:mx-4">
                {/* menuu */}
                {navLinks}
              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                {user ? (
                  <div>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div
                          data-tooltip-id="name"
                          data-tooltip-content={`${user?.displayName}`}
                          className="w-10 rounded-full"
                        >
                          <img src={user?.photoURL} />
                          <Tooltip id="name"></Tooltip>
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="mt-2 z-[1] p-2 shadow-md rounded-md border border-[#2461E9] menu menu-sm  dropdown-content bg-base-200 w-52"
                      >
                        <li>
                          <button
                            className="flex items-center"
                            onClick={() => handleLogout()}
                          >
                            <TbLogout className="text-[16px]"></TbLogout>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        onClick={() => handleLogout()}
                        className="px-2 lg:hidden flex items-center gap-1 py-1 mt-3 text-[14px] md:text-[16px] font-medium tracking-wide hover:text-black  capitalize transition-colors duration-300 transform border border-[#2461E9] rounded-md hover:bg-transparent text-white  bg-[#2461E9] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      >
                        <TbLogout className="text-[16px]"></TbLogout>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex lg:flex-row lg:gap-0 gap-5 flex-col">
                    <Link to="/login">
                      <button className="px-4 py-1  md:px-6 md:py-2 font-medium tracking-wide text-black hover:text-white capitalize transition-colors duration-300 transform border border-[#2461E9] rounded-full hover:bg-[#2461E9] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="px-4 md:px-6 lg:ml-4 py-1 md:py-2 font-medium tracking-wide hover:text-black  capitalize transition-colors duration-300 transform border border-[#2461E9] rounded-full hover:bg-transparent text-white  bg-[#2461E9] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
