"use client";

import { Type, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSendToggleProps {
  selectionEnabled: boolean;
  onToggle: () => void;
}

export default function AutoSendToggle({
  selectionEnabled,
  onToggle,
}: AutoSendToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={selectionEnabled}
      className={cn(
        "relative inline-flex items-center rounded-full border-2 border-amber-600/50 bg-gradient-to-r from-amber-700 to-amber-800 p-0.5 shadow-lg backdrop-blur-sm transition-all duration-300",
        "hover:shadow-xl active:scale-95"
      )}
      style={{ width: "80px", height: "36px" }}
      title={
        selectionEnabled
          ? "Chế độ bôi đen để giải thích đang bật"
          : "Chế độ chat thường đang bật"
      }
    >
      <div
        className={cn(
          "absolute top-0.5 h-[32px] w-[38px] rounded-full bg-amber-100 shadow-md transition-all duration-300",
          selectionEnabled ? "left-0.5" : "left-[calc(100%-39px)]"
        )}
      />

      <div
        className={cn(
          "relative z-10 flex h-[32px] w-[38px] items-center justify-center rounded-full transition-colors duration-300",
          selectionEnabled ? "text-amber-900" : "text-amber-100"
        )}
      >
        <Type className="h-4 w-4" strokeWidth={2.5} />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-[32px] w-[38px] items-center justify-center rounded-full transition-colors duration-300",
          selectionEnabled ? "text-amber-200" : "text-amber-900"
        )}
      >
        <MessageSquare className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </button>
  );
}
