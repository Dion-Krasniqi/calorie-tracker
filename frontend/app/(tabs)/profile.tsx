import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import useFetch from "@/services/useFetch";
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchProfile} from '@/services/api'
import { useEffect } from 'react';
import { loggedIn } from '.';


const Profile = () => {

  const {data: ProfileInfo, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);

  useEffect(() => { loadProfile();
      
    }, [loggedIn]);
  
  
  return (
    
    <View className='flex-1 bg-primary'>
      
      <Image source={images.bg} className='absolute w-full z-0'/>
      <View className='size-full justify-top items-center mt-20'>
        <Image  source={icons.person} tintColor={'#ffffff'} className='size-40'/>
        {ProfileInfo && 
        <View>
          <Text className='text-white'>Logged in as {ProfileInfo.username}</Text>
          {ProfileInfo.expenditure> 0 ? (<Text className='text-white'>{ProfileInfo.expenditure}</Text>):
          (<Text className='text-white'>Three piece</Text>)}

        </View>
        
        }
        
        <TouchableOpacity ><Text className='text-white text-xl mt-20'>Change Calorie Goal
          {loggedIn ? (<Text className="text-white">123</Text>):(<Text>321</Text>)}</Text></TouchableOpacity>   

      </View>
      
    </View>
  )
}

export default Profile