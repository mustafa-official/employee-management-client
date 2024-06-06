import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import EmployeeChart from "../../components/EmployeeChart";

const EmployeeDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { email } = useParams();
  //   console.log(email);

  const { data: employee = {}, isLoading } = useQuery({
    queryKey: ["employee-details", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${email}`);
      return data;
    },
  });

  const { data: employeeStats = [] } = useQuery({
    queryKey: ["employee-stats", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee-stats/${email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="flex flex-col items-center lg:gap-14 gap-10 justify-center md:mt-4">
      <div className="bg-white border border-gray-300 rounded-2xl w-4/5 md:w-3/5">
        <div className="w-full mb-4 bg-[#4d7fecea] rounded-t-lg h-36"></div>
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={employee.photo}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-1 mt-3 px-4 text-xs capitalize text-white bg-[#4d7fecea] rounded-full">
            {employee.designation}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            {employee.name}
          </p>
        </div>
      </div>
      <EmployeeChart employeeStats={employeeStats}></EmployeeChart>
    </div>
  );
};

export default EmployeeDetails;
