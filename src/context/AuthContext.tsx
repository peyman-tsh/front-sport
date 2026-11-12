'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { loginApi, registerApi, fetchProfileApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (fullName: string, phoneNumber: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('lumix_auth_token');
      const savedUser = localStorage.getItem('lumix_auth_user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Verify token in background
        fetchProfileApi(savedToken)
          .then((profile) => {
            setUser(profile);
            localStorage.setItem('lumix_auth_user', JSON.stringify(profile));
          })
          .catch(() => {
            // Token expired or invalid
            logout();
          });
      }
    } catch {
      // LocalStorage error or SSR hydration
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (phoneNumber: string, password: string) => {
    const result = await loginApi({ phoneNumber, password });
    const { user: loggedInUser, tokens } = result;

    setToken(tokens.accessToken);
    setUser(loggedInUser);

    localStorage.setItem('lumix_auth_token', tokens.accessToken);
    localStorage.setItem('lumix_refresh_token', tokens.refreshToken);
    localStorage.setItem('lumix_auth_user', JSON.stringify(loggedInUser));

    // Also set cookie for SSR
    document.cookie = `lumix_token=${tokens.accessToken}; path=/; max-age=86400; SameSite=Lax`;

    closeAuthModal();
  };

  const register = async (
    fullName: string,
    phoneNumber: string,
    password: string,
    email?: string,
  ) => {
    const result = await registerApi({ fullName, phoneNumber, password, email });
    const { user: registeredUser, tokens } = result;

    setToken(tokens.accessToken);
    setUser(registeredUser);

    localStorage.setItem('lumix_auth_token', tokens.accessToken);
    localStorage.setItem('lumix_refresh_token', tokens.refreshToken);
    localStorage.setItem('lumix_auth_user', JSON.stringify(registeredUser));

    document.cookie = `lumix_token=${tokens.accessToken}; path=/; max-age=86400; SameSite=Lax`;

    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lumix_auth_token');
    localStorage.removeItem('lumix_refresh_token');
    localStorage.removeItem('lumix_auth_user');
    document.cookie = 'lumix_token=; path=/; max-age=0; SameSite=Lax';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
