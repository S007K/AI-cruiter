
import { GoogleGenerativeAI }  from "@google/generative-ai";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function GeminiAI(prompt:string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  
console.log(prompt)
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
 return text
}

