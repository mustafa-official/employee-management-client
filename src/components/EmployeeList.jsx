import { CgClose } from "react-icons/cg";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import { useState } from "react";
import PaymentModal from "../modal/PaymentModal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [salary, setSalary] = useState(null);
  const [employeeEmail, setEmployeeEmail] = useState("");

  //from user collection
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-employee"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-employee");
      return data;
    },
  });

  const handleVerify = async (employee) => {
    // console.log(id);
    const newStatus = { status: true };
    try {
      const { data } = await axiosSecure.patch(
        `/update-status/${employee?._id}`,
        newStatus
      );
      if (data.modifiedCount > 0) {
        toast.success(`${employee?.name} is now Verified `);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleNotVerify = async (employee) => {
    // console.log(id);
    const newStatus = { status: false };
    try {
      const { data } = await axiosSecure.patch(
        `/update-status/${employee?._id}`,
        newStatus
      );
      if (data.modifiedCount > 0) {
        toast.success("Verify Cancelled!");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="container px-4 mx-auto pt-4">
      <Helmet>
        <title>Dashboard | Employee List</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Total Employee</h2>

        <span className="px-3 py-1 text-xs text-blue-600 font-bold bg-blue-100 rounded-full ">
          {employees?.length} Employee
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#4d7fecea]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Salary</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Bank Account</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      Details
                    </th>

                    <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {employees?.map((employee) => (
                    <tr key={employee?._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {employee?.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {employee?.email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        ${employee?.salary}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {employee?.bank_account}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          {!employee?.status && (
                            <button onClick={() => handleVerify(employee)}>
                              <CgClose className="text-xl text-red-500 hover:text-red-600"></CgClose>
                            </button>
                          )}
                          {employee?.status && (
                            <button onClick={() => handleNotVerify(employee)}>
                              <MdVerified className="text-xl text-blue-500 hover:text-blue-700"></MdVerified>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <Link to={`/dashboard/details/${employee?.email}`}>
                          {/* <button className="btn">Details</button> */}
                          <button className="px-4  py-2 font-medium tracking-wide  capitalize transition-colors duration-300 transform border  rounded-lg   bg-[#3d6fdb] hover:bg-[#5888ee]  text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            Details
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          {/* <button
                            disabled={!employee?.status}
                            onClick={() => {
                              setSalary(employee?.salary);
                              setEmployeeEmail(employee?.email);

                              openModal();
                            }}
                            className="btn disabled:cursor-not-allowed"
                          >
                            Pay
                          </button> */}
                          <button
                            disabled={!employee?.status}
                            onClick={() => {
                              setSalary(employee?.salary);
                              setEmployeeEmail(employee?.email);

                              openModal();
                            }}
                            className="px-4 disabled:cursor-not-allowed  py-2 font-medium tracking-wide  capitalize transition-colors duration-300 transform border  rounded-lg   bg-[#3d6fdb] hover:bg-[#5888ee]  text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                          >
                            Pay
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        salary={salary}
        isOpen={isOpen}
        employeeEmail={employeeEmail}
        closeModal={closeModal}
      ></PaymentModal>
    </section>
  );
};

export default EmployeeList;
