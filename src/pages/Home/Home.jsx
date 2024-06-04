import Banner from "../../components/Banner";
import Testimonials from "../../components/Testimonials";
import Container from "../../shared/Container/Container";

const Home = () => {
  return (
    <section>
      <div>
        <Banner></Banner>
      </div>
      <Container>
        <Testimonials></Testimonials>
      </Container>
    </section>
  );
};

export default Home;
