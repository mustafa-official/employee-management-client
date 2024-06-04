import PropTypes from "prop-types";
const TestimonialData = ({ image, name, review }) => {
  return (
    <div className="container flex border rounded-md  flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly">
      <div className="flex flex-col max-w-[290px] shadow-lg">
        <div className="py-12 rounded-t-lg dark:bg-gray-50">
          <p className="relative px-6 py-1 text-[16px] text-center dark:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-5 h-5 dark:text-violet-600"
            >
              <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
              <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
            </svg>
            {review}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="absolute right-5 w-5 h-5 dark:text-violet-600"
            >
              <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
              <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
            </svg>
          </p>
        </div>
        <div className="flex  flex-col items-center justify-center p-8 rounded-b-lg bg-[#2461E9] text-white">
          <img
            src={image}
            alt=""
            className="w-14 h-14 border-white border-2 mb-2 -mt-16 bg-center object-cover bg-cover rounded-full"
          />
          <p className="text-[18px] font-semibold leading-tight">{name}</p>
        </div>
      </div>
    </div>
  );
};

TestimonialData.propTypes = {
  name: PropTypes.string,
  review: PropTypes.string,
  image: PropTypes.string,
};
export default TestimonialData;
