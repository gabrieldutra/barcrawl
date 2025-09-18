"use client";

import { useState, useEffect } from "react";

interface CampaignWelcomeProps {
  startTime: string | null;
}

export default function CampaignWelcome({ startTime }: CampaignWelcomeProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!startTime) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const difference = start - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (!timeLeft) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100/50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100/50">
      <div className="text-center">
        {/* Ícone principal */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
            <span className="text-4xl">🍺</span>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Campanha Eleitoral
        </h2>

        {/* Subtítulo */}
        <p className="text-xl text-gray-600 mb-8">Vitor e Bruno - 29 anos</p>

        {/* Countdown */}
        <div className="bg-white/70 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Início da campanha em:
          </h3>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-lg p-3 mb-2">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs">Dias</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-lg p-3 mb-2">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs">Horas</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-lg p-3 mb-2">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs">Min</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-lg p-3 mb-2">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs">Seg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Aguardando início da campanha...</span>
        </div>
      </div>
    </div>
  );
}
