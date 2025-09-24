import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Sermons from "@/components/Sermons";
import Events from "@/components/Events";
import Ministries from "@/components/Ministries";
import Giving from "@/components/Giving";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Sermons />
      <Events />
      <Ministries />
      <Giving />
      <Footer />
    </div>
  );
};

export default Index;