import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ScrollView, ScrollViewBase, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchFoods, fetchIntakeCurrent, fetchLogs, fetchLogsCurrent, fetchProfile, TRACKER_CONFIG } from "@/services/api";
import { useEffect, useState } from "react";
import LoggedFoodCard from "@/components/loggedFoodCard";
import * as SecureStore from 'expo-secure-store';
import AddEntry from "@/components/addEntry";
import IntakeDetail from "@/components/intakeDetail";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MacroChart from "@/components/macroChart";
import CalorieChart from "@/components/calorieChart";
import { Alert, BackHandler } from 'react-native';



export var loggedIn = false;


export default function Index() {
  
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  {/* need to just limit to smthing
  useEffect(() => {
  const onBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            // Do nothing
          },
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );

    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress
  );

  return () => backHandler.remove();
}, []);
 */}
  const {data: logsFood, loading:logsLoading, error:logsError, refetch:loadLogs} = useFetch(() =>fetchLogsCurrent(), false);
  const {data: fetchedProfile, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);      
  const {data: intakeToday, refetch: loadIntake} = useFetch( ()=> fetchIntakeCurrent(), false);  


  const updateView = () => {
      loadIntake();
      loadLogs();
  }
  

  
  useEffect(()=>{
    loadLogs();
    loadIntake();
    
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

            <View className="items-center mt-4 rounded"   style={{height:300}}>
              {/*@ts-ignore */}
              {intakeToday  && intakeToday.expenditure ?
                (<ScrollView horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          style={{width: screenWidth}}
                          >
                  <View style={{width: screenWidth, alignItems:'center' }}> 
                    <CalorieChart calories={intakeToday.total_calories} expenditure={intakeToday.expenditure}/>
                  </View>
                  <View style={{width: screenWidth, alignItems:'center' }}> 
                    <MacroChart protein={intakeToday.total_protein} 
                                carbs={intakeToday.total_carbohydrates} 
                                fats={intakeToday.total_fats}/>
                  </View>
                  
                 </ScrollView>):
                (<View style={{width: screenWidth, alignItems:'center' }}> 
                    <MacroChart protein={intakeToday?.total_protein} 
                                carbs={intakeToday?.total_carbohydrates} 
                                fats={intakeToday?.total_fats} />
                    
                      <Text className="flex w-[600] text-white font-medium mt-4 pt-2 pb-2 text-center bg-blue-200">Calories Consumed: {intakeToday?.total_calories}</Text>
                      
                  </View>)
                  
                 // :(<View className="flex-1 justify-center"><Text className="text-white font-semibold text-4xl">Add a Food</Text></View>)
                  
                  }
              
              
        
              
                    
            </View>
            <View style={{alignItems:'center'}}>
              <View className='w-[75%] mt-2' style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                <AddEntry buttonText="Add Food" link='/otherPages/search/'/>
                <AddEntry buttonText="Quick Track" link=''/>
                
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
