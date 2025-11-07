import { Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-bold">JobGuard AI</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Protecting job seekers from scams using advanced AI technology and community reporting.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#home" className="hover:text-primary-foreground transition-smooth">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-foreground transition-smooth">How It Works</a></li>
              <li><a href="#scanner" className="hover:text-primary-foreground transition-smooth">Scan Job</a></li>
              <li><a href="#report" className="hover:text-primary-foreground transition-smooth">Report Scam</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#resources" className="hover:text-primary-foreground transition-smooth">Safety Guidelines</a></li>
              <li><a href="#resources" className="hover:text-primary-foreground transition-smooth">Common Red Flags</a></li>
              <li><a href="#resources" className="hover:text-primary-foreground transition-smooth">Latest Trends</a></li>
              <li><a href="#resources" className="hover:text-primary-foreground transition-smooth">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-smooth">Terms of Service</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-smooth">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>© {currentYear} JobGuard AI. All rights reserved. Built with AI to protect job seekers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
