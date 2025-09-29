import { View, Text, Button, Image, TouchableOpacity, Dimensions} from 'react-native';
import { useEffect, useState } from "react";
import { TextInput } from 'react-native';
import { fetchWithAuth, TRACKER_CONFIG } from '@/services/api';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';



const RegisterPage = () => {
  const [username, setUsername ] = useState('');
  const [password1, setPassword1 ] = useState('');
  const [password2, setPassword2 ] = useState('');
  const [expenditure, setExpenditure ] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const handleSubmit = async () => {
      if (isLoading) {
        return
      }
      setIsLoading(true);
      try {
        const endpoint = `${TRACKER_CONFIG.BASE_URL}/account/register/`;
        const options = {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({username: username, 
                                                                                                                password1: password1, 
                                                                                                                password2: password2,
                                                                                                                expenditure: expenditure}),}
        const response = await fetch(endpoint, options);

        if(!response.ok) {
          throw new Error();
        }
        const data = await response.json()
        await SecureStore.setItemAsync('accessToken', data.tokens.access);
        await SecureStore.setItemAsync('refreshToken', data.tokens.refresh);
        router.push('/(tabs)')
      
      } catch (error){
        setIsLoading(false);
      } finally {
      }
    }

  return (
    
          <View className='flex-1 ' style={{justifyContent:'center', gap:15}}>
            <View className='items-center mb-12'>
              <Image source={icons.logo} className='size-24' />
            </View>
                <TextInput value={username} 
                           onChangeText={setUsername} 
                           placeholderTextColor={'darkgrey'}
                            style={{width:screenWidth/2.3}}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center w-[100%]'
                           placeholder='username'/>
                <TextInput
                           onChangeText={(text)=>setExpenditure(parseInt(text))} 
                           placeholderTextColor={'darkgrey'}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center'
                           placeholder='0'
                           keyboardType='numeric'/>
                <TextInput value={password1} 
                           onChangeText={setPassword1} 
                           placeholderTextColor={'darkgrey'}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center'
                           placeholder='password'
                           secureTextEntry/>
                <TextInput value={password2} 
                           onChangeText={setPassword2} 
                           placeholderTextColor={'darkgrey'}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center'
                           placeholder='enter password again' 
                           secureTextEntry/>
                
                
                    <TouchableOpacity onPress={handleSubmit}>
                    <View className='flex-row items-center justify-center bg-blue-100 rounded-xl px-5 py-3'>
                      
                        
                            <Text className='font-bold '>LOG IN</Text>
                        
                      
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('/login')}>
                    <View className='items-center justify-center  rounded-xl px-1 py-1 opacity-60'>
                            <Text className='font-semibold text-white'>Go back</Text>
                        </View>
                    </TouchableOpacity>
          </View>
        
        
  )
}

export default RegisterPage