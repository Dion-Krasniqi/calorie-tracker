import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchFoodDetails } from '@/services/api';

const FoodDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: food, loading } = useFetch (() => fetchFoodDetails(id as string));
   
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>pp</Text>
        </View>

      </ScrollView>
    </View>
  )
}

export default FoodDetails