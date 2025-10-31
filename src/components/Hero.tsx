import { ArrowRight, MapPin, Recycle, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToId = (id: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Leaf className="h-4 w-4" />
              <span className="text-sm">Zero-Waste Fashion</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl">
              Style Meets{" "}
              <span className="text-green-600">Sustainability</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Transform your local café into a sustainable fashion hub. Browse, reserve, 
              and collect curated items — all within 5km. No shipping. No waste. Just style.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => scrollToId("catalogue")}>
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId("map")}>
                Find Cafés Near You
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">50+ Café Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Zero Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Community First</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjbG90aGluZ3xlbnwxfHx8fDE3NjE1NjE5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sustainable fashion collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-sm text-gray-600">Items Reused</div>
              <div className="text-3xl text-green-600">12,847+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leaf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
