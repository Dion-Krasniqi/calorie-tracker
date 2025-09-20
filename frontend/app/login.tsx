import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { TRACKER_CONFIG } from '@/services/api';
import { useRouter } from 'expo-router';
import LoginPage from '@/components/loginPage';
import { images } from "@/constants/images";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';




const getLoginToken = async () => {
            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                if(!refreshToken || refreshToken.length==0){
                    return false;
                }
                const tokenResponse = await fetch(`${TRACKER_CONFIG.BASE_URL}/api/token/refresh/`, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({refresh:refreshToken}),
                });

                const newData = await tokenResponse.json()
                if (newData?.access){
                    await SecureStore.setItemAsync('accessToken', newData.access);
                    await SecureStore.setItemAsync('refreshToken', newData.refresh || refreshToken) ;
                    return true;

                }
                return false;
                

            } catch {
                return false;

            }
}





const Login = () => {
    const router = useRouter();
    const [checkingLogin, setCheckingLogin] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        const tryLogin = async () => {
            const msg = await getLoginToken();
            setLoggedIn(msg);
            setCheckingLogin(false);

        };
        tryLogin()},[]);

    useEffect(()=>{
        if(loggedIn){
            console.log('in');
            router.replace('/(tabs)');
        };

        }, [loggedIn]);


    
    return (
    
     <View className='flex-1 bg-primary' style={{alignItems:'center'}}>
     
      <Image source={images.bgg} className="absolute w-full z-0"/>
        
        {checkingLogin && <ActivityIndicator size='large' color='#ffffff' />}
        {!checkingLogin && !loggedIn && <LoginPage />}
     </View>
     
    )
    
}

export default Login