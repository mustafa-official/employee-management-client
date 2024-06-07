import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import Container from "../../shared/Container/Container";
import { ScrollRestoration } from "react-router-dom";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const handleForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const contactInfo = { name, email, message };

    try {
      const { data } = await axiosPublic.post("/message", contactInfo);
      if (data.insertedId) {
        form.reset();
        Swal.fire({
          title: "Thank You",
          text: "We Recorded Your Message!",
          icon: "success",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section className="bg-[#F3F4F6]">
      <Container>
        <div className="flex lg:flex-row flex-col py-8  lg:py-10 justify-center items-center gap-5 lg:gap-0">
          <div className="text-gray-800 w-full lg:w-1/2 lg:mx-6">
            <h1 className="text-2xl font-bold capitalize lg:text-4xl">
              Get a quote
            </h1>

            <p className="max-w-xl text-[18px] mt-3">
              Ask us anything anytime; we’re here to help, and we’d love to hear
              your feedback and suggestions.
            </p>

            <div className="mt-6 space-y-8 md:mt-8">
              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="mx-2 text-gray-800 truncate w-72">
                  Cecilia Chapman 711-2880 Nulla St
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="mx-2 text-gray-800 truncate w-72">
                  (257) 563-7401
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="mx-2 text-gray-800 truncate w-72">
                  staff@genius.com
                </span>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 pb-8 pt-4 mx-auto overflow-hidden bg-white shadow-xl rounded-xl dark:bg-gray-900 lg:max-w-lg">
              <form onSubmit={handleForm} className="mt-4">
                <div className="flex-1">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="flex-1 mt-3">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="w-full mt-3">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-36 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full disabled:cursor-not-allowed px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                >
                  {loading ? (
                    <ImSpinner3 className="animate-spin m-auto"></ImSpinner3>
                  ) : (
                    "get in touch"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Contact;
