import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";

const Messages = () => {
  const axiosSecure = useAxiosSecure();
  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages");
      return data;
    },
  });
  console.log(messages);
  return (
    <div className="mt-6 grid lg:grid-cols-3 gap-x-6 gap-y-6 md:grid-cols-2 grid-cols-1">
      {messages?.map((message) => (
        <div
          key={message?._id}
          className="flex flex-col border p-5 gap-1 w-full max-w-md divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800"
        >
          <div className="flex justify-between">
            <div className="flex justify-center items-center space-x-3">
              <div>
                <FaUser className="text-[18px] w-8 h-8 border border-black rounded-full"></FaUser>
              </div>
              <div>
                <h4 className="font-bold text-[18px]">{message?.name}</h4>
                <small className="dark:text-gray-600">{message?.email}</small>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm dark:text-gray-600">
            <p className="mt-3 text-justify">
             {message?.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
