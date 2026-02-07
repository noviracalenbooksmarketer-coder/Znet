
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateChatReply(
  history: { role: string; content: string }[],
  roomName: string,
  userName: string
): Promise<string> {
  const systemInstruction = `You are a friendly participant in a chat room called "${roomName}". 
  Your name is "Gemini Assistant". Respond naturally to ${userName}. 
  Keep it concise and conversational, like a real human in a mobile chat app. 
  Use occasional emojis. Avoid long explanations unless asked.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    })),
    config: {
      systemInstruction,
      temperature: 0.8,
      topP: 0.9,
    },
  });

  return response.text || "I'm listening!";
}

export async function moderateContent(text: string): Promise<{ safe: boolean; reason?: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate the following text for hate speech, extreme toxicity, or dangerous spam. 
      Text: "${text}"
      Respond ONLY in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["safe"]
        }
      }
    });

    return JSON.parse(response.text || '{"safe": true}');
  } catch (e) {
    console.error("Moderation error:", e);
    return { safe: true };
  }
}
