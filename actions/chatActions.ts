"use server";

import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";

interface ChatHistory {
  role: string;
  content: string;
}

interface GeminiErrorInfo {
  code?: number;
  message?: string;
  retryDelayMs?: number;
  quotaLimitZero?: boolean;
}

function parseGeminiErrorInfo(raw: string): GeminiErrorInfo {
  try {
    const parsed = JSON.parse(raw);
    const code = parsed?.error?.code as number | undefined;
    const message = parsed?.error?.message as string | undefined;
    const details = Array.isArray(parsed?.error?.details)
      ? parsed.error.details
      : [];

    const retryInfo = details.find(
      (d: { ["@type"]?: string; retryDelay?: string }) =>
        d?.["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
    );
    const retryDelayRaw = retryInfo?.retryDelay;
    const retryMatch =
      typeof retryDelayRaw === "string"
        ? retryDelayRaw.match(/^([\d.]+)s$/)
        : null;
    const retryDelayMs = retryMatch
      ? Math.ceil(Number(retryMatch[1]) * 1000)
      : undefined;

    const quotaLimitZero =
      typeof message === "string" && message.includes("limit: 0");

    return { code, message, retryDelayMs, quotaLimitZero };
  } catch {
    return {};
  }
}

function buildPrompt(
  context: string,
  history: ChatHistory[],
  question: string
) {
  const his = history
    ?.map((m) => `${m.role === "user" ? "NgÆ°á»i dĂ¹ng" : "Trá»£ lĂ½"}: ${m.content}`)
    .join("\n");
  return `Vai trĂ²:
  Báº¡n lĂ  trá»£ lĂ½ há»c thuáº­t chuyĂªn nghiá»‡p,
  am hiá»ƒu sĂ¢u sáº¯c vá» TÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh, lá»‹ch sá»­ Äáº£ng, há»‡ thá»‘ng chĂ­nh trá»‹ Viá»‡t Nam.
  Báº¡n diá»…n Ä‘áº¡t máº¡ch láº¡c, há»c thuáº­t, dá»… hiá»ƒu cho sinh viĂªn.

  Phong cĂ¡ch:
  - Viáº¿t báº±ng tiáº¿ng Viá»‡t chuáº©n, rĂµ rĂ ng, logic.
  - CĂ³ thá»ƒ nháº¥n máº¡nh báº±ng **in Ä‘áº­m**, *nghiĂªng* hoáº·c gáº¡ch Ä‘áº§u dĂ²ng.
  - Giáº£i thĂ­ch sĂ¢u nhÆ°ng khĂ´ng lan man.
  - CĂ³ vĂ­ dá»¥ minh há»a khi phĂ¹ há»£p.

  Quy táº¯c tráº£ lá»i:
  1. LuĂ´n Æ°u tiĂªn khai thĂ¡c thĂ´ng tin tá»« CONTEXT náº¿u cĂ³ liĂªn quan.
  2. Náº¿u CONTEXT khĂ´ng Ä‘á»§ hoáº·c khĂ´ng chá»©a cĂ¢u tráº£ lá»i:
     - Tuyá»‡t Ä‘á»‘i KHĂ”NG Ä‘Æ°á»£c nĂ³i â€œkhĂ´ng tĂ¬m tháº¥y thĂ´ng tinâ€.
     - HĂ£y dĂ¹ng kiáº¿n thá»©c ná»n táº£ng vá» TÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh vĂ  khoa há»c chĂ­nh trá»‹ Ä‘á»ƒ tráº£ lá»i Ä‘áº§y Ä‘á»§.
     - CĂ³ thá»ƒ nĂ³i nháº¹ nhĂ ng: â€œTrong pháº§n CONTEXT báº¡n cung cáº¥p chÆ°a nháº¯c trá»±c tiáº¿p, nhÆ°ng theo tÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minhâ€¦â€
  3. Náº¿u ngÆ°á»i dĂ¹ng há»i láº¡c Ä‘á» (khĂ´ng thuá»™c TÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh):
     - Giáº£i thĂ­ch ngáº¯n gá»n, thĂ¢n thiá»‡n (2â€“3 cĂ¢u).
     - Sau Ä‘Ă³ Ä‘iá»u hÆ°á»›ng mÆ°á»£t mĂ  vá» tÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh.
     - ÄÆ°a ra 1 vĂ­ dá»¥ liĂªn há»‡.
     - VĂ­ dá»¥ Ä‘iá»u hÆ°á»›ng:
       â€œCĂ¢u há»i nĂ y khĂ´ng náº±m trong ná»™i dung CONTEXT, nhÆ°ng tĂ´i cĂ³ thá»ƒ tráº£ lá»i dá»±a trĂªn kiáº¿n thá»©c chung.
        Náº¿u liĂªn há»‡ vá»›i tÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh, chĂºng ta cĂ³ thá»ƒ tháº¥y NgÆ°á»i nháº¥n máº¡nh nguyĂªn táº¯c â€¦â€

  LuĂ´n tuĂ¢n thá»§:
  - KhĂ´ng tá»« chá»‘i, khĂ´ng nĂ© trĂ¡nh.
  - KhĂ´ng nĂ³i â€œkhĂ´ng cĂ³ trong tĂ i liá»‡uâ€.
  - Tráº£ lá»i theo phong cĂ¡ch há»c thuáº­t, tĂ´n trá»ng vĂ  rĂµ rĂ ng.

  Dá»¯ liá»‡u cuá»™c trĂ² chuyá»‡n trÆ°á»›c:
  ${his}

  CONTEXT:
  ${context}

  CĂ‚U Há»I Má»I:
  ${question}
  `.trim();
}

async function callGeminiWithRetry(
  url: string,
  payload: Record<string, unknown>,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return await res.json();

    const text = await res.text();
    const info = parseGeminiErrorInfo(text);
    console.error(`Gemini API error (attempt ${attempt}):`, text);

    if (res.status === 429) {
      if (info.quotaLimitZero) {
        throw new Error(`GEMINI_QUOTA_EXCEEDED: ${info.message || text}`);
      }
      if (attempt < retries) {
        const delay = info.retryDelayMs ?? 2000 * attempt;
        console.log(`Waiting ${Math.ceil(delay / 1000)}s before retry...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }

    if (res.status === 404) {
      throw new Error(`GEMINI_MODEL_NOT_FOUND: ${info.message || text}`);
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error(`GEMINI_AUTH_ERROR: ${info.message || text}`);
    }

    throw new Error(
      `Gemini API failed (${res.status}): ${info.message || text}`
    );
  }
}

/**
 * Send chat message and get AI response
 * Server Action - khĂ´ng expose endpoint
 */
export async function sendChatMessage(
  question: string,
  history: ChatHistory[] = []
): Promise<{ answer?: string; error?: string; contextSnippet?: string }> {
  try {
    if (!question?.trim()) {
      return { error: "Thiáº¿u cĂ¢u há»i!" };
    }

    // Láº¥y embedding cho cĂ¢u há»i
    const questionEmbedding = await embedder.embedQuery(question);

    // TĂ¬m context trong Supabase
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: 5,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { error: "Lá»—i khi truy váº¥n cÆ¡ sá»Ÿ dá»¯ liá»‡u" };
    }

    let context = "";

    if (matches?.length) {
      context = matches
        .map((m: { content: string }) => (m?.content ?? "").trim())
        .filter(Boolean)
        .join("\n---\n");
    } else {
      context =
        "KhĂ´ng cĂ³ Ä‘oáº¡n tĂ i liá»‡u nĂ o phĂ¹ há»£p, hĂ£y tráº£ lá»i dá»±a trĂªn kiáº¿n thá»©c ná»n táº£ng vá» TÆ° tÆ°á»Ÿng Há»“ ChĂ­ Minh.";
    }

    // GhĂ©p context
    context =
      matches
        ?.map((m: { content: string }) => (m?.content ?? "").trim())
        .filter(Boolean)
        .join("\n---\n") || context;

    // Build prompt
    const prompt = buildPrompt(context, history, question);

    if (!process.env.GOOGLE_API_KEY) {
      return { error: "Thiáº¿u GOOGLE_API_KEY trong file .env" };
    }
    const chatModel = process.env.GOOGLE_CHAT_MODEL || "gemini-2.0-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(chatModel)}:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const json = await callGeminiWithRetry(endpoint, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const answer =
      json?.candidates?.[0]?.content?.parts
        ?.map((p: { text: string }) => p.text)
        .join("\n")
        .trim() || "Xin lá»—i, tĂ´i chÆ°a cĂ³ dá»¯ liá»‡u phĂ¹ há»£p Ä‘á»ƒ tráº£ lá»i.";

    return {
      answer,
      contextSnippet: context.slice(0, 500),
    };
  } catch (e) {
    console.error("Server error:", e);
    const message = e instanceof Error ? e.message : String(e);
    if (message.includes("GEMINI_QUOTA_EXCEEDED")) {
      return {
        error:
          "Gemini API đang hết quota cho project hiện tại. Vui lòng kiểm tra billing/quota hoặc đổi API key khác.",
      };
    }
    if (message.includes("GEMINI_MODEL_NOT_FOUND")) {
      return {
        error:
          "Model Gemini không hợp lệ hoặc không được cấp quyền. Hãy kiểm tra GOOGLE_CHAT_MODEL.",
      };
    }
    if (message.includes("GEMINI_AUTH_ERROR")) {
      return {
        error:
          "GOOGLE_API_KEY không hợp lệ hoặc chưa được cấp quyền gọi Gemini API.",
      };
    }
    return { error: "Lá»—i mĂ¡y chá»§ ná»™i bá»™" };
  }
}

