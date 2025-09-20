import { View, Text } from 'react-native'
import React from 'react'

const RunningAverage = ({date:string , average_calories}: RunningAverageStat) => {
  return (
    <View className='items-center justify-center gap-5'>
      <Text className='text-white 
                       font-bold
                       text-xl'>Average Calories for the past week:</Text>
      <Text className='text-white 
                       font-bold
                       text-xl'>{average_calories}</Text>
    </View>
  )
}

export default RunningAverage