import { View, Text } from 'react-native';

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({ title, leftIcon, rightAction, className }: HeaderProps) {
  return (
    <View className={`flex-row items-center justify-between w-full mb-8 ${className}`}>
      <View className="flex-1 items-start">{leftIcon}</View>
      {title && (
        <Text className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
          {title}
        </Text>
      )}
      <View className="flex-1 items-end">{rightAction}</View>
    </View>
  );
}
