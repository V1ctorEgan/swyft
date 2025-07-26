import { useState } from "react";
import { View, StyleSheet, Text } from "react-native"

const ChargeLevel = () =>{
    const level = 30
    const inputLevel = `${30}`
    let color;
    const [voltage, setVoltage] = useState(inputLevel)
    
    const normalizedLevel = Math.max(0, Math.min(100, level));
    const progressBarWidth = `${normalizedLevel}%`; // Calculate width as a percentage
    if(level < 50){
        color = "red"
    }
    else{
        color = "yellow"
    }
    return(
        <View>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:20}}>
                <Text style={styles.live}>Charge Level</Text>
                <Text style={{color:"white", fontWeight:"bold"}}>{voltage}%</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: progressBarWidth, backgroundColor:color }]} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    progressBarBackground: {
    height: 12, // Height of the progress bar
    backgroundColor: '#4A4A4A', // Grey background for the unfilled part
    borderRadius: 6, // Rounded corners for the bar
    overflow: 'hidden', // Ensures the fill stays within the rounded corners
    marginTop:20
  },
  progressBarFill: {
    height: '100%',
   // backgroundColor: '#6A5ACD', // Blue color for the filled part, matching your image
    borderRadius: 6, // Rounded corners for the fill
  },
  
    live:{
        fontSize:14,
        color:"#999999",
    }
})

export default ChargeLevel;