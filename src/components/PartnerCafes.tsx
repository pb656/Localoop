import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Coffee, MapPin, ArrowLeft, ExternalLink } from "lucide-react";

const cafes = [
  { id: 1, name: "Brew & Loop Café", address: "123 Main Street", distance: 0.8, itemsAvailable: 24, lat: 51.515, lng: -0.12, type: "loopzone" },
  { id: 2, name: "Green Bean Coffee", address: "456 Oak Avenue", distance: 1.2, itemsAvailable: 18, lat: 51.52, lng: -0.115, type: "loopzone" },
  { id: 3, name: "The Daily Grind", address: "789 Elm Road", distance: 2.1, itemsAvailable: 0, lat: 51.525, lng: -0.13, type: "pickup" },
  { id: 4, name: "Espresso Yourself", address: "321 Pine Lane", distance: 2.8, itemsAvailable: 31, lat: 51.51, lng: -0.125, type: "loopzone" },
  { id: 5, name: "Local Grounds", address: "654 Birch Street", distance: 3.5, itemsAvailable: 12, lat: 51.508, lng: -0.11, type: "loopzone" },
  { id: 6, name: "Corner Café", address: "987 Maple Drive", distance: 4.2, itemsAvailable: 0, lat: 51.505, lng: -0.135, type: "pickup" },
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
                <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${cafe.lat},${cafe.lng}`)}>
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
