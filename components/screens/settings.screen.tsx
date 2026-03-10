import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsLink, SettingsSection, SettingsSwitch } from "../../components/ui/SettingsComponents";
import { useApp } from "../../context/AppContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { userName, theme, toggleTheme, language, setLanguage } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        className="flex-1 bg-background-light dark:bg-background-dark"
      >
        {/* Background Accents */}
        <View
          className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full"
          style={{ opacity: 0.5 }}
        />
        <View
          className="absolute bottom-[20%] right-[-10%] w-80 h-80 bg-primary/5 rounded-full"
          style={{ opacity: 0.5 }}
        />

        {/* Header */}
        <View className="flex-row items-center gap-4 mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 dark:bg-slate-800/70 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <MaterialIcons name="arrow-back" size={24} color="#64748b" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Settings
          </Text>
        </View>

        {/* Profile Section */}
        <SettingsSection title="Profile">
          <SettingsLink
            icon="account-circle"
            label="Change Name"
            value={userName || "Set Name"}
            onPress={() =>
              router.push({ pathname: "/(onboarding)/NameInputScreen", params: { name: userName } })
            }
          />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Appearance">
          <SettingsSwitch
            icon="dark-mode"
            label="Dark Mode"
            value={theme === "dark"}
            onValueChange={toggleTheme}
          />
        </SettingsSection>

        {/* Language Section */}
        <SettingsSection title="Language">
          <SettingsLink
            icon="language"
            label="App Language"
            value={language}
            onPress={() => setLanguage(language === "English" ? "Spanish" : "English")}
          />
        </SettingsSection>

        {/* Version Info */}
        <View className="items-center pb-8 mt-4">
          <Text className="text-xs text-slate-400 font-medium">4xMil v2.4.0 Build 102</Text>
          <Text className="text-[10px] text-slate-400/60 mt-1 uppercase tracking-widest">
            Fintech Excellence
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
