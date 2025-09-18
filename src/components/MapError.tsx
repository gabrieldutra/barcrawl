"use client";

import { AlertCircle, MapPin } from "lucide-react";

interface MapErrorProps {
  message?: string;
}

export default function MapError({
  message = "Erro ao carregar o mapa",
}: MapErrorProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 rounded-lg">
      <div className="text-center p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          🗺️ Erro no Mapa
        </h3>
        <p className="text-sm text-gray-700 mb-4 bg-white/80 p-3 rounded-lg border border-red-200">
          {message}
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-white/60 p-2 rounded-lg">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>
            Verifique a chave da API do Google Maps no arquivo .env.local
          </span>
        </div>
      </div>
    </div>
  );
}
