import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import { GlassCard } from "../ui/GlassCard";
import { InputField } from "../ui/InputField";
import { PrimaryButton } from "../ui/PrimaryButton";

export default function NameInputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialName = Array.isArray(params.name) ? params.name[0] : params.name;

  const { setUserName, completeOnboarding, t } = useApp();

  const [name, setName] = useState(initialName || "");

  const handleContinue = async () => {
    if (name.trim().length === 0) {
      Alert.alert(t("nameInput.requiredTitle"), t("nameInput.requiredMessage"));
      return;
    }

    await setUserName(name);
    await completeOnboarding();
    router.replace("/(home)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 16 }}
      >
        {/* Background Accents */}
        <View
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full"
          style={{ opacity: 0.5 }}
        />
        <View
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full"
          style={{ opacity: 0.5 }}
        />

        <View className="w-full max-w-md flex-col items-center">
          {/* Header Area */}
          <View className="flex-row items-center justify-between w-full mb-12 px-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 shrink-0 items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm"
            >
              <MaterialIcons name="arrow-back" size={24} color="#64748b" />
            </TouchableOpacity>
            <Text className="text-primary font-bold text-2xl tracking-tight">4xMil</Text>
            <View className="w-10 h-10" />
          </View>

          <GlassCard className="w-full rounded-xl p-8 shadow-2xl shadow-primary/10 bg-white/70">
            <View className="flex-col gap-8">
              {/* Title Section */}
              <View className="items-center">
                <Text className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight text-center">
                  {t("nameInput.title")}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm text-center mt-2">
                  {t("nameInput.subtitle")}
                </Text>
              </View>

              {/* Input Field Section */}
              <View className="relative group w-full">
                <InputField
                  label={t("nameInput.inputLabel")}
                  labelClassName="text-xs font-semibold text-primary uppercase tracking-wider mb-2 ml-1"
                  placeholder={t("nameInput.placeholder")}
                  rightIcon={<MaterialIcons name="person" size={24} color="#94a3b8" />}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* CTA Button */}
              <View className="pt-4 w-full">
                <PrimaryButton title={t("nameInput.continue")} onPress={handleContinue}>
                  <MaterialIcons name="arrow-forward" size={20} color="white" />
                </PrimaryButton>
              </View>
            </View>
          </GlassCard>

          {/* Decorative Footer Element */}
          <View className="mt-12 flex-row items-center gap-2">
            <View className="h-1.5 w-8 rounded-full bg-primary" />
            <View className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            <View className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            <View className="h-1.5 w-1.5 rounded-full bg-primary/30" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
