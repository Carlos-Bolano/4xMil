import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassCard } from "../../components/ui/GlassCard";
import { PrimaryButton } from "../../components/ui/PrimaryButton";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 16 }}
      >
        {/* Background Accents */}
        <View
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full"
          style={{ opacity: 0.5 }}
        />
        <View
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full"
          style={{ opacity: 0.5 }}
        />

        <GlassCard className="w-full max-w-md p-8 flex-col items-center bg-white/90 dark:bg-slate-800/90 shadow-none border-0">
          {/* Logo Placeholder - Matches '4%' logo in design */}
          <View className="mb-12">
            <Text className="text-primary text-5xl font-black italic tracking-tighter">4%</Text>
          </View>

          {/* Illustration Area */}
          <View className="w-64 h-64 bg-primary/10 rounded-3xl mb-12 items-center justify-center relative overflow-hidden">
            {/* Mocking the bill/calculator graphic */}
            <MaterialIcons name="payments" size={80} color="#2e69ff" />
            <View className="absolute bottom-8 right-8 bg-primary p-3 rounded-xl shadow-lg">
              <View className="w-8 h-1 bg-white/50 rounded-full" />
            </View>
            <View className="absolute top-8 left-8 bg-white p-3 rounded-xl shadow-sm">
              <View className="w-8 h-1 bg-primary/20 rounded-full" />
            </View>
          </View>

          {/* Content */}
          <View className="items-center mb-12">
            <Text className="text-slate-900 dark:text-slate-100 text-[28px] font-bold leading-tight text-center px-2">
              Calculate the{"\n"}4×1000 in seconds
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-4 px-4">
              Enter any amount of money and instantly see how much the 4×1000 tax will be.
            </Text>
          </View>

          {/* Action Button */}
          <PrimaryButton title="Continue" onPress={() => router.push("/(onboarding)/NameInputScreen")}>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </PrimaryButton>

          <Text className="mt-8 text-slate-300 text-[10px] font-medium uppercase tracking-widest">
            Safe • Secure • Accurate
          </Text>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
