import i18n, { defaultLanguage, type SupportedLanguage } from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Animated, Platform, Text, View } from "react-native";

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
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastOpacity = React.useRef(new Animated.Value(0)).current;
  const toastTranslateY = React.useRef(new Animated.Value(8)).current;
  const toastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = null;
      }

      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();

      toastTimeoutRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(toastTranslateY, {
            toValue: 8,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) setToastMessage(null);
        });
      }, 1600);
    },
    [toastOpacity, toastTranslateY],
  );

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return null; // Or a splash screen
  }

  const isDark = colorScheme === "dark";

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
        showToast,
      }}
    >
      {children}
      {toastMessage ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: Platform.OS === "ios" ? 44 : 40,
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
              borderWidth: 1,
              borderColor: isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(15, 23, 42, 0.12)",
              borderRadius: 14,
              paddingVertical: 10,
              paddingHorizontal: 14,
              maxWidth: 420,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: isDark ? "#fff" : "#0f172a",
                fontSize: 13,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {toastMessage}
            </Text>
          </Animated.View>
        </View>
      ) : null}
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
