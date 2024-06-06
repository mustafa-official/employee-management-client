import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import moment from "moment";

const ProgressTask = () => {
  const axiosSecure = useAxiosSecure();
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState("");
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["all-task", employeeName, month],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-task?name=${employeeName}&month=${month}`
      );
      return data;
    },
  });

  //all task for filtering dropdown
  const { data: taskUsername = [] } = useQuery({
    queryKey: ["task-username"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/username`);
      return data;
    },
  });
  const taskNames = [...new Set(taskUsername.map((task) => task.name))];

  const handleName = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
  console.log(month);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">All Task</h2>

        <span className="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-full ">
          {tasks?.length} Tasks
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
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-800"
                    >
                      <div className="flex items-center gap-x-3">
                        <select className="bg-gray-50 border rounded-md border-gray-400 p-1" onChange={handleName}>
                          <option value="">Name</option>
                          {taskNames?.map((task, index) => (
                            <option key={index} value={task}>
                              {task}
                            </option>
                          ))}
                        </select>
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
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Working Hours</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-800"
                    >
                      <div className="flex items-center gap-x-3">
                        <select className="bg-gray-50 border rounded-md border-gray-400 p-1" onChange={handleMonth}>
                          <option value="">Month</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Task</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {tasks?.map((task) => (
                    <tr key={task?._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {task?.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {task?.email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {task?.worked_hours} Hours
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {moment(task?.date, "M/D/YYYY").format("MMMM D, YYYY")}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className="px-3 py-1 rounded-full text-blue-500 font-bold bg-blue-100/60
                               text-xs"
                          >
                            {task?.task}
                          </p>
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
    </section>
  );
};

export default ProgressTask;
