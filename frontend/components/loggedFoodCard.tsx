import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import FoodCard from './foodCard'
import { Link } from 'expo-router'

const LoggedFoodCard = ({id, food, quantity, date_consumed, calories_consumed}: LoggedFood) => {
  return (
    <TouchableOpacity className='w-[95%]'>
      <Link href={{pathname: "/logs/[id]", params: {id}}} asChild>
            <View>
              <Text className='text-xl text-bold text-white mt-2'><FoodCard {...food}/></Text> 
             <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text className='text-xl text-bold text-white mt-2'>kcal:{calories_consumed}</Text>  
              <Text className='text-xl text-bold text-white mt-2'>protein:{Math.round(food.protein*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>carbohydrates:{Math.round(food.carbohydrates*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>fats:{Math.round(food.fats*quantity)/100}</Text>                
             </View>                              
            </View>
              
              
            
      </Link>
    </TouchableOpacity>
  )
}

export default LoggedFoodCard