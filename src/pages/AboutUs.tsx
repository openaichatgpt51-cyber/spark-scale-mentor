import Navigation from "@/components/Navigation";
import About from "@/components/About";
import GrowthChart from "@/components/GrowthChart";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <About />
        <GrowthChart />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
