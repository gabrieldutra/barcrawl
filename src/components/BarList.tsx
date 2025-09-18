"use client";

import { useEffect, useRef } from "react";
import { Bar } from "@/types/bar";
import { MapPin, CheckCircle, Circle } from "lucide-react";

interface BarListProps {
  bars: Bar[];
  currentBarIndex: number;
  onBarFocus: (barIndex: number) => void;
}

export default function BarList({
  bars,
  currentBarIndex,
  onBarFocus,
}: BarListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll automático para o bar atual
  useEffect(() => {
    if (barRefs.current[currentBarIndex] && scrollContainerRef.current) {
      const barElement = barRefs.current[currentBarIndex];
      const container = scrollContainerRef.current;

      // Calcular a posição do elemento em relação ao container
      const containerRect = container.getBoundingClientRect();
      const barRect = barElement.getBoundingClientRect();

      // Verificar se o elemento está visível
      const isVisible =
        barRect.top >= containerRect.top &&
        barRect.bottom <= containerRect.bottom;

      if (!isVisible) {
        // Scroll suave para o elemento
        barElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentBarIndex]);
  return (
    <div
      ref={scrollContainerRef}
      className="space-y-2 sm:space-y-3 h-full overflow-y-auto p-1 sm:p-2 min-w-0"
    >
      {bars.map((bar, index) => (
        <div
          key={bar.id}
          ref={(el) => {
            barRefs.current[index] = el;
          }}
          className={`group relative p-3 sm:p-4 lg:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.005] hover:shadow-lg active:scale-[0.995] overflow-hidden min-w-0 ${
            bar.current
              ? "border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 shadow-2xl shadow-amber-300/30 hover:shadow-amber-400/40"
              : bar.visited
              ? "border-green-400 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-xl shadow-green-200/30 hover:shadow-green-300/40"
              : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/30"
          }`}
          onClick={() => onBarFocus(index)}
        >
          {/* Efeito de hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {/* Primeira linha: badges e ícone de status */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-wrap min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm">
                  #{index + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm">
                  {bar.time}
                </span>
                {bar.current && (
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 rounded-full shadow-lg animate-pulse">
                    🎯 Atual
                  </span>
                )}
              </div>
              <div className="flex-shrink-0 ml-2">
                {bar.visited ? (
                  <div className="relative">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 drop-shadow-lg" />
                    <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                ) : bar.current ? (
                  <div className="relative">
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-500 fill-current drop-shadow-lg" />
                    <div className="absolute inset-0 bg-amber-400 rounded-full opacity-30 animate-pulse"></div>
                  </div>
                ) : (
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-300 group-hover:text-gray-400 transition-colors duration-200" />
                )}
              </div>
            </div>

            {/* Segunda linha: nome e endereço */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                {bar.name}
              </h3>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
                <span className="line-clamp-2 font-medium group-hover:text-gray-700 transition-colors duration-200">
                  {bar.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
