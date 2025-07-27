import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Screen from "./components/Screen";
import { useState, useEffect, useContext } from "react";
import ChargeLevel from "./components/chargeLevel";
import Monitor from "./components/monitor";
import Btn2 from "./components/btn2";
import { router } from "expo-router";

import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from "./AuthContext";
const Db = () => {
  const { auth, db, user: currentFirebaseUser, appId } = useContext(AuthContext);
  const [voltage, setVoltage] = useState("48.5");
  const [distance, setDistance] = useState("0.0 ");
  const [displayName, setDisplayName] = useState(null); // Highlight: State for user's full name
  const [loadingName, setLoadingName] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      if (currentFirebaseUser && db && appId) {
        // First, try to get from Firebase Auth displayName (set during signup updateProfile)
        if (currentFirebaseUser.displayName) {
          setDisplayName(currentFirebaseUser.displayName);
          setLoadingName(false);
          return;
        }

        // If displayName is not set or not immediately available, fetch from Firestore
        try {
          // Adjust path if your profile document has a different ID than user.uid
          const userDocRef = doc(db, `artifacts/${appId}/users/${currentFirebaseUser.uid}/profiles`, currentFirebaseUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setDisplayName(userData.fullName || "User"); // Use fullName from Firestore
            console.log("Fetched user data from Firestore:", userData);
          } else {
            console.log("No user profile found in Firestore for UID:", currentFirebaseUser.uid);
            setDisplayName("User"); // Default if no profile found
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          setDisplayName("User"); // Default on error
        } finally {
          setLoadingName(false);
        }
      } else if (!currentFirebaseUser) {
        // If no user is logged in, navigate to login. This handles cases where AuthContext isn't ready
        // or user somehow navigated to Db without being logged in.
        router.replace('/auth/login');
      }
    };

    fetchUserName();
  }, [currentFirebaseUser, db, appId]); // Dependencies: re-run if user, db, or appId changes

   const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out.");
      router.replace('/auth/login'); // Navigate back to login page
    } catch (error) {
      console.error("Error signing out:", error);
      // You might want to display an error message to the user here
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
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
                <Text style={styles.live}>{getGreeting()},</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                  {loadingName ? ( // Highlight: Conditional rendering for name
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text style={{fontSize:45, fontWeight:"bold", color:"white"}}>
                      {displayName || "John Doe"} {/* Highlight: Display fetched name */}
                    </Text>
                  )}
                  <View style={{backgroundColor:"#4A6DDE", width:57, height:57, borderRadius:57, justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity>

                    <Image source={require("../assets/bell.png")} />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
          <View style={styles.container}>
            {/* <View style={styles.firstbox}>



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
            </View> */}
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
