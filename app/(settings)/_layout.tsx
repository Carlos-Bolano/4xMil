import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
        name="index"
      />
    </Stack>
  );
}
