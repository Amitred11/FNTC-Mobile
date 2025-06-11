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

export default function GetStartedScreen() {
  const navigation = useNavigation();

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
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        delay={100}
        style={styles.overlayContainer}
      >

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
          onPress={() => navigation.navigate('SignUpScreen', { screen: 'Login' })}  // Corrected Navigation - Option 1
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
    
        <TouchableOpacity
          onPress={() => console.log('Google Sign-in pressed')}
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
        backgroundColor: 'rgba(0, 65, 176, 0.39)', // semi-transparent blue overlay
        zIndex: 2,
    },
    logo: {
        position: 'absolute',
        top: '42%',
        right: 55,
        width: 80,
        height: 40,
        zIndex: 4,
        resizeMode: 'contain',
        transform: [{ translateY: -20 }],
    },
    overlayContainer: {
        flex: 3,
        backgroundColor: 'rgba(255,255,255,0.92)', // more opaque white
        marginTop: -120,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        alignItems: 'center',
        zIndex: 4,
    },
    title: {
        fontWeight: 800,
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
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)',
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
});