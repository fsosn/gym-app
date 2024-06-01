import React, { createContext, useState, ReactNode } from "react";
import { auth } from "./auth.tsx";

interface AuthContextType {
  user: string | null;
  role: string | null;
  userId: string | null;
  token: string | null;
  signIn: (
    email: string,
    password: string,
    callback: () => void
  ) => Promise<void>;
  signOut: (callback: () => void) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (
    email: string,
    password: string,
    callback: () => void
  ): Promise<void> => {
    return auth.signIn(
      email,
      password,
      ({ userId, token }: { userId: string; token: string }) => {
        setEmail(email);
        setRole(auth.role);
        setUserId(userId);
        setToken(token);
        callback();
      }
    );
  };

  const signOut = async (callback: () => void): Promise<void> => {
    return auth.signOut(() => {
      setEmail(null);
      setRole(null);
      setUserId(null);
      setToken(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: email, role, userId, token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
