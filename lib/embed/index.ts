import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embedder = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  // `text-embedding-004` is no longer available for embedContent on Gemini API.
  model: process.env.GOOGLE_EMBEDDING_MODEL || "gemini-embedding-001",
});
