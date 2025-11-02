import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Coffee, MapPin, ArrowLeft, ExternalLink } from "lucide-react";

const cafes = [
  { id: 1, name: "Tony's Estate", address: "Doha", distance: undefined, itemsAvailable: 12, type: "loopzone" },
  { id: 2, name: "Earth", address: "Doha", distance: undefined, itemsAvailable: 8, type: "loopzone" },
  { id: 3, name: "Cup and Go", address: "Doha", distance: undefined, itemsAvailable: 5, type: "pickup" },
  { id: 4, name: "Two to Six Cafe", address: "Doha", distance: undefined, itemsAvailable: 10, type: "loopzone" },
] as const;

export function PartnerCafes({ onBack }: { onBack: () => void }) {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl">Our Partner Cafés</h2>
            <p className="text-gray-600">Verified spots where Localoop items can be discovered and exchanged.</p>
          </div>
          <Button onClick={() => (window.location.hash = "#map")}>
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cafes.map((cafe) => (
            <Card key={cafe.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${cafe.type === "loopzone" ? "bg-green-100" : "bg-amber-100"}`}>
                    <Coffee className={`h-5 w-5 ${cafe.type === "loopzone" ? "text-green-600" : "text-amber-600"}`} />
                  </div>
                  <div>
                    <h4>{cafe.name}</h4>
                    <p className="text-sm text-gray-600">{cafe.address}</p>
                    <div className="flex gap-3 mt-2">
                      {cafe.type === "loopzone" ? (
                        <Badge className="bg-green-600">LoopZone</Badge>
                      ) : (
                        <Badge variant="outline">Pickup Only</Badge>
                      )}
                      <Badge variant="outline">{cafe.distance} km</Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' Doha')}`, '_blank')}
                >
                  Directions <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
