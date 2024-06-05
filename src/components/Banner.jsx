import Lottie from "lottie-react";
import animate from "../assets/banner.json";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="flex flex-col px-4 justify-center py-8 lg:py-4 md:px-14 bg-gradient-to-r bg-[#F3F4F6]   lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-xl">
          <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white md:text-4xl lg:text-5xl">
            Simplify <span className="text-[#2461E9]">Staff</span> Success with
            Our Platform
          </h1>

          <div className="mt-4">
            <p>
              Streamline HR tasks, boost employee engagement, and optimize
              performance with our management platform.
            </p>
          </div>
          <div className="mt-6">
            <Link to="/register">
              <button className="px-4 py-2 font-medium tracking-wide hover:text-black  capitalize transition-colors duration-300 transform border border-[#2461E9] rounded-lg hover:bg-transparent text-white  bg-[#2461E9] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[40%]">
        <Lottie animationData={animate}></Lottie>
      </div>
    </div>
  );
};

export default Banner;
