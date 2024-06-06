import PropTypes from "prop-types";
const EmployeeTask = ({ tasks }) => {
  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Tasks</h2>

        <span className="px-3 py-1 text-xs text-blue-600 font-bold bg-blue-100 rounded-full ">
          {tasks?.length} Tasks
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#4d7fecea] ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Serial</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Date</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Worked Hours</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      Task
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {tasks?.map((task, idx) => (
                    <tr key={task?._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {task?.date}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {task?.worked_hours} Hours
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className="px-3 py-1 rounded-full text-[#2461E9] font-bold bg-blue-100/60
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

EmployeeTask.propTypes = {
  tasks: PropTypes.array,
};
export default EmployeeTask;
