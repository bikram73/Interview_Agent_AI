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
    const { role, question, answer, experience = "Fresher" } = body;

    if (!role || !question) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Role and question are required." }),
      };
    }

    const userAns = answer && answer.trim() ? answer.trim() : "(No answer submitted / skipped)";

    const apiKey = process.env.GEMINI_API_KEY || "";
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are a professional technical interviewer evaluating a candidate's answer.

Role: ${role}
Candidate Experience Level: ${experience}
Question: "${question}"
Candidate's Answer: "${userAns}"

Evaluate the candidate's answer carefully for:
1. Technical Correctness & Accuracy
2. Depth of Understanding & Completeness
3. Communication Clarity & Structure (e.g., STAR framework alignment if applicable)
4. Confidence & Key Industry Terminology

Assign a score from 0 to 10 (integer or 1 decimal place like 8.5).
Provide detailed, supportive, and actionable feedback.

Return JSON ONLY according to the specified schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Score out of 10" },
            feedback: { type: Type.STRING, description: "Detailed constructive analysis" },
            strength: { type: Type.STRING, description: "What the candidate did well" },
            weakness: { type: Type.STRING, description: "Missing elements or areas needing clarity" },
            improvement: { type: Type.STRING, description: "Actionable tips to improve this answer" },
            idealAnswerKeyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key bullet points an ideal candidate answer should include"
            }
          },
          required: ["score", "feedback", "strength", "weakness", "improvement"]
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
    console.error("Netlify Function error evaluate-answer:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to evaluate answer using AI.",
        details: error.message || String(error),
      }),
    };
  }
};
