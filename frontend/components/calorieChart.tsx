import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import AnimatedProgressWheel from 'react-native-progress-wheel'

//@ts-ignore
const CalorieChart = ({calories,expenditure}) => {
    

    return(
        <View style={{alignContent: "center", justifyContent:'center'}}>
            <AnimatedProgressWheel size={210}
                                   width={20} 
                                   rounded={true}
                                   rotation='-90deg'
                                   max={expenditure}
                                   color={'lightblue'}
                                   progress={calories}
                                   backgroundColor={'gray'}
                                   showProgressLabel={true}
                                   labelStyle={{color:'white'}}
                                   subtitle={`/${expenditure}`}
                                   subtitleStyle={{color:'rgba(255, 255, 255, 0.35)f'}}
                                   
                                   
        
      /></View>
    );
}

export default CalorieChart


    
