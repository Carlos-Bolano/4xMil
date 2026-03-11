import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PressablesConfig } from "pressto";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "../context/AppContext";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <PressablesConfig animationType="spring" config={{ activeOpacity: 0.8, minScale: 0.96 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(settings)"
              options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom",
                animationDuration: 500,
              }}
            />
            <Stack.Screen
              name="(information)"
              options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom",
                animationDuration: 500,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </PressablesConfig>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
