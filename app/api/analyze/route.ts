import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const prompt = `Analyze this target SaaS website / brand URL: ${url}.
Provide a high-level executive competitive intelligence briefing in clear JSON format with the following keys:
1. "overview": A 2-sentence summary of what they do and their core value prop.
2. "vulnerabilities": An array of 3 key vulnerabilities or market gaps they miss.
3. "counterStrategy": A 2-sentence killer strategy to out-position them.

Return ONLY raw JSON without markdown codeblock formatting.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "{}";
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to analyze target site" },
      { status: 500 }
    );
  }
}