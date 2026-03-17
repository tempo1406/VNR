"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SelectionPosition {
  x: number;
  y: number;
}

interface UseTextSelectionReturn {
  selectedText: string;
  position: SelectionPosition | null;
  isVisible: boolean;
  clearSelection: () => void;
}

const TEXT_EXPLAINER_IGNORE_SELECTOR = "[data-disable-text-explainer]";

function getNodeElement(node: Node | null): Element | null {
  if (!node) {
    return null;
  }

  if (node instanceof Element) {
    return node;
  }

  return node.parentElement;
}

function isInIgnoredArea(node: Node | null): boolean {
  return Boolean(getNodeElement(node)?.closest(TEXT_EXPLAINER_IGNORE_SELECTOR));
}

function getSelectionRect(selection: Selection, range: Range): DOMRect | null {
  const directRect = range.getBoundingClientRect();
  if (directRect.width > 0 || directRect.height > 0) {
    return directRect;
  }

  const rects = range.getClientRects();
  if (rects.length > 0) {
    return rects[0];
  }

  if (selection.anchorNode instanceof Element) {
    return selection.anchorNode.getBoundingClientRect();
  }

  if (selection.anchorNode?.parentElement) {
    return selection.anchorNode.parentElement.getBoundingClientRect();
  }

  return null;
}

export function useTextSelection(
  isEnabled: boolean = true,
  onTextSelected?: (text: string) => void
): UseTextSelectionReturn {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState<SelectionPosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastNotifiedTextRef = useRef("");

  const clearSelection = useCallback(() => {
    setSelectedText("");
    setPosition(null);
    setIsVisible(false);
    lastNotifiedTextRef.current = "";
    window.getSelection()?.removeAllRanges();
  }, []);

  const hideSelection = useCallback(() => {
    setSelectedText("");
    setPosition(null);
    setIsVisible(false);
    lastNotifiedTextRef.current = "";
  }, []);

  const updateSelection = useCallback(() => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      hideSelection();
      return;
    }

    const text = selection.toString().trim();
    if (!text) {
      hideSelection();
      return;
    }

    const range = selection.getRangeAt(0);

    if (
      isInIgnoredArea(selection.anchorNode) ||
      isInIgnoredArea(selection.focusNode) ||
      isInIgnoredArea(range.commonAncestorContainer)
    ) {
      hideSelection();
      return;
    }

    const rect = getSelectionRect(selection, range);

    if (!rect) {
      hideSelection();
      return;
    }

    const nextPosition = {
      x: Math.min(
        Math.max(rect.left + rect.width / 2, 32),
        window.innerWidth - 32
      ),
      y: Math.min(rect.bottom + 12, window.innerHeight - 24),
    };

    setSelectedText(text);
    setPosition(nextPosition);
    setIsVisible(true);

    if (onTextSelected && text !== lastNotifiedTextRef.current) {
      lastNotifiedTextRef.current = text;
      onTextSelected(text);
    }
  }, [hideSelection, onTextSelected]);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      updateSelection();
      frameRef.current = null;
    });
  }, [updateSelection]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerStart = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("[data-text-explainer]")) {
        return;
      }

      if (target.closest(TEXT_EXPLAINER_IGNORE_SELECTOR)) {
        hideSelection();
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        hideSelection();
      }
    };

    document.addEventListener("selectionchange", scheduleUpdate);
    document.addEventListener("mouseup", scheduleUpdate);
    document.addEventListener("keyup", scheduleUpdate);
    document.addEventListener("touchend", scheduleUpdate);
    document.addEventListener("mousedown", handlePointerStart);
    document.addEventListener("touchstart", handlePointerStart);

    return () => {
      document.removeEventListener("selectionchange", scheduleUpdate);
      document.removeEventListener("mouseup", scheduleUpdate);
      document.removeEventListener("keyup", scheduleUpdate);
      document.removeEventListener("touchend", scheduleUpdate);
      document.removeEventListener("mousedown", handlePointerStart);
      document.removeEventListener("touchstart", handlePointerStart);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [hideSelection, isEnabled, scheduleUpdate]);

  return {
    selectedText: isEnabled ? selectedText : "",
    position: isEnabled ? position : null,
    isVisible: isEnabled && isVisible,
    clearSelection,
  };
}
