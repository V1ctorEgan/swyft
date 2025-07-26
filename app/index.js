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
  // Placeholder for future signup logic
  const handleSignUp = () => {
    // Add validation logic here
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
            <Text>
              Join us to start your <Text>SWYFT</Text>journey
            </Text>
            <Text style={styles.subText}>
              Join us to start your{" "}
              <Text style={{ color: "#4ADE80" }}>SWYFT</Text> journey
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
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <Image source={require("../assets/eye-icon.png")} />
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
                  placeholder="Confirm your password"
                  style={styles.forPassword}
                  placeholderTextColor={"#6B6B6B"}
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Image source={require("../assets/eye-icon.png")} />
              </View>
            </View>
            <View style={{flexDirection:"row"}}>
              <View style={{width:16, height:16, backgroundColor:"white"}}></View>
              <Text style={styles.agree}>I agree to the <Text style={styles.green}>Terms of Service</Text> and <Text style={styles.green}>Privacy Policy</Text></Text>
            </View>
            <Btn name={'Create Account'} route={'./Db'}/>
             <Text style={{color:"#999999"}}>Don't have an account? <TouchableOpacity onPress={()=> router.navigate("./auth/login")}><Text style={{color:"#4A6DDE"}}>Sign up</Text></TouchableOpacity></Text>
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
  green:{
    color:"green"
  },
  inputdesign: {
    color: "white",
    width: "100%",
    height: 50,
    color: "blue",
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
  agree:{
    color:"#999999",
    fontSize:14
  }
});

export default LoginUp;
