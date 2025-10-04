import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCard = ({food_data, quantity}:FoodCardProp) => {
  
  return (
    
          <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text className='text-l font-bold text-white' numberOfLines={1}>{food_data.name}</Text>
            <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(food_data.protein/100)*quantity}p,
                                                                          {Math.round(food_data.carbohydrates/100)*quantity}c,
                                                                          {Math.round(food_data.fats/100)*quantity}f</Text>
            
            
          </View>
        
  )
}

export default FoodCard