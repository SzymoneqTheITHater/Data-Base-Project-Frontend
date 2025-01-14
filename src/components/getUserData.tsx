"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  accessToken: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getUserFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

  if (cookie) {
    try {
      const decodedCookie = decodeURIComponent(cookie);
      return JSON.parse(decodedCookie);
    } catch (e) {
      console.error("Error decoding user data from cookie", e);
      return null;
    }
  }

  return null;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const userFromCookies = getUserFromCookies();

    if (userFromCookies) {
      setUser(userFromCookies);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (token) {
        setAccessToken(decodeURIComponent(token));
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, accessToken, setUser, setAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
