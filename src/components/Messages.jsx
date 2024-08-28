import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Messages = () => {
  const axiosSecure = useAxiosSecure();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title>Dashboard | Messages</title>
      </Helmet>
      <h2 className="text-lg flex  gap-2 flex-wrap items-center font-medium text-gray-800 ">
        All Message
        <span className="px-3 py-1 text-xs text-blue-600 font-bold bg-blue-100 rounded-full ">
          {messages?.length} Messages
        </span>
      </h2>
      <div className="mt-6 grid lg:grid-cols-3 gap-x-6 gap-y-6 md:grid-cols-2 grid-cols-1">
        {messages?.map((message) => (
          <div
            key={message?._id}
            className="flex flex-col border p-5 gap-1 w-full max-w-md divide-y rounded-md "
          >
            <div className="flex justify-between">
              <div className="flex justify-center items-center space-x-3">
                <div>
                  <FaUser className="text-[18px] text-[#2461E9] w-8 h-8 border border-[#2461E9] rounded-full"></FaUser>
                </div>
                <div>
                  <h4 className="font-bold text-[#2461E9] text-[18px]">
                    {message?.name}
                  </h4>
                  <small className="">{message?.email}</small>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm ">
              <p className="mt-3 text-justify">{message?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
