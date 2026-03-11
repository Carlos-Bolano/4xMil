import { Stack } from "expo-router";

export default function InformationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="info" />
    </Stack>
  );
}
