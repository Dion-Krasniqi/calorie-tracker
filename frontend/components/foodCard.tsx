import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCard = ({id, name, brand, calories, protein, carbohydrates, fats}: Food) => {
  return (
    
          <View>
            <Text className='text-sm text-bold text-white mt-2' numberOfLines={1}>{name}</Text>
            <Text className='text-xs text-white font-bold'>{brand}</Text>
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(protein)}p,
                                                                          {Math.round(carbohydrates)}c,
                                                                          {Math.round(fats)}f</Text>
            </View>
          </View>
        
  )
}

export default FoodCard