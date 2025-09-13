import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchFoodDetails } from '@/services/api';

const LogDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: logs, loading } = useFetch (() => fetchFoodDetails(id as string));
   
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{logs?.name}</Text>
        </View>

      </ScrollView>
    </View>
  )
}

export default LogDetails