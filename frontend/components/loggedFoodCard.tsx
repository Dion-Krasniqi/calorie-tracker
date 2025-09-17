import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import FoodCard from './foodCard'
import { Link } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import { TRACKER_CONFIG } from '@/services/api';



//@ts-ignore
const LoggedFoodCard = ({id, food, quantity, date_consumed, calories_consumed, updateView}) => {
  const handleDelete = async (id:string) => {
      
      
      try { //@ts-ignore
            const endpoint = `caloriebalance/api/logs/${id}/`;
            const token = await SecureStore.getItemAsync('accessToken');
            const response = await fetch(endpoint, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            if (!response.ok){
              throw new Error('Failed to update quantity');
            }
            updateView();
          
      } catch (error){
        console.log(error);
      } finally {
        
      }
    }

  return (
    <View>
      <Link href={`/logs/${id}`} asChild>
        <TouchableOpacity className='w-[95%]'>
            <View>
              <Text className='text-xl text-bold text-white mt-2'><FoodCard {...food}/></Text> 
             <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text className='text-xl text-bold text-white mt-2'>kcal:{calories_consumed}</Text>  
              <Text className='text-xl text-bold text-white mt-2'>protein:{Math.round(food.protein*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>carbohydrates:{Math.round(food.carbohydrates*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>fats:{Math.round(food.fats*quantity)/100}</Text>                
             </View>                              
            </View>
              
              
        </TouchableOpacity>
      </Link>
      <Button title='d' onPress={()=>handleDelete(id)}/ >
    </View>
    
  )
}

export default LoggedFoodCard