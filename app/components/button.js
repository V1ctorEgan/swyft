import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Btn = ({name, route}) =>{
    return(
        <TouchableOpacity style={styles.container} onPress={()=>router.navigate(`${route}`)}>
            <Text style={{ color:"white"}}>{name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"90%",
        backgroundColor:"blue",
        height:60,
        borderRadius:8,
        marginTop:16,
        justifyContent:"center",
        alignItems:"center",
        
    }
})
export default Btn;