import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { changeLog, fetchLogDetails } from '@/services/api';


const LogDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: log, loading, refetch } = useFetch (() => fetchLogDetails(id as string));
  const [quantity, setQuantity] = useState(log? log.quantity:0);
  const [isLoading, setLoading] = useState(false);
   
  useEffect(() =>{
      refetch();
  
      }, []);



  const handleSubmit = async (e) => {
      console.log('pp')
      e.preventDefault();
      if (isLoading) {
        return
      }
      setLoading(true);
      try {
        const response = await changeLog();
      
      if(!response.ok) {
        throw new Error(e);
      }
        const data = await response.json()
        
        
        
        
      } catch (error){
        
      } finally {
        setLoading(false);
      }
    }


  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{log?.food.name}</Text>
          <Text className='text-white font-bold text-xl'>{log?.calories_consumed}</Text>
         <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <TextInput className='text-white' keyboardType='numeric' placeholder={String(log?.quantity)} placeholderTextColor={'#ab8bff'}/>
          <Text className='text-white'>Grams</Text>
         </View>
        </View>
        

      </ScrollView>
    </View>
  )
}

export default LogDetails