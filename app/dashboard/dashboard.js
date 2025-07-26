import React from "react";
import {View, StyleSheet} from "react-native"
import Screen from "../components/Screen";

const DashBoard = () =>{
    return(
        <Screen>

        <View style={styles.container}>
            <View style={styles.firstbox}>
                <View>
                    <Text>Battery Status</Text>
                    <View>
                        <View style={{width:10, height:10, borderRadius:5}}></View>
                        <Text>Connected</Text>
                    </View>
                </View>

            </View>
        </View>
        </Screen>
    )
}
const styles = StyleSheet.create({
    firstbox:{
        width:"100%",
        height:202,
        backgroundColor:"#222222",
        borderRadius:16,

    },
    container:{
        padding:24,
        backgroundColor: "#111111",
        flex:1
    }
})
export default DashBoard