import CallToAction from "../components/CallToAction";
import CustomerReviews from "../components/CustomerReviews";
import FAQSection from "../components/FAQSection";
import FeaturedCars from "../components/FeaturedCars";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedCars />
      <HowItWorks />
      <CustomerReviews />
      <FAQSection />
      <CallToAction />
    </div>
  );
};

export default Home;
