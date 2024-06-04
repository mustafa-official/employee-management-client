import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import SalaryAdjustModal from "../../modal/SalaryAdjustModal";

const AllEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState({});
  const {
    data: allEmployee = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees-admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/employees");
      return data;
    },
  });

  const handleFire = (employee) => {
    // console.log(employee?._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Fired Now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(
            `/employee-fired/${employee?._id}`,
            { isFired: true }
          );
          if (data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Fired!",
              text: `${employee?.name} was fired ❗`,
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleMakeHR = async (employee) => {
    try {
      const { data } = await axiosSecure.patch(`/make-hr/${employee?._id}`, {
        role: "hr",
        status: false,
      });
      if (data.modifiedCount > 0) {
        refetch();
        toast.success(`${employee?.name} is now HR `);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (employee) => {
    setEmployee(employee);
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  };
console.log(employee);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="container px-4 mx-auto pt-4">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">All Employee</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {allEmployee?.length} Employees
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Designation</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Role</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Make HR</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Salary</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allEmployee?.map((employee) => (
                    <tr key={employee?._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {employee?.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {employee?.designation}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {employee?.role}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <button
                          onClick={() => handleMakeHR(employee)}
                          disabled={employee?.role === "hr"}
                          className="btn disabled:cursor-not-allowed"
                        >
                          Make HR
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <button
                          onClick={() => openModal(employee)}
                          className="btn disabled:cursor-not-allowed"
                        >
                          Adjust
                        </button>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {!employee?.isFired && (
                          <button
                            onClick={() => handleFire(employee)}
                            className="btn"
                          >
                            Fire
                          </button>
                        )}
                        {employee?.isFired && (
                          <p className="text-red-500 text-[16px] font-bold">
                            Fired
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SalaryAdjustModal
        closeModal={closeModal}
        isOpen={isOpen}
        employee={employee}
      ></SalaryAdjustModal>
    </section>
  );
};

export default AllEmployee;