import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const FoodCardSearch = ({id, name, brand, calories, protein, carbohydrates, fats}: Food) => {
  return (
    <Link href={{pathname: "/foods/[id]", params: {id}}} asChild>
        <TouchableOpacity className='w-[30%]'>
            {/*<Image></Image>*/}
            <Text className='text-xl text-bold text-white mt-2' numberOfLines={1}>{name},{brand}</Text>
            <Text className='text-xs text-white font-bold'>{Math.round(calories)}kcal per 100g</Text>
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>{Math.round(protein)}p,
                                                                          {Math.round(carbohydrates)}c,
                                                                          {Math.round(fats)}f</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default FoodCardSearch