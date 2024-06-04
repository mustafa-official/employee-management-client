import Lottie from "lottie-react";
import animate from "../assets/banner.json";
const Banner = () => {
  return (
    <div className="flex flex-col px-4 justify-center py-8 lg:py-4 md:px-14 bg-gradient-to-r bg-[#ddddddee]   lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <h1 className="text-3xl font-black tracking-wide text-gray-800 dark:text-white lg:text-6xl">
            Easiest way to <span className="text-[#2255d3]">create</span> your
            website
          </h1>

          <div className="mt-8 space-y-5">
            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mx-2">Clean and Simple Layout</span>
            </p>

            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mx-2">Just Copy Paste Coding</span>
            </p>

            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mx-2">Easy to Use</span>
            </p>
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
