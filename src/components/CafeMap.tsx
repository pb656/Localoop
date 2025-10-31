import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

// Vite injects env on import.meta
// @ts-ignore
const GOOGLE_MAPS_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

function useGoogleMaps(apiKey?: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!apiKey) return;
    if ((window as any).google?.maps) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, [apiKey]);
  return loaded;
}

interface Cafe {
  id: number;
  name: string;
  address: string;
  distance: number;
  itemsAvailable: number;
  lat: number;
  lng: number;
  type: "loopzone" | "pickup";
}

export function CafeMap() {
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const googleLoaded = useGoogleMaps(GOOGLE_MAPS_KEY);

  // All cafes are in mock data
  const cafes: Cafe[] = [
    { id: 1, name: "Brew & Loop Café", address: "123 Main Street", distance: 0.8, itemsAvailable: 24, lat: 51.515, lng: -0.12, type: "loopzone" },
    { id: 2, name: "Green Bean Coffee", address: "456 Oak Avenue", distance: 1.2, itemsAvailable: 18, lat: 51.52, lng: -0.115, type: "loopzone" },
    { id: 3, name: "The Daily Grind", address: "789 Elm Road", distance: 2.1, itemsAvailable: 0, lat: 51.525, lng: -0.13, type: "pickup" },
    { id: 4, name: "Espresso Yourself", address: "321 Pine Lane", distance: 2.8, itemsAvailable: 31, lat: 51.51, lng: -0.125, type: "loopzone" },
    { id: 5, name: "Local Grounds", address: "654 Birch Street", distance: 3.5, itemsAvailable: 12, lat: 51.508, lng: -0.11, type: "loopzone" },
    { id: 6, name: "Corner Café", address: "987 Maple Drive", distance: 4.2, itemsAvailable: 0, lat: 51.505, lng: -0.135, type: "pickup" },
  ];

  const defaultCenter: [number, number] = [51.51, -0.12];

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const handleFindMe = () => {
    setLocating(true);
    setGeoError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
          setLocating(false);
        },
        (err) => {
          setGeoError("Could not get your location. Please allow location access.");
          setLocating(false);
        },
        { enableHighAccuracy: true, timeout: 7000 }
      );
    } else {
      setGeoError("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!googleLoaded || !mapRef.current || mapInstanceRef.current) return;
    const center = userPosition || defaultCenter;
    mapInstanceRef.current = new (window as any).google.maps.Map(mapRef.current, {
      center: { lat: center[0], lng: center[1] },
      zoom: 13,
      disableDefaultUI: false,
    });
  }, [googleLoaded]);

  // Update center when user position changes
  useEffect(() => {
    if (!googleLoaded || !mapInstanceRef.current) return;
    const center = userPosition || defaultCenter;
    mapInstanceRef.current.setCenter({ lat: center[0], lng: center[1] });
  }, [userPosition, googleLoaded]);

  // Render markers
  useEffect(() => {
    if (!googleLoaded || !mapInstanceRef.current) return;
    // clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    cafes.forEach((cafe) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: cafe.lat, lng: cafe.lng },
        map: mapInstanceRef.current,
        title: cafe.name,
      });
      const info = new (window as any).google.maps.InfoWindow({
        content: `<div><strong>${cafe.name}</strong><br/>${cafe.address}${cafe.itemsAvailable > 0 ? `<div style=\"margin-top:6px;color:#16a34a;font-weight:600\">${cafe.itemsAvailable} items</div>` : ""}</div>`,
      });
      marker.addListener("click", () => {
        info.open({ anchor: marker, map: mapInstanceRef.current });
        setSelectedCafe(cafe);
      });
      markersRef.current.push(marker);
    });
    if (userPosition) {
      const userMarker = new (window as any).google.maps.Marker({
        position: { lat: userPosition[0], lng: userPosition[1] },
        map: mapInstanceRef.current,
        title: "You are here",
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#2563eb",
          fillOpacity: 0.9,
          strokeColor: "white",
          strokeWeight: 2,
        },
      });
      markersRef.current.push(userMarker);
    }
  }, [cafes, googleLoaded, userPosition]);

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl mb-4">Find Your Nearest Café</h2>
          <p className="text-xl text-gray-600">
            Discover LoopZone partner cafés within 5km radius
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Map */}
          <Card className="p-0 overflow-hidden relative">
            <div className="relative w-full min-h-[400px] h-[540px] z-10">
              {GOOGLE_MAPS_KEY ? (
                googleLoaded ? (
                  <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">Loading map…</div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-center p-8 text-gray-600">
                  Google Maps key missing. Add VITE_GOOGLE_MAPS_API_KEY to .env to enable.
                </div>
              )}
              <Button
                size="sm"
                className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-gray-100 z-20 shadow"
                onClick={handleFindMe}
                disabled={locating}
              >
                <Navigation className="h-4 w-4 mr-2" />
                {locating ? "Locating..." : "Use My Location"}
              </Button>
              {geoError && (
                <div className="absolute bottom-2 left-2 bg-white border border-red-300 text-red-700 px-4 py-2 rounded shadow text-sm">
                  {geoError}
                </div>
              )}
            </div>
          </Card>
          {/* Café List */}
          <div className="space-y-4 max-h-[540px] overflow-y-auto">
            {cafes.map((cafe) => (
              <Card
                key={cafe.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedCafe?.id === cafe.id ? "ring-2 ring-green-600" : ""}`}
                onClick={() => setSelectedCafe(cafe)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${cafe.type === "loopzone" ? "bg-green-100" : "bg-amber-100"}`}>
                      <Coffee className={`h-5 w-5 ${cafe.type === "loopzone" ? "text-green-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <h4>{cafe.name}</h4>
                      <p className="text-sm text-gray-600">{cafe.address}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{cafe.distance} km</Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center gap-4">
                    {cafe.type === "loopzone" ? (
                      <Badge className="bg-green-600">LoopZone</Badge>
                    ) : (
                      <Badge variant="outline">Pickup Only</Badge>
                    )}
                    {cafe.itemsAvailable > 0 && (
                      <span className="text-sm text-gray-600">{cafe.itemsAvailable} items available</span>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${cafe.lat},${cafe.lng}`)}>
                    Get Directions
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
