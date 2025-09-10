import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ScrollView, ScrollViewBase, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchFoods, login } from "@/services/api";
import { useEffect } from "react";
import FoodCard from "@/components/foodCard";



export default function Index() {
  const router = useRouter();

  const {data: foods, loading: foodsLoading, error: foodsError, refetch} = useFetch(() => fetchFoods({ query:  '' }), false);
  
  useEffect(() => {
    async function doLogin() {
      await login('user1', 'weirdfishes');
      await refetch();
      
    };
    doLogin();
  }, []);





  
  

  
  return (
    
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%', paddingBottom:10}}>

            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            {foodsLoading ? (
              <ActivityIndicator 
              size='large'
              color='#0000ff'
              className='mt-10 self-center'/>
              
            ): foodsError ? (
              <Text className="text-white">Error : {foodsError?.message}</Text>
            ) : (
              <View className="flex-1 mt-5">
                <SearchBar onPress={()=> router.push('/search')} placeholder='Search for a food'/>
                  <>
                    <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Foods</Text>
                    <FlatList data={foods} 
                              renderItem={({item}) => (<FoodCard {...item}/>)}
                              keyExtractor={(item) =>item.id.toString()}
                              numColumns={3}
                              columnWrapperStyle={{justifyContent:'flex-start', gap:20, paddingRight:5, marginBottom:10}}
                              className="mt-2 pb-32"
                              scrollEnabled={false}
                    />
                  </>
              </View>
              )}
            

        </ScrollView>


    </View>
    
  );
}
