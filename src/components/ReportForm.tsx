import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from "lucide-react";

const ReportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobLink: "",
    description: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Report Submitted",
      description: "Thank you for helping keep our community safe. We'll review this report shortly.",
    });

    setFormData({
      companyName: "",
      jobTitle: "",
      jobLink: "",
      description: "",
      email: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="report" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Report a Scam
          </h2>
          <p className="text-lg text-muted-foreground">
            Help protect others by reporting suspicious job postings
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-elevated">
            <div className="flex items-center gap-3 mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0" />
              <p className="text-sm text-foreground">
                Your report helps build a safer job-seeking community. All submissions are reviewed by our team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-foreground">
                  Company Name *
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jobTitle" className="text-sm font-medium text-foreground">
                  Job Title *
                </label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  placeholder="Enter job title"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jobLink" className="text-sm font-medium text-foreground">
                  Job Posting Link
                </label>
                <Input
                  id="jobLink"
                  name="jobLink"
                  type="url"
                  value={formData.jobLink}
                  onChange={handleChange}
                  placeholder="https://example.com/job"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe why you think this is a scam..."
                  className="min-h-[150px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Your Email (optional)
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Report
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
