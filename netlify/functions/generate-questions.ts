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
    const { role, experience = "Fresher", question_count = 5 } = body;

    if (!role) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Job role is required." }),
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

    const prompt = `You are an expert technical and HR interviewer conducting a realistic interview.
Target Role: "${role}"
Target Experience Level: "${experience}"
Number of questions required: ${question_count}

Generate exactly ${question_count} distinct, high-quality, relevant interview questions ranging from technical fundamentals, practical real-world scenarios, problem-solving, to behavioral questions appropriate for a ${experience} in ${role}.

Return JSON ONLY formatted according to the schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  category: { type: Type.STRING, description: "e.g., Technical, Scenario, Behavioral, Architecture" },
                  difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
                  expectedKeyConcepts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-4 key concepts expected in a strong answer"
                  }
                },
                required: ["id", "question", "category", "difficulty"]
              }
            }
          },
          required: ["questions"]
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
    console.error("Netlify Function error generate-questions:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to generate questions using AI.",
        details: error.message || String(error),
      }),
    };
  }
};
