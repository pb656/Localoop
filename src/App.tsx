import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { CafeMap } from "./components/CafeMap";
import { ProductCatalogue } from "./components/ProductCatalogue";
import { Benefits } from "./components/Benefits";
import { Footer } from "./components/Footer";
import { LoopCreditsStore } from "./components/LoopCreditsStore";
import { LocaStoreCheckout } from "./components/LocaStoreCheckout";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { useAuth } from "./utils/AuthContext";

export default function App() {
  const { user } = useAuth();
  const [view, setView] = useState<'home' | 'store' | 'checkout' | 'signin' | 'signup'>("home");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pendingAfterAuth, setPendingAfterAuth] = useState<null | 'store' | 'checkout'>(null);

  const handleStoreClick = () => {
    if (!user) {
      setPendingAfterAuth("store");
      setView("signin");
    } else {
      setView("store");
    }
  };
  const handleHomeClick = () => setView("home");
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
      <Header onStoreClick={handleStoreClick} />
      <main>
        {view === "home" && (
          <>
            <Hero />
            <HowItWorks />
            <CafeMap />
            <ProductCatalogue />
            <Benefits />
          </>
        )}
        {view === "store" && (
          <LoopCreditsStore onBack={handleHomeClick} onBuyCredits={handleBuyCredits} />
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
      </main>
      <Footer />
    </div>
  );
}
