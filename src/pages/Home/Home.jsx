import Banner from "../../components/Banner";
import Faq from "../../components/Faq";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import TrustedCompany from "../../components/TrustedCompany";
import Container from "../../shared/Container/Container";

const Home = () => {
  return (
    <section>
      <div>
        <Banner></Banner>
      </div>
      <Container>
        <Services></Services>
        <Testimonials></Testimonials>
        <TrustedCompany></TrustedCompany>

        <Faq></Faq>
      </Container>
    </section>
  );
};

export default Home;
