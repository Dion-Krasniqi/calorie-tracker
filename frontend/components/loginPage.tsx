import { View, Text, Button, Image, TouchableOpacity} from 'react-native';
import { useEffect, useState } from "react";
import { TextInput } from 'react-native';
import { fetchWithAuth, TRACKER_CONFIG } from '@/services/api';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';



const LoginPage = () => {
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
      if (isLoading) {
        return
      }
      setIsLoading(true);
      try {
        const endpoint = `${TRACKER_CONFIG.BASE_URL}/account/login/`;
        const options = {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({username: username, password: password}),}
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
    
          <View className='flex-1 w-[50%] ' style={{justifyContent:'center', gap:15}}>
            <View className='items-center mb-12'>
              <Image source={icons.logo} className='size-24' />
            </View>
                
                <TextInput value={username} 
                           onChangeText={setUsername} 
                           placeholderTextColor={'darkgrey'}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center'
                           placeholder='username'/>
                <TextInput value={password} 
                           onChangeText={setPassword} 
                           placeholderTextColor={'darkgrey'}
                           className='text-white rounded-xl bg-blue-300 border-white/20 border-2 text-center'
                           placeholder='password'
                           secureTextEntry/>
                
                
                <TouchableOpacity onPress={handleSubmit}>
                    <View className='flex-row items-center justify-center bg-blue-100 rounded-xl px-5 py-3'>
                      
                        
                            <Text className='font-bold '>LOG IN</Text>
                        
                      
                        </View>
                    </TouchableOpacity>
          </View>
        
        
  )
}

export default LoginPage