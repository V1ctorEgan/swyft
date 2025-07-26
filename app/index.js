import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Checkbox from 'expo-checkbox';

import Navbar from "./components/navbar";
import Screen from "./components/Screen";
import Btn from "./components/button";

const LoginUp = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false)
  const [view, setView] = useState(true)
  const [passwordview, setPasswordView] = useState(true)
  // Placeholder for future signup logic
  const handleSignUp = () => {
    // Add validation logic here
    if(!password || !fullName || !email ||!confirmPassword){
      Alert.alert("name, email and password required")
    }
    
    if (password !== confirmPassword) {
      // Use a custom modal or inline error message instead of Alert for better UX in RN
      console.log("Passwords do not match!");
      // Example: Set an error state to display a message on screen
      return;
    }
    

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Sign Up Attempt:", { user, email, password });

      // Navigate to next screen or show success message
    }, 2000);
  };
  // console.log(isChecked)
  let imageSource;
  let imageSource1;
    if (passwordview) {
    imageSource1 = require('../assets/eye-icon.png');
  } else {
    imageSource1 = require('../assets/closeEye.png');
  }
  if (view) {
    imageSource = require('../assets/eye-icon.png');
  } else {
    imageSource = require('../assets/closeEye.png');
  }
  
  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }} // Ensure it takes full width
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.scrollContent}>
          <View style={styles.container}>
            <Navbar />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                marginTop: 32,
              }}
            >
              Create Account
            </Text>
            
            <Text style={styles.subText}>
              Join us to start your{" "}
              <Text style={{ color: "#4A6DDE" }}>SWYFT</Text> journey
            </Text>
            <View style={styles.subContainer}>
              <Text style={{ marginBottom: 8, color: "white" }}>Full Name</Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.inputdesign}
                placeholderTextColor={"#6B6B6B"}
                value={user}
                onChangeText={setUser}
              />
              <Text style={{ marginBottom: 8, color: "white", marginTop: 16 }}>
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email"
                style={styles.inputdesign}
                placeholderTextColor={"#6B6B6B"}
                value={email}
                onChangeText={setEmail}
              />
              <Text
                style={[{ marginBottom: 8, marginTop: 16, color: "white" }]}
              >
                Password
              </Text>
              <View
                style={[
                  {
                    backgroundColor: "blue",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  styles.inputdesignContainer,
                ]}
              >
                <TextInput
                  placeholder="Create a password"
                  style={styles.forPassword}
                  placeholderTextColor={"#6B6B6B"}
                  secureTextEntry={passwordview}
                  value={password}
                  onChangeText={setPassword}
                />
                <Image source={imageSource1} />
              </View>
              <Text
                style={[{ marginBottom: 8, marginTop: 16, color: "white" }]}
              >
                Confirm Password
              </Text>
              <View
                style={[
                  {
                    backgroundColor: "blue",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  styles.inputdesignContainer,
                ]}
              >
                <TextInput
                  placeholder="Confirm your passwords"
                  style={styles.forPassword}
                  placeholderTextColor={"#6B6B6B"}
                  secureTextEntry={view}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  
                />
                <TouchableOpacity onPress={() => setView(!view)}>
                  <Image source={imageSource} onPress={() => console.log("here")}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              {/* <View
                style={{ width: 16, height: 16, backgroundColor: "white" }}
              ></View> */}
              <Checkbox style={{backgroundColor:"white", marginRight:5}} value={isChecked} onValueChange={setChecked} />
              <Text style={styles.agree}>
                I agree to the 
                <Text style={styles.green}> Terms of Service</Text> and{" "}
                <Text style={styles.green}>Privacy Policy</Text>
              </Text>
            </View>
            <Btn name={"Create Account"} route={"./Db"} />
            <View
              style={{
                marginTop:10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"row"
              }}
            >
              <Text style={{color:"#999999"}}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.navigate("./auth/login")}>
                <Text style={{ color: "#4A6DDE" }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111111",
    flex: 1,
    alignItems: "center",
  },
  green: {
    color: "#4A6DDE",
  },
  inputdesign: {
    color: "white",
    width: "100%",
    height: 50,
    backgroundColor: "#222222",
    borderRadius: 5,
    padding: 16,
  },
  inputdesignContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#222222",
    borderRadius: 5,
  },
  forPassword: {
    width: "100%",
    height: 50,
    width: "90%",
    paddingLeft: 16,
    color:"white"
  },
  subText: {
    fontSize: 16,
    color: "#999999",
    marginTop: 8,
  },
  subContainer: {
    borderColor: "blue",
    backgroundColor: "transparent",
    width: "100%",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1, // Allows content to grow within ScrollView
    backgroundColor: "#111111", // Background should apply to the Screen or here
  },
  agree: {
    color: "#999999",
    fontSize: 12,
  },
});

export default LoginUp;
