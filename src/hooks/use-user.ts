
"use client";

import { useState, useEffect, useCallback } from 'react';

type User = {
  name: string;
  email: string;
  nameLastUpdatedAt: string | null;
  employmentStatus?: 'student' | 'fresher' | 'employed';
  isAuthenticated: boolean;
  credits: number;
};

const USER_STORAGE_KEY = 'resuMasterUser';

const defaultUser: User = {
  name: '',
  email: '',
  nameLastUpdatedAt: null,
  employmentStatus: undefined,
  isAuthenticated: false,
  credits: 10,
};

export function useUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Ensure isAuthenticated flag exists for older saved users
        if (parsedUser.isAuthenticated === undefined) {
          parsedUser.isAuthenticated = !!parsedUser.name;
        }
        if (parsedUser.credits === undefined) {
          parsedUser.credits = 10;
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const updateUser = useCallback((newDetails: Partial<User>) => {
    // When updating, we merge with the current state to preserve existing fields
    setUser(currentUser => {
        const updatedUser = { ...currentUser, ...newDetails };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        return updatedUser;
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(defaultUser);
  }, []);

  return { user, updateUser, logout, isLoaded, isAuthenticated: user.isAuthenticated };
}
