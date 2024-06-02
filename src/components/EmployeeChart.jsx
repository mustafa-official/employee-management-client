import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
  Cell,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const EmployeeChart = ({ employeeStats }) => {
  return (
    <div className="flex justify-center w-full md:w-[60%] h-[300px] md:h-[400px]">
      <ResponsiveContainer>
        {/* <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart> */}
        <BarChart
          width={730}
          height={250}
          data={employeeStats}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{ value: "Salary", angle: -90, position: "insideLeft" }}
          />
          <Tooltip></Tooltip>

          <Bar dataKey="price" fill="#8884d8">
            <LabelList dataKey="price" position="top" />
            {employeeStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

EmployeeChart.propTypes = {
  employeeStats: PropTypes.array,
};
export default EmployeeChart;
