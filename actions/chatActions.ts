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
    ?.map((m) => `${m.role === "user" ? "Người dùng" : "Trợ lý"}: ${m.content}`)
    .join("\n");

  return `Vai trò:
  Bạn là trợ lý học thuật chuyên nghiệp,
  am hiểu sâu sắc về Lịch sử Đảng Cộng sản Việt Nam, đường lối cách mạng của Đảng và hệ thống chính trị Việt Nam.
  Bạn diễn đạt mạch lạc, học thuật, dễ hiểu cho sinh viên.

  Phong cách:
  - Viết bằng tiếng Việt chuẩn, rõ ràng, logic.
  - Có thể nhấn mạnh bằng **in đậm**, *nghiêng* hoặc gạch đầu dòng.
  - Giải thích sâu nhưng không lan man.
  - Có ví dụ minh họa khi phù hợp.

  Quy tắc trả lời:
  1. Luôn ưu tiên khai thác thông tin từ CONTEXT nếu có liên quan.

  2. Nếu CONTEXT không đủ hoặc không chứa câu trả lời:
    - Tuyệt đối KHÔNG được nói "không tìm thấy thông tin".
    - Hãy dùng kiến thức nền tảng về Lịch sử Đảng Cộng sản Việt Nam để trả lời đầy đủ.
    - Có thể nói nhẹ nhàng:
      "Trong phần CONTEXT bạn cung cấp chưa nhắc trực tiếp, nhưng theo lịch sử và đường lối của Đảng Cộng sản Việt Nam..."

  3. Nếu người dùng hỏi lạc đề (không thuộc Lịch sử Đảng):
    - Không trả lời nội dung câu hỏi đó.
    - Phản hồi ngắn gọn, lịch sự (1–2 câu), ví dụ:
      "Câu hỏi này không thuộc phạm vi Lịch sử Đảng.
      Bạn có thể đặt câu hỏi liên quan đến nội dung này để mình hỗ trợ tốt hơn."

    - Có thể gợi ý 1–2 hướng câu hỏi đúng chủ đề, ví dụ:
      "Ví dụ: đường lối kháng chiến, các giai đoạn lịch sử của Đảng, hoặc các chiến dịch lớn."

  Luôn tuân thủ:
  - Không từ chối, không né tránh.
  - Không nói "không có trong tài liệu".
  - Trả lời theo phong cách học thuật, tôn trọng và rõ ràng.;

  Dữ liệu cuộc trò chuyện trước:
  ${his}

  CONTEXT:
  ${context}

  CÂU HỎI MỚI:
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
 * Server Action - không expose endpoint
 */
export async function sendChatMessage(
  question: string,
  history: ChatHistory[] = []
): Promise<{ answer?: string; error?: string; contextSnippet?: string }> {
  try {
    if (!question?.trim()) {
      return { error: "Thiếu câu hỏi!" };
    }

    // Lấy embedding cho câu hỏi
    const questionEmbedding = await embedder.embedQuery(question);

    // Tìm context trong Supabase
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: 5,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { error: "Lỗi khi truy vấn cơ sở dữ liệu" };
    }

    let context = "";

    if (matches?.length) {
      context = matches
        .map((m: { content: string }) => (m?.content ?? "").trim())
        .filter(Boolean)
        .join("\n---\n");
    } else {
      context =
        "Không có đoạn tài liệu nào phù hợp, hãy trả lời dựa trên kiến thức nền tảng về Tư tưởng Hồ Chí Minh.";
    }

    // Ghép context
    context =
      matches
        ?.map((m: { content: string }) => (m?.content ?? "").trim())
        .filter(Boolean)
        .join("\n---\n") || context;

    // Build prompt
    const prompt = buildPrompt(context, history, question);

    if (!process.env.GOOGLE_API_KEY) {
      return { error: "Thiếu GOOGLE_API_KEY trong file .env" };
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
        .trim() || "Xin lỗi, tôi chưa có dữ liệu phù hợp để trả lời.";

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

    return { error: "Lỗi máy chủ nội bộ" };
  }
}