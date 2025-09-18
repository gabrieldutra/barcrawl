"use client";

import { useJsonServer } from "./useJsonServer";

export function useBarCrawlWithServer(pollInterval: number = 5000) {
  const { state: serverState, actions: serverActions } =
    useJsonServer(pollInterval);

  return {
    state: {
      bars: serverState.bars,
      currentBarIndex: serverState.currentBarIndex,
      isActive: serverState.currentBarIndex > 0, // Ativo se não estiver no primeiro bar
      hasStarted: serverState.hasStarted,
      startTime: serverState.startTime || "",
      version: serverState.version,
    },
    serverState: {
      isConnected: serverState.isConnected,
      isLoading: serverState.isLoading,
      error: serverState.error,
    },
    actions: {
      refresh: serverActions.refresh,
      stopPolling: serverActions.stopPolling,
      startPolling: serverActions.startPolling,
    },
    // Nota: As ações de controle agora são feitas editando o currentBarIndex no JSON
  };
}
