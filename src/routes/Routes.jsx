import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import AddWork from "../components/AddWork";
import PaymentHistory from "../components/PaymentHistory";
import EmployeeList from "../components/EmployeeList";
import EmployeeDetails from "../pages/EmployeeDetails/EmployeeDetails";
import ProgressTask from "../pages/ProgressTask/ProgressTask";
import AllEmployee from "../pages/AllEmployee/AllEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <AddWork></AddWork>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: 'employee-list',
        element: <EmployeeList></EmployeeList>
      },
      {
        path: 'details/:email',
        element: <EmployeeDetails></EmployeeDetails>
        
      },
      {
        path: 'progress',
        element: <ProgressTask></ProgressTask>
      },
      {
        path: 'admin/all-employee',
        element: <AllEmployee></AllEmployee>
      }
    ],
  },
]);
export default router;
