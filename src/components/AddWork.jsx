import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import EmployeeTask from "./EmployeeTask";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const AddWork = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState("");
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const handleChange = (event) => {
    setSelectedTask(event.target.value);
  };

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["task", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/${user?.email}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const date = new Date(startDate).toLocaleDateString();
    const task = selectedTask;
    const worked_hours = parseFloat(form.hours.value);
    const newTask = {
      email: user?.email,
      name: user?.displayName,
      task,
      date,
      worked_hours,
    };
    console.log(date, task, worked_hours);

    const { data } = await axiosSecure.post("/add-task", newTask);
    if (data.insertedId) {
      form.reset();
      setSelectedTask("");
      toast.success("Added Successful");

      refetch();
    }
  };

  //   console.log(tasks);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      {role === "employee" && (
        <section>
          <form
            className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-5 items-center gap-x-5"
            onSubmit={handleSubmit}
          >
            <div>
              <select
                className="border w-full py-2 px-2 border-gray-400 rounded-md"
                required
                value={selectedTask}
                onChange={handleChange}
              >
                <option value="">Select Task</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
                {/* Add more options if needed */}
              </select>
            </div>
            <div>
              <input
                className=" py-2 px-3 border border-gray-400 w-full rounded-md"
                name="hours"
                required
                type="number"
                placeholder="Hours Worked"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <DatePicker
                readOnly
                className="p-2 rounded-md border w-full border-gray-400"
                selected={startDate}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-rose-500 w-full rounded-md py-2 text-white"
              >
                Add Task
              </button>
            </div>
          </form>
          <EmployeeTask tasks={tasks}></EmployeeTask>
        </section>
      )}
    </div>
  );
};

export default AddWork;
