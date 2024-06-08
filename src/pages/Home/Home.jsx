import { ScrollRestoration } from "react-router-dom";
import Banner from "../../components/Banner";
import Faq from "../../components/Faq";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import TrustedCompany from "../../components/TrustedCompany";
import Container from "../../shared/Container/Container";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <section>
      <Helmet>
        <title>Staff Genius</title>
      </Helmet>
      <div>
        <Banner></Banner>
      </div>
      <Container>
        <Services></Services>
        <Testimonials></Testimonials>
        <TrustedCompany></TrustedCompany>

        <Faq></Faq>
      </Container>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Home;
