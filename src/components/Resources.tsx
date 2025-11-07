import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Users, FileWarning } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      icon: FileWarning,
      title: "Common Red Flags",
      description: "Learn to identify warning signs in job postings including unrealistic promises, upfront fees, and vague company information.",
    },
    {
      icon: Users,
      title: "Verified Companies",
      description: "Browse our database of verified legitimate employers and check if a company has been reported for scam activities.",
    },
    {
      icon: TrendingUp,
      title: "Latest Scam Trends",
      description: "Stay updated on emerging job scam tactics and new techniques fraudsters are using to target job seekers.",
    },
    {
      icon: BookOpen,
      title: "Safety Guidelines",
      description: "Essential tips for safe job hunting including how to verify employers, protect personal information, and respond to offers.",
    },
  ];

  const blogPosts = [
    {
      title: "5 Red Flags in Job Postings You Should Never Ignore",
      date: "May 15, 2024",
      excerpt: "Learn about the most common warning signs that indicate a job posting might be fraudulent...",
    },
    {
      title: "How to Verify a Company's Legitimacy",
      date: "May 10, 2024",
      excerpt: "Step-by-step guide to researching and verifying potential employers before applying...",
    },
    {
      title: "Understanding Work-From-Home Scams",
      date: "May 5, 2024",
      excerpt: "Remote work scams are on the rise. Here's what you need to know to protect yourself...",
    },
  ];

  return (
    <section id="resources" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Scam Awareness Resources
          </h2>
          <p className="text-lg text-muted-foreground">
            Educate yourself on job scam prevention and stay informed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-elevated transition-smooth cursor-pointer"
              >
                <Icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h3>
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-elevated transition-smooth cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-card-foreground mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                    <p className="text-xs text-accent">{post.date}</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-accent flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
