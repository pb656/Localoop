import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./supabase/info";

interface User {
  id: string;
  email: string;
  name: string;
  loopCredits: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  // Add credits to the user's account (persist on server)
  addCredits: (amount: number, packageId?: number | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string, accessToken: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab8570d3/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user && session?.access_token) {
      await fetchUserData(session.user.id, session.access_token);
    }
  };

  const addCredits = async (amount: number, packageId?: number | null) => {
    // Optimistic update while we persist
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, loopCredits: (prev.loopCredits || 0) + amount };
    });

    try {
      // Get session to send access token if available
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id || (user && user.id);
      const accessToken = session?.access_token;

      if (!userId) {
        throw new Error("No authenticated user to add credits for");
      }

      const resp = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab8570d3/purchase-credits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ userId, credits: amount, packageId: packageId ?? null }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || `Failed to persist credits: ${resp.status}`);
      }

      const data = await resp.json();
      // server returns newBalance
      if (data?.newBalance !== undefined) {
        setUser((prev) => (prev ? { ...prev, loopCredits: data.newBalance } : prev));
      } else {
        // if server didn't return balance, refresh user data
        await refreshUser();
      }
    } catch (e) {
      // If persistence fails, keep optimistic update and log the error
      console.warn("Failed to persist credits to server", e);
    }
  };

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && session?.access_token) {
        fetchUserData(session.user.id, session.access_token);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && session?.access_token) {
        fetchUserData(session.user.id, session.access_token);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (session?.user && session?.access_token) {
      await fetchUserData(session.user.id, session.access_token);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ab8570d3/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign up failed");
    }

    // Sign in after successful signup
    await signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, refreshUser, addCredits }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
