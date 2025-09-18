import { View, Text, ScrollView, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchLogDetails, TRACKER_CONFIG } from '@/services/api';
import * as SecureStore from 'expo-secure-store';


const LogDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: log, loading, refetch } = useFetch (() => fetchLogDetails(id as string));
  const [quantity, setQuantity] = useState(log? String(log.quantity):'');
  const [isLoading, setLoading] = useState(false);
   
  useEffect(() =>{
      refetch();
  
      }, []);

  const router = useRouter();

  const handleSubmit = async () => {
      if (isLoading) {
        return
      }
      setLoading(true);
      try { //@ts-ignore
            const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/logs/${log.id}/`;
            const token = await SecureStore.getItemAsync('accessToken');
            const response = await fetch(endpoint, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({quantity: quantity}),
            });
            if (!response.ok){
              throw new Error('Failed to update quantity');
            }
            
          
      } catch (error){
        
      } finally {
        setLoading(false);
        router.push('/');
        
      }
    }


  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{log?.food.name}</Text>
          <Text className='text-white font-bold text-xl'>{log?.calories_consumed}</Text>
         <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <TextInput className='text-white' value={quantity} onChangeText={setQuantity} keyboardType='numeric' placeholder={String(log?.quantity)} placeholderTextColor={'#ab8bff'}/>
          <Text className='text-white'>Grams</Text>
          <Button title="submit" onPress={handleSubmit} />
         </View>
        </View>
        

      </ScrollView>
    </View>
  )
}

export default LogDetails