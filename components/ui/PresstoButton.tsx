import { PressableScale } from "pressto";
import { ComponentProps } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";

type PresstoButtonProps = ComponentProps<typeof PressableScale> & {
  title: string;
  textClassName?: string;
  style?: ViewStyle;
  className?: string;
  children?: React.ReactNode;
};

export function PresstoButton(properties: PresstoButtonProps) {
  const { title, className, textClassName, children, style, ...props } = properties;
  return (
    <PressableScale style={[styles.button, style]} {...props}>
      <Text className={`text-white font-bold  ${textClassName}`}>{title}</Text>
      {children}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2e69ff", // bg-primary
    width: "100%", // w-full
    paddingVertical: 14, // py-4
    paddingHorizontal: 24, // px-6
    borderRadius: 24, // rounded-xl (1.5rem)
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
    justifyContent: "center", // justify-center
    gap: 8, // gap-2
    // Shadow styles (shadow-lg shadow-primary/25)
    shadowColor: "#2e69ff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5, // Android fallback
  },
});
