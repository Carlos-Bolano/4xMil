import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  textClassName?: string;
}

export function PrimaryButton({ title, className, textClassName, children, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-primary w-full py-4 px-6 rounded-xl shadow-lg shadow-primary/25 flex-row items-center justify-center active:opacity-90 gap-2 ${className}`}
      {...props}
    >
      <Text className={`text-white font-bold text-lg ${textClassName}`}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}
