// app/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
// Updated imports for persistence
import { initializeAuth, getReactNativePersistence, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { View, ActivityIndicator, Text } from 'react-native'; // Import necessary React Native components

// Create the AuthContext to share Firebase instances and user state
export const AuthContext = createContext({
  auth: null,
  db: null,
  appId: null,
  user: null,
  isAuthReady: false, // Indicates if the initial Firebase auth state has been checked
});

// AuthProvider component to manage Firebase initialization and authentication state
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [appId, setAppId] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold initialization errors

  useEffect(() => {
    const initializeFirebase = async () => {
      // Define firebaseConfig directly from environment variables
      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional
      };

      // In a local development setup, __app_id and __initial_auth_token are not typically available.
      // We'll use the projectId as appId for consistency in Firestore paths,
      // and anonymous sign-in for the initial auth if no user is present.
      let appIdentifier = firebaseConfig.projectId || 'default-app-id';
      let initialAuthToken = null; // This token is specific to Canvas environment, not used locally for initial sign-in

      // Validate Firebase config presence
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
        const missingKeys = [];
        if (!firebaseConfig.apiKey) missingKeys.push('API Key');
        if (!firebaseConfig.projectId) missingKeys.push('Project ID');
        if (!firebaseConfig.appId) missingKeys.push('App ID');

        const errorMsg = `Firebase configuration is missing or incomplete in .env file. Missing: ${missingKeys.join(', ')}.`;
        console.error(errorMsg);
        setErrorMessage(errorMsg);
        setIsAuthReady(true);
        return;
      }

      console.log("Firebase Config loaded from .env:", firebaseConfig.projectId);

      try {
        const app = initializeApp(firebaseConfig);
        // Initialize Firebase Auth with AsyncStorage for persistence
        const firebaseAuth = initializeAuth(app, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
        const firestoreDb = getFirestore(app);

        setAppId(appIdentifier); // Use projectId as appId for Firestore paths
        setAuth(firebaseAuth);
        setDb(firestoreDb);

        // Set up authentication state listener
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            console.log("User signed in:", currentUser.uid);
          } else {
            // Attempt anonymous sign-in if no user is present on app load
            // This is generally for initial setup or if you want anonymous users
            // before they explicitly sign up/in.
            try {
                await signInAnonymously(firebaseAuth);
                console.log("Signed in anonymously initially.");
            } catch (authError) {
                console.error("Error during initial anonymous authentication:", authError);
                // Specifically check for 'auth/admin-restricted-operation' and provide guidance
                if (authError.code === 'auth/admin-restricted-operation') {
                  setErrorMessage(
                    "Anonymous sign-in failed. Please ensure 'Anonymous' sign-in method is enabled in your Firebase Console (Authentication > Sign-in method)."
                  );
                } else {
                  setErrorMessage(`Authentication error: ${authError.message}`);
                }
                setUser(null); // Ensure user is null if anonymous sign-in fails
            }
          }
          setIsAuthReady(true); // Mark authentication as ready after initial state check
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
      } catch (e) {
        console.error("Firebase SDK initialization failed:", e);
        setErrorMessage(`Firebase initialization error: ${e.message}`);
        setIsAuthReady(true);
      }
    };

    initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render loading indicator or error message while Firebase initializes
  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
        <ActivityIndicator size="large" color="#4A6DDE" />
        <Text style={{ color: 'white', marginTop: 10 }}>Loading application...</Text>
      </View>
    );
  }

  // Display initialization error if any
  if (errorMessage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111', padding: 20 }}>
        <Text style={{ color: '#ff6b6b', fontSize: 18, textAlign: 'center' }}>
          App Initialization Error:
        </Text>
        <Text style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
          {errorMessage}
        </Text>
        <Text style={{ color: '#999999', fontSize: 12, textAlign: 'center', marginTop: 20 }}>
          Please ensure your Firebase configuration is correctly set in your project's `.env` file and Anonymous Auth is enabled.
        </Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ auth, db, appId, user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
