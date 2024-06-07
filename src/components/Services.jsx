import { IoDocument } from "react-icons/io5";
import ServicesCard from "./ServicesCard";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Services = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-8 md:mt-20 md:text-3xl">
        Employee Benefits Services
      </h2>
      <div className="grid lg:grid-cols-4 gap-x-5 lg:gap-x-5 lg:mt-4 lg:gap-y-5 md:grid-cols-2 grid-cols-1">
        <div data-aos="fade-up" data-aos-duration="1000" className="flex-grow flex">
          <ServicesCard
            icon={<MdOutlineHealthAndSafety className="text-3xl text-white" />}
            IoDocument={IoDocument}
            bgColor="#2DD4BF"
            heading="Retirement Services"
            description="As the nation’s largest 401(k) recordkeeper2, we know 401(k) plans, inside and out. Talk to one of our retirement specialists about how to make employee benefit plan management simple and affordable."
          ></ServicesCard>
        </div>
        <div data-aos="fade-down" data-aos-duration="1000" className="flex-grow flex">
          <ServicesCard
            icon={<IoDocument className="text-2xl text-white" />}
            bgColor="#F43F5E"
            heading="Ancillary Benefits"
            description="In addition to offering Section 125 plans, you can help employees with unforeseen circumstances by offering ancillary benefits such as accident, disability, critical illness, and indemnity coverage."
          ></ServicesCard>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000" className="flex-grow flex">
          <ServicesCard
            icon={<FaLayerGroup className="text-xl text-white" />}
            bgColor="#0EA5E9"
            heading="Employee Benefits"
            description="Simplify and automate your employee benefits management with our new benefits administration technology, Flock. Benefits shouldn't be overwhelming, so let our technology do the heavy lifting."
          ></ServicesCard>
        </div>
        <div data-aos="fade-down" data-aos-duration="1000" className="flex-grow flex">
          <ServicesCard
            icon={<TbUsersGroup className="text-2xl text-white" />}
            bgColor="#4EDC85"
            heading="Group Health Insurance"
            description="Attract and retain the best talent with access to a cost-effective, comprehensive employee benefits package, which can help you level the playing field with Fortune 500 companies"
          ></ServicesCard>
        </div>
      </div>
    </div>
  );
};

export default Services;
