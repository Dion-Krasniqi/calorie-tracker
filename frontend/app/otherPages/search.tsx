import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
//import FoodCard from '@/components/foodCard'
import useFetch from "@/services/useFetch";
import { fetchFoods } from "@/services/api";
import { icons } from '@/constants/icons'
import SearchBar from '@/components/searchBar'
import FoodCardSearch from '@/components/foodCardSearch';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Search = () => {
  

  const [searchQuery, setSearchQuery] = useState('');

  const {data: foods, loading, error, refetch: loadFoods, reset} = useFetch(() => fetchFoods({ query:  searchQuery }), false);

  useEffect(() =>{
    const timeOutId = setTimeout(async () => {
      if(searchQuery.trim()) {
          await loadFoods();
      } else {
          await loadFoods();
      }

    },500);
    
    return () => clearTimeout(timeOutId);

    }, [searchQuery])


  return (
    <SafeAreaProvider>
    <SafeAreaView className='flex-1 bg-primary '>
      <Image source={images.bgg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList data={foods} 
                renderItem={ ({item}) => <FoodCardSearch {...item}/>}
                keyExtractor={(item) => item.id.toString()} 
                className='px-3 mt-16'
                
                contentContainerStyle={{ paddingBottom: 100,}}
                ListHeaderComponent={
                  <>
                  
                  <View className='my-5'>
                    <SearchBar placeholder='Search foods...'
                               value={searchQuery}
                               onChangeText={(text: string) => setSearchQuery(text)} />
                  </View>
                  {loading && 
                    (<ActivityIndicator size='large' color='#ffffff' className='my-3'/>)}
                    {error && (
                      <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>
                    )}
                    
                    {//@ts-ignore foods is an array of food
                      !loading && !error && searchQuery.trim() && foods?.length > 0 && (
                      <Text className='text-xl text-white font-bold'>Search results for{' '}
                      <Text className='text-blue-100'>{searchQuery}</Text></Text>
                       )}
                  </>
                }
                ListEmptyComponent={!loading && !error && foods?.length == 0 ? 
                  (<View className='mt-10 px-5'>
                      <Text className='text-center text-gray-500'>{searchQuery.trim() ? 'No Foods Found' : 'Search For a Food'}</Text>
                    </View>) : null}/>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default Search
