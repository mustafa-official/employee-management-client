import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const ProgressTask = () => {
  const axiosSecure = useAxiosSecure();
  const [employeeName, setEmployeeName] = useState("");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["all-task", employeeName],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-task?name=${employeeName}`);
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">All Task</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {tasks?.length} Tasks
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
                        <select onChange={handleName}>
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
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Working Hours</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Date</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
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
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.worked_hours} Hours
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.date}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
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
