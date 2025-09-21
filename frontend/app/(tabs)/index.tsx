import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ScrollView, ScrollViewBase, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchFoods, fetchIntakeCurrent, fetchLogs, fetchLogsCurrent, fetchProfile, TRACKER_CONFIG } from "@/services/api";
import { useEffect, useState } from "react";
import FoodCard from "@/components/foodCard";
import LoggedFoodCard from "@/components/loggedFoodCard";
import * as SecureStore from 'expo-secure-store';
import AddEntry from "@/components/addEntry";
import IntakeDetail from "@/components/intakeDetail";
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MacroChart from "@/components/macroChart";



export var loggedIn = false;


export default function Index() {
  
  const router = useRouter();

  const {data: logsFood, loading:logsLoading, error:logsError, refetch:loadLogs} = useFetch(() =>fetchLogsCurrent(), false);
  const {data: fetchedProfile, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);      
  const {data: intakeToday, refetch: loadIntake} = useFetch( ()=> fetchIntakeCurrent(), false);  


  const updateView = () => {
      loadIntake();
      loadLogs();
  }
  

  
  useEffect(()=>{
    loadLogs();
  }, [])



  

  return (
  <SafeAreaProvider>
    <SafeAreaView className="flex-1 bg-primary">
    
     
      <Image source={images.bgg}
             className=" absolute w-full z-0" 
            resizeMode="cover"
      />
    
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%', paddingBottom:10}}>


            
            <View style={{alignItems:'center'}}>
              <View className="flex-1 items-start">
                <MacroChart protein={150} carbs={200} fats={62}/>
              </View>
                

              
              
              {intakeToday && <IntakeDetail {...intakeToday} />}
              <View className='w-[75%] mt-12' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                <AddEntry buttonText="Add Food" link='/otherPages/search/'/>
                <AddEntry buttonText="Quick Track" link='/otherPages/quickTrack/'/>
              </View>
              
              <>    
                    
                    <FlatList data={logsFood} 
                              renderItem={({item}) => (<LoggedFoodCard {...item} updateView={updateView}/>)}
                              keyExtractor={(item) =>item.id.toString()}
                              /*columnWrapperStyle={{justifyContent:'flex-start', gap:20, paddingRight:5, marginBottom:10}}*/
                              className="mt-16 pb-32 "
                              scrollEnabled={false}
                    />
                  </>
            
              </View>
        </ScrollView>


   
    </SafeAreaView >
  
    
    
    </SafeAreaProvider>
  );
}
