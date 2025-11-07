import { Upload, Scan, Shield, AlertTriangle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Job Details",
      description: "Paste job description, upload PDF, or share job link",
    },
    {
      icon: Scan,
      title: "AI Analysis",
      description: "Our AI scans for red flags, suspicious patterns, and scam indicators",
    },
    {
      icon: AlertTriangle,
      title: "Get Results",
      description: "Receive instant feedback on legitimacy with detailed risk assessment",
    },
    {
      icon: Shield,
      title: "Stay Protected",
      description: "Access resources and report suspicious listings to help others",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered system analyzes job offers in seconds to protect you from scams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-smooth"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div className="mt-4 mb-4">
                  <Icon className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
