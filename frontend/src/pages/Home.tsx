import CallToAction from "../components/Home/CallToAction";
import CustomerReviews from "../components/Home/CustomerReviews";
import FAQSection from "../components/Home/FAQSection";
import FeaturedCars from "../components/Home/FeaturedCars";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";

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
