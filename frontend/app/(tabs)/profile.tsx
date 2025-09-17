import { View, Text, Image, Button, TouchableOpacity, TextInput } from 'react-native'
import useFetch from "@/services/useFetch";
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchProfile, fetchWithAuth} from '@/services/api'
import { useEffect, useState } from 'react';
import { loggedIn } from '.';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';


const Profile = () => {
  
  const router = useRouter();

  const handleLogOut = async () => {
    const endpoint = '/account/logout/';
    const token = await SecureStore.getItemAsync('token');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    await SecureStore.setItemAsync('accessToken', '');
    await SecureStore.setItemAsync('refreshToken', '');
    const options = {method : 'POST',headers: {'Content-Type': 'application/json',
                                               Authorization: `Bearer ${token}`,
                                               Accept: 'application/json',
    }, body: JSON.stringify({refresh:refreshToken})};
    await fetch(endpoint, options);
    router.replace('/login');

  }

  const {data: ProfileInfo, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);

  const [isEditing, setIsEditing] = useState(false);
  const [expenditure, setExpenditure] = useState(`${ProfileInfo?.expenditure}` || '0');

  const handleChangeExpenditure = async () => {
    if(isEditing) {
      return;
    }
    try {
      
    } catch{

    }

  }

  useEffect(() => { loadProfile();
      
    }, [loggedIn]);
  
  
  return (
    
    <View className='flex-1 bg-primary justify-top items-center' >
      
      <Image source={images.bg} className='absolute w-full z-0'/>
      <View className='size-full justify-top items-center mt-20'>
        <Image  source={icons.person} tintColor={'#ffffff'} className='size-40'/>
        {ProfileInfo && 
        <View className='items-center mb-20'>
          <Text className='text-white'>Logged in as {ProfileInfo.username}</Text>
          <TouchableOpacity onPress={()=>setIsEditing(prevState =>!(prevState))}><Text className='text-white text-xl mt-20'>Change Calorie Goal</Text></TouchableOpacity>   
          {isEditing? (<View>
                        <TextInput value={expenditure} 
                                   placeholder={expenditure} 
                                   onChangeText={setExpenditure} 
                                   placeholderTextColor={'#ffff'} 
                                   textAlign='center'
                                   className='text-white'/>
                        <Button title='Save' onPress={handleChangeExpenditure}/>
                     </View>)
          :(ProfileInfo.expenditure> 0 ? (<Text className='text-white'>{ProfileInfo.expenditure}</Text>):
                                         (<Text className='text-white'>0</Text>))}
          

        </View>
        
        }
        
        

        <Button title='Log Out' onPress={handleLogOut}/>

      </View>
      
    </View>
  )
}

export default Profile