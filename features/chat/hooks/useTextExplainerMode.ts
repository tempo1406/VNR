import { useCallback, useEffect, useState } from "react";
import { getSetting, setSetting } from "@/lib/idb/settingsIdb";

const LEGACY_CHAT_MODE_KEY = "chat_auto_send_mode";

let isTextExplainerEnabledStore = true;
let hasInitializedStore = false;
let initPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

async function initializeMode() {
  if (hasInitializedStore) {
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      // Preserve the old toggle alignment:
      // stored `true` previously meant the chat icon was active.
      const isChatMode = await getSetting(LEGACY_CHAT_MODE_KEY, false);
      isTextExplainerEnabledStore = !isChatMode;
      hasInitializedStore = true;
      emitChange();
    })();
  }

  await initPromise;
}

async function persistMode(nextEnabled: boolean) {
  isTextExplainerEnabledStore = nextEnabled;
  emitChange();

  // Keep writing the inverse value to the legacy key so existing users
  // keep the same visual toggle direction they already know.
  await setSetting(LEGACY_CHAT_MODE_KEY, !nextEnabled);
}

export function useTextExplainerMode() {
  const [isTextExplainerEnabled, setIsTextExplainerEnabled] = useState(
    isTextExplainerEnabledStore
  );
  const [isLoaded, setIsLoaded] = useState(hasInitializedStore);

  useEffect(() => {
    const syncState = () => {
      setIsTextExplainerEnabled(isTextExplainerEnabledStore);
      setIsLoaded(hasInitializedStore);
    };

    listeners.add(syncState);
    syncState();
    void initializeMode();

    return () => {
      listeners.delete(syncState);
    };
  }, []);

  const toggleTextExplainer = useCallback(async () => {
    await initializeMode();
    await persistMode(!isTextExplainerEnabledStore);
  }, []);

  const enableTextExplainer = useCallback(async () => {
    await initializeMode();
    if (!isTextExplainerEnabledStore) {
      await persistMode(true);
    }
  }, []);

  const disableTextExplainer = useCallback(async () => {
    await initializeMode();
    if (isTextExplainerEnabledStore) {
      await persistMode(false);
    }
  }, []);

  return {
    isTextExplainerEnabled,
    isLoaded,
    toggleTextExplainer,
    enableTextExplainer,
    disableTextExplainer,
  };
}
