import { Menu, Leaf, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import React from "react";

import { useAuth } from "../utils/AuthContext";

export function Header({ onStoreClick, onAboutClick, onCafesClick, onHowItWorksClick, onSwapShopClick, onSignUpClick, onAccountClick, onHomeClick }) {
  const { user } = useAuth();
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
          {!user ? (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onSignUpClick}>
              Get Started
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={onAccountClick}>
              Account
            </Button>
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
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan LoopTag
                </Button>
                {!user ? (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={onSignUpClick}>
                    Get Started
                  </Button>
                ) : (
                  <Button variant="outline" onClick={onAccountClick}>
                    Account
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
