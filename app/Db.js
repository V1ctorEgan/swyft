import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Screen from "./components/Screen";
import { useState } from "react";
import ChargeLevel from "./components/chargeLevel";
import Monitor from "./components/monitor";
import Btn2 from "./components/btn2";

const Db = () => {
  const [voltage, setVoltage] = useState("48.5");
  const [distance, setDistance] = useState("0.0 ");
  
  return (
    <Screen>
      <ScrollView>
        <View style={{backgroundColor:"#111111"}}>
            <View style={{ width:"100%", height:60, backgroundColor:"#333333", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingHorizontal:10}}>
              <Image source={require("../assets/swyft.png")} />
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", gap:5, position:"fixed"}}>
                <View style={{width:10, height:10, borderRadius:10, backgroundColor:"red"}}></View>
                <Text style={{color:"red"}}>Disconnected</Text>
              </View>

            </View>
              <View style={{padding:16}}>
                <Text style={styles.live}>Good Morning,</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                  <Text style={{fontSize:45, fontWeight:"bold", color:"white"}}>
                    John Doe
                  </Text>
                  <View style={{backgroundColor:"#4A6DDE", width:57, height:57, borderRadius:57, justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity>

                    <Image source={require("../assets/bell.png")} />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
          <View style={styles.container}>
            <View style={styles.firstbox}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.battery}>Battery Status</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: "green",
                      marginRight: 5,
                    }}
                  ></View>
                  <Text style={styles.live}>Live</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text style={styles.live}>Voltages</Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {voltage}v
                </Text>
              </View>
              <ChargeLevel />
            </View>
            <Monitor />
            <View style={[styles.lastbox, { marginTop: 16 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.battery}>Ride Statistics</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: "green",
                      marginRight: 5,
                    }}
                  ></View>
                  <Text style={styles.live}>Stopped</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text style={styles.live}>Ride Time</Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>0.00</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text style={styles.live}>Distance</Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {distance} km
                </Text>
              </View>
            </View>
          </View>
          <View style={{borderWidth:1,padding:24, backgroundColor:"#222222"}}>
            <Btn2 name={'Start Ride'} />
             <View style={{justifyContent:"center", flexDirection:"row", justifyContent:"space-between", paddingTop:16}}>
              <View style={{ width:"30%", height:64, backgroundColor:"#333333", flexDirection:"column", borderRadius:8, padding:8, justifyContent:"center", alignItems:"center"}}>
                <Text style={styles.live}>Range Left</Text>
                <Text style={{color:"white", fontSize:12}}>68 KM</Text>
              </View>
              <View style={{width:"30%", height:64, backgroundColor:"#333333", flexDirection:"column", borderRadius:8, padding:8, justifyContent:"center", alignItems:"center"}}>
                <Text style={styles.live}>Power</Text>
                <Text style={{color:"white", fontSize:12}}>20 KW</Text>
              </View>
              <View style={{ width:"30%",height:64, backgroundColor:"#333333", flexDirection:"column", borderRadius:8, padding:8, justifyContent:"center", alignItems:"center"}}>
                <Text style={styles.live}>Efficiency</Text>
                <Text style={{color:"white", fontSize:12}}>82%</Text>
              </View>
              
             </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  firstbox: {
    width: "100%",
    height: 180,
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 25,
  },
  lastbox: {
    width: "100%",
    height: 160,
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 25,
  },
  scrollContent: {
    flexGrow: 1, 
    backgroundColor: "#111111", 
  },
  container: {
    padding: 16,
    backgroundColor: "#111111",
    flex: 1,
  },
  battery: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "white",
  },
  live: {
    fontSize: 14,
    color: "#999999",
  },
});

export default Db;
