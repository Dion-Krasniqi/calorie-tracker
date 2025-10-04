import { View, Text, FlatList, TouchableOpacity, Button, Pressable } from 'react-native'
import React from 'react';
import FoodCard from './foodCard';
import { Link } from 'expo-router';
import { deleteLogDetails} from '@/services/api';
import { useLogStore } from '@/state/keepState';



//@ts-ignore
const LoggedFoodCard = ({id, food, quantity, date_consumed, calories_consumed, updateView}) => {
  //const deleteLog = useLogStore((state)=>state.deleteLog) Zustand
  const handleDelete = async (id:string) => {
   try {
        await deleteLogDetails(Number(id));
        updateView();
   }catch (error){
        console.log(error);
  }}


  return (
    <View className='justify-between bg-blue-300 rounded-lg mt-0.5 overflow-hidden' style={{flexDirection:'row'}}>
      <Link href={`/logs/${id}`} asChild>
        <TouchableOpacity className='w-[92%] p-2'>
            <View>
              <Text><FoodCard food_data={food} quantity={quantity} /></Text> 
              <View className='py-1 w-[100%]' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}> 
                <Text className='text-l text-light-300 mt-2'>{Math.round(quantity)} grams</Text> 
                <Text className='text-lg text-white mt-2'>{Math.round(calories_consumed)} kcal</Text>  
              {/*<Text className='text-xl text-bold text-white mt-2'>protein:{Math.round(food.protein*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>carbohydrates:{Math.round(food.carbohydrates*quantity)/100}</Text> 
              <Text className='text-xl text-bold text-white mt-2'>fats:{Math.round(food.fats*quantity)/100}</Text>    */}            
             </View>                              
            </View>
              
              
        </TouchableOpacity>
      </Link>
      {/*<Button title='X' onPress={()=>handleDelete(id)}/ >*/}
        <TouchableOpacity className='w-[8%] justify-center items-center bg-dark-300 ' onPress={()=>handleDelete(id)}>
          <Text className='text-white font-bold'>X</Text>
        </TouchableOpacity>
    </View>
    
  )
}

export default LoggedFoodCard