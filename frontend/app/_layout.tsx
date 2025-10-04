import { Stack } from "expo-router";
import './globals.css';
import { useLogStore, useProfileStore } from "@/state/keepState";
import { useEffect } from "react";

export default function RootLayout() {
  const loadLogs = useLogStore((state)=>state.loadFoodLogs);
  const loadInfo = useProfileStore((state)=>state.loadProfileInfo);

  useEffect(()=>{
    loadLogs();
    loadInfo();

  },[])
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
