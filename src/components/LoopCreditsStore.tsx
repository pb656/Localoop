import { useAuth } from "../utils/AuthContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Coins, Check, CreditCard, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LoopCreditsStoreProps {
  onBack: () => void;
  onBuyCredits: (pkg: any) => void;
}

export function LoopCreditsStore({ onBack, onBuyCredits }: LoopCreditsStoreProps) {
  const { user } = useAuth();

  const packages = [
    { id: 1, credits: 100, price: 10, popular: false, bonus: 0 },
    { id: 2, credits: 250, price: 24, popular: true, bonus: 10 },
    { id: 3, credits: 500, price: 45, popular: false, bonus: 25 },
    { id: 4, credits: 1000, price: 85, popular: false, bonus: 75 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 flex flex-col items-center justify-center overflow-x-hidden">
      {/* Dramatic spot-glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[90vw] h-[50vw] max-w-5xl bg-gradient-to-tl from-green-300 via-blue-300 to-transparent opacity-20 blur-2xl rounded-full"></div>
      <div className="container mx-auto max-w-6xl z-10 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fadein">
            <Coins className="h-12 w-12 text-amber-500" />
            <h1 className="text-4xl bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent font-extrabold inline">Loca Store</h1>
          </div>
          <p className="text-xl text-gray-700/90 mb-2">
            Buy LocaCredit, our local community currency — and support sustainability!
          </p>
          {user && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg backdrop-blur border border-green-100 font-medium">
              <Coins className="h-5 w-5 text-amber-500 animate-wiggle" />
              <span>Your Balance:</span>
              <span className="text-xl text-green-700">{user.loopCredits}</span>
              <span className="text-gray-600">LocaCredit</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {packages.map((pkg, i) => (
            <Card
              key={pkg.id}
              className={`group p-6 relative shadow-xl transition-transform bg-white/80 ring-green-200 hover:scale-[1.04] hover:ring-4 backdrop-blur-md ${pkg.popular ? "ring-2 border-green-400 bg-green-50/90" : ""}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-700 text-white font-bold shadow-md animate-pop">Most Popular</Badge>
              )}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-green-700 group-hover:scale-110 transition-transform">{pkg.credits + pkg.bonus}</span>
                  <Coins className="h-6 w-6 text-amber-500 animate-pulse" />
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-sm text-green-500 font-semibold">{pkg.credits} + {pkg.bonus} Bonus</div>
                )}
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl mb-1 font-bold text-blue-700">{pkg.price} <span className="text-xl font-medium">QAR</span></div>
                <div className="text-sm text-gray-500">{(pkg.price / (pkg.credits + pkg.bonus)).toFixed(2)} QAR per credit</div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 shadow-lg font-semibold tracking-wide py-2.5 text-lg"
                onClick={() => onBuyCredits(pkg)}
                data-testid={`buy-locacredit-${pkg.credits}`}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            </Card>
          ))}
        </div>

        <div className="bg-white/80 p-8 rounded-2xl max-w-3xl mx-auto shadow-xl backdrop-blur border border-green-100">
          <h3 className="text-2xl mb-6 text-center font-semibold text-green-700">Why LocaCredit?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="mb-1">Seamless Transactions</h4>
                <p className="text-sm text-gray-600">Instant eco-friendly checkout, no card needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="mb-1">Earn & Spend Locally</h4>
                <p className="text-sm text-gray-600">Support your neighborhood & fair circular fashion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="mb-1">Community Currency</h4>
                <p className="text-sm text-gray-600">Keep value flowing in your local fashion network</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="mb-1">Bonus Credits</h4>
                <p className="text-sm text-gray-600">Get rewarded for bigger eco choices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
