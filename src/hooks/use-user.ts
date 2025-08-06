
"use client";

import { useState, useEffect, useCallback } from 'react';

type User = {
  name: string;
  email: string;
  nameLastUpdatedAt: string | null;
};

const USER_STORAGE_KEY = 'resuMasterUser';

export function useUser() {
  const [user, setUser] = useState<User>({ name: '', email: '', nameLastUpdatedAt: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const updateUser = useCallback((newDetails: Partial<User>) => {
    const updatedUser = { ...user, ...newDetails };
    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser({ name: '', email: '', nameLastUpdatedAt: null });
  }, []);

  return { user, updateUser, logout, isLoaded };
}
