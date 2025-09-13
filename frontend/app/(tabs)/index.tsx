import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ScrollView, ScrollViewBase, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchFoods, fetchLogs, login, TRACKER_CONFIG } from "@/services/api";
import { useEffect, useState } from "react";
import FoodCard from "@/components/foodCard";
import LoggedFoodCard from "@/components/loggedFoodCard";
import * as SecureStore from 'expo-secure-store';



export var loggedIn = false;

export default function Index() {
  

  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const {data: logsFood, loading:logsLoading, error:logsError, refetch} = useFetch(() =>fetchLogs(), false);

  const handleSubmit = async (e) => {
    console.log('pp')
    e.preventDefault();
    if (isLoading) {
      return
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.1.9:8000/account/login/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({username: username, password: password}),});
    
    if(!response.ok) {
      throw new Error(e);
    }
      const data = await response.json()
      console.log(data.tokens.access);
      await SecureStore.setItemAsync('accessToken', data.tokens.access);
      await SecureStore.setItemAsync('refreshToken', data.tokens.refresh);
      loggedIn = true;
      await refetch();
      
      
    } catch (error){
      
    } finally {
      setIsLoading(false);
    }
  }
  
  
  
  
  





  const router = useRouter();

  return (
    
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%', paddingBottom:10}}>

            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            {loggedIn? (<View>
              <Text className="text-white">123</Text>
              <>
                    <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Foods</Text>
                    <FlatList data={logsFood} 
                              renderItem={({item}) => (<LoggedFoodCard {...item}/>)}
                              keyExtractor={(item) =>item.id.toString()}
                              numColumns={2}
                              columnWrapperStyle={{justifyContent:'flex-start', gap:20, paddingRight:5, marginBottom:10}}
                              className="mt-2 pb-32"
                              scrollEnabled={false}
                    />
                    {logsFood && <Text className="text-white">{logsFood.length}</Text>}
                  </>
            
            
            
            
              </View>):(
              <View>
                <TextInput value={username} onChangeText={setUsername} className="flex-1 ml-2 text-white" placeholder="user"
                placeholderTextColor={'#ab8bff'}/>
                <TextInput value={password} onChangeText={setPassword} className="flex-1 ml-2 text-white" placeholder="pass"
                placeholderTextColor={'#ab8bff'}/>
                <Button title="submit" onPress={handleSubmit} />
              </View>
              )}
            

        </ScrollView>


    </View>
    
  );
}
