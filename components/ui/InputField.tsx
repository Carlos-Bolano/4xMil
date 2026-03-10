import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  labelClassName?: string;
  leftPrefix?: string;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export function InputField({
  label,
  labelClassName,
  leftPrefix,
  rightIcon,
  containerClassName,
  className,
  ...props
}: InputFieldProps) {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text
          className={`block mb-2 ml-1 ${labelClassName || "text-sm font-medium text-slate-600 dark:text-slate-400"}`}
        >
          {label}
        </Text>
      )}
      <View className="relative justify-center h-14">
        {leftPrefix && (
          <Text className="absolute left-4 z-10 text-slate-400 font-medium text-lg top-3.5">
            {leftPrefix}
          </Text>
        )}
        <TextInput
          className={`w-full h-full rounded-xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 pr-12 text-lg font-semibold placeholder:text-slate-400 ${leftPrefix ? "pl-8" : "px-5"} ${className}`}
          placeholderTextColor="#94a3b8"
          {...props}
        />
        {rightIcon && <View className="absolute right-4 top-3.5">{rightIcon}</View>}
      </View>
    </View>
  );
}
