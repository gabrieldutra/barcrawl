"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/Map";
import BarList from "@/components/BarList";
import ServerStatus from "@/components/ServerStatus";
import CampaignWelcome from "@/components/CampaignWelcome";
import { useBarCrawlWithServer } from "@/hooks/useBarCrawlWithServer";

export default function Home() {
  const [focusedBarIndex, setFocusedBarIndex] = useState<number | undefined>();
  const { state, serverState } = useBarCrawlWithServer(10000);

  // Focar automaticamente no bar atual quando ele mudar
  useEffect(() => {
    setFocusedBarIndex(state.currentBarIndex);
  }, [state.currentBarIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {serverState.isLoading && (
        <ServerStatus
          isConnected={serverState.isConnected}
          isLoading={serverState.isLoading}
          error={serverState.error}
        />
      )}
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-4 border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Layout centralizado */}
          <div className="flex justify-center items-center py-3 lg:py-4">
            <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/logo.jpg"
                alt="Campanha Eleitoral 29 anos - Vitor e Bruno"
                width={156}
                height={156}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar ou Welcome */}
        {state.hasStarted ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-100/50">
            <div className="text-center mb-4">
              <span className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
                <span className="text-xl">📊</span>
                Progresso da Campanha
              </span>
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-2 inline-block">
                {state.bars.filter((bar) => bar.visited).length} de{" "}
                {state.bars.length} bares
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{
                  width: `${
                    (state.bars.filter((bar) => bar.visited).length /
                      state.bars.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ) : (
          <CampaignWelcome startTime={state.startTime} />
        )}

        {/* Map and List Side by Side */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-2 min-w-0">
          {/* Map */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
            <div className="h-96 lg:h-[600px]">
              <Map
                bars={state.bars}
                currentBarIndex={state.currentBarIndex}
                onBarClick={() => {}} // Controle via JSON
                focusedBarIndex={focusedBarIndex}
              />
            </div>
          </div>

          {/* Bar List */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
            <div className="p-4 sm:p-6 h-[500px] sm:h-96 lg:h-[600px] overflow-hidden flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🗳️</span>
                Roteiro da Campanha
              </h2>
              <div className="flex-1 overflow-y-auto">
                <BarList
                  bars={state.bars}
                  currentBarIndex={state.currentBarIndex}
                  onBarFocus={setFocusedBarIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
