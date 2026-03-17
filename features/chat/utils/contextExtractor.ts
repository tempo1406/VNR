/**
 * Extract context around selected text.
 */
export function extractTextContext(
  selectedText: string,
  contextChars: number = 200
): {
  selectedText: string;
  contextBefore: string;
  contextAfter: string;
  fullContext: string;
  pageTitle: string;
  pageContent: string;
} {
  const titleElement =
    document.querySelector("[data-page-title]") || document.querySelector("h1");
  const pageTitle = titleElement?.textContent?.trim() || "";

  const contentElement =
    document.querySelector("[data-page-content]") ||
    document.querySelector("main") ||
    document.body;

  const pageContent = contentElement?.textContent?.trim() || "";
  const safePageContent = pageContent.substring(0, 500);

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return {
      selectedText,
      contextBefore: "",
      contextAfter: "",
      fullContext: selectedText,
      pageTitle,
      pageContent: safePageContent,
    };
  }

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;

  let fullText = "";
  let startOffset = 0;

  if (container.nodeType === Node.TEXT_NODE) {
    const parentElement = container.parentElement;
    if (parentElement) {
      fullText = parentElement.textContent || "";

      const walker = document.createTreeWalker(parentElement, NodeFilter.SHOW_TEXT);
      let currentNode: Node | null;
      while ((currentNode = walker.nextNode())) {
        if (currentNode === container) {
          break;
        }
        startOffset += currentNode.textContent?.length || 0;
      }

      startOffset += range.startOffset;
    }
  } else {
    fullText = container.textContent || "";
    startOffset = Math.max(0, range.startOffset);
  }

  const normalizedStart = Math.max(0, startOffset);
  let selectedStart = fullText.indexOf(selectedText, normalizedStart);

  if (selectedStart === -1) {
    selectedStart = fullText.indexOf(selectedText);
  }

  if (selectedStart === -1) {
    return {
      selectedText,
      contextBefore: "",
      contextAfter: "",
      fullContext: selectedText,
      pageTitle,
      pageContent: safePageContent,
    };
  }

  const selectedEnd = selectedStart + selectedText.length;
  const contextStart = Math.max(0, selectedStart - contextChars);
  const contextEnd = Math.min(fullText.length, selectedEnd + contextChars);

  let contextBefore = fullText.substring(contextStart, selectedStart).trim();
  let contextAfter = fullText.substring(selectedEnd, contextEnd).trim();

  if (contextStart > 0) contextBefore = `...${contextBefore}`;
  if (contextEnd < fullText.length) contextAfter = `${contextAfter}...`;

  return {
    selectedText,
    contextBefore,
    contextAfter,
    fullContext: `${contextBefore} **${selectedText}** ${contextAfter}`.trim(),
    pageTitle,
    pageContent: safePageContent,
  };
}
