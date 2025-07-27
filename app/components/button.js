import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Btn = ({name, route, action}) =>{
    useState
    return(
        <TouchableOpacity style={styles.container} onPress={()=>route && router.navigate(`${route}`)}>
            <TouchableOpacity onPress={()=> action && action}>

            <Text style={{ color:"white"}}>{name}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
const Bttn = ({ name, action, loading }) => { // Added loading prop
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={action} // This is the key: call the 'action' prop on press
      disabled={loading} // Disable button when loading
    >
      {loading ? (
        <ActivityIndicator color="#fff" /> // Show indicator if button is loading
      ) : (
        <Text style={{ color:"white"}}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

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
export {Bttn};