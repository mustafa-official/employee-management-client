import Marquee from "react-fast-marquee";
import TestimonialData from "./TestimonialData";
import one from "../assets/img/item1.jpg";
import two from "../assets/img/item2.jpg";
import three from "../assets/img/item3.jpg";
import four from "../assets/img/item4.jpg";
import five from "../assets/img/item5.jpg";
import six from "../assets/img/item6.jpg";
import seven from "../assets/img/item7.jpg";
import eight from "../assets/img/item8.jpg";

const Testimonials = () => {
  return (
    <div className="relative z-0">
      <h2 className="text-2xl font-bold text-center mt-8 md:mt-20 md:text-3xl">
        What Our Employees Are Saying
      </h2>
      <Marquee pauseOnHover={true}>
        <div className="flex mt-8 ml-8 gap-8">
          <TestimonialData
            review="Great managers foster employee growth, boosting both morale and productivity significantly."
            name="HR Nayem"
            image={one}
          ></TestimonialData>
          <TestimonialData
            review="Effective communication in management creates a cohesive and motivated team environment."
            name="Roman Kill"
            image={two}
          ></TestimonialData>
          <TestimonialData
            review="Empathetic leaders understand employees’ needs, leading to higher job satisfaction levels."
            name="Amir Khan"
            image={three}
          ></TestimonialData>
          <TestimonialData
            review="Strong leadership skills are essential for navigating complex employee management challenges."
            name="Clius Oliva"
            image={four}
          ></TestimonialData>
          <TestimonialData
            review="Transparent management practices build trust and enhance overall organizational performance."
            name="Oman GR"
            image={five}
          ></TestimonialData>
          <TestimonialData
            review="Proactive management anticipates issues, ensuring a smoother and more efficient workflow."
            name="NT Sanwar"
            image={six}
          ></TestimonialData>
          <TestimonialData
            review="Consistent feedback from management helps employees improve and stay motivated consistently."
            name="Mr. Sayed"
            image={seven}
          ></TestimonialData>
          <TestimonialData
            review="Good managers recognize achievements, creating a positive and encouraging workplace culture."
            name="Ronik Ubayed"
            image={eight}
          ></TestimonialData>
        </div>
      </Marquee>
    </div>
  );
};

export default Testimonials;
