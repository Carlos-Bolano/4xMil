import { MaterialIcons } from "@expo/vector-icons";
import { PressableScale } from "pressto";
import React from "react";
import { Switch, Text, View } from "react-native";
import { GlassCard } from "./GlassCard";

export function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-6 ">
      <Text className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 px-1">
        {title}
      </Text>
      <GlassCard className="rounded-xl overflow-hidden shadow-sm bg-white/70 p-0">{children}</GlassCard>
    </View>
  );
}

export function SettingsLink({
  icon,
  label,
  value,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <PressableScale onPress={onPress}>
      <View className="flex-row items-center bg-white/80 dark:bg-slate-800 gap-4 p-4 ">
        <View className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          <MaterialIcons name={icon} size={28} color="#2e69ff" />
        </View>
        <View className="flex-1 ">
          <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</Text>
          <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">{value}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
      </View>
    </PressableScale>
  );
}

export function SettingsSwitch({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between bg-white/80 dark:bg-slate-800 p-4">
      <View className="flex-row items-center gap-4">
        <View className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          <MaterialIcons name={icon} size={24} color="#2e69ff" />
        </View>
        <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e2e8f0", true: "#2e69ff" }}
        thumbColor={"#ffffff"}
      />
    </View>
  );
}
