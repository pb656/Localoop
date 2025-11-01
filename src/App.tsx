import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { CafeMap } from "./components/CafeMap";
import { ProductCatalogue } from "./components/ProductCatalogue";
import { Benefits } from "./components/Benefits";
import { Footer } from "./components/Footer";
import { LoopCreditsStore } from "./components/LoopCreditsStore";
import { LocaStoreCheckout } from "./components/LocaStoreCheckout";
import { AboutUs } from "./components/AboutUs";
import { PartnerCafes } from "./components/PartnerCafes";
import { Account } from "./components/Account";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { useAuth } from "./utils/AuthContext";

export default function App() {
  const { user } = useAuth();
  const [view, setView] = useState<'home' | 'store' | 'checkout' | 'signin' | 'signup' | 'about' | 'cafes'>("home");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pendingAfterAuth, setPendingAfterAuth] = useState<null | 'store' | 'checkout'>(null);

  const scrollToId = (id: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleStoreClick = () => {
    if (!user) {
      setPendingAfterAuth("store");
      setView("signin");
    } else {
      setView("store");
    }
  };
  const handleHomeClick = () => setView("home");
  const handleHowItWorks = () => {
    setView("home");
    // ensure the URL shows the anchor and scroll after the home view renders
    setTimeout(() => {
      try { window.location.hash = "#how-it-works"; } catch (e) {}
      scrollToId("how-it-works");
    }, 0);
  };

  // If the URL hash changes (e.g. footer anchor clicked), navigate to home and scroll.
  useEffect(() => {
    const handleHash = () => {
      const h = (window.location.hash || "").replace(/^#/, "");
      switch (h) {
        case "how-it-works":
          setView("home");
          setTimeout(() => scrollToId("how-it-works"), 50);
          break;
        case "catalogue":
        case "swap-shop":
          setView("home");
          setTimeout(() => scrollToId("catalogue"), 50);
          break;
        case "cafe-loopzones":
        case "map":
          setView("home");
          setTimeout(() => scrollToId("map"), 50);
          break;
        case "about-us":
          setView("about");
          setTimeout(() => {
            const el = document.getElementById("about-us");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          break;
        case "loca-store":
          setView("store");
          break;
        case "contact-us":
          setView("about");
          setTimeout(() => {
            const el = document.getElementById("contact-us");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          break;
        default:
          // no-op
          break;
      }
    };

    // check on mount
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  const handleSwapShop = () => {
    setView("home");
    setTimeout(() => scrollToId("catalogue"), 0);
  };
  const handleBuyCredits = (pkg) => {
    if (!user) {
      setPendingAfterAuth("checkout");
      setSelectedPackage(pkg);
      setView("signin");
    } else {
      setSelectedPackage(pkg);
      setView("checkout");
    }
  };

  // After successful auth, go to where the user was trying to go
  const handleAuthBack = () => {
    if (pendingAfterAuth) {
      setView(pendingAfterAuth);
      setPendingAfterAuth(null);
    } else {
      setView("home");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onStoreClick={handleStoreClick}
        onAboutClick={() => setView("about")}
        onCafesClick={() => setView("cafes")}
        onHowItWorksClick={handleHowItWorks}
        onSwapShopClick={handleSwapShop}
        onSignUpClick={() => setView("signup")}
        onAccountClick={() => setView("account")}
        onHomeClick={handleHomeClick}
      />
      <main>
        {view === "home" && (
          <>
            <Hero />
            <Benefits />
            <HowItWorks />
            <CafeMap />
            <ProductCatalogue />
          </>
        )}
        {view === "store" && (
          <LoopCreditsStore onBack={handleHomeClick} onBuyCredits={handleBuyCredits} />
        )}
        {view === "about" && (
          <AboutUs onBack={handleHomeClick} />
        )}
        {view === "cafes" && (
          <PartnerCafes onBack={handleHomeClick} />
        )}
        {view === "checkout" && (
          <LocaStoreCheckout
            selectedPackage={selectedPackage}
            onBack={() => setView("store")}
            onSuccess={handleHomeClick}
          />
        )}
        {view === "signin" && (
          <SignIn
            onSwitchToSignUp={() => setView("signup")}
            onBack={handleAuthBack}
          />
        )}
        {view === "signup" && (
          <SignUp
            onSwitchToSignIn={() => setView("signin")}
            onBack={handleAuthBack}
          />
        )}
        {view === "account" && (
          <Account onBack={handleHomeClick} />
        )}
      </main>
      <Footer />
    </div>
  );
}
