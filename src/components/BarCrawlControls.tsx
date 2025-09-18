"use client";

import { Play, Pause, RotateCcw, MapPin } from "lucide-react";

interface BarCrawlControlsProps {
  isActive: boolean;
  currentBarIndex: number;
  totalBars: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextBar: () => void;
  onPreviousBar: () => void;
}

export default function BarCrawlControls({
  isActive,
  currentBarIndex,
  totalBars,
  onStart,
  onPause,
  onReset,
  onNextBar,
  onPreviousBar,
}: BarCrawlControlsProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6 border border-blue-100/50">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">🎉</span>
          Bar Crawl - 29 anos
        </h2>
        <p className="text-sm text-gray-600 font-medium">
          Bruno e Vitor • {currentBarIndex + 1} de {totalBars} bares
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        {!isActive ? (
          <button
            onClick={onStart}
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Play className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Iniciar Bar Crawl</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transition-all duration-300 shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Pause className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Pausar</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="group relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-600 via-gray-600 to-slate-700 text-white rounded-2xl font-bold text-lg hover:from-slate-700 hover:via-gray-700 hover:to-slate-800 transition-all duration-300 shadow-2xl shadow-slate-500/25 hover:shadow-slate-500/40 hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <RotateCcw className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Resetar</span>
        </button>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onPreviousBar}
          disabled={currentBarIndex === 0}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-semibold hover:from-blue-100 hover:to-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></div>
          <span className="text-lg relative z-10">←</span>
          <span className="relative z-10">Anterior</span>
        </button>
        <button
          onClick={onNextBar}
          disabled={currentBarIndex === totalBars - 1}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-semibold hover:from-blue-100 hover:to-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></div>
          <span className="relative z-10">Próximo</span>
          <span className="text-lg relative z-10">→</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          <MapPin className="w-3 h-3 inline mr-1" />
          Clique nos bares no mapa ou na lista para navegar
        </p>
      </div>
    </div>
  );
}
