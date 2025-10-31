import React from "react";
import { useAuth } from "../utils/AuthContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Coins, ArrowLeft, User } from "lucide-react";

export function Account({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();

  return (
    <section className="py-16 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl">Your Account</h2>
          </div>
          {user ? (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">User ID</div>
                <div className="font-mono text-sm break-all">{user.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div>{user.email}</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Coins className="h-5 w-5 text-amber-500" />
                <div className="text-sm text-gray-500">LocaCredit Balance:</div>
                <div className="font-semibold">{user.loopCredits}</div>
              </div>
            </div>
          ) : (
            <div>Not signed in.</div>
          )}
        </Card>
      </div>
    </section>
  );
}
