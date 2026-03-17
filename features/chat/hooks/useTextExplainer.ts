import { useCallback } from "react";
import { useTextSelection } from "./useTextSelection";
import { useChat } from "@/providers/ChatProvider";
import { useTextExplainerMode } from "./useTextExplainerMode";
import { extractTextContext } from "../utils/contextExtractor";

export function useTextExplainer(isEnabled = true) {
  const { openChat, sendMessage } = useChat();
  const { isLoaded, isTextExplainerEnabled } = useTextExplainerMode();

  const buildEnrichedPrompt = useCallback(
    (context: ReturnType<typeof extractTextContext>) => {
      let prompt = `Hãy giải thích ngắn gọn, dễ hiểu đoạn sau bằng tiếng Việt:\n\n"${context.selectedText}"`;

      if (context.contextBefore || context.contextAfter) {
        prompt += `\n\nNgữ cảnh gần đó:\n${context.contextBefore} ${context.contextAfter}`.trimEnd();
      }

      if (context.pageTitle) {
        prompt += `\n\nTrang hiện tại: ${context.pageTitle}`;
      }

      return prompt;
    },
    []
  );

  const { selectedText, position, isVisible, clearSelection } = useTextSelection(
    isEnabled && isLoaded && isTextExplainerEnabled
  );

  const handleExplain = useCallback(() => {
    if (!selectedText) return;

    const context = extractTextContext(selectedText, 200);
    const enrichedPrompt = buildEnrichedPrompt(context);

    openChat();

    window.setTimeout(() => {
      void sendMessage(enrichedPrompt);
      clearSelection();
    }, 80);
  }, [buildEnrichedPrompt, clearSelection, openChat, selectedText, sendMessage]);

  const handleSendNow = useCallback(() => {
    if (!selectedText) return;

    openChat();

    window.setTimeout(() => {
      void sendMessage(selectedText);
      clearSelection();
    }, 80);
  }, [clearSelection, openChat, selectedText, sendMessage]);

  return {
    selectedText,
    position,
    isVisible,
    clearSelection,
    handleExplain,
    handleSendNow,
    isTextExplainerEnabled,
  };
}
