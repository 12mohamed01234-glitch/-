
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function askZnuAssistant(query: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are the Zagazig National University (ZNU) AI Assistant. 
        Your goal is to help students navigate the portal and answer questions about university regulations.
        Keep responses professional, institutional, and concise. 
        Current Context: ${context}`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I am currently undergoing maintenance. Please try again shortly.";
  }
}
