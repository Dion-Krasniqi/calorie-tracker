import { View, Text } from 'react-native'
import React from 'react'

const LoggedFoodCard = ({id, food, quantity, date_consumed, calories_consumed}: LoggedFood) => {
  return (
    <View>
      <Text className='text-xl text-bold text-white mt-2'>{quantity}</Text> 
    </View>
  )
}

export default LoggedFoodCard