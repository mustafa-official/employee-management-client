import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Headroom from "react-headroom";

const Root = () => {
  return (
    <>
      <Headroom>
        <Navbar></Navbar>
      </Headroom>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
