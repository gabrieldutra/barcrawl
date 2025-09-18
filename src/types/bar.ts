export interface Bar {
  id: number;
  time: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat] format for easier copy-paste
  visited: boolean;
  current: boolean;
}

export interface BarCrawlState {
  bars: Bar[];
  currentBarIndex: number;
  startTime: string;
  isActive: boolean;
}
