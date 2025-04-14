
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Analyzer />
      <Footer />
    </div>
  );
};

export default Index;
