import { Bar } from "@/types/bar";
import { barsData } from "@/data/bars";

export interface ServerData {
  currentBarIndex: number;
  hasStarted: boolean;
  startTime: string | null;
  version: number;
  bars: Bar[];
}

// Cache para evitar requests desnecessários
let lastFetchTime = 0;
let cachedData: ServerData | null = null;
const CACHE_DURATION = 1000; // 1 segundo

// Função para fazer fetch dos dados do servidor
export const fetchServerData = async (): Promise<ServerData> => {
  const now = Date.now();

  // Retornar cache se ainda válido
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    // Use local API route in development to avoid CORS issues
    const isDevelopment = process.env.NODE_ENV === 'development';
    const url = isDevelopment 
      ? "/api/server-data" 
      : "https://raw.githubusercontent.com/gabrieldutra/barcrawl/refs/heads/main/public/server-data.json";
    
    const response = await fetch(url, {
      cache: "no-cache",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ServerData = await response.json();

    // Validar estrutura dos dados
    if (typeof data.currentBarIndex !== "number") {
      throw new Error(
        "Invalid data structure: currentBarIndex missing or invalid"
      );
    }

    if (typeof data.hasStarted !== "boolean") {
      throw new Error("Invalid data structure: hasStarted missing or invalid");
    }

    if (data.startTime !== null && typeof data.startTime !== "string") {
      throw new Error(
        "Invalid data structure: startTime must be string or null"
      );
    }

    if (typeof data.version !== "number") {
      throw new Error("Invalid data structure: version missing or invalid");
    }

    if (!data.bars || !Array.isArray(data.bars)) {
      throw new Error("Invalid data structure: bars array missing");
    }

    if (data.currentBarIndex < 0 || data.currentBarIndex >= data.bars.length) {
      throw new Error("Invalid currentBarIndex: out of range");
    }

    // Atualizar cache
    cachedData = data;
    lastFetchTime = now;

    return data;
  } catch (error) {
    console.error("Error fetching server data:", error);

    // Retornar cache se disponível, mesmo que expirado
    if (cachedData) {
      console.warn("Using cached data due to fetch error");
      return cachedData;
    }

    // Fallback para dados padrão
    return {
      currentBarIndex: 0,
      hasStarted: false,
      startTime: null,
      version: 1,
      bars: barsData,
    };
  }
};

// Função para derivar estado completo dos bares baseado no currentBarIndex e hasStarted
export const deriveBarState = (
  bars: Bar[],
  currentBarIndex: number,
  hasStarted: boolean
): Bar[] => {
  return bars.map((bar, index) => ({
    ...bar,
    visited: hasStarted && index < currentBarIndex,
    current: hasStarted && index === currentBarIndex,
  }));
};
