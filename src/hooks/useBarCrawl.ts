"use client";

import { useState, useCallback } from "react";
import { BarCrawlState } from "@/types/bar";
import { barsData } from "@/data/bars";

export function useBarCrawl() {
  const [state, setState] = useState<BarCrawlState>({
    bars: barsData.map((bar, index) => ({
      ...bar,
      current: index === 0,
    })),
    currentBarIndex: 0,
    startTime: "",
    isActive: false,
  });

  const startCrawl = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      startTime: new Date().toISOString(),
    }));
  }, []);

  const pauseCrawl = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const resetCrawl = useCallback(() => {
    setState({
      bars: barsData.map((bar, index) => ({
        ...bar,
        current: index === 0,
      })),
      currentBarIndex: 0,
      startTime: "",
      isActive: false,
    });
  }, []);

  const goToBar = useCallback((barIndex: number) => {
    setState((prev) => {
      const newBars = prev.bars.map((bar, index) => ({
        ...bar,
        current: index === barIndex,
        visited: index < barIndex ? true : bar.visited,
      }));

      return {
        ...prev,
        bars: newBars,
        currentBarIndex: barIndex,
      };
    });
  }, []);

  const nextBar = useCallback(() => {
    setState((prev) => {
      if (prev.currentBarIndex < prev.bars.length - 1) {
        const newCurrentIndex = prev.currentBarIndex + 1;
        const newBars = prev.bars.map((bar, index) => ({
          ...bar,
          current: index === newCurrentIndex,
          visited: index < newCurrentIndex ? true : bar.visited,
        }));

        return {
          ...prev,
          bars: newBars,
          currentBarIndex: newCurrentIndex,
        };
      }
      return prev;
    });
  }, []);

  const previousBar = useCallback(() => {
    setState((prev) => {
      if (prev.currentBarIndex > 0) {
        const newCurrentIndex = prev.currentBarIndex - 1;
        const newBars = prev.bars.map((bar, index) => ({
          ...bar,
          current: index === newCurrentIndex,
          visited: index < newCurrentIndex ? true : bar.visited,
        }));

        return {
          ...prev,
          bars: newBars,
          currentBarIndex: newCurrentIndex,
        };
      }
      return prev;
    });
  }, []);

  return {
    state,
    startCrawl,
    pauseCrawl,
    resetCrawl,
    goToBar,
    nextBar,
    previousBar,
  };
}
