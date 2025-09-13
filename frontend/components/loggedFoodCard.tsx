import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import FoodCard from './foodCard'
import { Link } from 'expo-router'

const LoggedFoodCard = ({id, food, quantity, date_consumed, calories_consumed}: LoggedFood) => {
  return (
    <Link href={{pathname: "/logs/[id]", params: {id}}} asChild>
            <TouchableOpacity className='w-[30%]'>
              <Text className='text-xl text-bold text-white mt-2'><FoodCard {...food}/>{calories_consumed}</Text> 
            </TouchableOpacity>
    </Link>
  )
}

export default LoggedFoodCard