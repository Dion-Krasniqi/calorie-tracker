import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Href, Link, RelativePathString, useRouter } from 'expo-router';



interface Props {
    buttonText: string;
    link: string;
}


const AddEntry = ({buttonText, link}: Props) => {

  const router = useRouter();
  return (
   <Link  href={link as Href} asChild> 
   <TouchableOpacity>
    <View className='flex-row items-center bg-blue-100 rounded-xl px-5 py-4'>
      
        
            
            {buttonText=='Quick Track' ? (<View className='items-center '>
              <Text className='font-[500] '>{buttonText}</Text>
              <Text className='font-[5] text-xs absolute pt-5'>Coming Soon</Text>
              
            </View>):
            (<Text className='font-[500]'>{buttonText}</Text>)}
        
      
        </View>
    </TouchableOpacity>
    </Link>
  )
}

export default AddEntry