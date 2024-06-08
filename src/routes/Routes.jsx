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
import Contact from "../pages/Contact/Contact";
import Messages from "../components/Messages";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";

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
      {
        path: "/contact",
        element: <Contact></Contact>,
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
        path: "add-work",
        element: (
          <PrivateRoute>
            <AddWork></AddWork>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoute>
            <HrRoute>
              <EmployeeList></EmployeeList>
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "details/:email",
        element: (
          <PrivateRoute>
            <EmployeeDetails></EmployeeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <PrivateRoute>
            <HrRoute>
              <ProgressTask></ProgressTask>
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/all-employee",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllEmployee></AllEmployee>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/messages",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Messages></Messages>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
