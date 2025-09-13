import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="foods/[id]"
      options={{ headerShown: true}}
    />
    <Stack.Screen
      name="logs/[id]"
      options={{ headerShown: true }}
    />
  </Stack>;
}
