import { BarChart } from 'react-native-gifted-charts';

import { View, Text } from 'react-native'
import React from 'react'

//@ts-ignore
const MacroChart = ({protein, carbs, fats}) => {

    const topLabelComponent = (color:string, value:number) => (
                    <Text style={{color: color, fontSize: 15, marginLeft: 6}}>{value}g</Text>)

    const data = [{value: protein,
                   label:'P',
                   labelTextStyle:{color:'#7f73b7ff'},  
                   frontColor:'rgba(219, 182, 249,0.05)', 
                   gradientColor:'rgba(58, 23, 213, 0.95)',
                   //capColor:'#3a17d5ff', 
                   topLabelComponent: () => topLabelComponent('#3a17d5ff', protein)},
                   {value: carbs, 
                    label:'C',
                    labelTextStyle:{color:'#fc7b7bff'}, 
                    frontColor:'rgba(219, 182, 249,0.05)',
                    gradientColor:'rgba(255, 0, 0, 0.95)',
                    //capColor:'#ff0000ff',
                    topLabelComponent: () => topLabelComponent('#ff0000ff', carbs)}, 
                   {value: fats, 
                    label:'F', 
                    labelTextStyle:{color:'#ffeb92ff'},
                    frontColor:'rgba(219, 182, 249, 0.05)',
                    gradientColor:'rgba(254, 207, 0, 0.95)',
                    //capColor:'#fecf00ff',
                    topLabelComponent: () => topLabelComponent('#fecf00ff', fats)}]

  
   
   return (
    <View style={{}}>
        <BarChart data={data}
                  
                  
                  isAnimated
                  width={Math.max(protein,carbs,fats)+20}
                  barWidth={25}
                  roundedTop
                  hideRules
                  showGradient
                  hideYAxisText
                  yAxisThickness={0}
                  xAxisThickness={0}
                  disableScroll
                  horizontal/>
    </View>
  )
}

export default MacroChart