import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Link, useRouter } from 'expo-router';
import { fetchWithAuth } from '@/services/api';

const QuickTrack = () => {

  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const handlePress = async () => {
    if (userInput.length==0){
        console.log('nothin')
        return
    }
    const endpoint = 'caloriebalance/api/add/quicktrack/';
    const options = {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({'input':userInput})};
    console.log(userInput);
    await fetchWithAuth(endpoint,options);
    router.replace('/');

  }


  return (
    <View className='flex-1 bg-primary items-center'> 
        <Image source={images.bgg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4 w-[85%] mt-20'>
            
            <TextInput value={userInput}
                       onChangeText={setUserInput} 
                       placeholder='Describe your meal'
                       placeholderTextColor={'darkgrey'} 
                       className='flex-1 ml-2 text-white'/>
            
             
            <Pressable onPress={handlePress}>
          {({pressed}) => (
            <Image source={icons.arrow} className='size-5' 
                                        resizeMode='contain' 
                                        tintColor={(pressed)?('white'):('darkgrey')} />
          )}
        </Pressable>
               
            
             
            
            
            
        </View>
      
    </View>
  )
}

export default QuickTrack