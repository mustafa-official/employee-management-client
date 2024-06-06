import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const PaymentHistory = () => {
  const [role] = useRole();

  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [count, setCount] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentsInfo = [], isLoading } = useQuery({
    queryKey: ["payment-history", user, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payment-history/${user?.email}?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  // for payment length
  const { data: paymentCount = 0 } = useQuery({
    queryKey: ["payment-count", user],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-count/${user?.email}`);
      return data.count;
    },
  });

  // console.log(paymentCount);
  const numberOfPages = Math.ceil(paymentCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationBtn = (num) => {
    setCurrentPage(num);
  };

  // {role === "employee" && <div>History</div>}
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="container px-4 mx-auto pt-4">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">All Payment</h2>
      </div>

      <div className="flex flex-col mt-4">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#4d7fecea]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Month</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Amount</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                    >
                      <span>Transaction Id</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {paymentsInfo?.map((item) => (
                    <tr key={item?._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                      {item?.month}, {item?.year}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        ${item?.price}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {item?.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination button */}
      {paymentCount > 5 && (
        <div className="flex justify-center mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationBtn(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">previous</span>
            </div>
          </button>

          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationBtn(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              }  px-4 border py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationBtn(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
            </div>
          </button>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
