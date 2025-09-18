import { View, Text, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import { fetchRunningAverage } from '@/services/api'
import RunningAverage from '@/components/runningAverage'
import useFetch from '@/services/useFetch'



const Stats = () => {

  const {data: avgData, refetch:loadAverage} = useFetch(() => fetchRunningAverage());

  useEffect(()=>{
    loadAverage();
  },[])

  return (


    <View className='flex-1 bg-primary '>
      <Image source={images.bg} className='absolute w-full z-0'/>
      <View className='flex-1 justify-center items-center'>
        <RunningAverage {...avgData}/>
        <Button title='Re-Calculate' onPress={loadAverage}/>
      </View>
      
    </View>
  )
}

export default Stats