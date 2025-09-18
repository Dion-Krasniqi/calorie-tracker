import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="login"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="otherPages"
      options={{ title:'',headerShown: false, headerStyle:{backgroundColor: '#000000',}, headerTintColor: '#ab8bff',}}
    />
    <Stack.Screen
      name="foods/[id]"
      options={{ headerShown: false}}
    />
    <Stack.Screen
      name="logs/[id]"
      options={{ headerShown: false }}
    />
  </Stack>;
}
