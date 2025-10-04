import { View, Text, Image, Button, TouchableOpacity, TextInput } from 'react-native'
import useFetch from "@/services/useFetch";
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchProfile, fetchWithAuth, updateExpenditure} from '@/services/api'
import { useEffect, useState } from 'react';
import { loggedIn } from '.';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useProfileStore } from '@/state/keepState';



const Profile = () => {
  
  const router = useRouter();

  const loadInfo = useProfileStore((state)=>state.loadProfileInfo)
  const updateExpenditure = useProfileStore((state)=>state.changeExpenditure)
  const expenditureState = useProfileStore((state)=>state.expenditure);
  const usernameState = useProfileStore((state)=>state.username);

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

  //const {data: ProfileInfo, refetch: loadProfile} = useFetch( ()=> fetchProfile(), false);

  const [isEditing, setIsEditing] = useState(false);
  const [expenditure, setExpenditure] = useState(expenditureState || '');

  useEffect(() => { 
    loadInfo();
    console.log(usernameState);
    
      
    }, [loggedIn]);
  

  const handleChangeExpenditure = async () => {
    
    try {
      console.log('ugh');
      //@ts-ignore , gets parsed as string in json
      await updateExpenditure(expenditure);
     
    } catch (error){
      throw(error);
    } finally{
      setIsEditing(false);
    }

  }

  
  
  return (
    
    <View className='flex-1 bg-primary justify-top items-center' >
      
      <Image source={images.bgg} className='absolute w-full z-0'/>
      <View className='size-full justify-top items-center mt-32'>
        {/*<Image  source={icons.person} tintColor={'#ffffff'} className='size-40'/>*/}
        {usernameState && 
        <View className='items-center mb-20'>
          <Text className='text-white font-bold text-4xl'>Logged in as {usernameState}</Text>
          <View className='items-center mt-24 w-[80%]'>
          <TouchableOpacity onPress={()=>setIsEditing(prevState =>!(prevState))}><Text className='text-white text-xl mt-20'>Change Calorie Goal</Text></TouchableOpacity>   
          {isEditing? (<View className='items-center w-[100%]'>
                        <TextInput  
                                   placeholder={String(expenditureState)}
                                   //@ts-ignore
                                   onChangeText={setExpenditure} 
                                   keyboardType='numeric' 
                                   placeholderTextColor={'darkgrey'} 
                                   textAlign='center'
                                   style={{width: 100,   
                                          height: 48,
                                          marginTop:20}}
                                   className='text-white rounded-xl bg-blue-300 border-white/20 border-2 '/>
                        <TouchableOpacity className='px-6 py-4 mt-6 justify-center items-center bg-blue-100 rounded-xl' onPress={()=>handleChangeExpenditure()}>
                                                      <Text className=' text-xl font-bold'>Save</Text>
                                            </TouchableOpacity>
                     </View>)
          :(expenditureState> 0 ? (<Text className='text-white'>{String(expenditureState)}</Text>):
                                         (<Text className='text-white'>0</Text>))}
          </View>
          

        </View>
        
        }
        
        

        <TouchableOpacity className='px-6 py-4 mt-32 justify-center items-center bg-blue-100 rounded-xl' 
        onPress={()=>handleLogOut()}>
             <Text className=' text-xl font-bold'>Logout</Text>
        </TouchableOpacity>

      </View>
      
    </View>
  )
}

export default Profile