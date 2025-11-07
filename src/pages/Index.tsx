import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import JobScanner from "@/components/JobScanner";
import ReportForm from "@/components/ReportForm";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <JobScanner />
      <ReportForm />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
