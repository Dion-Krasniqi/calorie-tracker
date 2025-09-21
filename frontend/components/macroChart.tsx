import { BarChart } from 'react-native-gifted-charts';
import { View, Text, Dimensions } from 'react-native'
import React from 'react'

//@ts-ignore
const MacroChart = ({protein, carbs, fats}) => {
    const { width: screenWidth } = Dimensions.get("window");

    {/*const topLabelComponent = (color:string, value:number) => (
                    <Text style={{color: color, fontSize: 15, paddingLeft:1, textAlign:'center'}}>{value}g</Text>)*/}

    const total = (protein+carbs)*4+fats*9
  
    const chartWidth = screenWidth/2;

    const data = [{value: protein*4,
                   label:'P',
                   labelTextStyle:{color:'#7f73b7ff'},  
                   frontColor:'rgba(219, 182, 249,0.05)', 
                   gradientColor:'rgba(58, 23, 213, 0.95)',
                   //capColor:'#3a17d5ff', 
                   //topLabelComponent: () => topLabelComponent('#3a17d5ff', protein)
                   },
                   {value: carbs*4, 
                    label:'C',
                    labelTextStyle:{color:'#fc7b7bff'}, 
                    frontColor:'rgba(219, 182, 249,0.05)',
                    gradientColor:'rgba(255, 0, 0, 0.95)',
                    //capColor:'#ff0000ff',
                    //topLabelComponent: () => topLabelComponent('#ff0000ff', carbs)
                  }, 
                   {value: fats*8, 
                    label:'F', 
                    labelTextStyle:{color:'#ffeb92ff'},
                    frontColor:'rgba(219, 182, 249, 0.05)',
                    gradientColor:'rgba(254, 207, 0, 0.95)',
                    //capColor:'#fecf00ff',
                    //topLabelComponent: () => topLabelComponent('#fecf00ff', fats)
                  }]

  
   
   return (
    <View style={{  width: chartWidth*2, alignContent: "center"}}>
        <BarChart data={data}
                  
                  width={chartWidth*2}
                  isAnimated
                     
                  
                  
                  barWidth={chartWidth*2*.25}
                  spacing={chartWidth*2*.1}
                  barBorderTopLeftRadius={22}
                  barBorderTopRightRadius={22}
                  showGradient
                  disableScroll
                  
                  
                  initialSpacing={0}
                  
                  yAxisThickness={0}
                  xAxisThickness={0}
                  hideYAxisText
                  hideRules

                  
                  showValuesAsTopLabel
                  topLabelTextStyle={{color: "white", fontSize: 11, textAlign: "center",}}/>
    </View>
  )
}

export default MacroChart