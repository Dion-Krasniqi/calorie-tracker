import { View, Text, Button, Image} from 'react-native';
import { useEffect, useState } from "react";
import { TextInput } from 'react-native';
import { fetchWithAuth, TRACKER_CONFIG } from '@/services/api';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';



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
    
          <View className='flex-1 w-[50%]' style={{justifyContent:'center',}}>
                <TextInput value={username} 
                           onChangeText={setUsername} 
                           placeholderTextColor={'#ab8bff'}
                           className='text-white'
                           placeholder='username'/>
                <TextInput value={password} 
                           onChangeText={setPassword} 
                           placeholderTextColor={'#ab8bff'}
                           className='text-white'
                           placeholder='password'
                           secureTextEntry/>
                
                <Button title='Login' onPress={handleSubmit}/>
          </View>
        
        
  )
}

export default LoginPage