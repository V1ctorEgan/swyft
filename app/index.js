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
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Checkbox from 'expo-checkbox';
// Import Firebase modules
import {
  createUserWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider, // Import EmailAuthProvider for creating credentials
  linkWithCredential, // Import linkWithCredential for linking accounts
} from 'firebase/auth';
import {
  doc,
  setDoc,
} from 'firebase/firestore';
import AuthProvider, { AuthContext } from './AuthContext';

import Navbar from "./components/navbar";
import Screen from "./components/Screen";
import {Bttn} from "./components/button";

const SignUp = () => {
  const { auth, db, appId, user: currentFirebaseUser } = useContext(AuthContext);

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false)
  const [view, setView] = useState(true)
  const [passwordview, setPasswordView] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');

  // Placeholder for future signup logic
   const handleSignUp = async () => {
    setLoading(true);
    setErrorMessage('');
    console.log("Attempting sign up...");

    // Input validation
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Full Name, Email, and Password are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!isChecked) {
      setErrorMessage("You must agree to the Terms of Service and Privacy Policy.");
      setLoading(false);
      return;
    }

    // Check if Firebase instances are available from context
    if (!auth || !db) {
      setErrorMessage('Firebase services not initialized. Please ensure AuthContext is properly set up and loading complete.');
      setLoading(false);
      return;
    }

    try {
      let firebaseUser = null; // This variable will hold the authenticated user after signup or linking

      // Create email/password credential
      const credential = EmailAuthProvider.credential(email, password);

      // Check if there's an existing anonymous user to link to
      if (currentFirebaseUser && currentFirebaseUser.isAnonymous) {
        console.log("Anonymous user detected. Attempting to link credentials...");
        try {
          const userCredential = await linkWithCredential(currentFirebaseUser, credential);
          firebaseUser = userCredential.user;
          console.log("Anonymous account successfully linked to email/password.");
        } catch (linkError) {
          // Handle specific linking errors
          if (linkError.code === 'auth/credential-already-in-use') {
            setErrorMessage('This email is already associated with another account. Please login instead, or use a different email.');
          } else if (linkError.code === 'auth/email-already-in-use') {
            // This can happen if the email is already linked to another non-anonymous account
            setErrorMessage('This email is already in use by another account. Please login instead, or use a different email.');
          } else {
            setErrorMessage(`Failed to link account: ${linkError.message}`);
          }
          console.error("Link account error:", linkError);
          setLoading(false);
          return;
        }
      } else {
        // No anonymous user, or it's a non-anonymous user, so create a new one
        console.log("No anonymous user or user is not anonymous. Creating new account...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
      }

      // If firebaseUser is still null after attempts, something went wrong
      if (!firebaseUser) {
        setErrorMessage("Failed to create or link user account.");
        setLoading(false);
        return;
      }

      // 2. Update user's display name in Firebase Auth profile (for both new and linked accounts)
      await updateProfile(firebaseUser, { displayName: fullName });
      console.log("Firebase Auth display name updated for:", firebaseUser.email);

      // 3. Store full name and email in Firestore
      const currentAppId = appId || (auth.app && auth.app.options.projectId) || 'default-app-id';
      const userDocRef = doc(db, `artifacts/${currentAppId}/users/${firebaseUser.uid}/profiles`, firebaseUser.uid);
      await setDoc(userDocRef, {
        fullName: fullName,
        email: email,
        createdAt: new Date()
      }, { merge: true }); // Use merge: true to avoid overwriting existing fields if they were there (e.g., from anonymous login)

      console.log("Sign Up/Linking successful for:", firebaseUser.email, "UID:", firebaseUser.uid, "Data saved to Firestore.");
      router.navigate("./Db"); // Navigate to the dashboard or a success screen

      // Reset form fields after successful signup
      setFullname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setChecked(false);
      setErrorMessage('');

    } catch (error) {
      console.error("Firebase Sign Up/Link Error (outer catch):", error);
      let friendlyMessage = 'An unexpected error occurred during signup.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          friendlyMessage = 'This email address is already in use. Please try logging in.';
          break;
        case 'auth/weak-password':
          friendlyMessage = 'Password is too weak (minimum 6 characters).';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'The email address is not valid.';
          break;
        case 'auth/operation-not-allowed':
          friendlyMessage = 'Email/Password sign-in is not enabled in Firebase. Please check your Firebase project settings.';
          break;
        default:
          friendlyMessage = `Error: ${error.message}`;
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setLoading(false);
    }
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
              Create Account
            </Text>
            
            <Text style={styles.subText}>
              Join us to start your{" "}
              <Text style={{ color: "#4A6DDE" }}>SWYFTs</Text> journey
            </Text>
            <View style={styles.subContainer}>
              <Text style={{ marginBottom: 8, color: "white" }}>Full Name</Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.inputdesign}
                placeholderTextColor={"#6B6B6B"}
                value={fullName}
                onChangeText={setFullname}
                autoCapitalize="words"
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
                  placeholder="Create a password"
                  style={styles.forPassword}
                  placeholderTextColor={"#6B6B6B"}
                  secureTextEntry={passwordview}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={()=> setPasswordView(!passwordview)}>

                <Image source={imageSource1} />
                </TouchableOpacity>
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
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={{ flexDirection: "row" }}>
             
              <Checkbox style={{backgroundColor:"white", marginRight:5}} value={isChecked} onValueChange={setChecked} />
              <Text style={styles.agree}>
                I agree to the 
                <Text style={styles.green}> Terms of Service</Text> ands{" "}
                <Text style={styles.green}>Privacy Policy</Text>
              </Text>
            </View>
            
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Bttn name={"Create Account"} action={handleSignUp} loading={loading}/>
              )}
            
            {/* <Btn name={"Create Account"} route={"./Db"} /> */}
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
                <Text style={{ color: "#4A6DDE" }}>Sign In</Text>
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
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    width: '90%',
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

export default SignUp;
