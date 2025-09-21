import { BarChart } from 'react-native-gifted-charts';

import { View, Text, Dimensions } from 'react-native'
import React from 'react'

//@ts-ignore
const MacroChart = ({protein, carbs, fats}) => {
    const { width: screenWidth } = Dimensions.get("window");

    {/*const topLabelComponent = (color:string, value:number) => (
                    <Text style={{color: color, fontSize: 15, paddingLeft:1, textAlign:'center'}}>{value}g</Text>)*/}

    const maxVal = Math.max(protein, carbs, fats);
  
    const chartWidth = screenWidth/2;

    const data = [{value: protein,
                   label:'P',
                   labelTextStyle:{color:'#7f73b7ff'},  
                   frontColor:'rgba(219, 182, 249,0.05)', 
                   gradientColor:'rgba(58, 23, 213, 0.95)',
                   //capColor:'#3a17d5ff', 
                   //topLabelComponent: () => topLabelComponent('#3a17d5ff', protein)
                   },
                   {value: carbs, 
                    label:'C',
                    labelTextStyle:{color:'#fc7b7bff'}, 
                    frontColor:'rgba(219, 182, 249,0.05)',
                    gradientColor:'rgba(255, 0, 0, 0.95)',
                    //capColor:'#ff0000ff',
                    //topLabelComponent: () => topLabelComponent('#ff0000ff', carbs)
                  }, 
                   {value: fats, 
                    label:'F', 
                    labelTextStyle:{color:'#ffeb92ff'},
                    frontColor:'rgba(219, 182, 249, 0.05)',
                    gradientColor:'rgba(254, 207, 0, 0.95)',
                    //capColor:'#fecf00ff',
                    //topLabelComponent: () => topLabelComponent('#fecf00ff', fats)
                  }]

  
   
   return (
    <View className='bg-white' style={{ backgroundColor: "white", width: chartWidth, alignSelf: "flex-start"}}>
        <BarChart data={data}
                  horizontal
                  width={chartWidth}
                  height = {(25 * data.length) + (5 * (data.length - 1)) + 10}
                  barWidth={25}
                  spacing={5}
                  roundedTop
                  showGradient
                  disableScroll
                  
                  initialSpacing={0}
                  endSpacing={0}
                  yAxisLabelWidth={0}
                  xAxisThickness={0}
                  xAxisLength={0}
                  hideYAxisText
                  hideRules

                  
                  showValuesAsTopLabel
                  topLabelTextStyle={{color: "black", fontSize: 11, textAlign: "center",}}/>
    </View>
  )
}

export default MacroChart