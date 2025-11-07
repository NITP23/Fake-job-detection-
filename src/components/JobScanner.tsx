import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Link as LinkIcon, FileText, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const JobScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ status: "safe" | "suspicious" | null; details: string[] }>({
    status: null,
    details: [],
  });
  const [jobText, setJobText] = useState("");
  const [jobLink, setJobLink] = useState("");

  const handleScan = async () => {
    if (!jobText && !jobLink) {
      toast({
        title: "Input Required",
        description: "Please provide job details or a link to scan",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanResult({ status: null, details: [] });

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      
      const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobText: jobText || null,
          jobLink: jobLink || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze job posting');
      }

      const result = await response.json();
      
      setScanResult({
        status: result.status,
        details: result.details,
      });

      toast({
        title: "Scan Complete",
        description: result.recommendation || `Job posting appears to be ${result.status === "suspicious" ? "suspicious" : "legitimate"}`,
        variant: result.status === "suspicious" ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Error scanning job:', error);
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "Failed to analyze job posting. Please try again.",
        variant: "destructive",
      });
      setScanResult({ status: null, details: [] });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section id="scanner" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Scan Job Offer
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload or paste job details to check for authenticity using our AI-powered scanner
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 shadow-elevated">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="text">
                  <FileText className="h-4 w-4 mr-2" />
                  Paste Text
                </TabsTrigger>
                <TabsTrigger value="link">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Job Link
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload PDF
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] resize-none"
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="link" className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://example.com/job-posting"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-smooth cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF files up to 10MB
                  </p>
                </div>
              </TabsContent>

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-6"
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? "Scanning..." : "Scan for Scams"}
              </Button>
            </Tabs>

            {scanResult.status && (
              <Card className={`mt-6 p-6 border-2 ${
                scanResult.status === "suspicious"
                  ? "border-destructive bg-destructive/5"
                  : "border-accent bg-accent/5"
              }`}>
                <div className="flex items-start gap-4">
                  {scanResult.status === "suspicious" ? (
                    <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-accent flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      scanResult.status === "suspicious" ? "text-destructive" : "text-accent"
                    }`}>
                      {scanResult.status === "suspicious"
                        ? "⚠️ Warning: Potential Scam Detected"
                        : "✓ Job Appears Legitimate"}
                    </h3>
                    <ul className="space-y-2">
                      {scanResult.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-card-foreground">
                          <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JobScanner;
