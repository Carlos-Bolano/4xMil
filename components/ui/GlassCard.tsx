import { View, ViewProps } from 'react-native';

export function GlassCard({ className, ...props }: ViewProps) {
  return (
    <View
      className={`bg-white/70 border border-white/30 rounded-2xl shadow-xl ${className}`}
      {...props}
    />
  );
}
