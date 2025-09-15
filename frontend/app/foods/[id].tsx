import { View, Text, ScrollView, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchFoodDetails, TRACKER_CONFIG } from '@/services/api';
import * as SecureStore from 'expo-secure-store';

const FoodDetails = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: food, loading, refetch } = useFetch (() => fetchFoodDetails(id as string));
  const [quantity, setQuantity] = useState('100');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
        refetch();
    
        }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoading){
      return
    }
    try {
      setIsLoading(true);
      const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/add/`;
      const token = await SecureStore.getItemAsync('accessToken');
      console.log(id)
      const response = await fetch(endpoint,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
        body: JSON.stringify({food:id, quantity: quantity})
      })
      if (!response.ok){
        throw new Error('Failed to add food');
      }
        
    }catch (error) {
      throw (error)
    } finally {
      setIsLoading(false);
      router.push('/');
    }
  }



   
  return (
    <View className='bg-primary flex-1'>
        
          {food ? (<View className='flex-col items-start justify-center mt-5 px-5'>
                      <Text className='text-white font-bold text-xl'>{food.name}</Text>
                      <TextInput className='text-white' 
                                 value={quantity} 
                                 onChangeText={setQuantity} 
                                 keyboardType='numeric'
                                 placeholder={quantity}
                                 placeholderTextColor={'#ab8bff'}/>
                        <Text className='text-white font-bold text-'>{Math.round(food.calories*parseFloat(quantity))/100}calories</Text>
                      <Button title='Add' onPress={handleSubmit}/>
                   </View>
                  
                  
                  )
          :(<Text className='text-white font-bold text-xl'>Unknown</Text>)}
          

        

      
    </View>
  )
}

export default FoodDetails