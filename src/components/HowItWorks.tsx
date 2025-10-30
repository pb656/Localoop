import { Coffee, Smartphone, MapPin, ShoppingBag, Recycle, QrCode } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">Two Ways to Loop</h2>
          <p className="text-xl text-gray-600">
            Shop new items at your local café or explore our full collection of pre-loved treasures online
          </p>
        </div>

        <Tabs defaultValue="cafe" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="cafe" className="text-lg">
              <Coffee className="h-5 w-5 mr-2" />
              Café LoopZones
            </TabsTrigger>
            <TabsTrigger value="online" className="text-lg">
              <Smartphone className="h-5 w-5 mr-2" />
              Online Swap & Shop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cafe" className="space-y-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl">
              <div className="flex items-start gap-3 mb-6">
                <Badge className="bg-amber-600">New Items</Badge>
                <Badge variant="outline">In-Store Experience</Badge>
              </div>
              <h3 className="text-2xl mb-3">
                Shop New Fashion at Your Favorite Café
              </h3>
              <p className="text-gray-600 mb-8">
                Partner cafés display and sell curated new fashion accessories and clothing. 
                Browse in-store or scan QR codes for digital catalogues. Reserve and collect on the spot.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="mb-2">Find a Café</h4>
                  <p className="text-sm text-gray-600">
                    Discover partner cafés near you displaying new fashion items
                  </p>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="mb-2">Browse & Scan</h4>
                  <p className="text-sm text-gray-600">
                    View items in-store or scan QR codes for the full digital catalogue
                  </p>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="mb-2">Reserve & Collect</h4>
                  <p className="text-sm text-gray-600">
                    Reserve items and pick them up directly — enjoy your coffee while you shop!
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="online" className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
              <div className="flex items-start gap-3 mb-6">
                <Badge className="bg-green-600">Pre-Loved & Vintage</Badge>
                <Badge variant="outline">Full Collection</Badge>
              </div>
              <h3 className="text-2xl mb-3">
                Explore Pre-Loved Fashion Within 5km
              </h3>
              <p className="text-gray-600 mb-8">
                Browse our full range of pre-loved, vintage, and upcycled fashion on the Localoop app. 
                Purchase with LoopCredits and pick up at a nearby café. Digital meets physical.
              </p>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="mb-2">Browse Online</h4>
                  <p className="text-sm text-gray-600">
                    Explore pre-loved items within your 5km radius
                  </p>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="mb-2">Check LoopTag</h4>
                  <p className="text-sm text-gray-600">
                    Verify condition and history via QR code
                  </p>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="mb-2">Pay with LoopCredits</h4>
                  <p className="text-sm text-gray-600">
                    Use in-app currency for seamless transactions
                  </p>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Coffee className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="mb-2">Pick Up Local</h4>
                  <p className="text-sm text-gray-600">
                    Collect your items at a nearby partner café
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-gray-50 p-8 rounded-2xl max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Recycle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="mb-2">Zero Waste Guarantee</h4>
              <p className="text-gray-600">
                Every item features a LoopTag QR code for traceability and trust. 
                Unsold items are professionally cleaned and donated to local charities. 
                Nothing goes to waste — ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
