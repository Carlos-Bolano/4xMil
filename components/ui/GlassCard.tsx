import { View, ViewProps } from "react-native";

export function GlassCard({ className, ...props }: ViewProps) {
  return (
    <View
      className={`bg-white/70 border border-white/30 dark:bg-slate-800 dark:border-slate-700 rounded-2xl shadow-xl ${className}`}
      {...props}
    />
  );
}
