import { Users, Store, TrendingUp, Heart, Leaf, Coffee } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl mb-4">Why Join the Loop?</h2>
          <p className="text-xl text-gray-600">
            Benefits for everyone in the community
          </p>
        </div>

        <Tabs defaultValue="users" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="users" className="text-lg">
              <Users className="h-5 w-5 mr-2" />
              For Users
            </TabsTrigger>
            <TabsTrigger value="cafes" className="text-lg">
              <Store className="h-5 w-5 mr-2" />
              For Café Partners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2">Sustainable Shopping</h3>
                <p className="text-gray-600">
                  Reduce your carbon footprint with zero-shipping fashion. Every
                  purchase supports circular economy and reduces waste.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2">Shop Local</h3>
                <p className="text-gray-600">
                  Discover fashion at your favorite local cafés. Browse while
                  enjoying your coffee. Support your community.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2">Quality & Trust</h3>
                <p className="text-gray-600">
                  Every item verified with LoopTag QR codes. Transparent
                  condition ratings. Professionally cleaned pre-loved items.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mb-2">Earn LoopCredits</h3>
                <p className="text-gray-600">
                  Sell your pre-loved items and earn LoopCredits. Use them to
                  shop sustainable fashion within the community.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="mb-2">Community First</h3>
                <p className="text-gray-600">
                  Connect with local fashion lovers. Share style tips. Build
                  relationships while building your wardrobe.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Store className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2">Instant Gratification</h3>
                <p className="text-gray-600">
                  No waiting for deliveries. Browse online, pick up today. Try
                  items in person before committing.
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cafes" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2">Increase Foot Traffic</h3>
                <p className="text-gray-600">
                  Attract new customers who come to browse and pick up fashion
                  items — and stay for coffee and snacks.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2">Additional Revenue</h3>
                <p className="text-gray-600">
                  Earn commission on every item sold or picked up. Turn unused
                  space into a profit center.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2">Sustainability Credentials</h3>
                <p className="text-gray-600">
                  Position your café as a sustainability leader. Attract
                  eco-conscious customers who share your values.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mb-2">Zero Hassle</h3>
                <p className="text-gray-600">
                  We handle inventory, logistics, and customer support. You just
                  provide the space and hospitality.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="mb-2">Community Hub</h3>
                <p className="text-gray-600">
                  Become a central meeting point in your neighborhood. Host
                  fashion events and swap meets.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2">Brand Differentiation</h3>
                <p className="text-gray-600">
                  Stand out from competitors with a unique offering. Create
                  Instagram-worthy moments for social sharing.
                </p>
              </Card>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <h3 className="text-2xl mb-3">Ready to Partner?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our growing network of café partners and transform your
                space into a sustainable fashion hub. It's free to join and easy
                to get started.
              </p>
              <a href="#contact-us" className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Become a Partner Café
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
