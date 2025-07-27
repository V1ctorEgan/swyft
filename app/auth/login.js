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
import Navbar from "../components/navbar";
import Screen from "../components/Screen";
import Btn from "../components/button";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(true)

  const [loading, setLoading] = useState(false);
  if (view) {
    imageSource = require('../../assets/eye-icon.png');
  } else {
    imageSource = require('../../assets/closeEye.png');
  }
  const handleLogin = () => {
    
  if(!password || !email){
      Alert.alert("password and email required")
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
        style={{ flex: 1, width: "100%" }} 
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
              Welcome Back
            </Text>

            <Text style={styles.subText}>
              Sign in to your account to continue
            </Text>
            <View style={styles.subContainer}>
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
                  secureTextEntry={view}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setView(!view)}>

                <Image source={imageSource} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <View style={{ flexDirection: "row", gap:5 }}>
                <Checkbox style={{backgroundColor:"white"}}/>
                <Text style={{color:"#999999"}}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={{color:"#4A6DDE"}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Btn name={"Sign Up"} route="./auth/signup" />
            <View style={{
                marginTop:10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"row",
                gap:5
              }}>
              <Text style={{color:"#999999"}}>Don't have an account?</Text>
              
              <TouchableOpacity onPress={ () => router.navigate("..")}>
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
    color: "green",
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
    fontSize: 14,
  },
});

export default Login;
