"use client";

import { Loader2, MapPin, Map } from "lucide-react";

export default function MapLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-lg">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Map className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2">
            <MapPin className="w-6 h-6 text-amber-500 animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          🗺️ Carregando Mapa
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-xs mx-auto">
          Aguarde enquanto carregamos os 15 bares de Santa Tereza...
        </p>

        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        <div className="text-xs text-gray-500 bg-white/60 px-3 py-1 rounded-full">
          Usando Google Maps API
        </div>
      </div>
    </div>
  );
}
