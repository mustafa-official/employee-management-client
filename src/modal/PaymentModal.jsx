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

            <div className="relative inline-block  pt-   text-left align-bottom transition-all transform border-gray-800 border  bg-white shadow-lg rounded-lg dark:bg-gray-900 w-[80%] md:w-[70%] lg:w-[40%] my-4 md:py-4 md:px-3 sm:align-middle">
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

              

              <div className="p-3">
                <Payment
                  salary={salary}
                  employeeEmail={employeeEmail}
                  closeModal={closeModal}
                ></Payment>
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
  employeeEmail: PropTypes.string,
};
export default PaymentModal;
