"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Bar } from "@/types/bar";
import { fetchServerData, deriveBarState } from "@/services/jsonServer";

interface JsonServerState {
  bars: Bar[];
  currentBarIndex: number;
  hasStarted: boolean;
  startTime: string | null;
  version: number;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useJsonServer = (pollInterval: number = 2000) => {
  const [state, setState] = useState<JsonServerState>({
    bars: [],
    currentBarIndex: 0,
    hasStarted: false,
    startTime: null,
    version: 1,
    isConnected: false,
    isLoading: true,
    error: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastCurrentBarIndexRef = useRef<number>(-1);
  const lastHasStartedRef = useRef<boolean | null>(null);
  const lastVersionRef = useRef<number>(-1);

  // Função para carregar dados do servidor
  const loadServerData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const serverData = await fetchServerData();
      const bars = deriveBarState(
        serverData.bars,
        serverData.currentBarIndex,
        serverData.hasStarted
      );

      setState((prev) => ({
        ...prev,
        bars,
        currentBarIndex: serverData.currentBarIndex,
        hasStarted: serverData.hasStarted,
        startTime: serverData.startTime,
        version: serverData.version,
        isConnected: true,
        isLoading: false,
      }));

      lastCurrentBarIndexRef.current = serverData.currentBarIndex;
      lastHasStartedRef.current = serverData.hasStarted;
      lastVersionRef.current = serverData.version;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Erro ao carregar dados",
      }));
    }
  }, []);

  // Função para verificar atualizações
  const checkUpdates = useCallback(async () => {
    try {
      const serverData = await fetchServerData();

      if (
        serverData.currentBarIndex !== lastCurrentBarIndexRef.current ||
        serverData.hasStarted !== lastHasStartedRef.current ||
        serverData.version !== lastVersionRef.current
      ) {
        const bars = deriveBarState(
          serverData.bars,
          serverData.currentBarIndex,
          serverData.hasStarted
        );

        setState((prev) => ({
          ...prev,
          bars,
          currentBarIndex: serverData.currentBarIndex,
          hasStarted: serverData.hasStarted,
          startTime: serverData.startTime,
          version: serverData.version,
        }));

        lastCurrentBarIndexRef.current = serverData.currentBarIndex;
        lastHasStartedRef.current = serverData.hasStarted;
        lastVersionRef.current = serverData.version;
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }, []);

  // Inicializar dados
  useEffect(() => {
    loadServerData();
  }, [loadServerData]);

  // Configurar polling
  useEffect(() => {
    if (state.isConnected) {
      intervalRef.current = setInterval(checkUpdates, pollInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isConnected, checkUpdates, pollInterval]);

  // Função para forçar atualização
  const refresh = useCallback(() => {
    loadServerData();
  }, [loadServerData]);

  // Função para parar polling
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Função para iniciar polling
  const startPolling = useCallback(() => {
    if (!intervalRef.current && state.isConnected) {
      intervalRef.current = setInterval(checkUpdates, pollInterval);
    }
  }, [state.isConnected, checkUpdates, pollInterval]);

  return {
    state,
    actions: {
      refresh,
      stopPolling,
      startPolling,
    },
  };
};
