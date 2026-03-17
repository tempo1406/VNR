"use client";

import { Lightbulb, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextExplainer } from "./hooks/useTextExplainer";

interface TextExplainerUIProps {
  isEnabled?: boolean;
}

export default function TextExplainerUI({
  isEnabled = true,
}: TextExplainerUIProps) {
  const {
    selectedText,
    position,
    isVisible,
    clearSelection,
    handleExplain,
    handleSendNow,
  } = useTextExplainer(isEnabled);

  if (!isVisible || !position) {
    return null;
  }

  return (
    <div
      data-text-explainer
      className="fixed z-[9999] animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="max-w-xs rounded-xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-600/40 shadow-lg backdrop-blur-sm">
            <Lightbulb className="h-4 w-4 text-amber-300" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-2 line-clamp-2 text-xs font-medium italic text-amber-100">
              &quot;
              {selectedText.length > 60
                ? `${selectedText.substring(0, 60)}...`
                : selectedText}
              &quot;
            </p>

            <div className="flex items-center gap-2">
              <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleExplain}
                className="text-xs font-medium text-amber-300 hover:text-amber-200 hover:underline"
              >
                Giải thích
              </button>

              <span className="text-xs text-amber-500/50">•</span>

              <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleSendNow}
                className="flex items-center gap-1 text-xs font-medium text-green-400 hover:text-green-300 hover:underline"
              >
                <Send className="h-3 w-3" />
                Gửi ngay
              </button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearSelection}
            className="-mr-1 -mt-1 h-6 w-6 shrink-0 text-amber-200 hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white/10" />
      </div>
    </div>
  );
}
