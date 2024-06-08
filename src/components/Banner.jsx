import Lottie from "lottie-react";
import animate from "../assets/banner.json";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col px-4 justify-center py-12 lg:py-4 md:px-14 bg-gradient-to-r bg-[#F3F4F6]   lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-xl">
          <h1 className="text-3xl text-center md:text-left font-bold  text-gray-800 dark:text-white md:text-4xl lg:text-5xl">
            Empower Your{" "}
            <span className="bg-gradient-to-r from-[#00bcf5] via-[#2461E9] to-[#0057fa] text-transparent bg-clip-text bg-300% animate-gradient">
              Team
            </span>{" "}
            Management
          </h1>

          <div className="mt-4">
            <p className="text-center text-[15px] md:text-[17px] md:text-left">
              Streamline HR tasks, boost employee engagement, and optimize
              performance with our management platform.
            </p>
          </div>
          {!user && (
            <div className="mt-6 md:text-left text-center">
              <Link to="/login">
                <button className="px-2 py-1 md:px-4 md:py-2 text-[14px] md:text-[16px] font-medium tracking-wide hover:text-black  capitalize transition-colors duration-300 transform border border-[#2461E9] rounded-lg hover:bg-transparent text-white  bg-[#2461E9] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[40%]">
        <Lottie animationData={animate}></Lottie>
      </div>
    </div>
  );
};

export default Banner;
