import { View, Text } from 'react-native'
import React from 'react'

const RunningAverage = ({date:string, average_calories}: RunningAverageStat) => {
  return (
    <View>
      <Text className='text-white'>Average Calories for the past week:{average_calories}</Text>
    </View>
  )
}

export default RunningAverage