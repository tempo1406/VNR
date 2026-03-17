"use client";

import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChatHeader,
  ChatSidebar,
  ChatMessages,
  ChatInput,
  AutoSendToggle,
} from "./components";
import { useChatUI } from "./hooks/useChatUI";

export default function ChatUI() {
  const {
    inputValue,
    setInputValue,
    isHistoryOpen,
    setIsHistoryOpen,
    currentSession,
    sessions,
    currentSessionId,
    setCurrentSessionId,
    messages,
    isLoading,
    isChatOpen,
    toggleChat,
    closeChat,
    isTextExplainerEnabled,
    toggleTextExplainer,
    handleSend,
    handleNewChat,
    handleDeleteSession,
  } = useChatUI();

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <button
          onClick={toggleChat}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-2xl shadow-amber-600/30 transition-all hover:scale-110 hover:from-amber-700 hover:to-amber-800 backdrop-blur-sm sm:h-14 sm:w-14"
          aria-label="Open chat"
        >
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <AutoSendToggle
          selectionEnabled={isTextExplainerEnabled}
          onToggle={toggleTextExplainer}
        />
      </div>
    );
  }

  const chatWidth = isHistoryOpen
    ? "w-full sm:w-[720px] lg:w-[800px]"
    : "w-full sm:w-[450px] lg:w-[480px]";

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AutoSendToggle
          selectionEnabled={isTextExplainerEnabled}
          onToggle={toggleTextExplainer}
        />
      </div>
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          "inset-0 sm:inset-auto",
          "sm:bottom-20 sm:right-6",
          chatWidth,
          "h-full sm:h-[580px] lg:h-[620px]"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/95 to-amber-900/95 shadow-2xl backdrop-blur-xl sm:rounded-2xl lg:rounded-3xl">
          <ChatHeader
            title={currentSession?.title || "Trợ lý AI"}
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            onNewChat={handleNewChat}
            onClose={closeChat}
          />

          <div className="flex min-h-0 flex-1 overflow-hidden">
            {isHistoryOpen && (
              <ChatSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={setCurrentSessionId}
                onDeleteSession={handleDeleteSession}
              />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSend}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
