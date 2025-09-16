import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'




const _layout = () => {
  return (
       <Tabs>
        <Tabs.Screen
            name="search"
            options={{title:'search',headerShown:false, tabBarStyle:{display:'none'} }}
        />
       </Tabs>  
        
    
  )
}

export default _layout