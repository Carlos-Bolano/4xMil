import i18n, { defaultLanguage, type SupportedLanguage } from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AppContextType {
  userName: string | null;
  setUserName: (name: string) => Promise<void>;
  isOnboardingCompleted: boolean;
  completeOnboarding: () => Promise<void>;
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      const storedOnboarding = await AsyncStorage.getItem("isOnboardingCompleted");
      const storedLanguage = await AsyncStorage.getItem("language");

      if (storedName) setUserNameState(storedName);
      if (storedOnboarding === "true") setIsOnboardingCompleted(true);
      const normalizedLanguage = normalizeLanguage(storedLanguage);
      const languageToUse = normalizedLanguage ?? defaultLanguage;
      setLanguage(languageToUse);
    } catch (e) {
      console.error("Failed to load storage data", e);
    } finally {
      setLoading(false);
    }
  };

  const setUserName = async (name: string) => {
    try {
      await AsyncStorage.setItem("userName", name);
      setUserNameState(name);
    } catch (e) {
      console.error("Failed to save user name", e);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("isOnboardingCompleted", "true");
      setIsOnboardingCompleted(true);
    } catch (e) {
      console.error("Failed to complete onboarding", e);
    }
  };

  const toggleTheme = () => {
    toggleColorScheme();
  };

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    void AsyncStorage.setItem("language", lang).catch((e) => {
      console.error("Failed to save language", e);
    });
  };

  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => i18n.t(key, { ...options, locale: language }),
    [language],
  );

  if (loading) {
    return null; // Or a splash screen
  }

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        isOnboardingCompleted,
        completeOnboarding,
        theme: colorScheme as "light" | "dark",
        toggleTheme,
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

function normalizeLanguage(value: string | null): SupportedLanguage | null {
  if (!value) return null;
  if (value === "en" || value === "es") return value;
  if (value === "English") return "en";
  if (value === "Spanish") return "es";
  const lower = value.toLowerCase();
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("es")) return "es";
  return null;
}
