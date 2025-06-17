import React, { useState } from 'react'; // Import useState
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../config/firebaseConfig';
// NOTE: Make sure to import Google Sign-In library, for example:
// import * as Google from 'expo-auth-session/providers/google';
// This example assumes a setup where 'Google.logInAsync' exists.

// --- Helper Component for the Skeleton Loader ---
// This component shows the grey, pulsing placeholders.
const SkeletonLoader = () => (
  <Animatable.View
    animation="flash"
    duration={3000}
    iterationCount="infinite"
    style={{ alignItems: 'center', width: '100%' }}
  >
    <View style={styles.skeletonTitle} />
    <View style={styles.skeletonSubtitle} />
    <View style={styles.skeletonSubtitle} />
    <View style={styles.skeletonSubtitleShort} />

    <View style={{ height: 25 }} /> 

    <View style={styles.skeletonButton} />
    <View style={styles.skeletonButton} />

    <View style={{ height: 30 }} />

    <View style={styles.skeletonGoogleButton} />
  </Animatable.View>
);


export default function GetStartedScreen() {
  const navigation = useNavigation();
  // 1. Add a state to manage the loading status
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    // 2. Set loading to true when the function is called
    setIsLoading(true); 
    try {
      let result;
      // This is a placeholder for your actual Google Sign-In logic.
      // Replace with your actual implementation.
      // For example, with 'expo-auth-session':
      // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({ webClientId: WEB_CLIENT_ID });
      // const result = await promptAsync();

      // Placeholder logic to simulate success/failure
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      const isSuccess = Math.random() > 0.1; // 90% chance of success for demo
      
      result = isSuccess 
        ? { type: 'success', idToken: 'fake-id-token-for-demo' } 
        : { type: 'cancel' };


      if (result.type === 'success') {
        // NOTE: In a real app, this part would actually attempt to sign in to Firebase.
        // For this demo, we'll just navigate.
        console.log('Google Sign-In Success, navigating...');
        // const { idToken } = result;
        // const credential = GoogleAuthProvider.credential(idToken);
        // await signInWithCredential(auth, credential);
        navigation.navigate('HomeScreen');
      } else {
        console.log('Google Sign-in cancelled');
      }
    } catch (error) {
      console.log('Google Sign-in error:', error);
    } finally {
      // 3. Set loading to false when the process is complete (success, error, or cancel)
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logos}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/getstarted.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.blueOverlay} />
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={100}
          style={styles.overlayContainer}
        >
          {/* 4. Conditional Rendering: Show loader or content */}
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <Text style={styles.title}>
                {"Welcome to FiBear Network Technologies Corp."}
              </Text>
              <Text style={styles.subtitle}>
                We are committed to keeping you connected. We provide fast, reliable,
                and stable internet service designed to meet your daily needs. Our
                staff is always ready to assist you.
              </Text>

              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate('SignUpScreen', { screen: 'Login' })}
              >
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleGoogleSignIn}
                style={styles.googleBtn}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png' }}
                    style={{ width: 22, height: 22, marginRight: 9 }}
                  />
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.footerLinks}>
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL('https://yourprivacypolicy.url')}
                >
                  Privacy Policy
                </Text>
                <Text style={styles.separator}>|</Text>
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL('https://yourtermsofservice.url')}
                >
                  Terms of Service
                </Text>
              </View>
            </>
          )}
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    backgroundImage: {
        flex: 3.6,
        width: '100%',
        height: undefined,
        resizeMode: 'cover',
        zIndex: 1,
    },
    blueOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 65, 176, 0.39)',
        zIndex: 2,
    },
    overlayContainer: {
        flex: 3,
        backgroundColor: 'rgba(255,255,255,0.92)',
        marginTop: -120,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        alignItems: 'center',
        zIndex: 4,
    },
    title: {
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 30,
        color: '#1A1A1A',
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 25,
        color: '#666',
    },
    signUpBtn: {
        backgroundColor: '#00BBD6',
        paddingVertical: 10,
        paddingHorizontal: 9,
        width: '70%',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    signUpText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
loginBtn: {
borderColor: '#00BBD6',
borderWidth: 1.5,
paddingVertical: 10,
paddingHorizontal: 9,
width: '70%',
borderRadius: 10,
marginBottom: 30,
boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)',
},
loginText: {
color: '#00BBD6',
fontWeight: 'bold',
textAlign: 'center',
},
    googleBtn: {
        marginBottom: 10,
    },
    googleText: {
        color: '#555',
        fontSize: 13,
        marginBottom: 4,
    },
    footerLinks: {
        flexDirection: 'row',
        marginTop: 10,
    },
    link: {
        color: '#999',
        fontSize: 12,
        marginHorizontal: 5,
    },
    separator: {
        color: '#999',
        fontSize: 12,
    },
    logos: {
        position: 'absolute',
        top: 60,
        left: 25,
        width: 60,
        height: 30,
        zIndex: 4,
        resizeMode: 'contain',
        transform: [{ translateY: -20 }],
    },
    // --- Styles for the Skeleton Loader ---
    skeletonTitle: {
      width: '70%',
      height: 20,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
      marginTop: 20,
      marginBottom: 30,
    },
    skeletonSubtitle: {
      width: '90%',
      height: 13,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
      marginBottom: 8,
    },
    skeletonSubtitleShort: {
        width: '60%',
        height: 13,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonButton: {
      width: '70%',
      height: 38, // Match button height
      backgroundColor: '#E0E0E0',
      borderRadius: 10,
      marginBottom: 10,
    },
    skeletonGoogleButton: {
      width: '50%',
      height: 22,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
    },
});