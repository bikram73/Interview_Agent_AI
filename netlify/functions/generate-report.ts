import { Handler } from "@netlify/functions";
import { GoogleGenAI, Type } from "@google/genai";

function cleanAndParseJSON(text: string) {
  try {
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Invalid JSON structure returned by AI model.");
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { role, experience = "Fresher", session = [] } = body;

    if (!role || !Array.isArray(session) || session.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Session data with answered questions is required." }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are an executive hiring panel evaluating a candidate's entire interview session.

Role: ${role}
Experience Level: ${experience}

Complete Interview Transcript & Question Scores:
${JSON.stringify(session, null, 2)}

Analyze the overall performance across all questions.
Provide a comprehensive final evaluation containing:
- Overall percentage score (0-100)
- Detailed list of top strengths
- Detailed list of key weaknesses/gaps
- Clear hiring recommendation (e.g. "Strong Hire", "Hire - Low Risk", "Needs Practice / Borderline", "Not Recommended Yet")
- Specific technical/interview topics to study & improve
- Overall candidate confidence level ("High", "Moderate", or "Needs Development")
- Executive summary paragraph for the candidate

Return JSON ONLY according to schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER, description: "Percentage score 0 to 100" },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING },
            topicsToImprove: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            confidence: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["overallScore", "strengths", "weaknesses", "recommendation", "topicsToImprove", "confidence", "summary"]
        }
      }
    });

    const parsed = cleanAndParseJSON(response.text || "{}");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };
  } catch (error: any) {
    console.error("Netlify Function error generate-report:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to generate report using AI.",
        details: error.message || String(error),
      }),
    };
  }
};
