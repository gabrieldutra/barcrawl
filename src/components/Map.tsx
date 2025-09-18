"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Bar } from "@/types/bar";
import MapError from "./MapError";

interface MapProps {
  bars: Bar[];
  currentBarIndex: number;
  onBarClick: (barIndex: number) => void;
  focusedBarIndex?: number;
}

export default function MapComponent({
  bars,
  onBarClick,
  focusedBarIndex,
}: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Estado para controlar se deve focar no bar
  const [shouldFocusOnBar, setShouldFocusOnBar] = useState(true);

  // Calcular o centro do mapa baseado nos bares ou no bar focado
  const calculatedCenter = useMemo(() => {
    if (focusedBarIndex !== undefined && bars[focusedBarIndex]) {
      const [lat, lng] = bars[focusedBarIndex].coordinates;
      return { lat, lng };
    }

    if (bars.length === 0) return { lat: -19.919, lng: -43.936 };

    const lat =
      bars.reduce((sum, bar) => sum + bar.coordinates[0], 0) / bars.length;
    const lng =
      bars.reduce((sum, bar) => sum + bar.coordinates[1], 0) / bars.length;

    return { lat, lng };
  }, [bars, focusedBarIndex]);

  // Zoom baseado se há um bar focado
  const calculatedZoom = useMemo(() => {
    return focusedBarIndex !== undefined ? 18 : 15;
  }, [focusedBarIndex]);

  // Focar no bar quando o focusedBarIndex mudar
  useEffect(() => {
    if (focusedBarIndex !== undefined) {
      setShouldFocusOnBar(true);
    }
  }, [focusedBarIndex]);

  // Handlers para interação do usuário - desabilitar foco automático
  const handleCenterChanged = useCallback(() => {
    setShouldFocusOnBar(false);
  }, []);

  const handleZoomChanged = useCallback(() => {
    setShouldFocusOnBar(false);
  }, []);

  // Usar valores calculados apenas quando deve focar no bar
  const center = shouldFocusOnBar ? calculatedCenter : undefined;
  const zoom = shouldFocusOnBar ? calculatedZoom : undefined;

  const handleMarkerClick = useCallback(
    (index: number) => {
      onBarClick(index);
    },
    [onBarClick]
  );

  if (!apiKey) {
    return <MapError message="Chave da API do Google Maps não encontrada" />;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-full relative">
        <div data-map-id="bar-crawl-map" className="w-full h-full">
          <Map
            center={center}
            zoom={zoom}
            mapId="bar-crawl-map"
            style={{ width: "100%", height: "100%" }}
            gestureHandling="greedy"
            disableDefaultUI={false}
            clickableIcons={true}
            onCenterChanged={handleCenterChanged}
            onZoomChanged={handleZoomChanged}
            styles={[
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ]}
          >
            {/* Marcadores dos bares */}
            {bars.map((bar, index) => {
              const markerColor = bar.visited
                ? "#059669" // emerald-600 - mais vibrante
                : bar.current
                ? "#DC2626" // red-600 - destaque para atual
                : "#1E40AF"; // blue-800 - azul royal da temática

              const [lat, lng] = bar.coordinates;

              return (
                <Marker
                  key={bar.id}
                  position={{ lat, lng }}
                  onClick={() => handleMarkerClick(index)}
                  title={`${index + 1}. ${bar.name} - ${bar.time}`}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
                        </filter>
                      </defs>
                      <circle cx="22" cy="22" r="20" fill="${markerColor}" stroke="white" stroke-width="3" filter="url(#shadow)"/>
                      <circle cx="22" cy="22" r="16" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
                      <text x="22" y="28" text-anchor="middle" fill="white" font-family="Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif" font-size="16" font-weight="bold" stroke="rgba(0,0,0,0.2)" stroke-width="0.5">${
                        index + 1
                      }</text>
                    </svg>
                  `)}`,
                  }}
                />
              );
            })}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}
