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
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      
        
            <Text>{buttonText}</Text>
        
      
        </View>
    </TouchableOpacity>
    </Link>
  )
}

export default AddEntry