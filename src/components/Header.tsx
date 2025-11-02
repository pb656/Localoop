import { Menu, Leaf, QrCode, Coins } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import React from "react";

import { useAuth } from "../utils/AuthContext";

export function Header({ onStoreClick, onAboutClick, onCafesClick, onHowItWorksClick, onSwapShopClick, onSignUpClick, onAccountClick, onHomeClick }) {
  const { user, signOut } = useAuth();
  const navLinks = [
    { name: "How It Works", action: onHowItWorksClick },
    { name: "Café LoopZones", action: onCafesClick },
    { name: "Swap & Shop", action: onSwapShopClick },
    { name: "About Us", action: onAboutClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button onClick={onHomeClick} className="flex items-center gap-2 cursor-pointer">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl">Localoop</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button
            size="sm"
            variant="secondary"
            className="ml-2 border-green-600 text-green-700 font-semibold bg-green-50 hover:bg-green-100 hover:text-green-900 transition-colors shadow"
            onClick={onStoreClick}
          >
            Loca Store
          </Button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            Scan LoopTag
          </Button>
          {user && (
            <div className="inline-flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-green-100">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">{user.loopCredits}</span>
              <span className="text-xs text-gray-500">LocaCredit</span>
            </div>
          )}
          {!user ? (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onSignUpClick}>
              Get Started
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={onAccountClick}>
                Account
              </Button>
              <Button size="sm" variant="ghost" onClick={async () => { await signOut(); onHomeClick(); }}>
                Log out
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button
                className="mt-2 bg-green-50 text-green-700 hover:bg-green-100 border-green-600 font-semibold"
                onClick={onStoreClick}
              >
                Loca Store
              </Button>
              <div className="flex flex-col gap-2 mt-4">
                {user && (
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/90 rounded-lg border border-green-100">
                    <Coins className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="text-xs text-gray-500">Balance</div>
                      <div className="font-semibold">{user.loopCredits} LocaCredit</div>
                    </div>
                  </div>
                )}
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan LoopTag
                </Button>
                {!user ? (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={onSignUpClick}>
                    Get Started
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={onAccountClick}>
                      Account
                    </Button>
                    <Button variant="ghost" onClick={async () => { await signOut(); onHomeClick(); }}>
                      Log out
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
