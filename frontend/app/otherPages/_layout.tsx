import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'




const _layout = () => {
 return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="search" />

      <Stack.Screen name="quickTrack" />
      
    </Stack>
  );
}

export default _layout