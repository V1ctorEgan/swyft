import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native"
const Navbar = () =>{
    return(

        <SafeAreaView style={styles.container}>
            <View style={{width:"100%", height:"100%", justifyContent:"center", alignItems:"center", flexDirection:"row", gap:2}}>
            <Image source={require("../../assets/swyft.png")} />
            <Text style={styles.title}>
                SWYFT
            </Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:64,
        backgroundColor:'#222222',
        // top:25,
        // marginBottom:20
    },
    title:{
        color:"white",
        fontSize:20,
        fontWeight:"bold",
    }
})
export default Navbar;