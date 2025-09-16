import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ScrollView, ScrollViewBase, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchFoods, fetchLogs, fetchProfile, TRACKER_CONFIG } from "@/services/api";
import { useEffect, useState } from "react";
import FoodCard from "@/components/foodCard";
import LoggedFoodCard from "@/components/loggedFoodCard";
import * as SecureStore from 'expo-secure-store';



export var loggedIn = false;


export default function Index() {
  
  const router = useRouter();

  const {data: logsFood, loading:logsLoading, error:logsError, refetch:loadLogs} = useFetch(() =>fetchLogs(), false);
  const {data: fetchedProfile, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);      


  const updateView = () => {
      loadLogs();
  }
  

  
  useEffect(()=>{
    loadLogs();
  }, [])



  

  return (
    
    <View className="flex-1 bg-primary" >
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%', paddingBottom:10}}>

            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            <View style={{alignItems:'center'}}>
              <SearchBar onPress={()=> router.push('/otherPages/search')} placeholder='Search for a food'/>
              <>    
                    <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Foods</Text>
                    <FlatList data={logsFood} 
                              renderItem={({item}) => (<LoggedFoodCard {...item} updateView={updateView}/>)}
                              keyExtractor={(item) =>item.id.toString()}
                              /*columnWrapperStyle={{justifyContent:'flex-start', gap:20, paddingRight:5, marginBottom:10}}*/
                              className="mt-2 pb-32"
                              scrollEnabled={false}
                    />
                  </>
            
              </View>
        </ScrollView>


    </View>
    
  );
}
