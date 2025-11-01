import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Coins, CheckCircle, ArrowLeft } from "lucide-react";

export function LocaStoreCheckout({ selectedPackage, onBack, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addCredits } = useAuth();

  if (!selectedPackage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">No package selected</div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add real API logic if needed
    setTimeout(async () => {
      setLoading(false);
      // update user's credits locally
      try {
        const total = (selectedPackage.credits || 0) + (selectedPackage.bonus || 0);
        await addCredits(total);
      } catch (err) {
        console.warn("Failed to add credits locally", err);
      }
      setSuccess(true);
      setTimeout(onSuccess, 1600);
    }, 1100);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <CheckCircle className="h-20 w-20 text-green-500 animate-bounceIn" />
        <h2 className="mt-6 text-3xl font-bold text-green-700 animate-fadein">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mt-2">You now have more LocaCredit to spend!</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-2">
      <Card className="relative w-full max-w-lg p-10 bg-white/90 border-green-200 shadow-2xl backdrop-blur-lg">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 absolute left-6 top-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col items-center">
          <Coins className="h-12 w-12 text-amber-500 mb-2 animate-pulse" />
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Purchase LocaCredit</h2>
          <div className="text-center mb-6">
            <span className="text-4xl font-semibold text-green-700">{selectedPackage.credits + selectedPackage.bonus}</span>
            <span className="ml-1 font-medium text-amber-600">LocaCredit</span>
            <Badge className="ml-4 bg-blue-600 text-white">{selectedPackage.price} QAR</Badge>
            <div className="text-green-600 font-semibold mt-2">
              {selectedPackage.bonus > 0 && (
                <span>Includes {selectedPackage.bonus} FREE!</span>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Full Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="bg-white/60"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              required
              className="bg-white/60"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white text-lg font-semibold shadow-xl py-3 mt-8 z-20"
            disabled={loading}
          >
            {loading ? "Processing..." : `Confirm & Buy for ${selectedPackage.price} QAR`}
          </Button>
        </form>
      </Card>
    </div>
  );
}
