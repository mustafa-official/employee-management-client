import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import Payment from "../pages/Payment/Payment";

const PaymentModal = ({ isOpen, closeModal, salary, employeeEmail }) => {
  return (
    <div className="relative flex justify-center">
      {isOpen && (
        <div
          className="fixed inset-0 z-10 modal-container"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex backdrop-blur-sm items-end justify-center min-h-screen  pt-4  text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5   text-left align-bottom transition-all transform border-gray-800 border  bg-white shadow-lg rounded-lg dark:bg-gray-900 w-[80%] md:w-[70%] lg:w-[40%] my-8 pb-6 sm:align-middle">
              {/* Request Now */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => closeModal()}
                  className="text-3xl font-bold text-black bg-white rounded-md hover:bg-base-300"
                >
                  <IoIosClose></IoIosClose>
                </button>
              </div>
              {/* form */}
              <div className="">
                <form className="sm:flex sm:items-center sm:-mx-2 px-2 lg:px-6">
                  <div className="flex flex-col gap-3 w-full text-black">
                    <div>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2 mt-2">
                        <div>
                          <label className="text-xs text-black">Salary</label>

                          <input
                            readOnly
                            defaultValue={`$${salary}`}
                            type="text"
                            className="block w-full px-2 py-2  mt-1  text-[#010313] bg-[#ffffff69] border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-black" htmlFor="">
                            Write Month <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="month"
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#010313] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-black" htmlFor="">
                            Write Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="year"
                            type="number"
                            className="block w-full px-2 py-2  mt-1 text-[#010313] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => closeModal()}
                          className="text-3xl font-bold text-black bg-white rounded-md hover:bg-base-300"
                        >
                          <IoIosClose></IoIosClose>
                        </button>
                      </div>

                      {/* <div className="w-[250px]">
                      <button
                        type="submit"
                        className="py-2 md:px-0 px-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00BBE4] rounded-md sm:mt-0 sm:w-1/2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      >
                        Pay Now
                      </button>
                    </div> */}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-3">
                <Payment salary={salary} employeeEmail={employeeEmail} closeModal={closeModal}></Payment>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  salary: PropTypes.number,
  employeeEmail: PropTypes.string
};
export default PaymentModal;
