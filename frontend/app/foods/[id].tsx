import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchFoodDetails, TRACKER_CONFIG } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';

const FoodDetails = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: food, loading, refetch } = useFetch (() => fetchFoodDetails(id as string));
  const [quantity, setQuantity] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
        refetch();
    
        }, []);

  const handleSubmit = async () => {
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
    <SafeAreaProvider className='bg-primary flex-1'>
        
          {food ? (
              <SafeAreaView className='bg-primary flex-1'>
                <Image source={images.bgg}
                             className=" absolute w-full z-0" 
                            resizeMode="cover"
                      />
                <ScrollView contentContainerStyle={{paddingBottom:80}}>
                  <View className='flex-col items-center justify-center mt-5 px-5'>
                    <Text className='text-white font-bold text-6xl'>{food.name}</Text>
                    
                   <View className='py-16 w-[100%]' style={{ alignItems:'center', justifyContent:'center'}}>
                    <View className='flex-1 items-center'>
                      <Text className='text-white font-bold text-3xl py-8'>{Math.round(food.calories*quantity)/100} calories</Text>
                      
                        <Text className='text-white font-bold text-xl'>Protein: {Math.round(food.protein*quantity)/100}g</Text>
                        <Text className='text-white font-bold text-xl'>Carbs: {Math.round(food.carbohydrates*quantity)/100}g</Text>
                        <Text className='text-white font-bold text-xl'>Fats: {Math.round(food.fats*quantity)/100}g</Text>
                      
                    </View>
                    <View className='mt-16 w-[50%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                      <Text className='text-white'>Weight (g): </Text>
                      <TextInput className='w-[45%] text-white rounded-xl bg-blue-300 border-white/20 border-2 flex-end' 
                                 value={quantity}   
                                 onChangeText={setQuantity} 
                                 keyboardType='numeric' 
                                 placeholder={String(quantity)} 
                                 placeholderTextColor={'darkgrey'}
                                 style={{ textAlign: 'right', borderWidth: 1, padding: 10 }}/>
                      
                    </View>
                    <TouchableOpacity className='px-6 py-4 mt-16 justify-center items-center bg-blue-100 rounded-xl' onPress={()=>handleSubmit()}>
                              <Text className=' text-xl font-bold'>Add</Text>
                    </TouchableOpacity>
                   </View>
                  </View>
                  
          
                </ScrollView>
              </SafeAreaView>
              
                  
                  
                  )
          :(<Text className='text-white font-bold text-xl'>Unknown</Text>)}
          

        

      
    </SafeAreaProvider>
  )
}

export default FoodDetails