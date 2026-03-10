import { Redirect } from "expo-router";
import { useApp } from "../context/AppContext";

export default function Index() {
  const { isOnboardingCompleted } = useApp();

  // If loading logic was separate, we'd handle it here.
  // But AppProvider handles initial loading state.

  if (isOnboardingCompleted) {
    return <Redirect href="/(home)" />;
  }

  return <Redirect href="/(onboarding)" />;
}
