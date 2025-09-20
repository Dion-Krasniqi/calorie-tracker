import { View, Text, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import { fetchRunningAverage } from '@/services/api'
import RunningAverage from '@/components/runningAverage'
import useFetch from '@/services/useFetch'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'



const Stats = () => {

  const {data: avgData, refetch:loadAverage} = useFetch(() => fetchRunningAverage());

  useEffect(()=>{
    loadAverage();
  },[])

  return (

    <SafeAreaProvider>
    <SafeAreaView className='flex-1 bg-primary '>
      <Image source={images.bgg} className='absolute w-full z-0'/>
      <View className='flex-1 justify-center items-center gap-16'>
        {avgData? (<View>
                    <RunningAverage {...avgData}/>
                   </View>) : (<Text>No data available</Text>)}
        <Button title={avgData? 'Re-Calculate' : 'Calculate'} onPress={loadAverage} />
        
      </View>
      
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default Stats