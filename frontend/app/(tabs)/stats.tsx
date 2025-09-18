import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { fetchRunningAverage } from '@/services/api'

const Stats = () => {
  return (


    <View className='flex-1 bg-primary justify-center'>
      <Image source={images.bg} className='absolute w-full z-0'/>
      <Button title='date' onPress={()=>fetchRunningAverage()}/>
    </View>
  )
}

export default Stats