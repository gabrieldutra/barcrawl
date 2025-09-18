import { Bar } from "@/types/bar";

// Estado global simples do servidor
let serverState = {
  bars: [] as Bar[],
  currentBarIndex: 0,
  isActive: false,
  isConnected: true,
};

// Função para obter estado atual
export const getServerState = () => ({ ...serverState });

// Função para atualizar estado
const updateServerState = (updates: Partial<typeof serverState>) => {
  serverState = { ...serverState, ...updates };
};

// API Service simplificado
export const apiService = {
  // Inicializar dados do servidor
  initialize: (initialBars: Bar[]) => {
    updateServerState({
      bars: initialBars.map((bar) => ({ ...bar })),
      currentBarIndex: 0,
      isActive: false,
      isConnected: true,
    });
  },

  // Iniciar bar crawl
  startCrawl: () => {
    updateServerState({ isActive: true });
  },

  // Pausar bar crawl
  pauseCrawl: () => {
    updateServerState({ isActive: false });
  },

  // Resetar bar crawl
  resetCrawl: () => {
    updateServerState({
      bars: serverState.bars.map((bar) => ({
        ...bar,
        visited: false,
        current: false,
      })),
      currentBarIndex: 0,
      isActive: false,
    });
  },

  // Ir para um bar específico
  goToBar: (barIndex: number) => {
    if (barIndex >= 0 && barIndex < serverState.bars.length) {
      const newBars = [...serverState.bars];

      // Marcar bar anterior como visitado se existir
      if (serverState.currentBarIndex < newBars.length) {
        newBars[serverState.currentBarIndex] = {
          ...newBars[serverState.currentBarIndex],
          visited: true,
          current: false,
        };
      }

      // Atualizar bar atual
      newBars[barIndex] = {
        ...newBars[barIndex],
        current: true,
      };

      updateServerState({
        bars: newBars,
        currentBarIndex: barIndex,
      });
    }
  },

  // Próximo bar
  nextBar: () => {
    if (serverState.currentBarIndex < serverState.bars.length - 1) {
      apiService.goToBar(serverState.currentBarIndex + 1);
    }
  },

  // Bar anterior
  previousBar: () => {
    if (serverState.currentBarIndex > 0) {
      apiService.goToBar(serverState.currentBarIndex - 1);
    }
  },
};
