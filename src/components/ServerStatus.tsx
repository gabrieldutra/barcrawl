"use client";

import { WifiOff, Loader2, AlertCircle } from "lucide-react";

interface ServerStatusProps {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export default function ServerStatus({
  isConnected,
  isLoading,
  error,
}: ServerStatusProps) {
  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-blue-100 text-blue-800 border border-blue-200">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Carregando roteiro...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-red-100 text-red-800 border border-red-200">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Erro no roteiro</span>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-gray-100 text-gray-800 border border-gray-200">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">Roteiro offline</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-green-100 text-green-800 border border-green-200">
        <span className="text-lg">🍺</span>
        <span className="text-sm font-medium">Roteiro Ativo</span>
      </div>
    </div>
  );
}
