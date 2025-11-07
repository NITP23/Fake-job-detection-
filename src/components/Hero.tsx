import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  const scrollToScanner = () => {
    const element = document.getElementById("scanner");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-subtle z-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Protection</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Protect Yourself from
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Fake Job Scams
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI analyzes job offers, links, and documents to detect suspicious patterns and protect job seekers from fraudulent opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToScanner} className="group">
              Scan Job Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              const element = document.getElementById("how-it-works");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              { number: "50K+", label: "Scams Detected" },
              { number: "98%", label: "Accuracy Rate" },
              { number: "100K+", label: "Protected Users" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl font-bold text-accent">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
