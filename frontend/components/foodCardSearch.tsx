import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCardSearch = ({id, name, brand, calories, protein, carbohydrates, fats}: Food) => {
  return (
    <Link href={`/foods/${id}`} asChild >
        <TouchableOpacity className='w-[100%] border-white/10 border-2 bg-dark-200 px-3 pb-3 mt-0.5 rounded-lg'>
            {/*<Image></Image>*/}
            <View className='w=[100%] justify-between'>
            
            <View style={{  justifyContent:'space-between', gap:10}}>
              <Text className='text-xl font-bold text-white mt-2' numberOfLines={1}>{name}{brand && `,${brand}`}</Text>
              <View className='flex-row items-end justify-between'>
                
                <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(calories)}kcal/100g</Text>
                <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(protein)}p,
                                                                          {Math.round(carbohydrates)}c,
                                                                          {Math.round(fats)}f</Text>
            </View>              
              
              

            </View>
          </View>
            
            
        </TouchableOpacity>
    </Link>
  )
}

export default FoodCardSearch