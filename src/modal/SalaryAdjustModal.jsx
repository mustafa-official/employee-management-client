import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SalaryAdjustModal = ({ closeModal, isOpen, employee }) => {
  const axiosSecure = useAxiosSecure();
  const handleSalaryUpdate = async (e) => {
    e.preventDefault();
    const newSalary = parseInt(e.target.salary.value);
    if (newSalary < employee?.salary) {
      return toast.error("Can't decrease salary!!");
    }
    try {
      const { data } = await axiosSecure.patch(
        `/update-salary/${employee?._id}`,
        { salary: newSalary }
      );
      if (data.modifiedCount > 0) {
        toast.success(`${employee?.name}'s salary increased !`);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex justify-center">
      {isOpen && (
        <div
          className="fixed inset-0 z-10 modal-container"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex backdrop-blur-md items-end justify-center min-h-screen  pt-4  text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block text-left align-bottom transition-all transform border-gray-400 border  bg-white shadow-lg rounded-lg dark:bg-gray-900 w-[80%] md:w-[70%] lg:w-[40%] my-4 py-4 px-3 sm:align-middle">
              <form onSubmit={handleSalaryUpdate}>
                <div>
                  <label className="text-xs text-black">Salary</label>

                  <input
                    name="salary"
                    defaultValue={employee?.salary}
                    type="number"
                    className="block w-full px-2 py-2  mt-1  text-[#010313] bg-[#ffffff69] border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <button className="btn mt-4" type="submit">
                  Update Salary
                </button>
              </form>
              <div className="absolute top-1 right-1">
                <button
                  onClick={() => closeModal()}
                  className="text-3xl font-bold text-black bg-white rounded-md hover:bg-base-300"
                >
                  <IoIosClose></IoIosClose>
                </button>
              </div>
              {/* form */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SalaryAdjustModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  employee: PropTypes.object,
};

export default SalaryAdjustModal;
