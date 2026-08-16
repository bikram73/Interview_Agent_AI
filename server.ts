import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Clean helper for parsing AI JSON response
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
    console.error("Failed to parse JSON response:", text);
    throw new Error("Invalid JSON structure returned by AI model.");
  }
}

// 1. Generate Interview Questions API
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { role, experience = "Fresher", question_count = 5 } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Job role is required." });
    }

    const ai = getGeminiClient();
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
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating questions:", error);
    res.status(500).json({
      error: "Failed to generate questions using AI.",
      details: error.message || String(error)
    });
  }
});

// 2. Evaluate Candidate Answer API
app.post("/api/evaluate-answer", async (req, res) => {
  try {
    const { role, question, answer, experience = "Fresher" } = req.body;

    if (!role || !question) {
      return res.status(400).json({ error: "Role and question are required." });
    }

    const userAns = answer && answer.trim() ? answer.trim() : "(No answer submitted / skipped)";

    const ai = getGeminiClient();
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
    res.json(parsed);
  } catch (error: any) {
    console.error("Error evaluating answer:", error);
    res.status(500).json({
      error: "Failed to evaluate answer using AI.",
      details: error.message || String(error)
    });
  }
});

// 3. Generate Final Report API
app.post("/api/generate-report", async (req, res) => {
  try {
    const { role, experience = "Fresher", session = [] } = req.body;

    if (!role || !Array.isArray(session) || session.length === 0) {
      return res.status(400).json({ error: "Session data with answered questions is required." });
    }

    const ai = getGeminiClient();
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
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating report:", error);
    res.status(500).json({
      error: "Failed to generate report using AI.",
      details: error.message || String(error)
    });
  }
});

// Vite Middleware for Dev & Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Interview Agent AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
