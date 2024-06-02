import React, { createContext, useState, ReactNode, useEffect } from "react";
import { auth } from "./auth.tsx";

interface AuthContextType {
  authenticated: boolean | null;
  email: string | null;
  role: string | null;
  userId: string | null;
  signIn: (
    email: string,
    password: string,
    callback: () => void,
    onFailure: (message: string) => void
  ) => Promise<void>;
  signOut: (callback: () => void) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const signIn = async (
    email: string,
    password: string,
    callback: () => void,
    onFailure: (message: string) => void
  ): Promise<void> => {
    return auth.signIn(
      email,
      password,
      ({ userId }: { userId: string }) => {
        setEmail(email);
        setRole(auth.role);
        setUserId(userId);
        setAuthenticated(true);
        callback();
      },
      onFailure
    );
  };

  const signOut = async (callback: () => void): Promise<void> => {
    return auth.signOut(() => {
      setEmail(null);
      setRole(null);
      setUserId(null);
      callback();
    });
  };

  const initializeAuthentication = async () => {
    try {
      await auth.authenticateFromCookie();
      setEmail(auth.email);
      setRole(auth.role);
      setUserId(auth.userId);
      setAuthenticated(auth.isAuthenticated);
    } catch (error) {
      console.error("Error initializing authentication:", error);
    }
  };

  useEffect(() => {
    initializeAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        email,
        role,
        userId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
