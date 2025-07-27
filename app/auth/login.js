import React, { useState, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import Navbar from "../components/navbar";
import Screen from "../components/Screen";
import {Bttn} from "../components/button";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const { auth, db, appId, user: currentFirebaseUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');
  // let imageSource;
  const [loading, setLoading] = useState(false);

  const imageSource = view ? require('../../assets/eye-icon.png') : require('../../assets/closeEye.png');
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    // Input validation
    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      setLoading(false);
      return;
    }

    // Check if Firebase auth instance is available from context
    if (!auth) {
      setErrorMessage('Firebase Authentication service not initialized.');
      setLoading(false);
      return;
    }

    try {
      // Firebase Login Attempt
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Login successful for:", user.email, "UID:", user.uid);
      // Highlight: Navigate to dashboard after successful login
      router.replace("./Db");

      // Clear form fields
      setEmail('');
      setPassword('');
      setErrorMessage('');

    } catch (error) {
      console.error("Firebase Login Error:", error);
      let friendlyMessage = 'An unexpected error occurred during login.';
      switch (error.code) {
        case 'auth/invalid-credential': // Catches invalid email or password
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          friendlyMessage = 'Invalid email or password.';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'The email address is not valid.';
          break;
        case 'auth/user-disabled':
          friendlyMessage = 'This account has been disabled.';
          break;
        default:
          friendlyMessage = `Error: ${error.message}`;
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleL = () =>{
    router.replace("../Db");
  }

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
                keyboardType="email-address"
                autoCapitalize="none"
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
                  placeholder="Enter your password"
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

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

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
            {loading ? (
              <ActivityIndicator size="large" color="#fff" style={{marginTop: 20}}/>
            ) : (
              // Highlight: Updated Bttn component to trigger handleLogin
              <Bttn name={"Login"} action={handleL} loading={loading}/>
            )}
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
  errorText: { // Highlight: Added errorText style
    color: '#ff6b6b',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    width: '90%',
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
