import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCardSearch = ({id, name, brand, calories, protein, carbohydrates, fats}: Food) => {
  return (
    <Link href={`/foods/${id}`} asChild >
        <TouchableOpacity className='w-[95%] border-white/10 border-1.2 bg-dark-200 rounded-l'>
            {/*<Image></Image>*/}
            <Text className='text-xl font-bold text-white mt-2' numberOfLines={1}>{name},{brand}</Text>
            <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between'}}>
              <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(protein)}p,
                                                                          {Math.round(carbohydrates)}c,
                                                                          {Math.round(fats)}f</Text>
            </View>              
              <Text className='text-xs text-white font-medium'>{Math.round(calories)}kcal per 100g</Text>
              

            </View>
            
            
        </TouchableOpacity>
    </Link>
  )
}

export default FoodCardSearch