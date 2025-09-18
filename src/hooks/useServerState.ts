import { useState, useEffect, useCallback } from "react";
import { Bar } from "@/types/bar";
import { apiService, getServerState } from "@/services/api";

interface ServerState {
  bars: Bar[];
  currentBarIndex: number;
  isActive: boolean;
  isConnected: boolean;
}

export const useServerState = () => {
  const [state, setState] = useState<ServerState>({
    bars: [],
    currentBarIndex: 0,
    isActive: false,
    isConnected: false,
  });

  // Sincronizar com estado do servidor
  const syncWithServer = useCallback(() => {
    const serverState = getServerState();
    setState(serverState);
  }, []);

  // Inicializar dados do servidor
  const initializeServer = useCallback(
    (initialBars: Bar[]) => {
      apiService.initialize(initialBars);
      syncWithServer();
    },
    [syncWithServer]
  );

  // Ações do servidor
  const startCrawl = useCallback(() => {
    apiService.startCrawl();
    syncWithServer();
  }, [syncWithServer]);

  const pauseCrawl = useCallback(() => {
    apiService.pauseCrawl();
    syncWithServer();
  }, [syncWithServer]);

  const resetCrawl = useCallback(() => {
    apiService.resetCrawl();
    syncWithServer();
  }, [syncWithServer]);

  const goToBar = useCallback(
    (barIndex: number) => {
      apiService.goToBar(barIndex);
      syncWithServer();
    },
    [syncWithServer]
  );

  const nextBar = useCallback(() => {
    apiService.nextBar();
    syncWithServer();
  }, [syncWithServer]);

  const previousBar = useCallback(() => {
    apiService.previousBar();
    syncWithServer();
  }, [syncWithServer]);

  // Sincronizar inicial
  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  return {
    state,
    actions: {
      initializeServer,
      startCrawl,
      pauseCrawl,
      resetCrawl,
      goToBar,
      nextBar,
      previousBar,
    },
  };
};
