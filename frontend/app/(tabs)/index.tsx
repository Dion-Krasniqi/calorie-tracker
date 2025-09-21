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
import CalorieChart from "@/components/calorieChart";



export var loggedIn = false;


export default function Index() {
  
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

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
    
        <ScrollView className="flex px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%', paddingBottom:10}}>
            <View className="items-center mt-4">
              
              {true ? (<ScrollView horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          style={{width: screenWidth, height: 300}}
                          >
                <View style={{width: screenWidth, alignItems:'center' }}> 
                  <MacroChart protein={150} carbs={300} fats={62}/>
                </View>
                <View style={{width: screenWidth, alignItems:'center' }}> 
                  <CalorieChart calories={1700} expenditure={2600}/>
                </View>
                 
              </ScrollView>):(
                <View style={{width: screenWidth, alignItems:'center' }}> 
                  {false ? 
                          (<MacroChart protein={150} carbs={300} fats={62}/>)
                         :(<Text className="text-white">Add a Food</Text>)}
                </View>)}
              
                    
            </View>
            <View style={{alignItems:'center'}}>

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
