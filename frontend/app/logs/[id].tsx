import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchLogDetails, TRACKER_CONFIG } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import { images } from '@/constants/images';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const LogDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: log, loading, refetch } = useFetch (() => fetchLogDetails(id as string));
  const [quantity, setQuantity] = useState(log? (log.quantity):'');
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
    <SafeAreaProvider>
    <SafeAreaView className='bg-primary flex-1'>
      <Image source={images.bgg}
                   className=" absolute w-full z-0" 
                  resizeMode="cover"
            />
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View className='flex-col items-center justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-6xl'>{log?.food.name}</Text>
          
         <View className='py-16 w-[100%]' style={{ alignItems:'center', justifyContent:'center'}}>
          <View className='flex-1 items-center'>
            <Text className='text-white font-bold text-3xl py-8'>{Math.round(quantity>0 ? (log?.food.calories*quantity/100):(log?.calories_consumed))} calories</Text>
            
              <Text className='text-white font-bold text-xl'>Protein: {Math.round(quantity>0 ? (log?.food.protein*quantity):(log?.food.protein*log?.quantity))/100}g</Text>
              <Text className='text-white font-bold text-xl'>Carbs: {Math.round(quantity>0 ? (log?.food.carbohydrates*quantity):(log?.food.carbohydrates*log?.quantity))/100}g</Text>
              <Text className='text-white font-bold text-xl'>Fats: {Math.round(quantity>0 ? (log?.food.fats*quantity):(log?.food.fats*log?.quantity))/100}g</Text>
            
          </View>
          <View className='mt-16 w-[50%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text className='text-white'>Weight (g): </Text>
            <TextInput className='w-[45%] text-white rounded-xl bg-blue-300 border-white/20 border-2 flex-end' 
                       value={quantity}   
                       onChangeText={setQuantity} 
                       keyboardType='numeric' 
                       placeholder={String(log?.quantity)} 
                       placeholderTextColor={'darkgrey'}
                       style={{ textAlign: 'right', borderWidth: 1, padding: 10 }}/>
            
          </View>
          <TouchableOpacity className='px-6 py-4 mt-16 justify-center items-center bg-blue-100 rounded-xl' onPress={()=>handleSubmit()}>
                    <Text className=' text-xl font-bold'>Update</Text>
          </TouchableOpacity>
         </View>
        </View>
        

      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default LogDetails