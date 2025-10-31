import { Leaf, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="text-xl text-white">Localoop</span>
            </div>
            <p className="text-sm mb-4">
              Zero-waste fashion platform transforming local cafés into sustainable style hubs.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#catalogue" className="hover:text-white transition-colors">
                  Browse Collections
                </a>
              </li>
              <li>
                <a href="#cafe-loopzones" className="hover:text-white transition-colors">
                  Café LoopZones
                </a>
              </li>
              <li>
                <a href="#swap-shop" className="hover:text-white transition-colors">
                  Swap & Shop
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-white transition-colors">
                  Find Cafés
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#cafe-loopzones" className="hover:text-white transition-colors">
                  Partner Cafés
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#contact-us" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#loca-store" className="hover:text-white transition-colors">
                  LoopCredits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LoopTag System
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 Localoop. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
