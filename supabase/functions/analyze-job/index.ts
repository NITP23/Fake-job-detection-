import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobText, jobLink } = await req.json();

    if (!jobText && !jobLink) {
      return new Response(
        JSON.stringify({ error: 'Either jobText or jobLink must be provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contentToAnalyze = jobText || `Analyze this job posting URL: ${jobLink}`;

    console.log('Analyzing job posting with AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert at detecting fake job scams. Analyze job postings for red flags and suspicious patterns.

Common scam indicators include:
- Requests for upfront payment or personal financial information
- Unrealistic salary promises (e.g., $10k/week for simple tasks)
- Vague job descriptions with no specific responsibilities
- Poor grammar and spelling throughout the posting
- Suspicious or non-professional email addresses
- Requests to use personal messaging apps instead of professional channels
- "Too good to be true" benefits with minimal requirements
- Urgency tactics ("must respond within 24 hours")
- Company name that doesn't match domain or can't be verified
- Work-from-home positions requiring equipment purchases

Respond in JSON format with:
{
  "isSuspicious": boolean,
  "confidenceLevel": "high" | "medium" | "low",
  "details": [array of specific findings],
  "recommendation": "brief recommendation"
}`
          },
          {
            role: 'user',
            content: contentToAnalyze
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to analyze job posting' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Analysis result:', aiResponse);

    // Parse the AI response
    let analysisResult;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback: create a basic analysis
      analysisResult = {
        isSuspicious: aiResponse.toLowerCase().includes('suspicious') || aiResponse.toLowerCase().includes('scam'),
        confidenceLevel: 'medium',
        details: [aiResponse.substring(0, 200)],
        recommendation: 'Review the analysis carefully'
      };
    }

    return new Response(
      JSON.stringify({
        status: analysisResult.isSuspicious ? 'suspicious' : 'safe',
        confidenceLevel: analysisResult.confidenceLevel,
        details: analysisResult.details,
        recommendation: analysisResult.recommendation
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in analyze-job function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
