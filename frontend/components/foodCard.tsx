import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCard = ({id, name, brand, calories, protein, carbohydrates, fats}: Food) => {
  return (
    
          <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text className='text-l text-bold text-white' numberOfLines={1}>{name}{brand}</Text>
            <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(protein)}p,
                                                                          {Math.round(carbohydrates)}c,
                                                                          {Math.round(fats)}f</Text>
            
          </View>
        
  )
}

export default FoodCard