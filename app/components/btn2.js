import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Btn2 = ({name}) =>{
    return(
        <TouchableOpacity style={styles.container} >
            <Text style={{ color:"black", fontWeight:"semibold"}}>{name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"#4A6DDE",
        height:60,
        borderRadius:8,
        // marginTop:16,
        justifyContent:"center",
        alignItems:"center",
        
    }
})
export default Btn2;